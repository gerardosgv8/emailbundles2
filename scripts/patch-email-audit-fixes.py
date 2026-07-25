#!/usr/bin/env python3
"""
Apply email HTML audit fixes to FinalBundles (B2B + Starter Kit).

1. DOCTYPE / lang / VML+Office xmlns on <html>
2. Optional OfficeDocumentSettings (MSO)
3. Starter: data-element on VML CTA fallbacks; convert filled anchor pills → TD *-cta-button
4. B2B: add bulletproof VML siblings for filled *-cta-button TDs
5. Add missing img width/height when inferable from style or defaults
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BUNDLES = [
    ROOT / "FinalBundles/EmailMarketing_B2B",
    ROOT / "FinalBundles/EmailMarketing_StarterKit",
]

HTML_OPEN_RE = re.compile(r"<html\b([^>]*)>", re.I)
DOCTYPE_RE = re.compile(r"<!DOCTYPE\s+html\b[^>]*>", re.I)
HEAD_AFTER_META_RE = re.compile(
    r'(<meta[^>]+charset[^>]*>\s*)',
    re.I,
)

OFFICE_BLOCK = """<!--[if mso]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
"""


def ensure_html_shell(html: str) -> str:
    if not DOCTYPE_RE.search(html):
        html = re.sub(r"^\s*", "<!DOCTYPE html>\n", html, count=1)

    def fix_html_tag(match: re.Match[str]) -> str:
        attrs = match.group(1)
        # drop duplicate xmlns:v/o/w/lang if re-running
        attrs = re.sub(r'\s+xmlns:v="[^"]*"', "", attrs, flags=re.I)
        attrs = re.sub(r'\s+xmlns:o="[^"]*"', "", attrs, flags=re.I)
        attrs = re.sub(r'\s+xmlns:w="[^"]*"', "", attrs, flags=re.I)
        attrs = re.sub(r'\s+lang="[^"]*"', "", attrs, flags=re.I)
        if not re.search(r'\sxmlns="', attrs):
            attrs = ' xmlns="http://www.w3.org/1999/xhtml"' + attrs
        inject = (
            ' xmlns:v="urn:schemas-microsoft-com:vml"'
            ' xmlns:o="urn:schemas-microsoft-com:office:office"'
            ' xmlns:w="urn:schemas-microsoft-com:office:word"'
            ' lang="en"'
        )
        # keep existing xmlns= first, then inject v/o/w/lang before other attrs end
        if 'xmlns="http://www.w3.org/1999/xhtml"' in attrs:
            attrs = attrs.replace(
                'xmlns="http://www.w3.org/1999/xhtml"',
                'xmlns="http://www.w3.org/1999/xhtml"' + inject,
                1,
            )
        else:
            attrs = inject + attrs
        return f"<html{attrs}>"

    html = HTML_OPEN_RE.sub(fix_html_tag, html, count=1)

    if "OfficeDocumentSettings" not in html:
        # Insert after first charset meta inside head
        m = re.search(r"(<head\b[^>]*>)(\s*)", html, re.I)
        if m:
            insert_at = m.end()
            # Prefer after charset meta if present
            charset = re.search(r"<meta[^>]+charset[^>]*>\s*", html[insert_at : insert_at + 800], re.I)
            if charset:
                insert_at = insert_at + charset.end()
            html = html[:insert_at] + OFFICE_BLOCK + html[insert_at:]

    return html


def estimate_vml_size(label: str, padding: str | None = None) -> tuple[int, int]:
    height = 54
    if padding:
        # e.g. 18px 36px or 14px 28px
        nums = [int(n) for n in re.findall(r"(\d+)px", padding)]
        if len(nums) >= 1:
            height = max(40, nums[0] * 2 + 22)
    width = max(160, min(320, len(label.strip()) * 10 + 72))
    return height, width


def build_vml_button(
    *,
    hook: str,
    href: str,
    label: str,
    fill: str,
    text_color: str = "#ffffff",
    height: int = 54,
    width: int = 200,
    kind: str = "cta-primary",
    secondary: bool = False,
) -> str:
    stroke = 'stroke="t" strokecolor="{0}" strokeweight="2px"'.format(
        text_color if secondary else fill
    )
    if not secondary:
        stroke = 'stroke="f"'
    # secondary: fill white, stroke brand
    if secondary:
        stroke = f'stroke="t" strokecolor="{fill}" strokeweight="2px"'
        fill_attr = fill if fill.lower() != "#ffffff" else "#ffffff"
        # For secondary white buttons, fill is white and stroke is brand (passed as fill arg often brand)
        # Caller should pass fill=white and stroke_color separately... simplify:
        pass

    if secondary:
        fillcolor = "#ffffff"
        strokecolor = fill  # brand color passed in
        stroke_attr = f'stroke="t" strokecolor="{strokecolor}" strokeweight="2px"'
        center_color = text_color
    else:
        fillcolor = fill
        stroke_attr = 'stroke="f"'
        center_color = text_color

    kind_attr = f' data-vml-kind="{kind}"' if kind else ""
    return (
        f'<!--[if mso]>\n'
        f'<table border="0" cellpadding="0" cellspacing="0" role="presentation"><tr><td align="center">\n'
        f'<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" '
        f'href="{href}" style="height:{height}px;v-text-anchor:middle;width:{width}px;" arcsize="15%" '
        f'{stroke_attr} fillcolor="{fillcolor}" data-vml-for="{hook}"{kind_attr}>\n'
        f'<w:anchorlock/>\n'
        f'<center style="color:{center_color};font-family:Segoe UI, Roboto, sans-serif;font-size:16px;font-weight:600;">\n'
        f'{label}\n'
        f'</center>\n'
        f'</v:roundrect>\n'
        f'</td></tr></table>\n'
        f'<![endif]-->\n'
    )


def parse_style_color(style: str, prop: str) -> str | None:
    m = re.search(rf"{prop}\s*:\s*([^;!]+)", style, re.I)
    return m.group(1).strip() if m else None


def wrap_existing_button_table_with_vml(html: str) -> tuple[str, int]:
    """For B2B (and any file): find TD *-cta-button blocks and add MSO VML + hide HTML from MSO."""
    count = 0

    # Match the presentation table that contains a single cta-button td
    pattern = re.compile(
        r'(<table\b[^>]*role="presentation"[^>]*>\s*<tbody>\s*<tr>\s*'
        r'(<td\b([^>]*data-element="([^"]*-cta-button)"[^>]*)>)'
        r'([\s\S]*?)'
        r'</td>\s*</tr>\s*</tbody>\s*</table>)',
        re.I,
    )

    def repl(match: re.Match[str]) -> str:
        nonlocal count
        full, td_open, td_attrs, hook, inner = match.group(1), match.group(2), match.group(3), match.group(4), match.group(5)

        # Skip if already preceded by data-vml-for for this hook nearby
        start = match.start()
        prelude = html[max(0, start - 500) : start]
        if f'data-vml-for="{hook}"' in prelude or f'data-vml-for="{hook.replace("-button", "")}"' in prelude:
            return full
        if "<!--[if mso]>" in prelude[-200:] and "v:roundrect" in prelude:
            return full

        a = re.search(r'<a\b([^>]*)>([\s\S]*?)</a>', inner, re.I)
        if not a:
            return full
        a_attrs, a_label = a.group(1), re.sub(r"\s+", " ", a.group(2)).strip()
        href_m = re.search(r'href="([^"]*)"', a_attrs, re.I)
        href = href_m.group(1) if href_m else "#"

        bg = None
        bg_m = re.search(r'bgcolor="([^"]+)"', td_attrs, re.I)
        if bg_m:
            bg = bg_m.group(1)
        style_m = re.search(r'style="([^"]*)"', td_attrs, re.I)
        style = style_m.group(1) if style_m else ""
        if not bg:
            bg = parse_style_color(style, "background-color") or "#000000"
        text_color = parse_style_color(a_attrs, "color") or "#ffffff"
        pad = None
        pad_m = re.search(r"padding\s*:\s*([^;!]+)", style, re.I)
        if pad_m:
            pad = pad_m.group(1)
        height, width = estimate_vml_size(a_label, pad)

        secondary = "secondary" in hook.lower() or bg.lower() in {"#ffffff", "#fff", "white"}
        kind = "cta-secondary" if secondary else "cta-primary"
        # For secondary, stroke uses brand; try border color or link color from anchor
        stroke_or_fill = bg
        if secondary:
            border = parse_style_color(style, "border-color") or parse_style_color(a_attrs, "color") or "#000000"
            stroke_or_fill = border
            # if bg is white, fill white and stroke brand
            vml = build_vml_button(
                hook=hook,
                href=href,
                label=a_label,
                fill=stroke_or_fill,
                text_color=text_color if text_color.lower() not in {"#ffffff", "#fff"} else stroke_or_fill,
                height=height,
                width=width,
                kind=kind,
                secondary=True,
            )
        else:
            vml = build_vml_button(
                hook=hook,
                href=href,
                label=a_label,
                fill=bg,
                text_color=text_color,
                height=height,
                width=width,
                kind=kind,
                secondary=False,
            )

        count += 1
        return (
            f"{vml}"
            f"<!--[if !mso]> -->\n"
            f"{full}\n"
            f"<!--<![endif]-->"
        )

    # Use a unique approach: process matches from end to start so positions stay valid for prelude checks
    matches = list(pattern.finditer(html))
    for match in reversed(matches):
        replacement = repl(match)
        if replacement != match.group(0):
            html = html[: match.start()] + replacement + html[match.end() :]

    return html, count


def convert_starter_filled_anchors(html: str, filename: str) -> tuple[str, int]:
    """Convert standalone filled <a background-color> into TD button (+ ensure data-element)."""
    count = 0

    # Pair: optional existing mso vml block immediately before !mso anchor
    # Handle patterns like Back_in_Stock where VML exists but anchor lacks data-element

    # 1) Fix anchors that follow a data-vml-for roundrect within previous 800 chars
    def fix_anchor_after_vml(match: re.Match[str]) -> str:
        nonlocal count
        full = match.group(0)
        attrs = match.group(1)
        label = match.group(2)
        if "data-element=" in attrs:
            return full
        # find nearest data-vml-for before this match — handled by caller with window
        return full  # placeholder

    # Simpler pass: for each filled anchor not in cta-button td
    anchor_re = re.compile(
        r'<a\b([^>]*background-color[^>]*)>([\s\S]*?)</a>',
        re.I,
    )

    matches = list(anchor_re.finditer(html))
    for match in reversed(matches):
        attrs, raw_label = match.group(1), match.group(2)
        label = re.sub(r"\s+", " ", raw_label).strip()
        # skip if already inside cta-button td
        prelude = html[max(0, match.start() - 400) : match.start()]
        if re.search(r'data-element="[^"]*-cta-button"', prelude):
            # Still ensure data-element on anchor if missing and vml-for nearby
            if "data-element=" not in attrs:
                vml_hook = re.findall(r'data-vml-for="([^"]+)"', prelude)
                if vml_hook:
                    hook = vml_hook[-1]
                    if hook.endswith("-button"):
                        hook = hook[: -len("-button")] if hook.endswith("-cta-button") else hook
                    # prefer non -button form for anchor
                    if hook.endswith("-cta-button"):
                        anchor_hook = hook.replace("-cta-button", "-cta")
                    elif hook.endswith("-button"):
                        anchor_hook = hook[: -len("-button")]
                    else:
                        anchor_hook = hook
                    new_a = f'<a data-element="{anchor_hook}"{attrs}>{raw_label}</a>'
                    # attrs already starts with space or not - fix
                    if not attrs.startswith(" "):
                        new_a = f'<a data-element="{anchor_hook}" {attrs.lstrip()}>{raw_label}</a>'
                    else:
                        new_a = f'<a data-element="{anchor_hook}"{attrs}>{raw_label}</a>'
                    html = html[: match.start()] + new_a + html[match.end() :]
                    count += 1
            continue

        # Determine hook
        de = re.search(r'data-element="([^"]+)"', attrs)
        vml_hooks = re.findall(r'data-vml-for="([^"]+)"', prelude)
        if de:
            hook = de.group(1)
        elif vml_hooks:
            hook = vml_hooks[-1]
        else:
            # invent from filename keywords / label
            slug = re.sub(r"[^a-z0-9]+", "-", label.lower()).strip("-")[:40]
            hook = f"{slug}-cta" if slug else "primary-cta"

        button_hook = hook if hook.endswith("-cta-button") else (
            hook.replace("-cta", "-cta-button") if hook.endswith("-cta") else f"{hook}-button"
        )
        # normalize: back-in-stock-cta → back-in-stock-cta-button
        if not button_hook.endswith("-button"):
            button_hook = f"{hook}-button" if not hook.endswith("-button") else hook
        if hook.endswith("-cta-button"):
            anchor_hook = hook.replace("-cta-button", "-cta")
            button_hook = hook
        else:
            anchor_hook = hook if not hook.endswith("-button") else hook.replace("-button", "")
            if not anchor_hook.endswith("-cta") and "cta" not in anchor_hook:
                anchor_hook = hook

        # Special known hooks from audit
        known = {
            "Buy Now": "back-in-stock-cta",
            "Shop Now": "product-rec-hero-cta",
            "SHOP MEGA SALE": "promo-main-cta",
            "Shop Mega Sale": "promo-main-cta",
        }
        for key, val in known.items():
            if key.lower() in label.lower() and filename.startswith(
                ("Back_in_Stock", "Product_Recommendations.html", "Promotional_Campaign")
            ):
                # only apply known when filename matches intent
                pass
        if filename == "Back_in_Stock_Notification.html" and "buy now" in label.lower():
            anchor_hook, button_hook = "back-in-stock-cta", "back-in-stock-cta-button"
        elif filename == "Product_Recommendations.html" and "shop now" in label.lower() and "arrival" not in (de.group(1) if de else ""):
            # hero shop now vs arrival cards
            if not de or de.group(1) in {None} or "arrival" not in (de.group(1) if de else ""):
                if not de:
                    anchor_hook, button_hook = "product-rec-hero-cta", "product-rec-hero-cta-button"
        elif filename == "Promotional_Campaign.html" and "mega sale" in label.lower() or (
            filename == "Promotional_Campaign.html" and not de and vml_hooks
        ):
            if vml_hooks and vml_hooks[-1] == "promo-main-cta":
                anchor_hook, button_hook = "promo-main-cta", "promo-main-cta-button"

        if de and de.group(1).startswith("arrival-"):
            anchor_hook = de.group(1)
            button_hook = f"{anchor_hook}-button"

        href_m = re.search(r'href="([^"]*)"', attrs)
        href = href_m.group(1) if href_m else "#"
        bg = parse_style_color(attrs, "background-color") or "#2563eb"
        text_color = parse_style_color(attrs, "color") or "#ffffff"
        radius = parse_style_color(attrs, "border-radius") or "8px"
        pad = parse_style_color(attrs, "padding") or "14px 28px"
        font_size = parse_style_color(attrs, "font-size") or "16px"
        font_weight = parse_style_color(attrs, "font-weight") or "600"
        font_family = parse_style_color(attrs, "font-family") or "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        height, width = estimate_vml_size(label, pad)

        # If VML already exists just before, don't duplicate — only replace the !mso anchor with TD structure
        has_vml = bool(vml_hooks) and "v:roundrect" in prelude

        td_block = (
            f'<table border="0" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr>\n'
            f'<td data-element="{button_hook}" bgcolor="{bg}" align="center" '
            f'style="background-color: {bg} !important; border-radius: {radius} !important; '
            f'padding: {pad} !important">\n'
            f'<a data-element="{anchor_hook}" href="{href}" style="text-decoration: none; color: {text_color}; '
            f'font-size: {font_size}; font-weight: {font_weight}; font-family: {font_family}; '
            f'line-height: 22px">{label}</a>\n'
            f'</td>\n'
            f'</tr></tbody></table>'
        )

        if has_vml:
            # Ensure VML hook matches button/anchor; update data-vml-for if needed stays as-is
            replacement = td_block
        else:
            vml = build_vml_button(
                hook=button_hook,
                href=href,
                label=label,
                fill=bg,
                text_color=text_color,
                height=height,
                width=width,
                kind="cta-primary",
                secondary=bg.lower() in {"#ffffff", "#fff", "white"},
            )
            replacement = (
                f"{vml}"
                f"<!--[if !mso]> -->\n"
                f"{td_block}\n"
                f"<!--<![endif]-->"
            )

        # If this anchor is inside <!--[if !mso]> ... <!--<![endif]-->, replace only the anchor
        # Expand to replace the whole !mso wrapper content if it's just the anchor
        html = html[: match.start()] + replacement + html[match.end() :]
        count += 1

    return html, count


def fix_img_dimensions(html: str) -> tuple[str, int]:
    count = 0

    def repl(match: re.Match[str]) -> str:
        nonlocal count
        attrs = match.group(1)
        style = ""
        sm = re.search(r'style="([^"]*)"', attrs, re.I)
        if sm:
            style = sm.group(1)

        def style_px(prop: str) -> str | None:
            m = re.search(rf"{prop}\s*:\s*(\d+)px", style, re.I)
            return m.group(1) if m else None

        changed = attrs
        if not re.search(r"\bwidth=", attrs, re.I):
            w = style_px("width") or "600"
            changed += f' width="{w}"'
            count += 1
        if not re.search(r"\bheight=", attrs, re.I):
            h = style_px("height")
            if h:
                changed += f' height="{h}"'
                count += 1
            elif re.search(r"\bwidth=", changed, re.I):
                # logo-ish small widths
                wm = re.search(r'\bwidth="(\d+)"', changed, re.I)
                if wm and int(wm.group(1)) <= 200:
                    changed += f' height="{max(40, int(wm.group(1)) // 3)}"'
                    count += 1
                else:
                    # leave large heroes without height if style says height:auto — use 400 default for placeholders
                    changed += ' height="400"'
                    count += 1
        if changed == attrs:
            return match.group(0)
        return f"<img{changed}>"

    html = re.sub(r"<img\b([^>]*)>", repl, html, flags=re.I)
    return html, count


def patch_file(path: Path) -> dict:
    original = path.read_text(encoding="utf-8")
    html = original
    stats = {"file": path.name, "bundle": path.parent.name}

    html = ensure_html_shell(html)

    if path.parent.name == "EmailMarketing_StarterKit":
        html, n = convert_starter_filled_anchors(html, path.name)
        stats["starter_cta_conversions"] = n
    else:
        stats["starter_cta_conversions"] = 0

    html, n = wrap_existing_button_table_with_vml(html)
    stats["vml_wrapped_buttons"] = n

    html, n = fix_img_dimensions(html)
    stats["img_dims"] = n

    if html != original:
        path.write_text(html, encoding="utf-8")
        stats["changed"] = True
    else:
        stats["changed"] = False
    return stats


def main() -> None:
    results = []
    for bundle in BUNDLES:
        for path in sorted(bundle.glob("*.html")):
            results.append(patch_file(path))

    changed = [r for r in results if r["changed"]]
    print(f"Updated {len(changed)}/{len(results)} files\n")
    for r in results:
        if not r["changed"]:
            print(f"unchanged: {r['bundle']}/{r['file']}")
            continue
        print(
            f"patched: {r['bundle']}/{r['file']} "
            f"(starter_cta={r['starter_cta_conversions']}, "
            f"vml_wrap={r['vml_wrapped_buttons']}, img_dims={r['img_dims']})"
        )


if __name__ == "__main__":
    main()

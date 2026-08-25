#!/usr/bin/env python3
"""Fix data-element=\"logo\" so it only marks real header logos, not heroes/products."""

from __future__ import annotations

import re
from pathlib import Path

ROOTS = [
    Path("FinalBundles/EmailMarketing_StarterKit"),
    Path("FinalBundles/EmailMarketing_B2B"),
]

IMG_RE = re.compile(r"<img\b[^>]*>", re.I)


def attr(tag: str, name: str) -> str:
    m = re.search(rf'{name}="([^"]*)"', tag, re.I)
    return m.group(1) if m else ""


def parse_px(value: str) -> int:
    value = (value or "").strip().lower().replace("px", "")
    try:
        return int(float(value))
    except ValueError:
        return 0


def is_likely_logo(tag: str) -> bool:
    """Header logos are small marks, not hero/product photos."""
    w = parse_px(attr(tag, "width"))
    h = parse_px(attr(tag, "height"))
    style = attr(tag, "style")
    style_w = 0
    style_h = 0
    mw = re.search(r"(?:^|;)\s*width:\s*([0-9.]+)px", style, re.I)
    mh = re.search(r"(?:^|;)\s*height:\s*([0-9.]+)px", style, re.I)
    if mw:
        style_w = parse_px(mw.group(1))
    if mh:
        style_h = parse_px(mh.group(1))
    w = w or style_w
    h = h or style_h
    if w <= 0:
        return False
    # Typical header logo footprint
    if w <= 220 and (h <= 0 or h <= 90):
        return True
    return False


def retarget_non_logo(tag: str) -> str:
    """Retag a mislabeled logo image as hero/product (or strip the hook)."""
    w = parse_px(attr(tag, "width"))
    if w >= 500:
        new_el = "hero-image"
    elif w >= 200:
        new_el = "product-image"
    else:
        # Small product thumbs that were wrongly marked logo — remove hook
        if re.search(r'\sdata-element="logo"', tag, re.I):
            return re.sub(r'\sdata-element="logo"', "", tag, count=1, flags=re.I)
        return tag

    if re.search(r'data-element="[^"]*"', tag, re.I):
        return re.sub(r'data-element="[^"]*"', f'data-element="{new_el}"', tag, count=1, flags=re.I)
    return tag.replace("<img", f'<img data-element="{new_el}"', 1)


def ensure_header_logo(html: str) -> str:
    """If no valid logo hook exists, add data-element=\"logo\" to the first likely header mark."""
    has_valid = False
    for m in IMG_RE.finditer(html):
        tag = m.group(0)
        if attr(tag, "data-element") in {"logo", "header-logo"} and is_likely_logo(tag):
            has_valid = True
            break
    if has_valid:
        return html

    def add_logo(m: re.Match[str]) -> str:
        tag = m.group(0)
        el = attr(tag, "data-element")
        if el:
            return tag
        if is_likely_logo(tag):
            if "data-element=" in tag.lower():
                return tag
            return tag.replace("<img", '<img data-element="logo"', 1)
        return tag

    # Only patch the first likely unhooked logo candidate
    patched = False

    def add_first(m: re.Match[str]) -> str:
        nonlocal patched
        tag = m.group(0)
        if patched:
            return tag
        el = attr(tag, "data-element")
        if el or not is_likely_logo(tag):
            return tag
        patched = True
        return tag.replace("<img", '<img data-element="logo"', 1)

    return IMG_RE.sub(add_first, html)


def fix_file(path: Path) -> list[str]:
    html = path.read_text(encoding="utf-8")
    original = html
    notes: list[str] = []

    def rewrite(m: re.Match[str]) -> str:
        tag = m.group(0)
        el = attr(tag, "data-element")
        if el not in {"logo", "header-logo"}:
            return tag
        if is_likely_logo(tag):
            return tag
        new_tag = retarget_non_logo(tag)
        notes.append(f"  retarget {el} → {attr(new_tag, 'data-element') or '(none)'} ({attr(tag, 'alt')[:40]})")
        return new_tag

    html = IMG_RE.sub(rewrite, html)
    before_ensure = html
    html = ensure_header_logo(html)
    if html != before_ensure:
        notes.append("  added data-element=\"logo\" on header mark")

    if html != original:
        path.write_text(html, encoding="utf-8")
    return notes


def main() -> None:
    for root in ROOTS:
        if not root.is_dir():
            print(f"skip missing {root}")
            continue
        print(f"\n=== {root} ===")
        for path in sorted(root.glob("*.html")):
            notes = fix_file(path)
            if notes:
                print(path.name)
                print("\n".join(notes))


if __name__ == "__main__":
    main()

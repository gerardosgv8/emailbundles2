/**
 * Safe mobile stacking for dual CTA buttons (does not use display:block on tr/tbody).
 * Run: node scripts/patch-responsive-buttons.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const BROKEN_CSS = `    /* Mobile: stack dual CTA buttons full-width */
    @media only screen and (max-width: 600px) {
      .mc-button-row,
      .mc-button-row tbody,
      .mc-button-row tr {
        display: block !important;
        width: 100% !important;
      }
      .mc-button-cell {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        padding: 6px 0 !important;
        box-sizing: border-box !important;
      }
      .mc-button-cell table {
        width: 100% !important;
        max-width: 320px !important;
        margin: 0 auto !important;
      }
      .mc-button-cell td[align="center"] {
        display: block !important;
        width: 100% !important;
      }
      .mc-button-row a[data-element*="cta"],
      .mc-button-stack a[data-element*="cta"] {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        margin: 0 auto 12px auto !important;
        text-align: center !important;
      }
    }`;

const SAFE_CSS = `    /* Mobile: stack dual CTA buttons (email-safe — never display:block on tr) */
    @media only screen and (max-width: 600px) {
      .mc-inline-btn-row td.mc-inline-btn {
        display: block !important;
        width: 100% !important;
        max-width: 300px !important;
        margin: 0 auto 12px auto !important;
        box-sizing: border-box !important;
      }
      .mc-inline-btn-row td.mc-inline-btn-spacer {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        font-size: 0 !important;
        line-height: 0 !important;
      }
      .mc-inline-btn-row td.mc-inline-btn a {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
        text-align: center !important;
      }
    }`;

const ORDER_CTA_BROKEN = `              <!-- CTA Buttons -->
              <!--[if mso]>
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 20px auto;">
                <tr>
                  <td align="center" style="padding: 6px;">
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:50px;v-text-anchor:middle;width:200px;" arcsize="10%" stroke="f" fillcolor="#2563eb">
                      <w:anchorlock/>
                      <center style="color:#ffffff;font-family:Segoe UI, Roboto, sans-serif;font-size:16px;font-weight:600;">Track Your Order</center>
                    </v:roundrect>
                  </td>
                  <td align="center" style="padding: 6px;">
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:50px;v-text-anchor:middle;width:200px;" arcsize="10%" stroke="f" fillcolor="#ffffff" strokecolor="#2563eb" strokeweight="2px">
                      <w:anchorlock/>
                      <center style="color:#2563eb;font-family:Segoe UI, Roboto, sans-serif;font-size:16px;font-weight:600;">View Order Details</center>
                    </v:roundrect>
                  </td>
                </tr>
              </table>
              <![endif]-->
              <!--[if !mso]> -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" class="mc-button-row" style="margin: 20px 0;">
                <tbody>
                  <tr>
                    <td align="center" class="mc-button-cell" style="padding: 6px;">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: 0 auto;">
                        <tbody>
                          <tr>
                            <td align="center" style="border-radius: 8px; background-color: #2563eb;">
                              <a data-element="cta-track-order" href="#" style="display: inline-block; text-decoration: none; color: #ffffff; font-size: 16px; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border-radius: 8px; padding: 16px 32px; line-height: 22px;">Track Your Order</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td align="center" class="mc-button-cell" style="padding: 6px;">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: 0 auto;">
                        <tbody>
                          <tr>
                            <td align="center" style="border-radius: 8px; background-color: #ffffff; border: 2px solid #2563eb;">
                              <a data-element="cta-view-details" href="#" style="display: inline-block; text-decoration: none; color: #2563eb; font-size: 16px; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border-radius: 8px; padding: 14px 30px; line-height: 22px;">View Order Details</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!--<![endif]-->`;

const ORDER_CTA_FIXED = `              <!-- CTA Buttons -->
              <!--[if mso]>
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 20px auto;">
                <tr>
                  <td align="center" style="padding: 6px;">
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:50px;v-text-anchor:middle;width:200px;" arcsize="10%" stroke="f" fillcolor="#2563eb">
                      <w:anchorlock/>
                      <center style="color:#ffffff;font-family:Segoe UI, Roboto, sans-serif;font-size:16px;font-weight:600;">Track Your Order</center>
                    </v:roundrect>
                  </td>
                  <td width="12" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                  <td align="center" style="padding: 6px;">
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:50px;v-text-anchor:middle;width:200px;" arcsize="10%" stroke="f" fillcolor="#ffffff" strokecolor="#2563eb" strokeweight="2px">
                      <w:anchorlock/>
                      <center style="color:#2563eb;font-family:Segoe UI, Roboto, sans-serif;font-size:16px;font-weight:600;">View Order Details</center>
                    </v:roundrect>
                  </td>
                </tr>
              </table>
              <![endif]-->
              <!--[if !mso]> -->
              <table border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" class="mc-inline-btn-row" style="margin: 20px auto;">
                <tr>
                  <td align="center" class="mc-inline-btn" style="border-radius: 8px; background-color: #2563eb; padding: 0;">
                    <a data-element="cta-track-order" href="#" style="display: inline-block; text-decoration: none; color: #ffffff; font-size: 16px; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border-radius: 8px; padding: 16px 32px; line-height: 22px;">Track Your Order</a>
                  </td>
                  <td width="12" class="mc-inline-btn-spacer" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                  <td align="center" class="mc-inline-btn" style="border-radius: 8px; background-color: #ffffff; border: 2px solid #2563eb; padding: 0;">
                    <a data-element="cta-view-details" href="#" style="display: inline-block; text-decoration: none; color: #2563eb; font-size: 16px; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border-radius: 8px; padding: 14px 30px; line-height: 22px;">View Order Details</a>
                  </td>
                </tr>
              </table>
              <!--<![endif]-->`;

const FEATURE_CTA_BROKEN_START = `              <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" class="mc-button-row"`;
const FEATURE_CTA_BROKEN_END = `              <!--<![endif]-->
            </td>
          </tr>
          <!-- Component end CTA Block -->`;

const FEATURE_CTA_FIXED = `              <table border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" class="mc-inline-btn-row" style="margin: 30px auto;">
                <tr>
                  <td align="center" class="mc-inline-btn" style="border-radius: 8px; background-color: #ffffff; border: 2px solid #2563eb; padding: 0;">
                    <a href="#" data-element="cta-secondary" style="display: inline-block; text-decoration: none; color: #2563eb; font-size: 16px; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border-radius: 8px; padding: 14px 30px; line-height: 22px;">Learn More</a>
                  </td>
                  <td width="12" class="mc-inline-btn-spacer" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                  <td align="center" class="mc-inline-btn" style="border-radius: 8px; background-color: #2563eb; padding: 0;">
                    <a href="#" data-element="cta-primary" style="display: inline-block; text-decoration: none; color: #ffffff; font-size: 16px; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border-radius: 8px; padding: 16px 32px; line-height: 22px;">Try AI Analytics Now</a>
                  </td>
                </tr>
              </table>
              <!--<![endif]-->
            </td>
          </tr>
          <!-- Component end CTA Block -->`;

function patchCss(html) {
  if (html.includes(BROKEN_CSS)) {
    return html.replace(BROKEN_CSS, SAFE_CSS);
  }
  if (html.includes(SAFE_CSS)) {
    return html;
  }
  return html.replace('</style>', `${SAFE_CSS}\n  </style>`);
}

function patchFeatureCta(html) {
  const start = html.indexOf(FEATURE_CTA_BROKEN_START);
  if (start === -1) return html;
  const end = html.indexOf(FEATURE_CTA_BROKEN_END, start);
  if (end === -1) return html;
  return html.slice(0, start) + FEATURE_CTA_FIXED + html.slice(end + FEATURE_CTA_BROKEN_END.length);
}

function patchFile(filePath, extra) {
  let html = fs.readFileSync(filePath, 'utf8');
  const original = html;

  html = patchCss(html);

  if (extra?.orderCta && html.includes(ORDER_CTA_BROKEN)) {
    html = html.replace(ORDER_CTA_BROKEN, ORDER_CTA_FIXED);
  } else if (extra?.orderCta && html.includes(ORDER_CTA_FIXED)) {
    // already fixed
  } else if (extra?.orderCta) {
    console.warn(`  warn: order CTA block not found in ${path.basename(filePath)}`);
  }

  if (extra?.featureCta) {
    html = patchFeatureCta(html);
  }

  if (html !== original) {
    fs.writeFileSync(filePath, html);
    return true;
  }
  return false;
}

const bundles = [
  {
    dir: path.join(root, 'FinalBundles/EmailMarketing_StarterKit'),
    files: {
      'Order_Confirmation_Email.html': { orderCta: true },
      'Feature_Announcement.html': { featureCta: true },
    },
  },
  {
    dir: path.join(root, 'FinalBundles/EmailMarketing_B2B'),
    files: {},
  },
];

for (const { dir, files } of bundles) {
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.html'))) {
    const changed = patchFile(path.join(dir, file), files[file] ?? {});
    console.log(`${changed ? 'patched' : 'unchanged'}: ${path.basename(dir)}/${file}`);
  }
}

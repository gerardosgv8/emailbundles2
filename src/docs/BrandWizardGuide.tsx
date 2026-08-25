import { Link } from 'react-router-dom';
import { DocsGuideAccordion } from '../components/DocsGuideAccordion';
import { storefrontBrandWizardPath } from '../brand-wizard/wizardRoute';
import {
  DocCallout,
  DocFaqList,
  DocStep,
  DocSteps,
  DocVideoPlaceholder,
  Ui,
} from './DocPrimitives';

export function BrandWizardGuide() {
  return (
    <section className="doc-section" id="brand-wizard">
      <div className="doc-section-head">
        <h2>Brand Design Wizard</h2>
        <p className="doc-section-lead">
          Step one: brand the pack once (logo, colors, buttons, footer), apply those tokens across
          every template, and export shareable Design Rules. One pass replaces
          repeating the same style edits in every file.
        </p>
        <Link to={storefrontBrandWizardPath()} className="btn btn-primary btn-sm">
          Open Brand Wizard
        </Link>
      </div>

      <DocVideoPlaceholder
        title="Overview: define tokens, apply a zip, and export Design Rules"
        duration="~2 min"
      />

      <DocsGuideAccordion
        sections={[
          {
            id: 'bw-when',
            title: 'When to use the Brand Wizard',
            defaultOpen: true,
            children: (
              <>
                <p>
                  Use the Brand Wizard when you need a consistent look across many emails: shared
                  colors, logo, CTAs, and footer, without editing each HTML file by hand.
                </p>
                <ul className="feature-list">
                  <li>
                    <strong>Do use it</strong> to brand a full template bundle before launch.
                  </li>
                  <li>
                    <strong>Do use it</strong> to refresh a campaign’s palette and re-apply to
                    the same zip.
                  </li>
                  <li>
                    <strong>Don’t use it</strong> to rewrite headlines or product copy. That’s
                    the <Link to="/docs#content-wizard">Content Wizard</Link>.
                  </li>
                </ul>
              </>
            ),
          },
          {
            id: 'bw-prereqs',
            title: 'What you’ll need',
            children: (
              <>
                <DocCallout tone="prereq">
                  <ul className="feature-list" style={{ margin: 0 }}>
                    <li>A Mailcraft template bundle marked <Ui>Wizard ready</Ui></li>
                    <li>Your logo hosted on HTTPS (PNG or JPG, under ~100 KB preferred)</li>
                    <li>Brand hex colors and footer / legal contact details</li>
                    <li>
                      Optional: an existing Design Rules file to import
                    </li>
                  </ul>
                </DocCallout>
                <p>
                  Progress saves automatically in your browser. Clearing site data resets local
                  wizard values for that bundle.
                </p>
              </>
            ),
          },
          {
            id: 'bw-choose',
            title: 'Open the Brand Wizard',
            children: (
              <>
                <DocSteps>
                  <DocStep title="Open the Brand Wizard">
                    Go to <Link to={storefrontBrandWizardPath()}>Brand Wizard</Link> from the site
                    header. You land directly in the Email Marketing Starter Kit editor.
                  </DocStep>
                  <DocStep title="Confirm you’re in the Starter Kit">
                    The sidebar shows <Ui>Email Marketing Starter Kit</Ui>. Use <Ui>← Home</Ui> if
                    you need to leave the wizard.
                  </DocStep>
                </DocSteps>
                <DocCallout tone="outcome">
                  You see a step list on the left (or a step picker on mobile) and a{' '}
                  <Ui>Live preview</Ui> panel with your brand name and palette swatches.
                </DocCallout>
              </>
            ),
          },
          {
            id: 'bw-tokens',
            title: 'Set brand tokens (step by step)',
            children: (
              <>
                <p>
                  Work through the sidebar steps in order the first time. Skip ahead anytime by
                  clicking a step name.
                </p>
                <DocSteps>
                  <DocStep title="Brand identity">
                    Enter company name, tagline, copyright note, From name, and reply-to email.
                  </DocStep>
                  <DocStep title="Logo">
                    Paste your logo URL, alt text, and display width. Optional: dark-background
                    logo and favicon.
                  </DocStep>
                  <DocStep title="Core & text colors">
                    Set primary, secondary, accent, headings, body, and muted text. Watch the{' '}
                    <Ui>Palette reference</Ui> update as you go.
                  </DocStep>
                  <DocStep title="Surfaces, badges, buttons">
                    Configure section backgrounds, badges, primary/secondary CTAs, and link
                    colors. Exact fields depend on the bundle.
                  </DocStep>
                  <DocStep title="Typography, footer, layout, imagery">
                    Finish font stack, footer address and social links, spacing tokens, and
                    image size notes for your team.
                  </DocStep>
                </DocSteps>
                <DocCallout tone="tip">
                  Match UI field labels in the wizard when collaborating with teammates. Those
                  same names appear in the exported Design Rules file.
                </DocCallout>
                <DocVideoPlaceholder
                  title="Walkthrough: fill brand tokens with live preview"
                  duration="~3 min"
                />
              </>
            ),
          },
          {
            id: 'bw-import',
            title: 'Import an existing Design Rules file',
            children: (
              <>
                <DocSteps>
                  <DocStep title="Choose the file">
                    In <Ui>Live preview</Ui> (or the mobile import block), click{' '}
                    <Ui>Choose file</Ui> and select your Design Rules file.
                  </DocStep>
                  <DocStep title="Review the match count">
                    Confirm how many tokens Mailcraft recognized. Warnings appear if a section
                    couldn’t be parsed.
                  </DocStep>
                  <DocStep title="Import into wizard">
                    Click <Ui>Import into wizard</Ui>, then confirm <Ui>Import settings</Ui> in
                    the modal.
                  </DocStep>
                </DocSteps>
                <DocCallout tone="warning">
                  Import replaces matched fields only. Tokens missing from the file keep their
                  current values. Pricing and promo button colors may not be in older markdown
                  files. Set those manually if needed.
                </DocCallout>
              </>
            ),
          },
          {
            id: 'bw-apply',
            title: 'Apply brand to templates',
            children: (
              <>
                <p>
                  On the last step, <Ui>Review &amp; export</Ui>, apply your tokens to HTML so
                  you get a branded download.
                </p>
                <DocSteps>
                  <DocStep title="Complete the pre-flight checklist">
                    Check each item you have verified (logo HTTPS, contrast, ESP test plan,
                    and so on).
                  </DocStep>
                  <DocStep title="Upload templates">
                    Under <Ui>Apply brand to templates</Ui>, choose a single <code>.html</code>{' '}
                    file or a <code>.zip</code> of the bundle.
                  </DocStep>
                  <DocStep title="Apply brand">
                    Click <Ui>Apply brand</Ui>. Wait for the success summary and any warnings
                    (for example unmapped <code>data-element</code> hooks).
                  </DocStep>
                  <DocStep title="Download the branded package">
                    Click <Ui>↓ Download … (includes Design Rules)</Ui>. Open a few HTML files
                    in a browser to spot-check colors and CTAs.
                  </DocStep>
                </DocSteps>
                <DocCallout tone="outcome">
                  You receive a zip with branded HTML plus an up-to-date{' '}
                  your Design Rules file inside.
                </DocCallout>
                <DocVideoPlaceholder
                  title="Apply brand colors to a template zip"
                  duration="~2 min"
                />
                <DocCallout tone="tip">
                  After branding, use the <Link to="/docs#content-wizard">Content Wizard</Link>{' '}
                  on the same HTML to swap campaign copy without changing design tokens.
                </DocCallout>
              </>
            ),
          },
          {
            id: 'bw-export',
            title: 'Export Design Rules only',
            children: (
              <>
                <DocSteps>
                  <DocStep title="Export from the toolbar or final step">
                    Click <Ui>Export .md</Ui> in the header, or{' '}
                    <Ui>↓ Export Design Rules</Ui> on Review &amp; export.
                  </DocStep>
                  <DocStep title="Share with your team">
                    Commit the file to your campaign repo or attach it for designers and ESP
                    specialists.
                  </DocStep>
                </DocSteps>
                <p>
                  Exporting markdown does not modify templates. Use <Ui>Apply brand</Ui> when
                  you need branded HTML files.
                </p>
              </>
            ),
          },
          {
            id: 'bw-faq',
            title: 'Troubleshooting & FAQs',
            children: (
              <DocFaqList
                items={[
                  {
                    q: 'My colors didn’t change in the downloaded HTML',
                    a: (
                      <>
                        Confirm you clicked <Ui>Apply brand</Ui> (not only Export .md), uploaded
                        the matching bundle zip, and opened the files from the new download (not
                        the original unzipped pack).
                      </>
                    ),
                  },
                  {
                    q: 'Import says few or zero tokens matched',
                    a: (
                      <>
                        Use a Mailcraft-exported Design Rules file. Heavily edited or
                        incomplete markdown may skip sections. Reset defaults, then re-import,
                        or fill fields manually.
                      </>
                    ),
                  },
                  {
                    q: 'Wizard values disappeared after clearing browser data',
                    a: (
                      <>
                        Local autosave lives in the browser. Re-import your{' '}
                        Design Rules file or restore from a previous branded zip that
                        includes that file.
                      </>
                    ),
                  },
                  {
                    q: 'Outlook buttons look wrong after branding',
                    a: (
                      <>
                        Keep VML fallback blocks intact. Re-test in Outlook after apply, and see{' '}
                        <a href="#troubleshooting">Troubleshooting</a> for bulletproof button
                        notes.
                      </>
                    ),
                  },
                  {
                    q: 'Can I reset everything?',
                    a: (
                      <>
                        Click <Ui>Reset defaults</Ui>, then confirm <Ui>Reset defaults</Ui> in
                        the modal. This replaces checklist progress and token fields for the
                        current bundle with starter values.
                      </>
                    ),
                  },
                ]}
              />
            ),
          },
        ]}
      />
    </section>
  );
}

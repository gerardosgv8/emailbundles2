import { Link } from 'react-router-dom';
import { DocsGuideAccordion } from '../components/DocsGuideAccordion';
import { storefrontContentWizardPath } from '../content-wizard/contentWizardRoute';
import {
  DocCallout,
  DocFaqList,
  DocStep,
  DocSteps,
  DocVideoPlaceholder,
  Ui,
} from './DocPrimitives';

export function ContentWizardGuide() {
  return (
    <section className="doc-section" id="content-wizard">
      <div className="doc-section-head">
        <h2>Content Wizard</h2>
        <p className="doc-section-lead">
          Step two: fill headings, body, CTAs, and images for one layout, then download filled HTML
          for your ESP. Brand work stays intact. You don’t redo it in the markup.
        </p>
        <Link to={storefrontContentWizardPath()} className="btn btn-primary btn-sm">
          Open Content Wizard
        </Link>
      </div>

      <DocVideoPlaceholder
        title="Overview: pick a layout, edit copy, download filled HTML"
        duration="~2 min"
      />

      <DocsGuideAccordion
        sections={[
          {
            id: 'cw-when',
            title: 'When to use the Content Wizard',
            defaultOpen: true,
            children: (
              <>
                <p>
                  Use the Content Wizard when the design is already set and you need campaign
                  copy (product names, event details, hero text) written into a specific layout.
                </p>
                <ul className="feature-list">
                  <li>
                    <strong>Do use it</strong> after branding (or with stock demo styling) to
                    personalize one email.
                  </li>
                  <li>
                    <strong>Do use it</strong> to hide optional blocks you don’t need this send.
                  </li>
                  <li>
                    <strong>Don’t use it</strong> to change palette, logo, or button styles. Use
                    the <Link to="/docs#brand-wizard">Brand Design Wizard</Link> first.
                  </li>
                </ul>
                <DocCallout tone="tip">
                  Recommended order: Brand Wizard → Content Wizard → ESP upload and client tests.
                </DocCallout>
              </>
            ),
          },
          {
            id: 'cw-prereqs',
            title: 'What you’ll need',
            children: (
              <DocCallout tone="prereq">
                <ul className="feature-list" style={{ margin: 0 }}>
                  <li>The same template bundle your layout came from</li>
                  <li>
                    The matching <code>.html</code> file for the layout you will edit (stock or
                    brand-applied)
                  </li>
                  <li>Final copy, image URLs (HTTPS), and CTA destinations</li>
                </ul>
              </DocCallout>
            ),
          },
          {
            id: 'cw-pick',
            title: 'Pick a template',
            children: (
              <>
                <DocSteps>
                  <DocStep title="Open Content Wizard">
                    Go to <Link to={storefrontContentWizardPath()}>Content Wizard</Link>. You land
                    on the Email Marketing Starter Kit template list.
                  </DocStep>
                  <DocStep title="Choose a layout">
                    Pick the email you are editing. Cards show how many mapped elements that layout
                    has.
                  </DocStep>
                </DocSteps>
                <DocCallout tone="outcome">
                  The editor opens with sections such as Header, Hero, Products, and Footer,
                  plus an <Ui>Apply &amp; download</Ui> panel.
                </DocCallout>
              </>
            ),
          },
          {
            id: 'cw-fill',
            title: 'Fill in copy and media',
            children: (
              <>
                <DocSteps>
                  <DocStep title="Edit visible fields">
                    Type into each field. Labels match template regions (for example hero title
                    or product CTA).
                  </DocStep>
                  <DocStep title="Hide blocks you don’t need">
                    Toggle <Ui>Shown in email</Ui> / <Ui>Hidden in email</Ui> on optional
                    sections so unused content is removed from the filled HTML.
                  </DocStep>
                  <DocStep title="Watch progress">
                    The header shows how many fields are filled and how many blocks are hidden.
                  </DocStep>
                </DocSteps>
                <DocCallout tone="tip">
                  Use <Ui>Clear fields</Ui> only when you want a blank slate. Confirm in the
                  modal. This cannot be undone from the wizard.
                </DocCallout>
                <DocVideoPlaceholder
                  title="Edit template copy and hide unused sections"
                  duration="~3 min"
                />
              </>
            ),
          },
          {
            id: 'cw-upload',
            title: 'Upload HTML and download filled template',
            children: (
              <>
                <DocSteps>
                  <DocStep title="Upload the matching HTML">
                    In <Ui>Apply &amp; download</Ui>, drop your template file or click{' '}
                    <Ui>Browse file</Ui>. Use the same layout you selected (for example{' '}
                    <code>01_Product_Launch.html</code>).
                  </DocStep>
                  <DocStep title="Review extracted or merged content">
                    Mailcraft reads existing copy from the file when possible so you can refine
                    instead of retyping everything.
                  </DocStep>
                  <DocStep title="Download filled HTML">
                    Click <Ui>Download filled .html</Ui>. Save the file and open it locally to
                    confirm text and images.
                  </DocStep>
                </DocSteps>
                <DocCallout tone="outcome">
                  You get a single filled <code>.html</code> file. Paste or upload it into your
                  ESP, then replace merge tags as needed.
                </DocCallout>
                <DocCallout tone="warning">
                  If the upload doesn’t match the selected layout, you’ll see an error such as
                  “This file looks like…” Switch templates in the sidebar or upload the correct
                  HTML file.
                </DocCallout>
                <DocVideoPlaceholder
                  title="Upload HTML and download a filled template"
                  duration="~2 min"
                />
              </>
            ),
          },
          {
            id: 'cw-preview',
            title: 'Preview your email',
            children: (
              <>
                <DocSteps>
                  <DocStep title="Watch the live preview">
                    After a successful upload, the right pane widens and shows a live preview of
                    the merged HTML. It updates as you edit fields.
                  </DocStep>
                  <DocStep title="Expand if needed">
                    Use <Ui>Expand</Ui> for a larger modal view, then scroll through the full
                    message.
                  </DocStep>
                </DocSteps>
                <DocCallout tone="tip">
                  Live preview reflects Content Wizard edits. Brand colors only appear if you
                  already applied the Brand Wizard (or edited styles manually) on the uploaded
                  file.
                </DocCallout>
              </>
            ),
          },
          {
            id: 'cw-vs-brand',
            title: 'Brand Wizard vs Content Wizard',
            children: (
              <>
                <div className="card doc-compare-card">
                  <table className="doc-compare-table">
                    <thead>
                      <tr>
                        <th>Goal</th>
                        <th>Use</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Logo, palette, buttons, footer identity</td>
                        <td>
                          <Link to="/docs#brand-wizard">Brand Design Wizard</Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Headlines, body, product copy, image URLs</td>
                        <td>Content Wizard</td>
                      </tr>
                      <tr>
                        <td>Shareable design token file for the team</td>
                        <td>
                          Brand Wizard → <Ui>Export Design Rules</Ui>
                        </td>
                      </tr>
                      <tr>
                        <td>One campaign’s filled email HTML</td>
                        <td>
                          Content Wizard → <Ui>Download filled .html</Ui>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            ),
          },
          {
            id: 'cw-faq',
            title: 'Troubleshooting & FAQs',
            children: (
              <DocFaqList
                items={[
                  {
                    q: 'Download is disabled or asks me to upload first',
                    a: (
                      <>
                        Upload the template <code>.html</code> for the layout you’re editing
                        before clicking <Ui>Download filled .html</Ui>. The wizard merges your
                        fields into that source file.
                      </>
                    ),
                  },
                  {
                    q: '“This file looks like…” error on upload',
                    a: (
                      <>
                        The HTML hooks don’t match the selected template. Switch to the suggested
                        layout in the sidebar, or upload the file named for the current template.
                      </>
                    ),
                  },
                  {
                    q: 'My brand colors aren’t in the preview',
                    a: (
                      <>
                        Content Wizard does not restyle the email. Apply brand tokens with the{' '}
                        <Link to="/docs#brand-wizard">Brand Wizard</Link> first, then upload that
                        branded HTML here.
                      </>
                    ),
                  },
                  {
                    q: 'A section still appears though I hid it',
                    a: (
                      <>
                        Confirm the field shows <Ui>Hidden in email</Ui>, re-download, and open
                        the new file. Some structural spacers may remain; if a whole block still
                        shows, report the template name and field label.
                      </>
                    ),
                  },
                  {
                    q: 'Can I edit multiple templates at once?',
                    a: (
                      <>
                        Not in one pass. Finish and download one layout, then choose the next
                        template from <Ui>← All templates</Ui>.
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

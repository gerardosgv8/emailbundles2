<?php
declare(strict_types=1);
$pageTitle = 'Documentation | Mailcraft Studio';
require __DIR__ . '/includes/config.php';
require __DIR__ . '/includes/header.php';
?>

<main class="container">
  <div class="page-hero">
    <h1>Documentation</h1>
    <p>Complete guide to implementing, customizing, and troubleshooting your email templates.</p>
  </div>

  <div class="docs-layout">
    <aside class="docs-nav">
      <strong style="display:block;margin-bottom:0.75rem;font-size:0.8rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.05em">On this page</strong>
      <a href="#getting-started">Getting started</a>
      <a href="#structure">Template structure</a>
      <a href="#customization">Customization</a>
      <a href="#esp">ESP integration</a>
      <a href="#troubleshooting">Troubleshooting</a>
      <a href="#brand-wizard">Brand wizard</a>
    </aside>

    <div>
      <section class="doc-section" id="getting-started">
        <h2>Getting started</h2>
        <div class="card">
          <?php
          $steps = [
            [1, 'Download and extract', 'Download the template bundle and extract all files to your local machine.'],
            [2, 'Choose your template', 'Browse the gallery and select the template that best fits your campaign.'],
            [3, 'Customize content', 'Edit text, images, and colors to match your brand guidelines.'],
            [4, 'Upload to ESP', 'Copy the HTML code and paste it into your email service provider.'],
          ];
          foreach ($steps as [$n, $title, $desc]): ?>
          <div class="step-row">
            <span class="step-num"><?= $n ?></span>
            <div>
              <strong><?= e($title) ?></strong>
              <p style="margin:0.25rem 0 0;font-size:0.9rem;color:var(--muted)"><?= e($desc) ?></p>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
        <div class="tip-box">
          <strong>Pro tip</strong>
          <p style="margin:0.35rem 0 0;font-size:0.9rem;color:#1e40af">Always test templates in multiple email clients before sending. Use Litmus or Email on Acid for comprehensive QA.</p>
        </div>
      </section>

      <section class="doc-section" id="structure">
        <h2>Template structure</h2>
        <div class="card">
          <p>Each template uses a <strong>600px table-based layout</strong> with modular sections marked by HTML comments (e.g. <code>Component start Header</code>). Editable regions use <code>data-element</code> attributes for the visual builder.</p>
          <ul class="feature-list" style="margin-top:1rem">
            <li>Header with logo and kicker</li>
            <li>Hero image or product block</li>
            <li>Content sections (features, CTAs, grids)</li>
            <li>Footer with address, legal links, and CAN-SPAM compliance</li>
          </ul>
        </div>
      </section>

      <section class="doc-section" id="customization">
        <h2>Customization</h2>
        <div class="card">
          <p>Colors and fonts are applied via inline styles. Search for hex values or swap brand tokens from your <code>DESIGN_RULES.md</code> file.</p>
          <p style="margin-top:1rem">Use the <a href="<?= e(url('brand-wizard/')) ?>">Brand Design Wizard</a> to define primary colors, logo URL, footer info, and button styles, then export a markdown spec for your team.</p>
        </div>
      </section>

      <section class="doc-section" id="esp">
        <h2>ESP integration</h2>
        <div class="card">
          <p>Paste full HTML into your ESP template editor. For Salesforce, Klaviyo, and Mailchimp:</p>
          <ul class="feature-list">
            <li>Upload images to your ESP CDN and update image URLs</li>
            <li>Replace merge tags (e.g. unsubscribe links) with ESP-specific syntax</li>
            <li>Send a test to Gmail, Outlook, and Apple Mail before launch</li>
          </ul>
        </div>
      </section>

      <section class="doc-section" id="troubleshooting">
        <h2>Troubleshooting</h2>
        <div class="card">
          <dl class="faq-list" style="margin:0">
            <div class="faq-item">
              <dt>Images not showing</dt>
              <dd>Use absolute HTTPS URLs. Relative paths break in most ESPs.</dd>
            </div>
            <div class="faq-item">
              <dt>Extra spacing in Outlook</dt>
              <dd>Avoid margins on table rows; use padding on <code>&lt;td&gt;</code> cells instead.</dd>
            </div>
            <div class="faq-item">
              <dt>Buttons look wrong in Outlook</dt>
              <dd>Ensure VML fallback blocks are present for bulletproof buttons.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section class="doc-section" id="brand-wizard">
        <h2>Brand Design Wizard</h2>
        <div class="card card-muted">
          <p>Define your baseline brand identity with color pickers, logo settings, footer details, and typography, then export <code>DESIGN_RULES.md</code>.</p>
          <a href="<?= e(url('brand-wizard/')) ?>" class="btn btn-primary" style="margin-top:1rem">Open Brand Wizard</a>
        </div>
      </section>
    </div>
  </div>
</main>

<?php require __DIR__ . '/includes/footer.php'; ?>

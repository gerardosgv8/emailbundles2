<?php
declare(strict_types=1);
$pageTitle = 'Mailcraft Studio | Craft Beautiful Email Templates';
require __DIR__ . '/includes/config.php';
require __DIR__ . '/includes/header.php';
?>

<main>
  <section class="hero-split">
    <div class="hero-copy">
      <div class="hero-copy-inner">
        <h1>Craft Beautiful Email Templates in Minutes</h1>
        <p>Professional email templates that work everywhere. No coding required. Build, customize, and export stunning emails that convert.</p>
        <div class="hero-actions">
          <a href="<?= e(url('products.php')) ?>" class="btn btn-primary btn-lg">Browse template bundles</a>
        </div>
      </div>
    </div>
    <div class="hero-visual">
      <div class="email-mockup">
        <div class="email-mockup-bar"></div>
        <div class="email-mockup-body">
          <div class="email-mockup-logo">MS</div>
          <h3>Your next campaign</h3>
          <p>ESP-ready HTML that renders consistently across clients.</p>
          <a href="<?= e(url('products.php')) ?>" class="email-mockup-cta">Start Now</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-white">
    <div class="container grid-2">
      <div>
        <h2 class="section-title">Stop wasting hours designing emails from scratch</h2>
        <p>Outlook breaks designs, inconsistent branding dilutes trust, and slow QA cycles stall campaigns. Our bundle solves those problems with pre-tested templates tailored for eCommerce and B2B use cases.</p>
        <ul class="feature-list">
          <li>Pre-tested across major clients (Outlook, Gmail, Apple Mail)</li>
          <li>Modular sections for flexible layouts</li>
          <li>Inline CSS &amp; table-based structure for ESP compatibility</li>
        </ul>
      </div>
      <div class="card card-muted">
        <h4>Templates included</h4>
        <ul class="feature-list">
          <li>Welcome series • Abandoned cart • Product launch</li>
          <li>Sale / Promotion • Order confirmation • Shipping update</li>
          <li>Re-engagement • Feedback request • Holiday campaigns</li>
        </ul>
        <a href="#templates" class="btn btn-primary" style="margin-top:1.25rem">View gallery</a>
      </div>
    </div>
  </section>

  <section class="section section-muted">
    <div class="container grid-2">
      <div class="order-2">
        <p class="showcase-badge">See it in action</p>
        <h2 class="section-title">The experience of building a template, end to end</h2>
        <p>Watch teams go from a blank canvas to a polished, client-ready email. Structure, styling, and checks all happen in one builder.</p>
        <ul class="feature-list">
          <li>Interior design company email · <a href="<?= e(url('docs.php')) ?>">Watch tutorial</a></li>
          <li>Ecommerce store email · <a href="<?= e(url('docs.php')) ?>">Watch tutorial</a></li>
          <li>Product launch email · <a href="<?= e(url('docs.php')) ?>">Watch tutorial</a></li>
        </ul>
      </div>
      <div class="video-frame">Template builder preview</div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="section-title">Key benefits</h2>
      <div class="grid-4 mt-8" style="margin-top:1.5rem">
        <?php
        $features = [
          ['Save time', 'Launch campaigns in minutes instead of days. Skip the long design and QA cycles.'],
          ['Look professional', 'Modern, conversion-focused designs that elevate your brand.'],
          ['Easy implementation', 'Clean code, commented, and ESP-ready for Salesforce, Klaviyo, Mailchimp.'],
          ['Fully responsive', 'Mobile-first layouts tested across devices and clients.'],
        ];
        foreach ($features as [$title, $desc]): ?>
        <div class="card">
          <h4><?= e($title) ?></h4>
          <p><?= e($desc) ?></p>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <section class="section" id="templates">
    <div class="container">
      <h2 class="section-title">View Tutorials</h2>
      <p class="section-lead">All templates come as editable HTML files with modular sections.</p>
      <div class="grid-3">
        <?php
        $tutorials = [
          'Interior design company email',
          'Ecommerce store email',
          'Product launch email',
        ];
        foreach ($tutorials as $name): ?>
        <article class="card template-card">
          <div class="template-thumb"><?= e($name) ?></div>
          <div class="card-body">
            <h5><?= e($name) ?></h5>
            <p>Watch tutorial</p>
          </div>
        </article>
        <?php endforeach; ?>
      </div>
      <p class="text-center mt-8">
        <a href="<?= e(url('products.php')) ?>" class="btn btn-primary btn-lg">Browse products</a>
      </p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="section-title">Technical highlights</h2>
      <div class="grid-3" style="margin-top:1.5rem">
        <?php
        $highlights = [
          ['Bulletproof buttons', 'VML buttons for Outlook and standard anchors for other clients so CTAs look consistent everywhere.'],
          ['Table-based layout', 'Hybrid table layout &amp; inline CSS to maximize compatibility across ESPs and clients.'],
          ['ESP compatibility', 'Copy-paste ready for Salesforce Marketing Cloud, Klaviyo, Mailchimp, HubSpot, and more.'],
        ];
        foreach ($highlights as [$title, $desc]): ?>
        <div class="card">
          <h5><?= e($title) ?></h5>
          <p><?= e($desc) ?></p>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <section class="section section-white" id="docs-preview">
    <div class="container">
      <h2 class="section-title">Documentation &amp; Support</h2>
      <p class="section-lead">Step-by-step guides to import, edit, and send templates. Includes screenshots and troubleshooting tips.</p>
      <div class="grid-3">
        <?php
        $docs = [
          ['Getting started', 'Open the template, edit copy &amp; images, and upload to your ESP.'],
          ['Customization', 'Change colors, fonts, and sections. All styles are inlined and commented.'],
          ['Troubleshooting', 'Common fixes for images, spacing, and Outlook rendering quirks.'],
        ];
        foreach ($docs as [$title, $desc]): ?>
        <div class="card card-muted">
          <h5><?= e($title) ?></h5>
          <p><?= e($desc) ?></p>
        </div>
        <?php endforeach; ?>
      </div>
      <p class="text-center mt-8">
        <a href="<?= e(url('docs.php')) ?>" class="btn btn-secondary">Full documentation</a>
        <a href="<?= e(url('brand-wizard/')) ?>" class="btn btn-primary" style="margin-left:0.5rem">Brand Design Wizard</a>
      </p>
    </div>
  </section>

  <section class="section" id="testimonials">
    <div class="container">
      <h2 class="section-title">What customers say</h2>
      <div class="grid-3" style="margin-top:1.5rem">
        <?php
        $testimonials = [
          ['The templates imported flawlessly into Salesforce. Our CTR went up 18%.', 'Marcos, eCommerce Manager'],
          ['No more Outlook nightmares. The VML buttons are rock-solid.', 'Priya, Marketing Lead'],
          ['Fast to implement and look polished. Perfect for our small team.', 'Jorge, Founder'],
        ];
        foreach ($testimonials as [$quote, $author]): ?>
        <blockquote class="card">
          <p>&ldquo;<?= e($quote) ?>&rdquo;</p>
          <footer style="margin-top:0.75rem;font-size:0.85rem;color:var(--muted)"><?= e($author) ?></footer>
        </blockquote>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <section class="section section-white" id="faq">
    <div class="container faq-list">
      <h2 class="section-title">Frequently asked questions</h2>
      <dl style="margin-top:1.5rem">
        <?php
        $faqs = [
          ['Are these templates compatible with my platform?', 'Yes. They are compatible with Salesforce, Klaviyo, Mailchimp, HubSpot, and can be used in any ESP that accepts HTML templates.'],
          ['Can I customize colors and fonts?', 'Yes. Colors and fonts are commented in the code. We include a quick-start guide and Brand Design Wizard to edit safely.'],
          ['Will these work on mobile?', 'Yes. Templates are responsive and mobile-first. We test across common devices and email clients.'],
          ['Do I need to know HTML?', 'Basic familiarity helps, but the templates are easy to edit. We provide clear docs and examples; any marketer can update text and images.'],
        ];
        foreach ($faqs as [$q, $a]): ?>
        <div class="faq-item">
          <dt><?= e($q) ?></dt>
          <dd><?= e($a) ?></dd>
        </div>
        <?php endforeach; ?>
      </dl>
    </div>
  </section>

  <section class="section" id="checkout">
    <div class="container">
      <div class="card cta-card">
        <h3 class="section-title" style="font-size:1.25rem">Create your account</h3>
        <p style="margin:0;color:var(--muted);font-size:0.9rem">No payment required • Lifetime Pro features</p>
        <form class="form-grid" action="<?= e(url('register.php')) ?>" method="get">
          <div class="form-grid form-grid-2">
            <input type="text" name="name" placeholder="Full name" aria-label="Full name" />
            <input type="email" name="email" placeholder="Email" aria-label="Email" />
          </div>
          <p style="margin:0;font-size:0.875rem;color:var(--muted)">Payment integration coming soon. Registration grants Pro automatically in development.</p>
          <label class="checkbox-row">
            <input type="checkbox" required />
            <span>I agree to the <a href="#">terms</a> and <a href="#">privacy policy</a>.</span>
          </label>
          <button type="submit" class="btn btn-primary btn-lg">Register</button>
        </form>
      </div>
    </div>
  </section>
</main>

<?php require __DIR__ . '/includes/footer.php'; ?>

<?php
declare(strict_types=1);
$pageTitle = 'Products | Mailcraft Studio';
require __DIR__ . '/includes/config.php';
require __DIR__ . '/includes/header.php';

$products = [
  [
    'name' => 'eCommerce Email Bundle',
    'price' => '$79',
    'description' => 'Complete set of conversion-focused templates for online stores.',
    'features' => ['Checkout & order emails', 'Promotional campaigns', 'Product recommendations', 'Lifetime updates'],
  ],
  [
    'name' => 'Industrial B2B Bundle',
    'price' => '$89',
    'description' => 'Nine templates for product launches, events, company updates, and more.',
    'features' => ['Product & service launches', 'Event invitations', 'Catalog grids', 'Brand Design Wizard compatible'],
  ],
  [
    'name' => 'Free Flow Starter',
    'price' => 'Free',
    'description' => 'Essential templates to get started with professional email design.',
    'features' => ['Welcome & onboarding', 'Newsletter editorial', 'Feature announcements', 'Community support'],
  ],
  [
    'name' => 'Mailcraft Pro',
    'price' => '$19/mo',
    'description' => 'Visual builder, saved templates, and component library access.',
    'features' => ['Drag-and-drop editor', 'All template bundles', 'Export HTML', 'Priority support'],
  ],
];
?>

<main class="container section">
  <div class="page-hero">
    <h1>Products</h1>
    <p>Template bundles and tools for teams who ship email campaigns without reinventing the wheel.</p>
  </div>

  <div class="product-grid">
    <?php foreach ($products as $product): ?>
    <article class="card product-card">
      <h3 style="margin:0 0 0.5rem"><?= e($product['name']) ?></h3>
      <p><?= e($product['description']) ?></p>
      <p class="product-price"><?= e($product['price']) ?></p>
      <ul class="product-features">
        <?php foreach ($product['features'] as $feature): ?>
        <li><?= e($feature) ?></li>
        <?php endforeach; ?>
      </ul>
      <a href="<?= e(url('register.php')) ?>" class="btn btn-primary">Get started</a>
    </article>
    <?php endforeach; ?>
  </div>

  <p class="text-center mt-8" style="color:var(--muted);font-size:0.9rem">
    Checkout and dynamic pricing will connect to the PHP backend when ready.
  </p>
</main>

<?php require __DIR__ . '/includes/footer.php'; ?>

<?php
declare(strict_types=1);
require_once __DIR__ . '/config.php';
$pageTitle = $pageTitle ?? SITE_NAME;
$bodyClass = $bodyClass ?? '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="<?= e(SITE_TAGLINE) ?>" />
  <title><?= e($pageTitle) ?></title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="<?= e(url('assets/css/site.css')) ?>" />
</head>
<body class="<?= e($bodyClass) ?>">
  <header class="site-header" id="site-header">
    <div class="container header-inner">
      <a href="<?= e(url('index.php')) ?>" class="logo">
        <span class="logo-mark">MS</span>
        <span class="logo-text"><?= e(SITE_NAME) ?></span>
      </a>
      <nav class="nav-desktop" aria-label="Main">
        <a href="<?= e(url('docs.php')) ?>"<?= is_active('docs.php') ? ' class="active"' : '' ?>>Docs</a>
        <a href="<?= e(url('products.php')) ?>"<?= is_active('products.php') ? ' class="active"' : '' ?>>Products</a>
        <a href="<?= e(url('brand-wizard/')) ?>">Brand Wizard</a>
        <a href="<?= e(url('index.php')) ?>#testimonials">Testimonials</a>
        <a href="<?= e(url('index.php')) ?>#faq">FAQ</a>
        <a href="<?= e(url('login.php')) ?>" class="btn btn-ghost btn-sm">Login</a>
        <a href="<?= e(url('register.php')) ?>" class="btn btn-primary btn-sm">Register</a>
      </nav>
      <button type="button" class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
  <div class="nav-overlay" id="nav-overlay" hidden></div>
  <aside class="nav-drawer" id="nav-drawer" aria-hidden="true">
    <div class="nav-drawer-head">
      <strong>Menu</strong>
      <button type="button" id="nav-close" aria-label="Close menu">&times;</button>
    </div>
    <nav class="nav-drawer-links">
      <a href="<?= e(url('docs.php')) ?>">Docs</a>
      <a href="<?= e(url('products.php')) ?>">Products</a>
      <a href="<?= e(url('brand-wizard/')) ?>">Brand Wizard</a>
      <a href="<?= e(url('index.php')) ?>#testimonials">Testimonials</a>
      <a href="<?= e(url('index.php')) ?>#faq">FAQ</a>
      <a href="<?= e(url('login.php')) ?>" class="btn btn-ghost">Login</a>
      <a href="<?= e(url('register.php')) ?>" class="btn btn-primary">Register</a>
    </nav>
  </aside>

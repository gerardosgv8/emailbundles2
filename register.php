<?php
declare(strict_types=1);
$pageTitle = 'Register — Mailcraft Studio';
require __DIR__ . '/includes/config.php';
require __DIR__ . '/includes/header.php';
?>

<main class="auth-page">
  <div class="card auth-card">
    <h1 style="font-size:1.5rem;margin:0 0 0.5rem">Create account</h1>
    <p style="margin:0 0 1.5rem;color:var(--muted);font-size:0.9rem">Registration backend coming soon.</p>
    <form class="form-grid" method="post" action="#">
      <input type="text" name="name" placeholder="Full name" required aria-label="Full name" value="<?= e($_GET['name'] ?? '') ?>" />
      <input type="email" name="email" placeholder="Email" required aria-label="Email" value="<?= e($_GET['email'] ?? '') ?>" />
      <input type="password" name="password" placeholder="Password" required aria-label="Password" minlength="8" />
      <button type="submit" class="btn btn-primary" disabled title="Connect PHP auth backend to enable">Register (soon)</button>
    </form>
    <p style="margin:1.25rem 0 0;font-size:0.875rem;text-align:center">
      Already have an account? <a href="<?= e(url('login.php')) ?>">Login</a>
    </p>
  </div>
</main>

<?php require __DIR__ . '/includes/footer.php'; ?>

<?php
declare(strict_types=1);
$pageTitle = 'Login — Mailcraft Studio';
require __DIR__ . '/includes/config.php';
require __DIR__ . '/includes/header.php';
?>

<main class="auth-page">
  <div class="card auth-card">
    <h1 style="font-size:1.5rem;margin:0 0 0.5rem">Welcome back</h1>
    <p style="margin:0 0 1.5rem;color:var(--muted);font-size:0.9rem">Login backend coming soon.</p>
    <form class="form-grid" method="post" action="#">
      <input type="email" name="email" placeholder="Email" required aria-label="Email" />
      <input type="password" name="password" placeholder="Password" required aria-label="Password" />
      <button type="submit" class="btn btn-primary" disabled title="Connect PHP auth backend to enable">Login (soon)</button>
    </form>
    <p style="margin:1.25rem 0 0;font-size:0.875rem;text-align:center">
      New here? <a href="<?= e(url('register.php')) ?>">Create an account</a>
    </p>
  </div>
</main>

<?php require __DIR__ . '/includes/footer.php'; ?>

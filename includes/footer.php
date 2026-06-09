<?php
declare(strict_types=1);
$year = (int) date('Y');
?>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <h5><?= e(SITE_NAME) ?></h5>
        <p><?= e(SITE_TAGLINE) ?>.</p>
      </div>
      <div>
        <h6>Resources</h6>
        <ul>
          <li><a href="<?= e(url('docs.php')) ?>">Documentation</a></li>
          <li><a href="<?= e(url('brand-wizard/')) ?>">Brand Design Wizard</a></li>
          <li><a href="<?= e(url('index.php')) ?>#faq">FAQ</a></li>
          <li><a href="<?= e(url('index.php')) ?>#testimonials">Testimonials</a></li>
        </ul>
      </div>
      <div>
        <h6>Legal</h6>
        <ul>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Refund Policy</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        &copy; <?= $year ?> <?= e(SITE_NAME) ?>. All rights reserved.
      </div>
    </div>
  </footer>
  <script src="<?= e(url('assets/js/site.js')) ?>"></script>
</body>
</html>

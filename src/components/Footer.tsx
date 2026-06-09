import { Link } from 'react-router-dom';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h5>Mailcraft Studio</h5>
          <p>Production-ready HTML email templates and brand design tools.</p>
        </div>
        <div>
          <h6>Resources</h6>
          <ul>
            <li><Link to="/docs">Documentation</Link></li>
            <li><Link to="/brand-wizard">Brand Design Wizard</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/testimonials">Testimonials</Link></li>
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
      <div className="footer-bottom">
        <div className="container">
          &copy; {year} Mailcraft Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

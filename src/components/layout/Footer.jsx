import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Learn</h4>
          <ul>
            <li><Link to="/topics/html">HTML Tutorial</Link></li>
            <li><Link to="/topics/css">CSS Tutorial</Link></li>
            <li><Link to="/topics/js">JavaScript Tutorial</Link></li>
            <li><Link to="/topics/python">Python Tutorial</Link></li>
            <li><Link to="/topics/react">React Tutorial</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Code Examples</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Reference Guides</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Exercises</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Quizzes</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Community</h4>
          <ul>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Forum</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Discord</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>GitHub</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Blog</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Help Center</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Contact Us</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Report Bug</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Feature Request</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-info">
          <p>&copy; {currentYear} Interactive Learning Platform. All rights reserved.</p>
          <div className="footer-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Cookie Policy</a>
          </div>
        </div>
        <div className="social-links">
          <a href="#" onClick={(e) => e.preventDefault()} aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} aria-label="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} aria-label="YouTube">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
import React, { useState } from 'react';
import { Shield, Eye, Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setSubscribed(true);
    setEmail('');
    setError('');
  };

  return (
    <footer className="footer-container">
      <div className="container footer-grid">
        
        {/* Brand details */}
        <div className="footer-brand-col">
          <div className="logo footer-logo">
            <div className="logo-icon-wrapper">
              <Shield className="logo-shield" />
              <Eye className="logo-eye" />
            </div>
            <span className="logo-text">NETHRA <span className="highlight">SOLUTIONS</span></span>
          </div>
          <p className="footer-brand-desc">
            Next-generation AI CCTV surveillance and access control solutions tailored for modern businesses and residences. Fully customized, professionally installed, and locally supported.
          </p>
          <div className="footer-badges-list">
            <span className="partner-badge">HIKVISION PARTNER</span>
            <span className="partner-badge">DAHUA INTEGRATOR</span>
          </div>
        </div>

        {/* Links Quick maps */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Navigation</h4>
          <ul className="footer-links-list">
            <li><a href="#hero">Home Feed</a></li>
            <li><a href="#brands">Partner Brands</a></li>
            <li><a href="#features">Smart Features</a></li>
            <li><a href="#products">Security Cameras</a></li>
            <li><a href="#simulator">Live Stream Demo</a></li>
            <li><a href="#quote">System Estimator</a></li>
          </ul>
        </div>

        {/* Contact details */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Contact Us</h4>
          <ul className="footer-contact-list">
            <li>
              <MapPin size={16} className="contact-icon" />
              <span>Contact Person: Pavan Kolli</span>
            </li>
            <li>
              <Phone size={16} className="contact-icon" />
              <span>+91 9505048122 / +91 8019998164</span>
            </li>
            <li>
              <Mail size={16} className="contact-icon" />
              <span>pavankumarkolli99@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="footer-newsletter-col">
          <h4 className="footer-col-title">Security Newsletter</h4>
          <p className="newsletter-desc">Subscribe to receive smart security updates, cyber threat alerts, and system firmware recommendations.</p>
          
          {subscribed ? (
            <div className="newsletter-success">
              <CheckCircle size={16} />
              <span>Subscription completed!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`newsletter-input ${error ? 'error' : ''}`}
                aria-label="Email address"
              />
              <button type="submit" className="newsletter-submit" aria-label="Subscribe">
                <Send size={14} />
              </button>
            </form>
          )}
          {error && <span className="newsletter-error">{error}</span>}
        </div>

      </div>

      {/* Bottom copyrights */}
      <div className="footer-bottom">
        <div className="container footer-bottom-flex">
          <p className="copyright">&copy; {new Date().getFullYear()} Nethra Solutions. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#">Terms & Conditions</a>
            <span>&bull;</span>
            <a href="#">Licensing Credentials</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

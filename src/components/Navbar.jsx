import React, { useState, useEffect } from 'react';
import { Shield, Eye, Menu, X, Phone } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <a href="#hero" className="logo" onClick={closeMenu}>
          <div className="logo-icon-wrapper">
            <Shield className="logo-shield" />
            <Eye className="logo-eye" />
          </div>
          <span className="logo-text">
            NETHRA <span className="highlight">SOLUTIONS</span>
          </span>
        </a>

        {/* Desktop Navbar */}
        <nav className="desktop-nav">
          <a href="#brands" className="nav-link">Brands</a>
          <a href="#clients" className="nav-link">Recent Works</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#products" className="nav-link">Products</a>
          <a href="#simulator" className="nav-link">Live Demo</a>
          <a href="#mobile-app" className="nav-link">Mobile Live</a>
          <a href="#quote" className="nav-link">Get Estimate</a>
        </nav>

        <div className="header-actions">
          <a href="#quote" className="btn btn-primary btn-sm btn-nav">
            <Phone size={14} /> Request Quote
          </a>
          <button 
            className="mobile-toggle" 
            onClick={toggleMenu} 
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navbar Drawer */}
      <div className={`mobile-nav-overlay ${isOpen ? 'active' : ''}`} onClick={closeMenu}>
        <nav className="mobile-nav" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-nav-header">
            <a href="#hero" className="logo" onClick={closeMenu}>
              <div className="logo-icon-wrapper">
                <Shield className="logo-shield" />
                <Eye className="logo-eye" />
              </div>
              <span className="logo-text">NETHRA <span className="highlight">SOLUTIONS</span></span>
            </a>
            <button className="close-btn" onClick={closeMenu} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <div className="mobile-nav-links">
            <a href="#brands" className="mobile-nav-link" onClick={closeMenu}>Brands</a>
            <a href="#clients" className="mobile-nav-link" onClick={closeMenu}>Recent Works</a>
            <a href="#features" className="mobile-nav-link" onClick={closeMenu}>Features</a>
            <a href="#products" className="mobile-nav-link" onClick={closeMenu}>Products</a>
            <a href="#simulator" className="mobile-nav-link" onClick={closeMenu}>Live Demo</a>
            <a href="#mobile-app" className="mobile-nav-link" onClick={closeMenu}>Mobile Live</a>
            <a href="#quote" className="mobile-nav-link" onClick={closeMenu}>Get Estimate</a>
          </div>
          <div className="mobile-nav-footer">
            <a href="#quote" className="btn btn-primary btn-full" onClick={closeMenu}>
              <Phone size={16} /> Request Free Quote
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

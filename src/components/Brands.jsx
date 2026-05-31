import React from 'react';
import { Cpu, ShieldAlert, Award, ShieldCheck, Zap } from 'lucide-react';
import './Brands.css';

const BRANDS = [
  { name: 'HIKVISION', tagline: 'CCTV Market Leader', icon: ShieldCheck, color: '#ff6600' },
  { name: 'DAHUA', tagline: 'AI Smart Surveillance', icon: Cpu, color: '#e60012' },
  { name: 'AXIS', tagline: 'Premium Network Video', icon: Zap, color: '#ffcc00' },
  { name: 'BOSCH', tagline: 'German Precision Security', icon: Award, color: '#005691' },
  { name: 'HONEYWELL', tagline: 'Enterprise Solutions', icon: ShieldCheck, color: '#e01e26' },
  { name: 'REOLINK', tagline: 'Smart Home CCTV', icon: Zap, color: '#00a0e9' },
  { name: 'LOREX', tagline: 'Residential Ultra HD', icon: ShieldAlert, color: '#f7931e' },
  { name: 'UNIVIEW', tagline: 'IP Video Pioneer', icon: Cpu, color: '#00d2ff' },
  { name: 'CP PLUS', tagline: 'Advanced Security IoT', icon: Award, color: '#e31b23' },
];

export default function Brands() {
  // Double the brands list for seamless looping marquee
  const marqueeBrands = [...BRANDS, ...BRANDS];

  return (
    <section id="brands" className="brands-section section-light">
      <div className="container">
        <div className="section-header">
          <div className="badge">Brand Integration</div>
          <h2>Authorized Partner & Installer</h2>
          <p>We supply, configure, and install professional hardware from the world's leading CCTV manufacturers. 100% genuine equipment with official warranties.</p>
        </div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="marquee-container">
        <div className="marquee-track">
          {marqueeBrands.map((brand, index) => {
            const Icon = brand.icon;
            return (
              <div 
                key={`${brand.name}-${index}`} 
                className="brand-card glass-card"
                style={{ '--brand-accent': brand.color }}
              >
                <div className="brand-logo-wrapper">
                  <Icon className="brand-icon" size={20} />
                  <span className="brand-name">{brand.name}</span>
                </div>
                <div className="brand-tagline">{brand.tagline}</div>
                <div className="brand-badge">SUPPORTED</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container brand-trust-summary">
        <div className="trust-grid">
          <div className="trust-item">
            <h3>100%</h3>
            <p>Official Brand Warranty</p>
          </div>
          <div className="trust-border"></div>
          <div className="trust-item">
            <h3>NDAA</h3>
            <p>Compliant Configurations</p>
          </div>
          <div className="trust-border"></div>
          <div className="trust-item">
            <h3>AI+</h3>
            <p>Firmware Compatibility</p>
          </div>
        </div>
      </div>
    </section>
  );
}

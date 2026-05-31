import React, { useState } from 'react';
import { Shield, Eye, ShieldCheck, Plus, Check, Server, EyeOff } from 'lucide-react';
import './Products.css';

const PRODUCT_DATA = [
  {
    id: 'dome-ultra-8mp',
    name: 'NS-UltraDome 8MP AI',
    category: 'dome',
    brand: 'HIKVISION',
    desc: '4K Ultra-HD vandal-resistant dome camera with high-fidelity onboard neural networks for instant humans & vehicles detection.',
    specs: {
      resolution: '4K (3840x2160)',
      nightVision: '30m EXIR Night Vision',
      environment: 'Indoor / Outdoor (IP67)',
      analytics: 'AI Smart Intrusion Detection'
    },
    priceTag: 'Premium Grade'
  },
  {
    id: 'bullet-4k-pro',
    name: 'NS-Bullet 4K Pro',
    category: 'bullet',
    brand: 'BOSCH',
    desc: 'Ultra rugged outdoor bullet camera built for perimeter protection, long-range night surveillance, and license plate capture.',
    specs: {
      resolution: '4K (8 Megapixel)',
      nightVision: '60m Long Range IR',
      environment: 'Outdoor Rated (IP67 / IK10)',
      analytics: 'Line Crossing & Perimeter Guard'
    },
    priceTag: 'Enterprise Elite'
  },
  {
    id: 'ptz-cruiser-smart',
    name: 'NS-PTZ Cruiser Smart',
    category: 'ptz',
    brand: 'DAHUA',
    desc: 'Motorized Pan-Tilt-Zoom speed dome camera with 360-degree rotation, auto-tracking loops, and powerful optical zoom.',
    specs: {
      resolution: '5MP HD Quality',
      nightVision: '50m Smart IR Adjust',
      environment: 'Outdoor Weatherproof',
      analytics: 'Active Auto-Target Tracking'
    },
    priceTag: 'Professional Standard'
  },
  {
    id: 'nvr-core-pro',
    name: 'NS-NVR Core Pro (16-Ch)',
    category: 'storage',
    brand: 'AXIS',
    desc: 'High-bandwidth network video recorder with 16 POE channel inputs, 4TB security grade storage pre-installed, and cloud sync.',
    specs: {
      resolution: 'Up to 12MP Channels',
      nightVision: 'No camera - local core NVR',
      environment: 'Rack Mountable / Indoor',
      analytics: 'Simultaneous 16-Ch Playback'
    },
    priceTag: 'Core System'
  },
  {
    id: 'turret-color-smart',
    name: 'NS-Turret FullColor',
    category: 'dome',
    brand: 'UNIVIEW',
    desc: 'Premium turret camera designed with warm light LEDs to capture full-color high-definition footage in pitch black darkness.',
    specs: {
      resolution: '4MP Quad-HD',
      nightVision: '30m Full Color 24/7',
      environment: 'Indoor / Outdoor (IP66)',
      analytics: 'Smart False Alarm Filtering'
    },
    priceTag: 'Advanced Color'
  },
  {
    id: 'bullet-wifi-active',
    name: 'NS-Bullet Wifi Active',
    category: 'bullet',
    brand: 'REOLINK',
    desc: 'Dual-band WiFi smart security bullet camera. Installs quickly without running network feeds, and uploads directly to storage.',
    specs: {
      resolution: '5MP HD Quality',
      nightVision: '30m Smart IR',
      environment: 'Outdoor IP66 Waterproof',
      analytics: 'Person & Vehicle Alert Loops'
    },
    priceTag: 'Standalone Smart'
  }
];

const CATEGORIES = [
  { id: 'all', name: 'All Products' },
  { id: 'dome', name: 'Dome Cameras' },
  { id: 'bullet', name: 'Bullet Cameras' },
  { id: 'ptz', name: 'PTZ Speed Domes' },
  { id: 'storage', name: 'NVR Storage Cores' }
];

export default function Products({ selectedItems = [], onToggleItem }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProducts = activeFilter === 'all' 
    ? PRODUCT_DATA 
    : PRODUCT_DATA.filter(p => p.category === activeFilter);

  return (
    <section id="products" className="products-section section-light">
      <div className="container">
        <div className="section-header">
          <div className="badge"><Shield size={14} /> Product Catalog</div>
          <h2>Enterprise Security Hardware</h2>
          <p>Explore our premium range of security cameras and backend storage systems. Add items to your checklist to request a personalized system estimate.</p>
        </div>

        {/* Filter Navigation */}
        <div className="product-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.id === 'storage' && <Server size={14} style={{ marginRight: '6px' }} />}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid Display */}
        <div className="products-grid">
          {filteredProducts.map((prod) => {
            const isAdded = selectedItems.some(item => item.id === prod.id);
            return (
              <div key={prod.id} className={`product-card glass-card ${isAdded ? 'selected' : ''}`}>
                {/* Brand Badge */}
                <div className="product-brand-chip" data-brand={prod.brand}>
                  {prod.brand} ENGINE
                </div>

                {/* Vector Camera Graphic Mockup on Card */}
                <div className="product-img-placeholder">
                  <div className="cam-shadow"></div>
                  {prod.category === 'storage' ? (
                    <svg viewBox="0 0 100 100" className="card-cam-svg">
                      <rect x="15" y="25" width="70" height="50" rx="3" fill="#131728" stroke="var(--border-color)" strokeWidth="2" />
                      <line x1="15" y1="42" x2="85" y2="42" stroke="var(--border-color)" strokeWidth="1.5" />
                      <line x1="15" y1="58" x2="85" y2="58" stroke="var(--border-color)" strokeWidth="1.5" />
                      <circle cx="25" cy="34" r="2" fill="var(--accent-success)" className="pulse-active" />
                      <circle cx="33" cy="34" r="2" fill="var(--accent-primary)" />
                      <circle cx="41" cy="34" r="2" fill="var(--accent-primary)" />
                      {/* Ventilation grids */}
                      <line x1="55" y1="34" x2="75" y2="34" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeDasharray="2,2" />
                    </svg>
                  ) : prod.category === 'dome' ? (
                    <svg viewBox="0 0 100 100" className="card-cam-svg">
                      <path d="M25 45 A 25 25 0 0 1 75 45 Z" fill="#131828" stroke="var(--border-color)" strokeWidth="2.5" />
                      <rect x="20" y="45" width="60" height="8" rx="2" fill="var(--border-color)" />
                      <circle cx="50" cy="45" r="12" fill="#06070a" stroke="var(--accent-primary)" strokeWidth="1.5" />
                      <circle cx="47" cy="42" r="3" fill="rgba(255,255,255,0.4)" />
                    </svg>
                  ) : prod.category === 'ptz' ? (
                    <svg viewBox="0 0 100 100" className="card-cam-svg">
                      {/* Mount bracket */}
                      <path d="M15 25 L40 25 L40 45 L30 55 L15 55 Z" fill="#131828" stroke="var(--border-color)" strokeWidth="1.5" />
                      {/* Camera spherical globe */}
                      <circle cx="55" cy="55" r="24" fill="#0f1222" stroke="var(--border-color)" strokeWidth="2" />
                      <circle cx="55" cy="55" r="14" fill="#06070a" stroke="var(--accent-primary)" strokeWidth="1.5" />
                      <circle cx="51" cy="51" r="4" fill="rgba(255,255,255,0.3)" />
                      {/* IR leds */}
                      <circle cx="44" cy="55" r="2" fill="var(--accent-alert)" />
                      <circle cx="66" cy="55" r="2" fill="var(--accent-alert)" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 100 100" className="card-cam-svg">
                      {/* Bullet mount */}
                      <line x1="30" y1="75" x2="50" y2="55" stroke="var(--border-color)" strokeWidth="4" />
                      {/* Camera rectangular body */}
                      <rect x="35" y="30" width="45" height="26" rx="2" transform="rotate(-15 35 30)" fill="#131828" stroke="var(--border-color)" strokeWidth="2" />
                      {/* Sun shield top */}
                      <line x1="30" y1="24" x2="75" y2="12" stroke="var(--accent-primary)" strokeWidth="2" />
                      {/* Lens front */}
                      <ellipse cx="78" cy="40" rx="4" ry="11" fill="#06070a" stroke="var(--accent-primary)" strokeWidth="1" />
                    </svg>
                  )}
                </div>

                <div className="product-card-body">
                  <h3 className="product-title">{prod.name}</h3>
                  <p className="product-desc">{prod.desc}</p>

                  <div className="product-specs-list">
                    <div className="spec-row">
                      <span className="spec-title">Lens:</span>
                      <span className="spec-val">{prod.specs.resolution}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-title">Night IR:</span>
                      <span className="spec-val">{prod.specs.nightVision}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-title">Environment:</span>
                      <span className="spec-val">{prod.specs.environment}</span>
                    </div>
                  </div>

                  <div className="product-card-footer">
                    <span className="product-tier">{prod.priceTag}</span>
                    <button
                      className={`add-checklist-btn ${isAdded ? 'added' : ''}`}
                      onClick={() => onToggleItem(prod)}
                      aria-label={isAdded ? "Remove from checklist" : "Add to checklist"}
                    >
                      {isAdded ? (
                        <>
                          <Check size={16} /> Added
                        </>
                      ) : (
                        <>
                          <Plus size={16} /> Add to Quote
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

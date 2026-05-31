import React from 'react';
import { Building2, CheckCircle2, MapPin, Camera } from 'lucide-react';
import './Clients.css';

// Temple Custom SVG Icon for religious sites
const TempleIcon = ({ className, size = 24 }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Temple Gopuram Shikhara silhouette */}
    <path d="M12 2 L9 6 L15 6 Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M7 6 L17 6 L16 11 L8 11 Z" fill="currentColor" fillOpacity="0.1" />
    <rect x="6" y="11" width="12" height="4" />
    <rect x="4" y="15" width="16" height="7" />
    <path d="M10 18 H14 V22 H10 Z" />
    <path d="M12 2 V6" />
  </svg>
);

const CLIENT_DATA = [
  {
    id: 'sri-rama-traders',
    name: 'Sri Rama Traders',
    location: 'Kalla, AP',
    type: 'Commercial Warehouse',
    system: '16-Camera 4K UHD Commercial Setup',
    details: 'Full yard surveillance with long-range outdoor bullet cameras, automatic vehicle detection, and 60 days of continuous NVR storage backup.',
    category: 'commercial'
  },
  {
    id: 'sivakesava-temple',
    name: 'Sivakesava Temple',
    location: 'Doddanapudi, AP',
    type: 'Religious Institution',
    system: '8-Camera 5MP Smart AI System',
    details: 'Complete coverage of temple corridors, donation boxes, and entry gates with smart false-alarm filtering (ignoring wind/animals) and instant alerts.',
    category: 'temple'
  },
  {
    id: 'sivalayam-kalla',
    name: 'Sivalayam Temple',
    location: 'Kalla, AP',
    type: 'Religious Institution',
    system: '4-Camera Pro HD Security Layout',
    details: 'Compact dome camera installation inside sanctum and main hallway, utilizing ultra-low-light color night vision systems.',
    category: 'temple'
  },
  {
    id: 'sivanataraja-temple',
    name: 'Konapalli Sivanataraja Temple',
    location: 'Konapalli, AP',
    type: 'Religious Institution',
    system: '8-Camera AI Perimeter Security',
    details: 'Perimeter fence protection with active line-crossing detection triggers. Warns against trespassers after hours using auto spotlights.',
    category: 'temple'
  },
  {
    id: 'sri-krishna-temple',
    name: 'Sri Krishna Temple',
    location: 'Local Region, AP',
    type: 'Religious Institution',
    system: '4-Camera HD Night Vision System',
    details: 'Dome and turret camera configuration providing 24/7 security. Simple mobile monitoring feed configured for temple trust members.',
    category: 'temple'
  },
  {
    id: 'shiva-traders',
    name: 'Shiva Traders',
    location: 'Bhimavaram, AP',
    type: 'Commercial Retail Store',
    system: '12-Camera 4K Retail Solution',
    details: 'Covered cashier counters (POS checkouts), shopping aisles, and parking areas with high-zoom PTZ cameras and mobile notifications.',
    category: 'commercial'
  }
];

export default function Clients() {
  return (
    <section id="clients" className="clients-section section-light">
      <div className="container">
        <div className="section-header">
          <div className="badge"><CheckCircle2 size={14} /> RECENT INSTALLATIONS</div>
          <h2>Our Trusted Clients</h2>
          <p>We take pride in securing local temples, retail stores, and commercial warehouses in Bhimavaram and surrounding villages. Here are some of our satisfied deployments.</p>
        </div>

        <div className="clients-grid">
          {CLIENT_DATA.map((client) => (
            <div key={client.id} className="client-card glass-card">
              <div className="client-card-header">
                <div className="client-icon-wrapper" data-category={client.category}>
                  {client.category === 'temple' ? (
                    <TempleIcon className="client-icon" size={24} />
                  ) : (
                    <Building2 className="client-icon" size={24} />
                  )}
                </div>
                <div className="client-header-text">
                  <h3 className="client-name">{client.name}</h3>
                  <div className="client-location">
                    <MapPin size={12} className="loc-icon" />
                    <span>{client.location}</span>
                  </div>
                </div>
              </div>

              <div className="client-card-body">
                <div className="client-badge-type">{client.type}</div>
                <p className="client-desc">{client.details}</p>
              </div>

              <div className="client-card-footer">
                <div className="client-system-tag">
                  <Camera size={14} className="sys-icon" />
                  <span>{client.system}</span>
                </div>
                <span className="install-verified">VERIFIED INSTALL</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

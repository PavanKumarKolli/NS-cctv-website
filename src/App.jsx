import React, { useState, useEffect } from 'react';
import { Shield, Zap, Cloud, Eye, ShieldCheck, UserCheck, ClipboardList } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Brands from './components/Brands';
import Simulator from './components/Simulator';
import Products from './components/Products';
import MobileApp from './components/MobileApp';
import QuoteCalculator from './components/QuoteCalculator';
import Footer from './components/Footer';
import Clients from './components/Clients';
import Preloader from './components/Preloader';
import './App.css';

export default function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Preloader Startup Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3400);
    return () => clearTimeout(timer);
  }, []);

  // Handles adding/removing items to checklist
  const handleToggleItem = (item) => {
    const exists = selectedItems.some((i) => i.id === item.id);
    if (exists) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleRemoveItem = (item) => {
    setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
  };

  return (
    <>
      {isLoading && <Preloader />}
      <Navbar />
      
      <main>
        <Hero />
        
        <Brands />
        
        {/* Features section (Interactive Specs Grid) */}
        <section id="features" className="features-section">
          <div className="container">
            <div className="section-header">
              <div className="badge"><ShieldCheck size={14} /> SECURITY ADVANTAGES</div>
              <h2>Why Choose Nethra Solutions?</h2>
              <p>We deliver cutting-edge CCTV systems designed for longevity, clarity, and ease of use. Rest assured with our enterprise technology integrations.</p>
            </div>

            <div className="features-grid">
              
              <div className="feature-card glass-card">
                <Shield size={32} className="feature-card-icon" />
                <h3>No Monthly Fees</h3>
                <p>Record footage locally onto enterprise-grade hard drives. Own your system and data outright with zero subscription bills.</p>
              </div>

              <div className="feature-card glass-card">
                <Zap size={32} className="feature-card-icon" />
                <h3>AI Edge Analytics</h3>
                <p>Filter false alerts instantly. Onboard deep learning chips differentiate between humans, vehicles, animals, and wind noise.</p>
              </div>

              <div className="feature-card glass-card">
                <Eye size={32} className="feature-card-icon" />
                <h3>Active Deterrence</h3>
                <p>Detect trespassers instantly and trigger camera spotlights, audible voice sirens, and real-time push events.</p>
              </div>

              <div className="feature-card glass-card">
                <Cloud size={32} className="feature-card-icon" />
                <h3>Redundant Cloud Sync</h3>
                <p>Optionally mirror critical incident feeds directly to encrypted cloud storage buckets for offsite recovery.</p>
              </div>

              <div className="feature-card glass-card">
                <UserCheck size={32} className="feature-card-icon" />
                <h3>Professional Installers</h3>
                <p>We do not use sub-contractors. Our local field engineers handle all wiring, mounting, conduit, and app configurations.</p>
              </div>

              <div className="feature-card glass-card">
                <ClipboardList size={32} className="feature-card-icon" />
                <h3>On-Site Consultations</h3>
                <p>We perform full coverage audits, check blind spots, verify lighting issues, and optimize NVR setups before bidding.</p>
              </div>

            </div>
          </div>
        </section>

        <Clients />

        <Simulator />
        
        <Products 
          selectedItems={selectedItems} 
          onToggleItem={handleToggleItem} 
        />
        
        <MobileApp />
        
        <QuoteCalculator 
          selectedItems={selectedItems} 
          onRemoveItem={handleRemoveItem} 
        />
      </main>

      <Footer />

      {/* Floating Quote Tracker Widget */}
      {selectedItems.length > 0 && (
        <a href="#quote" className="floating-checklist-badge">
          <span>Quote Checklist</span>
          <div className="floating-count-bubble">{selectedItems.length}</div>
        </a>
      )}
    </>
  );
}

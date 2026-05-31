import React, { useState } from 'react';
import { ClipboardCheck, Sparkles, Send, ArrowRight, ArrowLeft, Camera, ShieldAlert } from 'lucide-react';
import './QuoteCalculator.css';

export default function QuoteCalculator({ selectedItems = [], onRemoveItem }) {
  const [step, setStep] = useState(1);
  const [indoorCount, setIndoorCount] = useState(4);
  const [outdoorCount, setOutdoorCount] = useState(4);
  const [resolution, setResolution] = useState('5mp'); // 1080p, 5mp, 4k
  const [storage, setStorage] = useState(30); // 15, 30, 60, 90 days
  const [installation, setInstallation] = useState(true);
  const [brandPref, setBrandPref] = useState('hikvision'); // hikvision, dahua, axis, bosch, budget
  
  // Form contact data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Calculation parameters
  const BASE_INDOOR = 110;
  const BASE_OUTDOOR = 160;
  const RES_MULTIPLIERS = { '1080p': 1.0, '5mp': 1.25, '4k': 1.6 };
  const STORAGE_ADDON = { 15: 120, 30: 220, 60: 380, 90: 550 };
  const BRAND_MULTIPLIERS = {
    budget: 0.9,
    hikvision: 1.1,
    dahua: 1.1,
    reolink: 1.0,
    axis: 1.4,
    bosch: 1.5
  };
  const INSTALL_BASE_PER_CAM = 80;

  // Calculate pricing
  const totalCams = indoorCount + outdoorCount;
  const camHardwareCost = ((indoorCount * BASE_INDOOR) + (outdoorCount * BASE_OUTDOOR)) * RES_MULTIPLIERS[resolution];
  const storageCost = STORAGE_ADDON[storage];
  const brandCost = (camHardwareCost + storageCost) * (BRAND_MULTIPLIERS[brandPref] - 1);
  const hardwareSubtotal = camHardwareCost + storageCost + brandCost;
  
  // Catalog items additional cost (if any added)
  const catalogCost = selectedItems.length * 150; // Flat average estimate for simplicity
  
  const laborCost = installation ? (totalCams * INSTALL_BASE_PER_CAM) + 150 : 0;
  const grandTotal = Math.round(hardwareSubtotal + laborCost + catalogCost);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitted(true);
  };

  const resetForm = () => {
    setStep(1);
    setFormData({ name: '', email: '', phone: '', notes: '' });
    setIsSubmitted(false);
  };

  return (
    <section id="quote" className="quote-section section-light">
      <div className="container">
        <div className="section-header">
          <div className="badge"><ClipboardCheck size={14} /> CCTV SYSTEM ESTIMATOR</div>
          <h2>Configure Your CCTV Setup</h2>
          <p>Get a real-time estimate of equipment and professional setup costs. Tailor the options to fit your property and submit your request for a formal quote.</p>
        </div>

        <div className="quote-grid">
          
          {/* Form Wizard - Left Side */}
          <div className="quote-wizard glass-card">
            {/* Steps indicator */}
            <div className="wizard-progress">
              <div className={`step-dot ${step >= 1 ? 'active' : ''}`}><span>1</span><label>Hardware</label></div>
              <div className="progress-line" style={{ '--progress-width': `${(step - 1) * 33.3}%` }}></div>
              <div className={`step-dot ${step >= 2 ? 'active' : ''}`}><span>2</span><label>Quality</label></div>
              <div className={`step-dot ${step >= 3 ? 'active' : ''}`}><span>3</span><label>Installation</label></div>
              <div className={`step-dot ${step >= 4 ? 'active' : ''}`}><span>4</span><label>Submit</label></div>
            </div>

            {isSubmitted ? (
              <div className="success-overlay">
                <div className="success-icon-container pulse-active">
                  <Sparkles size={32} className="success-spark" />
                </div>
                <h3>Quote Request Submitted!</h3>
                <p>Thank you, <strong>{formData.name}</strong>. Our security consultants will review your configuration ($ {grandTotal.toLocaleString()} est.) and contact you within 24 hours.</p>
                <div className="summary-ticket">
                  <div className="ticket-row"><span>Cameras Configured</span><span>{totalCams} ({indoorCount} In / {outdoorCount} Out)</span></div>
                  <div className="ticket-row"><span>Video Quality</span><span>{resolution.toUpperCase()} HD</span></div>
                  <div className="ticket-row"><span>Storage Retention</span><span>{storage} Days Loop</span></div>
                  <div className="ticket-row"><span>Brand Selection</span><span>{brandPref.toUpperCase()}</span></div>
                  {selectedItems.length > 0 && (
                    <div className="ticket-row"><span>Catalog Addons</span><span>{selectedItems.length} Products</span></div>
                  )}
                  <div className="ticket-row grand"><span>Estimated Total</span><span>${grandTotal.toLocaleString()}</span></div>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={resetForm}>Create New Configuration</button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="wizard-form">
                
                {/* Step 1: Camera Quantities */}
                {step === 1 && (
                  <div className="wizard-step-content">
                    <h3 className="wizard-step-title">Specify Camera Quantities</h3>
                    <p className="wizard-step-desc">Enter the count of security points you need to secure indoors (lobbies, hallways) vs. outdoors (gates, perimeter walls).</p>
                    
                    {/* Indoor Slider */}
                    <div className="counter-control-group">
                      <div className="control-header">
                        <label className="slider-label">Indoor Dome Cameras</label>
                        <span className="slider-count-badge">{indoorCount} Dome Cams</span>
                      </div>
                      <div className="counter-row">
                        <button type="button" className="counter-adjust-btn" onClick={() => setIndoorCount(prev => Math.max(0, prev - 1))}>-</button>
                        <input type="range" min="0" max="24" value={indoorCount} onChange={(e) => setIndoorCount(parseInt(e.target.value))} className="zoom-slider" />
                        <button type="button" className="counter-adjust-btn" onClick={() => setIndoorCount(prev => Math.min(24, prev + 1))}>+</button>
                      </div>
                    </div>

                    {/* Outdoor Slider */}
                    <div className="counter-control-group">
                      <div className="control-header">
                        <label className="slider-label">Outdoor Bullet / PTZ Cameras</label>
                        <span className="slider-count-badge">{outdoorCount} Bullet Cams</span>
                      </div>
                      <div className="counter-row">
                        <button type="button" className="counter-adjust-btn" onClick={() => setOutdoorCount(prev => Math.max(0, prev - 1))}>-</button>
                        <input type="range" min="0" max="24" value={outdoorCount} onChange={(e) => setOutdoorCount(parseInt(e.target.value))} className="zoom-slider" />
                        <button type="button" className="counter-adjust-btn" onClick={() => setOutdoorCount(prev => Math.min(24, prev + 1))}>+</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Resolution & Brand Selection */}
                {step === 2 && (
                  <div className="wizard-step-content">
                    <h3 className="wizard-step-title">Video Quality & Brand Platform</h3>
                    <p className="wizard-step-desc">Select your desired camera resolution standard and preferred equipment manufacturer platform.</p>
                    
                    {/* Resolution Choice */}
                    <div className="input-group">
                      <label className="input-title">Select Camera Resolution</label>
                      <div className="radios-grid">
                        <div className={`radio-card ${resolution === '1080p' ? 'active' : ''}`} onClick={() => setResolution('1080p')}>
                          <h4>1080p Full HD</h4>
                          <p>Standard clarity. Best for budget setups.</p>
                        </div>
                        <div className={`radio-card ${resolution === '5mp' ? 'active' : ''}`} onClick={() => setResolution('5mp')}>
                          <h4>5MP Quad-HD</h4>
                          <p>Sharp detailing. Excellent license/face zoom.</p>
                        </div>
                        <div className={`radio-card ${resolution === '4k' ? 'active' : ''}`} onClick={() => setResolution('4k')}>
                          <h4>4K Ultra-HD</h4>
                          <p>Professional grade. Broadcast quality clarity.</p>
                        </div>
                      </div>
                    </div>

                    {/* Brand Platform Selection */}
                    <div className="input-group">
                      <label className="input-title">Preferred Technology Brand</label>
                      <div className="brand-select-grid">
                        {[
                          { id: 'budget', label: 'Budget/Mixed Value' },
                          { id: 'hikvision', label: 'Hikvision Platform' },
                          { id: 'dahua', label: 'Dahua Smart AI' },
                          { id: 'reolink', label: 'Reolink Smart WiFi' },
                          { id: 'axis', label: 'Axis Network Video' },
                          { id: 'bosch', label: 'Bosch Enterprise' }
                        ].map((brand) => (
                          <button
                            key={brand.id}
                            type="button"
                            className={`brand-opt-btn ${brandPref === brand.id ? 'active' : ''}`}
                            onClick={() => setBrandPref(brand.id)}
                          >
                            {brand.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Storage Days & Setup */}
                {step === 3 && (
                  <div className="wizard-step-content">
                    <h3 className="wizard-step-title">NVR Storage Loop & Support</h3>
                    <p className="wizard-step-desc">Set up local storage footage retention goals and specify if you require our professional field engineers to install the hardware.</p>
                    
                    {/* Storage Retention Slider */}
                    <div className="input-group">
                      <label className="input-title">Footage Archive Retention Loop</label>
                      <div className="storage-cards-grid">
                        {[
                          { id: 15, label: '15 Days Loop', desc: 'Standard residential coverage.' },
                          { id: 30, label: '30 Days Loop', desc: 'Highly recommended for businesses.' },
                          { id: 60, label: '60 Days Loop', desc: 'Advanced archive audit retention.' },
                          { id: 90, label: '90 Days Loop', desc: 'Commercial compliance standard.' }
                        ].map((opt) => (
                          <div 
                            key={opt.id} 
                            className={`radio-card vertical-card ${storage === opt.id ? 'active' : ''}`}
                            onClick={() => setStorage(opt.id)}
                          >
                            <h4>{opt.label}</h4>
                            <p>{opt.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Installation toggle */}
                    <div className="toggle-row inline-toggle">
                      <div className="toggle-info">
                        <span className="toggle-title">Include Professional Installation</span>
                        <span className="toggle-subtitle">We run cables, mount cameras, setup NVR, and configure mobile stream apps.</span>
                      </div>
                      <button 
                        type="button"
                        className={`switch-btn ${installation ? 'active' : ''}`}
                        onClick={() => setInstallation(!installation)}
                      >
                        <span className="switch-slider"></span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Submission */}
                {step === 4 && (
                  <div className="wizard-step-content">
                    <h3 className="wizard-step-title">Request Formal Estimate</h3>
                    <p className="wizard-step-desc">Enter your contact details below. We will send a official, personalized security proposal outlining equipment itemization and scheduling availability.</p>

                    <div className="form-fields-container">
                      <div className="field-row">
                        <div className="field-item">
                          <label htmlFor="name" className="field-label">Full Name *</label>
                          <input 
                            type="text" 
                            id="name"
                            name="name" 
                            value={formData.name} 
                            onChange={handleInputChange} 
                            className={`form-input ${errors.name ? 'error' : ''}`}
                            placeholder="John Doe" 
                          />
                          {errors.name && <span className="field-error-text">{errors.name}</span>}
                        </div>
                        <div className="field-item">
                          <label htmlFor="phone" className="field-label">Phone Number *</label>
                          <input 
                            type="tel" 
                            id="phone"
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange} 
                            className={`form-input ${errors.phone ? 'error' : ''}`}
                            placeholder="(555) 000-0000" 
                          />
                          {errors.phone && <span className="field-error-text">{errors.phone}</span>}
                        </div>
                      </div>
                      <div className="field-item">
                        <label htmlFor="email" className="field-label">Email Address *</label>
                        <input 
                          type="email" 
                          id="email"
                          name="email" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                          className={`form-input ${errors.email ? 'error' : ''}`}
                          placeholder="johndoe@example.com" 
                        />
                        {errors.email && <span className="field-error-text">{errors.email}</span>}
                      </div>
                      <div className="field-item">
                        <label htmlFor="notes" className="field-label">Site Description / Additional Notes (Optional)</label>
                        <textarea 
                          id="notes"
                          name="notes" 
                          value={formData.notes} 
                          onChange={handleInputChange} 
                          className="form-textarea" 
                          placeholder="Describe your site (e.g. 2-story office, retail warehouse, residential front porch layout)..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Controls */}
                <div className="wizard-navigation-buttons">
                  {step > 1 && (
                    <button type="button" className="btn btn-secondary btn-sm" onClick={handlePrev}>
                      <ArrowLeft size={16} /> Back
                    </button>
                  )}
                  {step < 4 ? (
                    <button 
                      type="button" 
                      className="btn btn-primary btn-sm btn-next-arrow" 
                      onClick={handleNext}
                      disabled={step === 1 && totalCams === 0}
                    >
                      Continue <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-primary btn-sm">
                      <Send size={16} /> Submit Proposal Request
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Pricing Estimate Invoice Card - Right Side */}
          <div className="quote-pricing-invoice glass-card">
            <h3 className="invoice-title">Estimator Summary</h3>

            <div className="invoice-body">
              {/* Product Checklist attached */}
              {selectedItems.length > 0 && (
                <div className="invoice-catalog-panel">
                  <h4 className="catalog-panel-title">Specific Models Selected ({selectedItems.length})</h4>
                  <div className="invoice-catalog-list">
                    {selectedItems.map((item) => (
                      <div key={item.id} className="invoice-catalog-item">
                        <div className="catalog-item-info">
                          <span className="cat-item-name">{item.name}</span>
                          <span className="cat-item-brand">{item.brand} Platform</span>
                        </div>
                        <button className="invoice-item-remove" onClick={() => onRemoveItem(item)} aria-label="Remove item">
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cameras breakdown */}
              <div className="invoice-breakdown-section">
                <h4 className="invoice-breakdown-title">System Configurations</h4>
                <div className="invoice-rows-list">
                  <div className="invoice-row">
                    <span className="inv-row-label"><Camera size={14} style={{ marginRight: '6px' }} /> Camera Hardware ({totalCams} Cams)</span>
                    <span className="inv-row-price">${Math.round(camHardwareCost).toLocaleString()}</span>
                  </div>
                  <div className="invoice-row-details">
                    {indoorCount > 0 && <span>• {indoorCount} Indoor Dome Units</span>}
                    {outdoorCount > 0 && <span>• {outdoorCount} Outdoor Bullet Units</span>}
                    <span>• {resolution.toUpperCase()} HD Image Resolution</span>
                  </div>

                  <div className="invoice-row">
                    <span className="inv-row-label">NVR Storage Loop ({storage} Days Loop)</span>
                    <span className="inv-row-price">${storageCost}</span>
                  </div>
                  <div className="invoice-row-details">
                    <span>• Local CCTV NVR Core with 24/7 Overwrite</span>
                  </div>

                  <div className="invoice-row">
                    <span className="inv-row-label">Platform Integration ({brandPref.toUpperCase()})</span>
                    <span className="inv-row-price">${Math.round(brandCost).toLocaleString()}</span>
                  </div>

                  {selectedItems.length > 0 && (
                    <div className="invoice-row">
                      <span className="inv-row-label">Catalog Addon Equipment</span>
                      <span className="inv-row-price">${catalogCost}</span>
                    </div>
                  )}

                  <div className="invoice-row">
                    <span className="inv-row-label">Professional Wiring & Mounting</span>
                    <span className="inv-row-price">{installation ? `$${laborCost}` : '$0'}</span>
                  </div>
                  <div className="invoice-row-details">
                    {installation ? (
                      <span>• Cable pulling, focus adjustment, mobile link setups</span>
                    ) : (
                      <span className="warning-text"><ShieldAlert size={12} style={{ marginRight: '4px' }} /> Self-installation option selected</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Total Invoice */}
              <div className="invoice-grand-total">
                <div className="grand-label">
                  <span>Estimated Project Value</span>
                  <p>Includes hardware & setup</p>
                </div>
                <div className="grand-price">${grandTotal.toLocaleString()}</div>
              </div>

              <div className="invoice-disclaimer">
                * This calculator estimates equipment and average wiring complexity rates. Local taxes, custom mounts, or complex trenching requests require an onsite engineering site survey to determine final bids.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

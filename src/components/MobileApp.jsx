import React, { useState } from 'react';
import { Smartphone, Bell, Volume2, ShieldCheck, Play, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import './MobileApp.css';

const APP_FEEDS = [
  { id: 'cam1', name: 'CAM 01 - Lobby', activeColor: 'rgba(0, 210, 255, 0.1)', icon: 'lobby' },
  { id: 'cam2', name: 'CAM 02 - Loading Dock', activeColor: 'rgba(245, 158, 11, 0.1)', icon: 'dock' },
  { id: 'cam3', name: 'CAM 03 - Cash Register', activeColor: 'rgba(16, 185, 129, 0.1)', icon: 'register' },
  { id: 'cam4', name: 'CAM 04 - Perimeter Fence', activeColor: 'rgba(239, 68, 68, 0.1)', icon: 'perimeter' },
];

const NOTIFICATIONS = [
  { id: 1, time: 'Just Now', title: 'Perimeter Intrusion', desc: 'Person detected near CAM 04 boundary.', type: 'alert' },
  { id: 2, time: '14 mins ago', title: 'Object Removed', desc: 'Asset missing on CAM 02 cargo bay.', type: 'warning' },
  { id: 3, time: '1 hr ago', title: 'System Healthy', desc: 'Daily automated backup sync completed.', type: 'normal' }
];

export default function MobileApp() {
  const [selectedFeed, setSelectedFeed] = useState(APP_FEEDS[0]);
  const [activeDirection, setActiveDirection] = useState(null);

  const handleControlPress = (direction) => {
    setActiveDirection(direction);
    setTimeout(() => setActiveDirection(null), 300);
  };

  const renderPhoneFeedGraphics = () => {
    switch (selectedFeed.id) {
      case 'cam1':
        return (
          <svg viewBox="0 0 200 120" className="phone-feed-svg">
            <rect width="200" height="120" fill="#080a14" />
            <line x1="0" y1="60" x2="200" y2="60" stroke="rgba(255,255,255,0.05)" />
            <line x1="100" y1="0" x2="100" y2="120" stroke="rgba(255,255,255,0.05)" />
            <circle cx="50" cy="80" r="10" fill="#4a5568" />
            <path d="M40 95 L60 95 L63 120 L37 120 Z" fill="#4a5568" />
            <rect x="110" y="30" width="30" height="60" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeDasharray="4 2" />
            <text x="112" y="24" fill="var(--accent-primary)" fontSize="6" fontFamily="monospace" fontWeight="bold">AI_PERSON: 98%</text>
          </svg>
        );
      case 'cam2':
        return (
          <svg viewBox="0 0 200 120" className="phone-feed-svg">
            <rect width="200" height="120" fill="#05070c" />
            <rect x="20" y="30" width="60" height="50" fill="#1a202c" stroke="#2d3748" />
            {/* Forklift sketch */}
            <rect x="100" y="70" width="50" height="30" fill="#4a5568" rx="2" />
            <circle cx="110" cy="100" r="8" fill="#1a202c" />
            <circle cx="140" cy="100" r="8" fill="#1a202c" />
            <line x1="0" y1="95" x2="200" y2="95" stroke="#2d3748" />
            <rect x="95" y="60" width="60" height="42" fill="none" stroke="var(--accent-warning)" strokeWidth="1.5" />
            <text x="97" y="54" fill="var(--accent-warning)" fontSize="6" fontFamily="monospace" fontWeight="bold">AI_VEHICLE: 95%</text>
          </svg>
        );
      case 'cam3':
        return (
          <svg viewBox="0 0 200 120" className="phone-feed-svg">
            <rect width="200" height="120" fill="#080a14" />
            <rect x="110" y="30" width="70" height="80" fill="#1a202c" stroke="#2d3748" />
            <rect x="30" y="70" width="40" height="40" fill="#2d3748" />
            <rect x="25" y="58" width="15" height="15" fill="none" stroke="var(--accent-success)" strokeWidth="1" />
            <text x="25" y="52" fill="var(--accent-success)" fontSize="6" fontFamily="monospace">MONITORED</text>
          </svg>
        );
      case 'cam4':
        return (
          <svg viewBox="0 0 200 120" className="phone-feed-svg">
            <rect width="200" height="120" fill="#030407" />
            <line x1="0" y1="80" x2="200" y2="80" stroke="#1a202c" strokeWidth="2" />
            <line x1="0" y1="50" x2="200" y2="50" stroke="var(--accent-alert)" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Intruder target indicator */}
            <circle cx="90" cy="65" r="8" fill="#e53e3e" opacity="0.3" />
            <rect x="80" y="57" width="20" height="35" fill="none" stroke="var(--accent-alert)" strokeWidth="1.5" />
            <text x="80" y="51" fill="var(--accent-alert)" fontSize="6" fontFamily="monospace" fontWeight="bold">ALARM: PERIMETER_VIOLATION</text>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="mobile-app" className="mobile-app-section section-dark">
      <div className="container mobile-grid">
        
        {/* Phone Mockup Column */}
        <div className="phone-mockup-wrapper">
          <div className="smartphone-body glow-accent">
            {/* Notch */}
            <div className="smartphone-notch"></div>
            
            {/* Phone Screen Container */}
            <div className="smartphone-screen">
              {/* App Topbar */}
              <div className="app-header">
                <div className="app-time">18:14</div>
                <div className="app-title">Nethra Secure</div>
                <div className="app-signal">5G</div>
              </div>

              {/* Cam Live Stream display screen */}
              <div className="app-viewport">
                {renderPhoneFeedGraphics()}
                <div className="app-feed-overlay-tag">
                  <span className="app-live-dot"></span>
                  <span>LIVE // {selectedFeed.name}</span>
                </div>
                
                {activeDirection && (
                  <div className="app-action-indicator">
                    PAN {activeDirection.toUpperCase()}
                  </div>
                )}
              </div>

              {/* Stream Feeds Selector (Toggles channels) */}
              <div className="app-feeds-menu">
                {APP_FEEDS.map((feed) => (
                  <button 
                    key={feed.id} 
                    className={`app-feed-tab ${selectedFeed.id === feed.id ? 'active' : ''}`}
                    onClick={() => setSelectedFeed(feed)}
                  >
                    {feed.id.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* PTZ Pan-Tilt Joypad control inside phone app */}
              <div className="app-controls-block">
                <div className="app-joypad">
                  <button className="joy-btn joy-up" onClick={() => handleControlPress('up')} aria-label="Pan Up">
                    <ArrowUp size={12} />
                  </button>
                  <button className="joy-btn joy-left" onClick={() => handleControlPress('left')} aria-label="Pan Left">
                    <ArrowLeft size={12} />
                  </button>
                  <div className="joy-center">PTZ</div>
                  <button className="joy-btn joy-right" onClick={() => handleControlPress('right')} aria-label="Pan Right">
                    <ArrowRight size={12} />
                  </button>
                  <button className="joy-btn joy-down" onClick={() => handleControlPress('down')} aria-label="Pan Down">
                    <ArrowDown size={12} />
                  </button>
                </div>

                {/* Quick actions buttons inside app */}
                <div className="app-action-buttons">
                  <button className="app-btn">
                    <Volume2 size={12} />
                    <span>Talk</span>
                  </button>
                  <button className="app-btn">
                    <Bell size={12} />
                    <span>Siren</span>
                  </button>
                  <button className="app-btn accent">
                    <ShieldCheck size={12} />
                    <span>Secure</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text Details Column */}
        <div className="mobile-info-content">
          <div className="badge">
            <Smartphone size={14} /> Mobile Integration
          </div>
          
          <h2>Your Security, <br />In the Palm of Your Hand</h2>
          <p className="mobile-desc">
            Monitor your business or residence from anywhere in the world. Our professional NVR configurations hook into encrypted, zero-latency streaming services so you can watch live feeds, review logs, and receive instant push notifications.
          </p>

          <div className="mobile-benefits">
            <div className="benefit-row">
              <div className="benefit-bullet">
                <Bell size={18} />
              </div>
              <div className="benefit-text">
                <h4>Smart Push Alerts</h4>
                <p>Get notified within 1.5 seconds of a perimeter line crossing. Rest easy with smart false-alarm filtering.</p>
              </div>
            </div>
            <div className="benefit-row">
              <div className="benefit-bullet">
                <Volume2 size={18} />
              </div>
              <div className="benefit-text">
                <h4>Two-Way Talk Audio</h4>
                <p>Listen and talk back to site visitors or delivery drivers directly through high-gain weatherproof camera speakers.</p>
              </div>
            </div>
          </div>

          {/* Interactive Notifications Box */}
          <div className="mock-notifications-panel glass-card">
            <h4 className="notif-panel-title">Recent Mobile Event Logs</h4>
            <div className="notif-list">
              {NOTIFICATIONS.map((notif) => (
                <div key={notif.id} className="notif-card">
                  <div className="notif-card-header">
                    <span className={`notif-indicator ${notif.type}`}></span>
                    <span className="notif-title">{notif.title}</span>
                    <span className="notif-time">{notif.time}</span>
                  </div>
                  <p className="notif-desc">{notif.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

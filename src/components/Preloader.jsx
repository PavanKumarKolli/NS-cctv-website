import React, { useState, useEffect } from 'react';
import './Preloader.css';

export default function Preloader() {
  const [logIndex, setLogIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  
  const BOOT_LOGS = [
    'SYSTEM INITIALIZING...',
    'CONNECTING SECURE DATABASE...',
    'LOADING NEURAL CCTV CLASSIFIER...',
    'ENGAGING ENCRYPTED STREAM LINK...',
    'NETHRA SECURE ONLINE // 100%'
  ];

  // Roll terminal logs during startup
  useEffect(() => {
    if (logIndex < BOOT_LOGS.length - 1) {
      const logTimer = setTimeout(() => {
        setLogIndex(logIndex + 1);
      }, 500);
      return () => clearTimeout(logTimer);
    }
  }, [logIndex]);

  // Trigger fade out before component unmounts
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2800); // Start fade-out at 2.8s
    return () => clearTimeout(fadeTimer);
  }, []);

  return (
    <div className={`preloader-overlay ${isFading ? 'fade-out' : ''}`}>
      
      {/* Tactical grid background overlay */}
      <div className="preloader-grid"></div>
      
      {/* Centered Radar Scanner & Logo */}
      <div className="preloader-scanner">
        <div className="scanner-ring outer-ring"></div>
        <div className="scanner-ring inner-ring"></div>
        <div className="scanner-pulse"></div>
        <img src="/logo.png" alt="Nethra Solutions Logo" className="scanner-logo" />
      </div>

      {/* Brand Text Reveal */}
      <div className="preloader-text-group">
        <h1 className="preloader-title">
          NETHRA <span className="highlight-text">SOLUTIONS</span>
        </h1>
        <div className="preloader-subtitle">
          by Pavan Kolli
        </div>
      </div>

      {/* Startup logs running in the bottom center */}
      <div className="preloader-boot-terminal">
        <div className="boot-terminal-header">
          <span className="rec-blinking-dot"></span>
          <span>SECURITY INITIALIZATION MODULE</span>
        </div>
        <div className="boot-terminal-text">
          {BOOT_LOGS[logIndex]}
        </div>
      </div>
    </div>
  );
}

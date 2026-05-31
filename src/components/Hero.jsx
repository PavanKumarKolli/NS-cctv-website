import React from 'react';
import { Play, ClipboardList, ShieldCheck, Eye, Cpu, Bell } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-grid container">
        {/* Left Side: Info */}
        <div className="hero-content">
          <div className="badge">
            <ShieldCheck size={14} /> AI-Powered CCTV Systems
          </div>
          
          <h1 className="hero-title">
            Intelligent Surveillance <br />
            <span className="text-gradient-cyan-blue">Protecting What Matters</span>
          </h1>
          
          <p className="hero-desc">
            Secure your business and home with professional-grade, AI-driven CCTV systems. Featuring 24/7 mobile monitoring, high-definition smart night vision, and no monthly fees.
          </p>

          <div className="hero-actions">
            <a href="#quote" className="btn btn-primary">
              <ClipboardList size={18} /> Build Custom System
            </a>
            <a href="#simulator" className="btn btn-secondary">
              <Play size={18} /> Launch Live Demo
            </a>
          </div>

          <div className="hero-features">
            <div className="hero-feat-item">
              <div className="feat-icon-wrapper">
                <Cpu size={20} className="feat-icon" />
              </div>
              <div>
                <h4>Smart AI Analytics</h4>
                <p>Auto-detect human, vehicle, and package events.</p>
              </div>
            </div>
            <div className="hero-feat-item">
              <div className="feat-icon-wrapper">
                <Eye size={20} className="feat-icon" />
              </div>
              <div>
                <h4>Smart Night Vision</h4>
                <p>Vivid, full-color recording even in total darkness.</p>
              </div>
            </div>
            <div className="hero-feat-item">
              <div className="feat-icon-wrapper">
                <Bell size={20} className="feat-icon" />
              </div>
              <div>
                <h4>Instant Alerts</h4>
                <p>Mobile notifications with video preview triggers.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: High-Tech Security Console Simulator */}
        <div className="hero-visual">
          <div className="console-wrapper glass-card">
            {/* Camera Viewport Header */}
            <div className="console-header">
              <div className="rec-indicator">
                <span className="rec-dot"></span>
                <span>REC</span>
              </div>
              <div className="console-cam-name">CAM_01_HERO_VIEW</div>
              <div className="console-time">LIVE 1080P</div>
            </div>

            {/* Tactical Grid Frame */}
            <div className="console-viewport">
              {/* Scanline & Grid Overlays */}
              <div className="console-scanline"></div>
              <div className="console-grid"></div>

              {/* Targeting Reticle */}
              <div className="targeting-reticle">
                <div className="bracket br-top-left"></div>
                <div className="bracket br-top-right"></div>
                <div className="bracket br-bottom-left"></div>
                <div className="bracket br-bottom-right"></div>
              </div>

              {/* Graphic Central: Vector Security Camera */}
              <div className="camera-illustration-wrapper">
                <svg viewBox="0 0 200 200" className="camera-svg">
                  {/* Outer base/mount */}
                  <path d="M60 140 L140 140 L120 160 L80 160 Z" fill="rgba(31, 39, 64, 0.6)" stroke="var(--border-color)" strokeWidth="2" />
                  <rect x="94" y="110" width="12" height="30" fill="var(--bg-tertiary)" stroke="var(--border-color)" strokeWidth="2" />
                  
                  {/* Camera Body Dome */}
                  <path d="M40 90 A 60 60 0 0 1 160 90 Z" fill="rgba(12, 15, 26, 0.9)" stroke="var(--border-color)" strokeWidth="3" />
                  <circle cx="100" cy="90" r="45" fill="none" stroke="rgba(0, 210, 255, 0.15)" strokeWidth="8" />
                  
                  {/* Cyber glowing details */}
                  <circle cx="100" cy="90" r="30" fill="var(--bg-secondary)" stroke="var(--accent-secondary)" strokeWidth="2.5" />
                  
                  {/* Lens center */}
                  <circle cx="100" cy="90" r="16" fill="#030408" stroke="var(--accent-primary)" strokeWidth="3" />
                  <circle cx="94" cy="84" r="5" fill="rgba(255, 255, 255, 0.4)" />
                  <circle cx="100" cy="90" r="8" fill="none" stroke="var(--accent-primary)" strokeWidth="1" strokeDasharray="3,2" />
                  
                  {/* IR Leds surrounding */}
                  <circle cx="100" cy="55" r="3" fill="var(--accent-alert)" />
                  <circle cx="125" cy="65" r="3" fill="var(--accent-alert)" />
                  <circle cx="135" cy="90" r="3" fill="var(--accent-alert)" />
                  <circle cx="125" cy="115" r="3" fill="var(--accent-alert)" />
                  <circle cx="100" cy="125" r="3" fill="var(--accent-alert)" />
                  <circle cx="75" cy="115" r="3" fill="var(--accent-alert)" />
                  <circle cx="65" cy="90" r="3" fill="var(--accent-alert)" />
                  <circle cx="75" cy="65" r="3" fill="var(--accent-alert)" />
                </svg>
                {/* Target box tracking */}
                <div className="target-label">
                  <div className="target-label-box">AI_TARGET: SECURE</div>
                  <div className="target-percentage">100%</div>
                </div>
              </div>

              {/* Status & Diagnostic Data Overlay */}
              <div className="console-hud console-hud-left">
                <div>SYS: ONLINE</div>
                <div>FPS: 60.00</div>
                <div>BITRATE: 4.8 Mbps</div>
                <div>NIGHT VISION: AUTO</div>
              </div>
              <div className="console-hud console-hud-right">
                <div>AI MODULE: STABLE</div>
                <div>TEMP: 34.2 °C</div>
                <div>H.265+ COMPRESSION</div>
                <div>SHIELD LEVEL: 100%</div>
              </div>
            </div>
            
            {/* Control HUD Footer */}
            <div className="console-footer">
              <span className="radar-ping"></span>
              <span>NETWORK STATUS: ENCRYPTED SECURE LINK</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

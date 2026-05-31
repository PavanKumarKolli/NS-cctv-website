import React, { useState, useEffect, useRef } from 'react';
import { Camera, Eye, Cpu, ZoomIn, Info, Activity, Terminal } from 'lucide-react';
import './Simulator.css';

const ENVIRONMENTS = [
  { 
    id: 'lobby', 
    name: 'Office Lobby', 
    desc: 'Main receptionist desk & entry corridor.',
    targets: [
      { id: 1, label: 'PERSON_04', score: '98%', x: '110px', y: '90px', w: '60px', h: '120px', type: 'person' },
      { id: 2, label: 'ACCESS_DOOR_01', score: 'SECURE', x: '240px', y: '70px', w: '80px', h: '150px', type: 'door' }
    ]
  },
  { 
    id: 'warehouse', 
    name: 'Logistics Warehouse', 
    desc: 'High-value storage racks and forklift dock.',
    targets: [
      { id: 1, label: 'VEHICLE_FORKLIFT', score: '95%', x: '70px', y: '130px', w: '110px', h: '90px', type: 'vehicle' },
      { id: 2, label: 'CARGO_PALLET_B3', score: 'ASSET_SECURE', x: '270px', y: '100px', w: '90px', h: '110px', type: 'object' }
    ]
  },
  { 
    id: 'retail', 
    name: 'Retail Storefront', 
    desc: 'Product aisles & cashier counter zone.',
    targets: [
      { id: 1, label: 'PERSON_12', score: '99%', x: '180px', y: '85px', w: '55px', h: '130px', type: 'person' },
      { id: 2, label: 'CASH_POS_02', score: 'MONITORED', x: '60px', y: '110px', w: '80px', h: '90px', type: 'object' }
    ]
  },
  { 
    id: 'residential', 
    name: 'Smart Home Driveway', 
    desc: 'Front yard exterior boundary check.',
    targets: [
      { id: 1, label: 'VEHICLE_CAR_08', score: '99%', x: '130px', y: '120px', w: '160px', h: '85px', type: 'vehicle' },
      { id: 2, label: 'PERIMETER_FENCE_04', score: 'SECURED', x: '10px', y: '90px', w: '110px', h: '70px', type: 'door' }
    ]
  }
];

export default function Simulator() {
  const [activeEnv, setActiveEnv] = useState(ENVIRONMENTS[0]);
  const [nightVision, setNightVision] = useState(false);
  const [aiDetection, setAiDetection] = useState(true);
  const [showLogs, setShowLogs] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [timestamp, setTimestamp] = useState('');
  const [fps, setFps] = useState('60.00');
  const [bitrate, setBitrate] = useState('4.8');
  const [logs, setLogs] = useState([]);
  
  const logsEndRef = useRef(null);

  // Live timestamp setup
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const timeStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      setTimestamp(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fluctuating FPS and Bitrate
  useEffect(() => {
    const interval = setInterval(() => {
      setFps((59.4 + Math.random() * 1.2).toFixed(2));
      setBitrate((4.2 + Math.random() * 1.4).toFixed(1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Add system logs dynamically on toggle or changes
  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev.slice(-30), `[${time}] ${msg}`]);
  };

  // Initial log loading
  useEffect(() => {
    setLogs([
      `[${new Date().toLocaleTimeString()}] INITIATING CCTV ENGINE SECURITY HANDSHAKE...`,
      `[${new Date().toLocaleTimeString()}] DETECTED ACTIVE NETWORK GATEWAY`,
      `[${new Date().toLocaleTimeString()}] HARDWARE STATUS: ONLINE (H.265 CODEC READY)`,
      `[${new Date().toLocaleTimeString()}] ACTIVE SOURCE: CAM_${activeEnv.id.toUpperCase()}_SECURE_FEED`,
      `[${new Date().toLocaleTimeString()}] AI COMPANION ENGAGED (MOTION TRACKING MODE: ON)`
    ]);
  }, []);

  // Update logs when controls are toggled
  const handleEnvChange = (env) => {
    setActiveEnv(env);
    setZoomLevel(1.0);
    addLog(`STREAM CHANNEL SWITCHED -> CAM_${env.id.toUpperCase()}_SECURE_FEED`);
    addLog(`ESTABLISHING CLEAN RETINA LINK FOR ${env.name.toUpperCase()}...`);
  };

  const toggleNightVision = () => {
    const nextVal = !nightVision;
    setNightVision(nextVal);
    addLog(nextVal ? 'INFRARED (IR) NIGHT VISION ONLINE (MONOCHROME MODE)' : 'INFRARED (IR) COMPANION DEACTIVATED. COLOR STREAM ENABLED.');
  };

  const toggleAi = () => {
    const nextVal = !aiDetection;
    setAiDetection(nextVal);
    addLog(nextVal ? 'AI DIAGNOSTIC NEURAL BOUNDING BOXES ENGAGED' : 'AI DIAGNOSTICS DETACHED. GRAPHICS STANDBY.');
  };

  const handleZoom = (e) => {
    const zoom = parseFloat(e.target.value);
    setZoomLevel(zoom);
    if (zoom === 1.0) {
      addLog('DIGITAL PTZ RESCALED: DEFAULT (1.0x)');
    } else {
      addLog(`DIGITAL PTZ ZOOM APPLIED: ${zoom.toFixed(1)}x MAGNIFICATION`);
    }
  };

  // Auto scroll logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Environment SVGs renderer
  const renderEnvSvg = () => {
    switch (activeEnv.id) {
      case 'lobby':
        return (
          <svg className="env-svg" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Floor, walls and ceiling */}
            <path d="M0 0 L400 0 L320 50 L80 50 Z" fill="#0d111d" opacity="0.3" />
            <path d="M0 240 L400 240 L340 180 L60 180 Z" fill="#13182b" opacity="0.5" />
            <rect x="0" y="50" width="80" height="130" fill="#0c0e18" stroke="#1f2740" />
            <rect x="320" y="50" width="80" height="130" fill="#0c0e18" stroke="#1f2740" />
            
            {/* Center hallway lines */}
            <line x1="80" y1="50" x2="60" y2="180" stroke="#1f2740" strokeWidth="2" />
            <line x1="320" y1="50" x2="340" y2="180" stroke="#1f2740" strokeWidth="2" />
            
            {/* Lobby Door */}
            <rect x="245" y="70" width="70" height="110" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="280" y1="70" x2="280" y2="180" stroke="#2563eb" strokeWidth="1" />
            
            {/* Reception Desk */}
            <path d="M80 140 L160 140 L150 180 L70 180 Z" fill="#1e293b" stroke="#334155" />
            <circle cx="120" cy="120" r="12" fill="#475569" /> {/* Office chair */}
            
            {/* Security Camera Wall Mounted */}
            <circle cx="20" cy="65" r="8" fill="var(--accent-primary)" opacity="0.4" />
            <line x1="10" y1="60" x2="20" y2="65" stroke="var(--text-muted)" strokeWidth="2" />
            
            {/* Human Silhouette in Lobby */}
            <g className="ai-target-drawn">
              <circle cx="140" cy="115" r="10" fill="#94a3b8" />
              <path d="M130 130 L150 130 L155 180 L145 180 L140 155 L135 180 L125 180 Z" fill="#94a3b8" />
            </g>
          </svg>
        );
      case 'warehouse':
        return (
          <svg className="env-svg" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Structure lines */}
            <line x1="0" y1="30" x2="400" y2="30" stroke="#1f2740" strokeWidth="1" />
            <line x1="200" y1="30" x2="200" y2="240" stroke="#1f2740" strokeWidth="1" strokeDasharray="3 3" />
            
            {/* Heavy Rack Left */}
            <rect x="10" y="50" width="50" height="150" fill="none" stroke="#334155" strokeWidth="2" />
            <line x1="10" y1="100" x2="60" y2="100" stroke="#334155" />
            <line x1="10" y1="150" x2="60" y2="150" stroke="#334155" />
            {/* Stock box items */}
            <rect x="15" y="60" width="40" height="35" fill="#1e293b" rx="2" />
            <rect x="15" y="110" width="40" height="35" fill="#334155" rx="2" />
            
            {/* Cargo Box Palette Right */}
            <rect x="275" y="105" width="80" height="100" fill="#1c1d29" stroke="var(--accent-secondary)" strokeWidth="1" />
            <rect x="285" y="145" width="60" height="50" fill="#2d3748" stroke="#4a5568" />
            <line x1="275" y1="145" x2="355" y2="145" stroke="var(--accent-secondary)" />
            
            {/* Forklift Silhouette */}
            <g className="ai-target-drawn">
              <rect x="75" y="150" width="80" height="40" fill="#475569" rx="4" />
              <circle cx="95" cy="195" r="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />
              <circle cx="135" cy="195" r="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />
              {/* Lift mast */}
              <rect x="145" y="115" width="6" height="75" fill="#94a3b8" />
              <path d="M151 155 L165 155 L165 175 L151 175 Z" fill="#cbd5e1" /> {/* Fork arms */}
            </g>
          </svg>
        );
      case 'retail':
        return (
          <svg className="env-svg" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Store Shelves Right side */}
            <rect x="260" y="40" width="130" height="170" fill="#13182b" stroke="#1f2740" />
            <line x1="260" y1="90" x2="390" y2="90" stroke="#1f2740" strokeWidth="2" />
            <line x1="260" y1="140" x2="390" y2="140" stroke="#1f2740" strokeWidth="2" />
            
            {/* Shelved Items */}
            <rect x="275" y="55" width="20" height="25" fill="var(--accent-secondary)" opacity="0.6" />
            <rect x="305" y="55" width="15" height="25" fill="var(--accent-warning)" opacity="0.6" />
            <rect x="340" y="55" width="25" height="25" fill="var(--accent-success)" opacity="0.6" />
            
            <rect x="275" y="105" width="30" height="25" fill="var(--accent-alert)" opacity="0.6" />
            <rect x="315" y="105" width="25" height="25" fill="#475569" />
            
            {/* Checkout Counter Lane Left */}
            <rect x="65" y="115" width="70" height="80" fill="#1e293b" stroke="#334155" />
            <rect x="75" y="90" width="30" height="25" fill="#0f172a" stroke="#1f2740" /> {/* Screen */}
            
            {/* Customer Silhouette shopping */}
            <g className="ai-target-drawn">
              <circle cx="210" cy="105" r="9" fill="#94a3b8" />
              <path d="M200 118 L220 118 L223 170 L215 170 L210 148 L205 170 L197 170 Z" fill="#94a3b8" />
              {/* Shopping basket */}
              <path d="M220 135 L232 135 L230 148 L218 148 Z" fill="var(--accent-warning)" />
              <path d="M220 135 C222 130, 228 130, 230 135" fill="none" stroke="var(--accent-warning)" strokeWidth="1.5" />
            </g>
          </svg>
        );
      case 'residential':
        return (
          <svg className="env-svg" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Sky, ground and house structure */}
            <path d="M0 160 L400 160 L400 240 L0 240 Z" fill="#090d16" /> {/* Driveway */}
            
            {/* House Exterior Garage Wall (Left) */}
            <rect x="0" y="40" width="120" height="120" fill="#13182b" stroke="#1f2740" />
            {/* Garage Door */}
            <rect x="15" y="90" width="90" height="70" fill="#1e293b" stroke="#334155" />
            <line x1="15" y1="105" x2="105" y2="105" stroke="#0f172a" />
            <line x1="15" y1="120" x2="105" y2="120" stroke="#0f172a" />
            <line x1="15" y1="135" x2="105" y2="135" stroke="#0f172a" />
            
            {/* Fence/Perimeter Wall Right background */}
            <rect x="120" y="100" width="280" height="60" fill="#0b0e17" stroke="#1f2740" />
            <line x1="120" y1="100" x2="400" y2="100" stroke="var(--accent-primary)" strokeWidth="1.5" strokeDasharray="3 3" /> {/* Laser security line */}
            
            {/* Parked Sedan Car in Driveway */}
            <g className="ai-target-drawn">
              {/* Wheels */}
              <circle cx="170" cy="195" r="14" fill="#0c0e16" stroke="#334155" strokeWidth="2" />
              <circle cx="255" cy="195" r="14" fill="#0c0e16" stroke="#334155" strokeWidth="2" />
              {/* Car Body */}
              <path d="M135 175 L150 150 L275 150 L290 170 L300 178 L300 190 L140 190 Z" fill="#475569" stroke="#cbd5e1" strokeWidth="1" />
              <rect x="165" y="156" width="40" height="15" fill="#0f172a" /> {/* Window front */}
              <rect x="210" y="156" width="45" height="15" fill="#0f172a" /> {/* Window rear */}
            </g>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="simulator" className="simulator-section section-dark">
      <div className="container">
        <div className="section-header">
          <div className="badge"><Activity size={14} /> LIVE CCTV SIMULATOR</div>
          <h2>Experience Smart Surveillance</h2>
          <p>Interact with our next-generation IP camera firmware module. Toggle security filters and witness real-time object classification and digital zoom controls.</p>
        </div>

        <div className="simulator-grid">
          {/* Controls - Left side */}
          <div className="sim-controls-panel glass-card">
            <h3 className="sim-panel-title">
              <Camera size={18} className="panel-icon" /> Camera Command Panel
            </h3>

            {/* Selector Environment */}
            <div className="sim-control-group">
              <label className="sim-label">1. Select Stream Location</label>
              <div className="env-selector-grid">
                {ENVIRONMENTS.map((env) => (
                  <button 
                    key={env.id} 
                    className={`env-btn ${activeEnv.id === env.id ? 'active' : ''}`}
                    onClick={() => handleEnvChange(env)}
                  >
                    {env.name}
                  </button>
                ))}
              </div>
              <p className="sim-help-text">{activeEnv.desc}</p>
            </div>

            {/* Toggle Dials */}
            <div className="sim-control-group">
              <label className="sim-label">2. Security Diagnostics</label>
              <div className="toggles-list">
                
                {/* Night Vision */}
                <div className="toggle-row">
                  <div className="toggle-info">
                    <span className="toggle-title">
                      <Eye size={16} /> Infrared Night Vision
                    </span>
                    <span className="toggle-subtitle">850nm IR Filter simulation</span>
                  </div>
                  <button 
                    className={`switch-btn ${nightVision ? 'active' : ''}`}
                    onClick={toggleNightVision}
                  >
                    <span className="switch-slider"></span>
                  </button>
                </div>

                {/* AI Detection */}
                <div className="toggle-row">
                  <div className="toggle-info">
                    <span className="toggle-title">
                      <Cpu size={16} /> AI Target Classification
                    </span>
                    <span className="toggle-subtitle">Bounding boxes & confidence</span>
                  </div>
                  <button 
                    className={`switch-btn ${aiDetection ? 'active' : ''}`}
                    onClick={toggleAi}
                  >
                    <span className="switch-slider"></span>
                  </button>
                </div>

                {/* Show Terminal Logs */}
                <div className="toggle-row">
                  <div className="toggle-info">
                    <span className="toggle-title">
                      <Terminal size={16} /> System Logging Feed
                    </span>
                    <span className="toggle-subtitle">Live stream terminal logs</span>
                  </div>
                  <button 
                    className={`switch-btn ${showLogs ? 'active' : ''}`}
                    onClick={() => setShowLogs(!showLogs)}
                  >
                    <span className="switch-slider"></span>
                  </button>
                </div>

              </div>
            </div>

            {/* PTZ Zoom Control */}
            <div className="sim-control-group">
              <div className="zoom-label-row">
                <label className="sim-label">
                  <ZoomIn size={16} /> 3. Digital PTZ Magnification
                </label>
                <span className="zoom-value">{zoomLevel.toFixed(1)}x</span>
              </div>
              <input 
                type="range" 
                min="1.0" 
                max="4.0" 
                step="0.5" 
                value={zoomLevel} 
                onChange={handleZoom}
                className="zoom-slider"
              />
              <div className="zoom-ticks">
                <span>1.0x (Wide)</span>
                <span>2.5x</span>
                <span>4.0x (Tele)</span>
              </div>
            </div>

            {/* Specs box Info */}
            <div className="sim-specs-box">
              <Info size={16} className="specs-info-icon" />
              <div>
                <h5>Recommended Hardware</h5>
                <p>This layout operates best with our <strong>NS-UltraDome 8MP AI</strong> or <strong>NS-Bullet 4K Pro</strong> units connected to a 10Gbps local NVR core.</p>
              </div>
            </div>
          </div>

          {/* CCTV Feed Display - Right side */}
          <div className="sim-feed-viewport glass-card">
            {/* Top Bar status details */}
            <div className="feed-header">
              <div className="feed-status-rec">
                <span className="feed-rec-dot"></span>
                <span>FEED ACTIVE</span>
              </div>
              <div className="feed-cam-name">CAM_{activeEnv.id.toUpperCase()}_SECURE</div>
              <div className="feed-quality-badge">4K HDR</div>
            </div>

            {/* Main Visual Display Block */}
            <div className={`feed-display-screen ${nightVision ? 'night-vision-mode' : ''}`}>
              
              {/* Video Overlay grid and CRT effects */}
              <div className="feed-grid-layer"></div>
              <div className="feed-crt-scanline"></div>
              <div className="feed-noise-overlay"></div>

              {/* Vector Graphic environment scalable container */}
              <div 
                className="feed-viewport-scaler" 
                style={{ 
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.4s cubic-bezier(0.1, 0.8, 0.2, 1)' 
                }}
              >
                {renderEnvSvg()}

                {/* AI Targets Layer overlays */}
                {aiDetection && activeEnv.targets.map((target) => (
                  <div 
                    key={target.id}
                    className={`ai-bounding-box type-${target.type}`}
                    style={{
                      left: target.x,
                      top: target.y,
                      width: target.w,
                      height: target.h
                    }}
                  >
                    <div className="ai-box-label">
                      <span>{target.label}</span>
                      <span className="ai-box-score">{target.score}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tactical Crosshair overlay */}
              <div className="tactical-crosshair">
                <div className="cross-line vertical"></div>
                <div className="cross-line horizontal"></div>
                <div className="center-aim"></div>
              </div>

              {/* Floating diagnostic values (Telemetry) */}
              <div className="feed-telemetry feed-telemetry-left">
                <div>FPS: {fps}</div>
                <div>NET: {bitrate} Mbps</div>
                <div>STREAM: H.265+</div>
                <div>ISO: {nightVision ? '800 (IR)' : '100'}</div>
              </div>
              <div className="feed-telemetry feed-telemetry-right">
                <div>TIME: {timestamp}</div>
                <div>LATENCY: 4.2ms</div>
                <div>PTZ: {zoomLevel > 1.0 ? `${zoomLevel.toFixed(1)}x ZOOM` : 'WIDE'}</div>
                <div>ENCRYPTION: AES-256</div>
              </div>
            </div>

            {/* System console logs panel - Bottom of monitor */}
            {showLogs && (
              <div className="feed-terminal-logs">
                <div className="terminal-header">
                  <span>SYSTEM DIAGNOSTIC LOG FEED</span>
                  <span className="terminal-dot"></span>
                </div>
                <div className="terminal-body">
                  {logs.map((log, index) => (
                    <div key={index} className="terminal-row">{log}</div>
                  ))}
                  <div ref={logsEndRef} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

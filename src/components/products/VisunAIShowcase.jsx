import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ArrowRight, Check, Play, Shield, AlertTriangle, Usb } from 'lucide-react';
import './visunai-showcase.css';
import visunVideo from './visun-demo.mp4';
import visunImg from './visun-dashboard.png';

gsap.registerPlugin(ScrollTrigger);

const VISUNAI = 'https://visunai.globalcyberassociates.com';

/* ─── Particle Canvas ─────────────────────────────────────── */
function ParticleCanvas() {
  const ref = useRef(null);
  const anim = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const pts = Array.from({ length: 65 }, (_, i) => ({
      x: Math.random() * (w || 800),
      y: Math.random() * (h || 600),
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r: Math.random() * 2.2 + 0.8,
      pulse: Math.random() * Math.PI * 2,
      ps: 0.018 + Math.random() * 0.018,
      threat: i < 6,
      op: 0.45 + Math.random() * 0.35,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 125) {
            const a = (1 - d / 125) * 0.22 * pts[i].op;
            ctx.strokeStyle = pts[i].threat || pts[j].threat
              ? `rgba(239,68,68,${a * 0.7})`
              : `rgba(34,211,238,${a})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
          }
        }
      }
      pts.forEach(p => {
        p.pulse += p.ps;
        const r = p.r * (0.8 + Math.sin(p.pulse) * 0.2);
        const c = p.threat ? '239,68,68' : '34,211,238';
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 5);
        g.addColorStop(0, `rgba(${c},${p.op * 0.35})`); g.addColorStop(1, `rgba(${c},0)`);
        ctx.beginPath(); ctx.arc(p.x, p.y, r * 5, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fillStyle = `rgba(${c},${p.op})`; ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < -8) p.x = w + 8; if (p.x > w + 8) p.x = -8;
        if (p.y < -8) p.y = h + 8; if (p.y > h + 8) p.y = -8;
      });
      anim.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(anim.current); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className="va-hero-canvas" />;
}

/* ─── Network Topology SVG ────────────────────────────────── */
function NetworkMap() {
  const svgRef = useRef(null);

  const devices = [
    { id: 'core',  cx: 280, cy: 200, label: '🖥', text: 'VisuN Core',  cls: 'va-node-core',   r: 24 },
    { id: 'd1',    cx: 100, cy: 80,  label: '💻', text: 'Laptop-01',   cls: 'va-node-device', r: 15 },
    { id: 'd2',    cx: 280, cy: 50,  label: '🖨', text: 'Server-A',    cls: 'va-node-safe',   r: 15 },
    { id: 'd3',    cx: 460, cy: 80,  label: '📱', text: 'Mobile-03',   cls: 'va-node-device', r: 15 },
    { id: 'd4',    cx: 80,  cy: 220, label: '🖥', text: 'Desktop-02',  cls: 'va-node-device', r: 15 },
    { id: 'd5',    cx: 480, cy: 220, label: '📟', text: 'IoT-Sensor',  cls: 'va-node-device', r: 15 },
    { id: 'd6',    cx: 160, cy: 340, label: '💾', text: 'NAS-01',      cls: 'va-node-safe',   r: 15 },
    { id: 'rogue', cx: 400, cy: 340, label: '⚠',  text: 'Unknown!',    cls: 'va-node-rogue',  r: 15 },
  ];

  const links = [
    ['core','d1'],['core','d2'],['core','d3'],
    ['core','d4'],['core','d5'],['core','d6'],['core','rogue'],
  ];

  const getNode = id => devices.find(d => d.id === id);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const ctx = gsap.context(() => {
      const lines = svg.querySelectorAll('.va-net-line, .va-net-line-threat');
      lines.forEach(l => {
        const len = 200;
        gsap.set(l, { strokeDasharray: len, strokeDashoffset: len });
      });

      gsap.fromTo(
        svg.querySelectorAll('circle[class*="va-node"]'),
        { scale: 0, opacity: 0, transformOrigin: 'center center' },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(2)',
          transformOrigin: 'center center',
          scrollTrigger: { trigger: svg, start: 'top 80%', once: true },
        }
      );

      gsap.to(lines, {
        strokeDashoffset: 0, duration: 1.2, stagger: 0.12, ease: 'power2.inOut',
        scrollTrigger: { trigger: svg, start: 'top 80%', once: true },
      });
    }, svg);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 560 400" className="va-net-svg">
      <defs>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="280" cy="200" r="60" fill="url(#coreGlow)" />

      {links.map(([a, b]) => {
        const na = getNode(a), nb = getNode(b);
        return (
          <line key={`${a}-${b}`}
            x1={na.cx} y1={na.cy} x2={nb.cx} y2={nb.cy}
            className={b === 'rogue' ? 'va-net-line-threat' : 'va-net-line'}
          />
        );
      })}

      {links.filter(([, b]) => b !== 'rogue').map(([a, b], i) => {
        const na = getNode(a), nb = getNode(b);
        return (
          <circle key={`pkt-${i}`} r="3" className="va-packet">
            <animateMotion dur={`${2 + i * 0.4}s`} repeatCount="indefinite">
              <mpath href={`#link-${a}-${b}`} />
            </animateMotion>
          </circle>
        );
      })}
      {links.filter(([, b]) => b !== 'rogue').map(([a, b]) => {
        const na = getNode(a), nb = getNode(b);
        return <path key={`def-${a}-${b}`} id={`link-${a}-${b}`} d={`M${na.cx},${na.cy} L${nb.cx},${nb.cy}`} fill="none" />;
      })}

      <circle r="3" className="va-packet-threat">
        <animateMotion dur="2s" repeatCount="indefinite">
          <mpath href="#link-rogue" />
        </animateMotion>
      </circle>
      <path id="link-rogue" d="M400,340 L280,200" fill="none" />

      {devices.map(d => (
        <g key={d.id}>
          <circle cx={d.cx} cy={d.cy} r={d.r} className={d.cls} />
          <text x={d.cx} y={d.cy} className="va-node-icon">{d.label}</text>
          <text x={d.cx} y={d.cy + d.r + 12} className="va-node-text">{d.text}</text>
        </g>
      ))}
    </svg>
  );
}

/* ─── Activity Feed ───────────────────────────────────────── */
const EMPLOYEES = [
  { name: 'Arjun Mehta',  initials: 'AM', color: '#6366f1', status: 'online',  app: 'VS Code',  appColor: '#007acc', activity: 88, time: 'now'    },
  { name: 'Priya Sharma', initials: 'PS', color: '#8b5cf6', status: 'online',  app: 'Chrome',   appColor: '#f59e0b', activity: 72, time: '1m ago'  },
  { name: 'Rahul Das',    initials: 'RD', color: '#0ea5e9', status: 'away',    app: 'Excel',    appColor: '#10b981', activity: 45, time: '4m ago'  },
  { name: 'Sneha Patel',  initials: 'SP', color: '#22d3ee', status: 'online',  app: 'Slack',    appColor: '#4a154b', activity: 91, time: 'now'    },
  { name: 'Karthik Roy',  initials: 'KR', color: '#f59e0b', status: 'offline', app: 'Outlook',  appColor: '#0078d4', activity: 20, time: '18m ago' },
];

function ActivityFeed() {
  const ref = useRef(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.va-feed-row'),
        { x: -32, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true,
            onEnter: () => setTimeout(() => setShowAlert(true), 2400),
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="va-feed">
      <div className="va-feed-header">
        <span className="va-feed-title">Live Employee Activity</span>
        <span className="va-feed-live"><span className="va-feed-live-dot" />Live</span>
      </div>

      {showAlert && (
        <div className="va-alert-row">
          <div className="va-alert-icon"><Usb size={16} /></div>
          <div className="va-alert-text">
            <div className="va-feed-name">USB Device Detected — Rahul Das</div>
            <div className="va-feed-app">Unauthorised storage device plugged into Desktop-02</div>
          </div>
          <span className="va-alert-badge">Logged</span>
        </div>
      )}

      {EMPLOYEES.map((e) => (
        <div key={e.name} className="va-feed-row">
          <div className={`va-avatar va-status-ring ${e.status}`}
            style={{ background: e.color + '22', border: `1.5px solid ${e.color}44` }}>
            <span style={{ color: e.color, fontSize: '.72rem', fontWeight: 800 }}>{e.initials}</span>
          </div>
          <div className="va-feed-info">
            <div className="va-feed-name">{e.name}</div>
            <div className="va-feed-app">
              <span className="va-feed-app-dot" style={{ background: e.appColor }} />{e.app}
            </div>
          </div>
          <div className="va-activity-bar-wrap">
            <div className="va-activity-label">{e.activity}%</div>
            <div className="va-activity-bar">
              <div className="va-activity-fill"
                style={{ background: `linear-gradient(90deg,${e.color},${e.color}cc)` }}
                data-width={e.activity} />
            </div>
          </div>
          <span className="va-feed-time">{e.time}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Threat Steps ────────────────────────────────────────── */
const STEPS = [
  {
    step: 'step-detect',
    icon: <Usb size={20} />,
    title: 'USB Device Connected',
    desc: 'An unauthorised Kingston 32GB USB drive was inserted into endpoint Desktop-02 by user Rahul Das at 14:37:02.',
    stamp: '14:37:02.441',
  },
  {
    step: 'step-alert',
    icon: <AlertTriangle size={20} />,
    title: 'Policy Violation Detected',
    desc: 'Device not on approved whitelist. 2.4 GB file copy attempt initiated — flagged against DLP rule #14.',
    stamp: '14:37:02.688',
  },
  {
    step: 'step-block',
    icon: <Shield size={20} />,
    title: 'Activity Logged · Admin Notified',
    desc: 'File copy activity recorded in full detail. Incident log created with user, device, timestamp, and file path. Security admin alerted via email.',
    stamp: '14:37:02.910',
  },
];

function ThreatSteps() {
  const ref = useRef(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.va-threat-step'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.25, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true,
            onEnter: () => STEPS.forEach((_, i) => setTimeout(() => setActive(i), 400 + i * 800)),
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="va-threat-board">
      {STEPS.map((s, i) => (
        <div key={s.step} className={`va-threat-step ${s.step}${active >= i ? ' va-step-active' : ''}`}>
          <div className="va-step-icon">{s.icon}</div>
          <div className="va-step-body">
            <div className="va-step-title">{s.title}</div>
            <div className="va-step-desc">{s.desc}</div>
            {active >= i && (
              <div className="va-step-stamp">
                <span style={{ marginRight: 4, opacity: 0.5 }}>■</span>
                {s.stamp} UTC
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Radar SVG ───────────────────────────────────────────── */
function RadarSVG() {
  return (
    <svg width="180" height="180" viewBox="0 0 200 200" style={{ display: 'block' }}>
      <circle cx="100" cy="100" r="90" className="va-radar-ring" />
      <circle cx="100" cy="100" r="60" className="va-radar-ring" />
      <circle cx="100" cy="100" r="30" className="va-radar-ring" />
      <line x1="100" y1="10" x2="100" y2="190" className="va-radar-crosshair" />
      <line x1="10" y1="100" x2="190" y2="100" className="va-radar-crosshair" />
      <g className="va-radar-sweep">
        <path d="M100,100 L100,10 A90,90 0 0,1 190,100 Z" className="va-sweep-path" />
      </g>
      <circle cx="148" cy="72"  r="5" className="va-radar-target" />
      <circle cx="62"  cy="138" r="4" className="va-radar-target" style={{ animationDelay: '0.6s' }} />
      <circle cx="130" cy="145" r="5" className="va-radar-target" style={{ animationDelay: '1.1s' }} />
    </svg>
  );
}

/* ─── Metrics Cards ───────────────────────────────────────── */
function GaugeCard({ label, pct, sub }) {
  const ref = useRef(null);
  const circumference = 163;
  const finalOffset = circumference - (pct / 100) * circumference;
  const fillRef = useRef(null);
  const valRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: pct, duration: 1.4, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate: () => {
          if (fillRef.current) {
            const off = circumference - (obj.val / 100) * circumference;
            fillRef.current.style.strokeDashoffset = off;
          }
          if (valRef.current) valRef.current.textContent = `${Math.round(obj.val)}%`;
        },
      });
    }, el);
    return () => ctx.revert();
  }, [pct]);

  return (
    <div ref={ref} className="va-metric-card" style={{ '--mc': '#22d3ee' }}>
      <div className="va-metric-label">{label}</div>
      <div className="va-gauge-wrap">
        <svg width="70" height="70" viewBox="0 0 70 70" className="va-gauge-svg">
          <circle cx="35" cy="35" r="26" className="va-gauge-track" />
          <circle ref={fillRef} cx="35" cy="35" r="26" className="va-gauge-fill"
            style={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            transform="rotate(-90 35 35)" />
          <text ref={valRef} x="35" y="35" className="va-gauge-val">0%</text>
        </svg>
        <div>
          <div className="va-metric-val" style={{ fontSize: '1.5rem' }}>{pct}%</div>
          <div className="va-metric-sub">{sub}</div>
        </div>
      </div>
    </div>
  );
}

function CounterCard({ label, target, suffix = '', sub, color = '#22d3ee' }) {
  const ref = useRef(null);
  const valRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target, duration: 1.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate: () => { if (valRef.current) valRef.current.textContent = `${Math.round(obj.v)}${suffix}`; },
      });
    }, el);
    return () => ctx.revert();
  }, [target, suffix]);

  return (
    <div ref={ref} className="va-metric-card" style={{ '--mc': color }}>
      <div className="va-metric-label">{label}</div>
      <div ref={valRef} className="va-metric-val" style={{ color }}>0</div>
      <div className="va-metric-sub">{sub}</div>
      <div className="va-event-list">
        {[
          { cls: 'alert', txt: 'USB activity logged — Desktop-02' },
          { cls: 'warn',  txt: 'Large file copy detected & logged' },
          { cls: 'ok',    txt: 'Scan completed — clear' },
        ].map((e, i) => (
          <div key={i} className={`va-event-item ${e.cls}`}>
            <span className="va-event-dot" />{e.txt}
          </div>
        ))}
      </div>
    </div>
  );
}

function WaveCard({ label, sub }) {
  const w = 220, h = 50;
  const pts = [0, 18, 8, 32, 14, 40, 28, 22, 38, 48, 46, 30, 52, 12, 60, 36, 72, 24, 82, 44, 92, 16, 100, 38, 110, 28, 120, 46, 132, 20, 140, 34, 152, 10, 160, 42, 170, 22, 180, 38, 192, 16, 200, 30, 210, 44, 220, 20];
  const d = pts.reduce((acc, v, i) => i % 2 === 0 ? acc + `${i === 0 ? 'M' : 'L'}${v},${h - pts[i + 1]} ` : acc, '');
  const fill = `${d} L${w},${h} L0,${h} Z`;
  return (
    <div className="va-metric-card" style={{ '--mc': '#8b5cf6' }}>
      <div className="va-metric-label">{label}</div>
      <div className="va-metric-val" style={{ color: '#8b5cf6', fontSize: '1.6rem' }}>24/7</div>
      <div className="va-metric-sub">{sub}</div>
      <svg viewBox={`0 0 ${w} ${h}`} className="va-wave-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={fill} className="va-wave-fill" />
        <path d={d} className="va-wave-path" stroke="#8b5cf6" />
      </svg>
    </div>
  );
}

function UptimeCard() {
  return (
    <div className="va-metric-card" style={{ '--mc': '#10b981' }}>
      <div className="va-metric-label">System Health</div>
      <div className="va-metric-val" style={{ color: '#10b981' }}>99.9%</div>
      <div className="va-metric-sub">Uptime SLA</div>
      <div className="va-event-list" style={{ marginTop: '.8rem' }}>
        {[
          { cls: 'ok',   txt: 'All agents responsive' },
          { cls: 'ok',   txt: 'DB replication healthy' },
          { cls: 'warn', txt: 'Agent update pending ×3' },
        ].map((e, i) => (
          <div key={i} className={`va-event-item ${e.cls}`}>
            <span className="va-event-dot" />{e.txt}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── File Tree ───────────────────────────────────────────── */
function FileTree() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.va-tree-row'),
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="va-file-tree">
      <div className="va-tree-header">
        <span className="va-tree-dot" style={{ background: '#ef4444' }} />
        <span className="va-tree-dot" style={{ background: '#f59e0b' }} />
        <span className="va-tree-dot" style={{ background: '#10b981' }} />
        <span className="va-tree-title">File Monitor — Desktop-02 / C:/Users/Rahul</span>
      </div>
      <div className="va-tree-body">
        <div className="va-tree-row"><span className="va-tree-icon">📁</span><span className="va-tree-name">Documents/</span></div>
        <div className="va-tree-row new-file"><span className="va-tree-indent"/><span className="va-tree-icon">📄</span><span className="va-tree-name">Q3_Report_FINAL.xlsx</span><span className="va-tree-badge">New</span></div>
        <div className="va-tree-row modified"><span className="va-tree-indent"/><span className="va-tree-icon">📝</span><span className="va-tree-name">client_contracts.docx</span><span className="va-tree-badge">Modified</span></div>
        <div className="va-tree-row"><span className="va-tree-indent"/><span className="va-tree-icon">📄</span><span className="va-tree-name">meeting_notes.txt</span></div>
        <div className="va-tree-row"><span className="va-tree-icon">📁</span><span className="va-tree-name">Downloads/</span></div>
        <div className="va-tree-row blocked"><span className="va-tree-indent"/><span className="va-tree-icon">💾</span><span className="va-tree-name">employee_data_export.csv</span><span className="va-tree-badge">Logged</span></div>
        <div className="va-tree-row modified"><span className="va-tree-indent"/><span className="va-tree-icon">🗜</span><span className="va-tree-name">archive_backup.zip</span><span className="va-tree-badge">Modified</span></div>
        <div className="va-tree-row"><span className="va-tree-icon">📁</span><span className="va-tree-name">Desktop/</span></div>
        <div className="va-tree-row new-file"><span className="va-tree-indent"/><span className="va-tree-icon">📊</span><span className="va-tree-name">salary_sheet_2024.xlsx</span><span className="va-tree-badge">New</span></div>
        <div className="va-tree-row"><span className="va-tree-indent"/><span className="va-tree-icon">🖼</span><span className="va-tree-name">screenshot_001.png</span></div>
      </div>
    </div>
  );
}

/* ─── Video Player ────────────────────────────────────────── */
function VideoPlayer() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const handlePlay = () => { setPlaying(true); setTimeout(() => videoRef.current?.play(), 50); };
  return (
    <div className="va-video-wrap">
      <video ref={videoRef} src={visunVideo} poster={visunImg} controls={playing}
        preload="none" className="va-video-el" onEnded={() => setPlaying(false)} />
      {!playing && (
        <div className="va-video-overlay" onClick={handlePlay}>
          <div className="va-play-ring"><Play size={28} fill="currentColor" /></div>
          <span className="va-play-label">Watch Demo</span>
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────── */
const CHAPTERS = ['Hero', 'Network', 'Activity', 'Threats', 'Metrics', 'Files', 'Demo', 'Start'];

export default function VisunAIShowcase() {
  const navigate = useNavigate();
  const progressRef = useRef(null);
  const heroRef = useRef(null);
  const ctaRef = useRef(null);
  const [activeChap, setActiveChap] = useState(0);
  const raf = useRef(null);

  /* Scroll progress bar */
  useEffect(() => {
    const onScroll = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const top = window.scrollY;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        if (progressRef.current) progressRef.current.style.width = h > 0 ? `${(top / h) * 100}%` : '0%';
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf.current); };
  }, []);

  /* Chapter tracking */
  useEffect(() => {
    const secs = document.querySelectorAll('[data-ch]');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveChap(+e.target.dataset.ch); }),
      { threshold: 0.3 }
    );
    secs.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  /* Hero GSAP entrance */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(hero.querySelector('.va-hero-badge'), { y: -20, opacity: 0, duration: 0.6, ease: 'power3.out' })
        .from(hero.querySelectorAll('.va-h1-word'), { y: 70, opacity: 0, duration: 0.75, stagger: 0.09, ease: 'power4.out' }, '-=0.2')
        .from(hero.querySelector('.va-hero-sub'), { y: 24, opacity: 0, duration: 0.65, ease: 'power3.out' }, '-=0.35')
        .from(hero.querySelectorAll('.va-hero-btns > *'), { y: 20, opacity: 0, duration: 0.55, stagger: 0.1, ease: 'power3.out' }, '-=0.3');
    }, hero);

    return () => ctx.revert();
  }, []);

  /* Reveal sections with GSAP ScrollTrigger */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = [
        { sel: '.va-reveal',    from: { y: 50, opacity: 0 },       to: { y: 0, opacity: 1 } },
        { sel: '.va-reveal-l',  from: { x: -60, opacity: 0 },      to: { x: 0, opacity: 1 } },
        { sel: '.va-reveal-r',  from: { x:  60, opacity: 0 },      to: { x: 0, opacity: 1 } },
        { sel: '.va-reveal-sc', from: { scale: 0.9, opacity: 0 },  to: { scale: 1, opacity: 1 } },
      ];

      reveals.forEach(({ sel, from, to }) => {
        document.querySelectorAll(sel).forEach(el => {
          const delay = parseFloat(el.dataset.delay || '0');
          ScrollTrigger.create({
            trigger: el, start: 'top 88%', once: true,
            onEnter: () => gsap.fromTo(el, from, { ...to, duration: 0.75, ease: 'power3.out', delay }),
          });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  /* CTA entrance */
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el, start: 'top 80%', once: true,
        onEnter: () => {
          gsap.fromTo(
            el.querySelectorAll('.va-cta-h2,.va-cta-sub,.va-hero-badge,.va-hero-btns,.va-trust'),
            { y: 35, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: 'power3.out' }
          );
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  /* Activity bar widths */
  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll('.va-activity-fill[data-width]').forEach(el => {
        ScrollTrigger.create({
          trigger: el, start: 'top 90%', once: true,
          onEnter: () => gsap.fromTo(el, { width: '0%' }, { width: `${el.dataset.width}%`, duration: 1, ease: 'power2.out' }),
        });
      });
    });
    return () => ctx.revert();
  }, []);

  /* Metrics grid stagger */
  useEffect(() => {
    const grid = document.querySelector('.va-metrics-grid');
    if (!grid) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        grid.querySelectorAll('.va-metric-card'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: grid, start: 'top 85%', once: true } }
      );
    }, grid);
    return () => ctx.revert();
  }, []);

  const scrollTo = idx => document.querySelector(`[data-ch="${idx}"]`)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="va-page va">

      <Helmet>
        <title>VisuN AI — Employee &amp; Network Monitoring Software | Global Cyber Associates</title>
        <meta name="description" content="VisuN AI is real-time employee and network monitoring software: live device visibility, user activity monitoring, USB &amp; file activity logging, insider threat detection, and vulnerability scanning. From $2 per endpoint/month." />
        <meta name="keywords" content="VisuN AI, employee monitoring software, user activity monitoring, insider threat detection, endpoint monitoring, network monitoring tool, USB monitoring, file activity logging, DLP software, data loss prevention, remote workforce monitoring, employee productivity monitoring, UEBA, behavior analytics, real-time network visibility" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.globalcyberassociates.com/products/visunai" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="VisuN AI — Employee &amp; Network Monitoring Software | GCA" />
        <meta property="og:description" content="See every device, every employee, every file — live. Insider threat detection, USB &amp; file logging, and vulnerability scanning from $2 per endpoint/month." />
        <meta property="og:url" content="https://www.globalcyberassociates.com/products/visunai" />
        <meta property="og:image" content="https://www.globalcyberassociates.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VisuN AI — Employee &amp; Network Monitoring Software | GCA" />
        <meta name="twitter:description" content="Real-time employee and network monitoring with insider threat detection. From $2 per endpoint/month." />
        <meta name="twitter:image" content="https://www.globalcyberassociates.com/logo.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.globalcyberassociates.com/" },
            { "@type": "ListItem", position: 2, name: "Products", item: "https://www.globalcyberassociates.com/products" },
            { "@type": "ListItem", position: 3, name: "VisuN AI", item: "https://www.globalcyberassociates.com/products/visunai" }
          ]
        })}</script>
      </Helmet>

      {/* Top bar */}
      <div className="va-topbar">
        <button className="va-back" onClick={() => navigate('/products')}>
          <ChevronLeft size={15} /> Products
        </button>
        <span className="va-topbar-logo">VisuN AI</span>
        <a href={VISUNAI} target="_blank" rel="noopener noreferrer" className="va-topbar-cta">
          Open Platform <ArrowRight size={13} />
        </a>
      </div>

      {/* Progress */}
      <div className="va-prog"><div className="va-prog-fill" ref={progressRef} /></div>

      {/* Chapter dots */}
      <nav className="va-dots">
        {CHAPTERS.map((label, i) => (
          <button key={i} className={`va-dot${activeChap === i ? ' on' : ''}`}
            onClick={() => scrollTo(i)} title={label} aria-label={label} />
        ))}
      </nav>

      {/* ══ HERO ══ */}
      <section className="va-hero" data-ch="0" ref={heroRef}>
        <ParticleCanvas />
        <div className="va-hero-inner">
          <div>
            <div className="va-hero-badge">
              <span className="va-badge-live" />
              Monitoring · 24 / 7 · Real-Time
            </div>
            <h1 className="va-hero-h1">
              {['Your', 'Entire'].map(w => <React.Fragment key={w}><span className="va-h1-word">{w}</span>{' '}</React.Fragment>)}
              <br />
              <span className="va-h1-word va-h1-grad">Organization.</span>
              <br />
              {['One', 'Screen.'].map(w => <React.Fragment key={w}><span className="va-h1-word">{w}</span>{' '}</React.Fragment>)}
            </h1>
            <p className="va-hero-sub">
              VisuN AI shows you every device, every employee, every file — live.
              The moment something unusual happens, you know first.
            </p>
            <div className="va-hero-btns">
              <a href={VISUNAI} target="_blank" rel="noopener noreferrer" className="va-btn-p">
                Start Free Trial <ArrowRight size={16} />
              </a>
              <button className="va-btn-s" onClick={() => scrollTo(6)}>
                <Play size={14} fill="currentColor" /> Watch Demo
              </button>
            </div>
          </div>
        </div>
        <div className="va-scroll-cue">
          <span>Scroll to explore</span>
          <div className="va-scroll-arrow"><div className="va-scroll-dot" /></div>
        </div>
      </section>

      {/* ══ NETWORK MAP ══ */}
      <section className="va-scene va-scene-dark" data-ch="1">
        <div className="va-scene-inner">
          <div className="va-scene-grid cols2">
            <div className="va-reveal">
              <span className="va-label">Live Network</span>
              <h2 className="va-h2">Every device.<br /><span className="va-accent">Every connection.</span></h2>
              <p className="va-body">
                VisuN AI builds a real-time force-graph of your entire network topology.
                See laptops, servers, mobile devices, IoT sensors — and instantly spot anything that doesn't belong.
              </p>
              <ul className="va-checklist">
                {['Rogue device detected in 0.2 seconds', 'Data packets visualized in real time', 'Threat nodes highlighted automatically'].map(t => (
                  <li key={t} className="va-check-item">
                    <span className="va-check-icon"><Check size={13} /></span>{t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="va-reveal-r">
              <NetworkMap />
            </div>
          </div>
        </div>
      </section>

      {/* ══ ACTIVITY FEED ══ */}
      <section className="va-scene va-activity-scene" data-ch="2">
        <div className="va-scene-inner">
          <div className="va-scene-grid cols2-rev">
            <div className="va-reveal">
              <span className="va-label">Employee Monitoring</span>
              <h2 className="va-h2">Know what<br /><span className="va-accent">every employee</span><br />is doing.</h2>
              <p className="va-body">
                See active applications, productivity scores, and real-time status for every member of your team.
                When a suspicious device appears — you get the alert instantly.
              </p>
            </div>
            <div className="va-reveal-r">
              <ActivityFeed />
            </div>
          </div>
        </div>
      </section>

      {/* ══ THREAT DETECTION ══ */}
      <section className="va-scene va-threat-scene" data-ch="3">
        <div className="va-scene-inner">
          <div className="va-section-header va-reveal">
            <span className="va-label">Threat Detection</span>
            <h2 className="va-h2">Detect. Alert. <span className="va-accent">Log.</span></h2>
            <p className="va-body">
              From USB insertion to DLP violation — every event is caught, logged,
              and surfaced to your security team in milliseconds.
            </p>
          </div>
          <div className="va-threat-layout">
            <div className="va-reveal">
              <RadarSVG />
            </div>
            <div className="va-reveal-r">
              <ThreatSteps />
            </div>
          </div>
        </div>
      </section>

      {/* ══ LIVE METRICS ══ */}
      <section className="va-scene va-metrics-scene" data-ch="4">
        <div className="va-scene-inner">
          <div className="va-section-header va-reveal">
            <span className="va-label">Live Intelligence</span>
            <h2 className="va-h2">Real-time metrics,<br /><span className="va-accent">zero guesswork.</span></h2>
          </div>
          <div className="va-metrics-grid">
            <GaugeCard label="Agent CPU Impact" pct={1} sub="Lightweight. Always-on." />
            <CounterCard label="Security Events Today" target={247} suffix="" sub="Scanned and processed" color="#ef4444" />
            <WaveCard label="Network Activity" sub="Continuous monitoring" />
            <UptimeCard />
          </div>
        </div>
      </section>

      {/* ══ FILE MONITOR ══ */}
      <section className="va-scene va-file-monitor" data-ch="5">
        <div className="va-scene-inner">
          <div className="va-scene-grid cols2">
            <div className="va-reveal">
              <span className="va-label">File Monitor & DLP</span>
              <h2 className="va-h2">Every file move.<br /><span className="va-accent">Fully logged.</span></h2>
              <p className="va-body">
                Every file rename, copy, and deletion — tracked in real time across all endpoints.
                Sensitive file activity is logged with full context: who, what, when, and where.
              </p>
              <div className="va-dlp-strip va-reveal" data-delay="0.2">
                <Shield size={18} className="va-dlp-icon" />
                <div className="va-dlp-text">
                  <strong>File Monitor Alert</strong> — employee_data_export.csv copied to external USB on Desktop-02. Event logged with full audit trail.
                </div>
                <span className="va-dlp-ok">Logged</span>
              </div>
            </div>
            <div className="va-reveal-r" data-delay="0.1">
              <FileTree />
            </div>
          </div>
        </div>
      </section>

      {/* ══ DEMO VIDEO ══ */}
      <section className="va-scene va-demo-scene" data-ch="6">
        <div className="va-scene-inner">
          <div className="va-section-header va-reveal">
            <span className="va-label">Product Demo</span>
            <h2 className="va-h2">See it live in <span className="va-accent">60 seconds.</span></h2>
          </div>
          <div className="va-reveal-sc" data-delay="0.1">
            <VideoPlayer />
          </div>
          <div className="va-trust va-reveal" data-delay="0.25">
            {['Real product — no staged demo', 'Live data from real agents', 'Setup in under 10 minutes'].map(t => (
              <span key={t} className="va-trust-item"><Check size={13} />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="va-cta" data-ch="7">
        <div className="va-cta-orb" />
        <div ref={ctaRef} className="va-cta-inner">
          <div className="va-hero-badge" style={{ marginBottom: '1.2rem' }}>
            <span className="va-badge-live" /> Ready to deploy
          </div>
          <h2 className="va-cta-h2">
            See your entire org —<br />
            <span className="va-h1-grad">in under 10 minutes.</span>
          </h2>
          <p className="va-cta-sub">
            No credit card. No complex setup. Deploy the agent, connect your devices,
            and get complete visibility immediately.
          </p>
          <div className="va-hero-btns">
            <a href={VISUNAI} target="_blank" rel="noopener noreferrer" className="va-btn-p">
              Start Free Trial <ArrowRight size={16} />
            </a>
            <a href="mailto:info@globalcyberassociates.com?subject=VisuN AI Demo" className="va-btn-s">
              Talk to Sales
            </a>
          </div>
          <div className="va-trust">
            {['No credit card', '7-day full access', 'Setup < 10 min', 'Cancel anytime'].map(t => (
              <span key={t} className="va-trust-item"><Check size={12} />{t}</span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

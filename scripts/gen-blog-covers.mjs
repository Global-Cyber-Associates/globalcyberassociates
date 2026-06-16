/**
 * Branded blog cover generator for Global Cyber Associates.
 * Renders an on-brand 1200x630 SVG per topic and rasterizes to PNG
 * (PNG so social crawlers — LinkedIn/Facebook/X — render og:image reliably).
 *
 * Run:  node scripts/gen-blog-covers.mjs
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "blog-images");
mkdirSync(OUT, { recursive: true });

const W = 1200, H = 630;

/* Simple, reliable icon glyphs (stroked vector paths, 0..100 viewBox) */
const GLYPHS = {
  shieldEye:
    'M50 8 L86 22 V52 C86 78 68 92 50 98 C32 92 14 78 14 52 V22 Z M50 40 a14 14 0 1 0 0.1 0 M50 47 a7 7 0 1 0 0.1 0',
  radar:
    'M50 50 m-42 0 a42 42 0 1 0 84 0 a42 42 0 1 0 -84 0 M50 50 m-26 0 a26 26 0 1 0 52 0 a26 26 0 1 0 -52 0 M50 50 L50 8 M50 50 L88 64',
  lockFile:
    'M30 16 H62 L78 32 V90 H30 Z M62 16 V32 H78 M44 52 h20 v18 h-20 z M48 52 v-6 a6 6 0 0 1 12 0 v6',
  warnLock:
    'M50 10 L92 86 H8 Z M50 44 v18 M50 72 v0.1 M50 70 m-1 0 a1 1 0 1 0 2 0 a1 1 0 1 0 -2 0',
  hook:
    'M40 18 a14 14 0 0 1 28 0 V62 a18 18 0 1 1 -36 0 M32 62 m-5 0 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0 M22 30 L36 24 M22 30 L28 44',
  monitor:
    'M14 20 H86 V70 H14 Z M40 70 V82 M60 70 V82 M32 82 H68 M26 56 L40 42 L52 52 L74 30',
  graph:
    'M16 84 V16 M16 84 H92 M28 72 a6 6 0 1 0 0.1 0 M52 50 a6 6 0 1 0 0.1 0 M78 30 a6 6 0 1 0 0.1 0 M30 68 L50 52 M56 48 L74 34',
  endpoint:
    'M50 50 m-10 0 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0 M50 18 a8 8 0 1 0 0.1 0 M82 50 a8 8 0 1 0 0.1 0 M50 82 a8 8 0 1 0 0.1 0 M18 50 a8 8 0 1 0 0.1 0 M50 28 V40 M72 50 H60 M50 72 V60 M28 50 H40',
  globeUsers:
    'M50 50 m-40 0 a40 40 0 1 0 80 0 a40 40 0 1 0 -80 0 M10 50 H90 M50 10 C30 30 30 70 50 90 C70 70 70 30 50 10',
  checkBadge:
    'M50 8 L62 16 L78 14 L84 30 L96 40 L88 54 L90 70 L74 74 L64 88 L50 80 L36 88 L26 74 L10 70 L12 54 L4 40 L16 30 L22 14 L38 16 Z M34 50 L46 62 L68 36',
  keyShield:
    'M50 8 L86 22 V52 C86 78 68 92 50 98 C32 92 14 78 14 52 V22 Z M44 44 a8 8 0 1 0 12 6 L66 60 L60 66 L56 60 L52 64',
  net:
    'M24 26 a8 8 0 1 0 0.1 0 M76 26 a8 8 0 1 0 0.1 0 M50 78 a8 8 0 1 0 0.1 0 M50 50 a8 8 0 1 0 0.1 0 M32 30 L46 46 M68 30 L54 46 M50 58 V70',
};

function wrapTitle(title, max = 24) {
  const words = title.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > max) {
      lines.push(line.trim());
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) lines.push(line.trim());
  return lines.slice(0, 3);
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function svg({ title, tag, accent, glyph }) {
  const lines = wrapTitle(title);
  const startY = 360 - (lines.length - 1) * 33;
  const titleTspans = lines
    .map((l, i) => `<tspan x="80" y="${startY + i * 66}">${esc(l)}</tspan>`)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Inter, Segoe UI, sans-serif">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b1326"/>
      <stop offset="1" stop-color="#020617"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="30%" r="55%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.30"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M44 0 H0 V44" fill="none" stroke="#1e293b" stroke-width="1" stroke-opacity="0.5"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="0" y="0" width="${W}" height="6" fill="${accent}"/>

  <!-- glyph badge -->
  <g transform="translate(840,150)">
    <rect x="-20" y="-20" width="280" height="280" rx="40" fill="${accent}" fill-opacity="0.08" stroke="${accent}" stroke-opacity="0.35"/>
    <g transform="translate(20,20) scale(2.0)" fill="none" stroke="${accent}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="${GLYPHS[glyph] || GLYPHS.shieldEye}"/>
    </g>
  </g>

  <!-- tag pill -->
  <g transform="translate(80,150)">
    <rect x="0" y="0" width="${20 + tag.length * 12}" height="40" rx="20" fill="${accent}" fill-opacity="0.12" stroke="${accent}" stroke-opacity="0.4"/>
    <text x="${(20 + tag.length * 12) / 2}" y="26" text-anchor="middle" fill="${accent}" font-size="17" font-weight="700" letter-spacing="2">${esc(tag.toUpperCase())}</text>
  </g>

  <!-- title -->
  <text fill="#f1f5f9" font-size="56" font-weight="800" letter-spacing="-1">${titleTspans}</text>

  <!-- footer brand -->
  <g transform="translate(80,548)">
    <circle cx="11" cy="11" r="11" fill="none" stroke="${accent}" stroke-width="2.5"/>
    <path d="M0 11 H22 M11 0 C5 6 5 16 11 22 C17 16 17 6 11 0" fill="none" stroke="${accent}" stroke-width="1.6"/>
    <text x="34" y="16" fill="#94a3b8" font-size="20" font-weight="700" letter-spacing="1">GLOBAL CYBER ASSOCIATES</text>
  </g>
</svg>`;
}

const COVERS = [
  { slug: "insider-threat-detection-guide", title: "What Is Insider Threat Detection?", tag: "Insider Threat", accent: "#f59e0b", glyph: "shieldEye" },
  { slug: "employee-monitoring-software-guide", title: "Employee Monitoring Software Guide", tag: "Monitoring", accent: "#22d3ee", glyph: "monitor" },
  { slug: "data-loss-prevention-for-smbs", title: "Data Loss Prevention for SMBs", tag: "DLP", accent: "#10b981", glyph: "lockFile" },
  { slug: "ransomware-protection-for-businesses", title: "How to Protect Against Ransomware", tag: "Ransomware", accent: "#ef4444", glyph: "warnLock" },
  { slug: "phishing-attacks-how-to-prevent", title: "Recognize and Prevent Phishing", tag: "Phishing", accent: "#a78bfa", glyph: "hook" },
  { slug: "user-activity-monitoring-guide", title: "User Activity Monitoring Explained", tag: "UAM", accent: "#22d3ee", glyph: "graph" },
  { slug: "what-is-ueba-behavior-analytics", title: "What Is UEBA? Behavior Analytics", tag: "UEBA", accent: "#38bdf8", glyph: "graph" },
  { slug: "endpoint-monitoring-guide", title: "Endpoint Monitoring: A Complete Guide", tag: "Endpoint", accent: "#34d399", glyph: "endpoint" },
  { slug: "remote-workforce-monitoring", title: "Securing the Remote Workforce", tag: "Remote Work", accent: "#60a5fa", glyph: "globeUsers" },
  { slug: "iso-27001-soc2-compliance-monitoring", title: "ISO 27001 and SOC 2 Compliance Monitoring", tag: "Compliance", accent: "#10b981", glyph: "checkBadge" },
  { slug: "zero-trust-security-explained", title: "Zero Trust Security Explained", tag: "Zero Trust", accent: "#22d3ee", glyph: "keyShield" },
];

let done = 0;
for (const c of COVERS) {
  const buf = Buffer.from(svg(c));
  await sharp(buf).png({ quality: 90, compressionLevel: 9 }).toFile(join(OUT, `${c.slug}.png`));
  done++;
  console.log("✓", `${c.slug}.png`);
}
console.log(`\nGenerated ${done} blog covers in public/blog-images/`);

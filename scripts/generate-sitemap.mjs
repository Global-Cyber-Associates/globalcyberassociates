// Regenerates public/sitemap.xml from the actual route list + every real
// post in src/blogs. Runs as a `prebuild` step so new blog posts and pages
// can never silently fall out of the sitemap the way 10 posts already had.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const SITE_URL = "https://www.globalcyberassociates.com";

const STATIC_ROUTES = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/about", changefreq: "monthly", priority: "0.8" },
  { loc: "/solutions", changefreq: "monthly", priority: "0.9" },
  { loc: "/products", changefreq: "monthly", priority: "0.8" },
  { loc: "/products/visunai", changefreq: "monthly", priority: "0.8" },
  { loc: "/employee-monitoring-software", changefreq: "monthly", priority: "0.85" },
  { loc: "/cybersecurity-risk-management", changefreq: "monthly", priority: "0.85" },
  { loc: "/assessment", changefreq: "monthly", priority: "0.9" },
  { loc: "/careers", changefreq: "weekly", priority: "0.6" },
  { loc: "/contact", changefreq: "monthly", priority: "0.7" },
  { loc: "/blog", changefreq: "weekly", priority: "0.8" },
  { loc: "/news", changefreq: "weekly", priority: "0.6" },
  { loc: "/terms", changefreq: "yearly", priority: "0.3" },
  { loc: "/privacy", changefreq: "yearly", priority: "0.3" },
  { loc: "/refund", changefreq: "yearly", priority: "0.3" }
];

function toISODate(value) {
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? null : new Date(timestamp).toISOString().slice(0, 10);
}

function getBlogEntries() {
  const blogsDir = path.join(root, "src", "blogs");
  return readdirSync(blogsDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const filePath = path.join(blogsDir, file);
      const content = readFileSync(filePath, "utf8");
      const dateMatch = content.match(/^date:\s*(.+)$/m);
      const lastmod =
        (dateMatch && toISODate(dateMatch[1].trim())) ||
        statSync(filePath).mtime.toISOString().slice(0, 10);
      return { loc: `/blog/${slug}`, lastmod, changefreq: "monthly", priority: "0.7" };
    });
}

function buildXml(entries) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = entries
    .map(
      (e) => `  <url>
    <loc>${SITE_URL}${e.loc}</loc>
    <lastmod>${e.lastmod || today}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const today = new Date().toISOString().slice(0, 10);
const entries = [
  ...STATIC_ROUTES.map((r) => ({ ...r, lastmod: today })),
  ...getBlogEntries()
];

writeFileSync(path.join(root, "public", "sitemap.xml"), buildXml(entries));
console.log(`sitemap.xml written with ${entries.length} URLs.`);

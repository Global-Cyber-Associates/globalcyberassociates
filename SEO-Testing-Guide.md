# SEO Testing Guide — Global Cyber Associates
**Date:** June 15, 2026

---

## Test Right Now (Local Dev Server)

Your site is running at `http://192.168.29.189:5173`

### 1. Check All Meta Tags — View Page Source

Open any page in Chrome → press `Ctrl + U`

Search for these in the `<head>`:

```
og:title          ← Open Graph title
og:description    ← Open Graph description
og:image          ← Social share image
canonical         ← Canonical URL
description       ← Meta description
twitter:card      ← Twitter card type
application/ld+json  ← Structured data
```

Every page should now have all of the above.

---

### 2. Check H1 Fix — Browser Console

Open any page → press `F12` → go to **Console** tab → paste:

```js
document.querySelectorAll('h1').length
```

| Result | Meaning |
|---|---|
| `1` | ✅ Fixed — only one H1 per page |
| `2` | ❌ Still broken — two H1s found |

---

### 3. Check Sitemap — Open in Browser

```
http://192.168.29.189:5173/sitemap.xml
```

You should see all 10 URLs:

```
/
/about
/solutions
/products
/assessment
/careers
/contact
/blog
/blog/cybersecurity-tips
/blog/web-application-security-for-developers
```

---

### 4. Check robots.txt — Open in Browser

```
http://192.168.29.189:5173/robots.txt
```

Should show:

```
User-agent: *
Allow: /
Sitemap: https://www.globalcyberassociates.com/sitemap.xml
```

---

### 5. Check Structured Data — DevTools

Open homepage → `F12` → **Elements** tab → search for `ld+json`

You should see the Organization schema:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Global Cyber Associates",
  "url": "https://www.globalcyberassociates.com",
  ...
}
```

---

### 6. Check Page Titles — Tab Bar

| Page | Expected Title |
|---|---|
| `/` | Cybersecurity Services for Startups & MSMEs \| Global Cyber Associates |
| `/about` | About Us \| Global Cyber Associates |
| `/solutions` | Cybersecurity Services — VAPT, Compliance, SOC & Training \| GCA |
| `/products` | VisuN Security Platform & Cybersecurity Products \| GCA |
| `/contact` | Contact Us \| Global Cyber Associates |
| `/careers` | Careers \| Global Cyber Associates |
| `/assessment` | Free Cybersecurity Risk Assessment \| Global Cyber Associates |
| `/blog` | Blog \| Global Cyber Associates |

---

## Test After Deploy (Free Online Tools)

### Meta Tags + Open Graph Preview

**metatags.io**
```
https://metatags.io
```
Paste your URL → shows exactly how Google, Facebook, Twitter, LinkedIn will display your page.

---

### Twitter Card Preview

**Twitter Card Validator**
```
https://cards-dev.twitter.com/validator
```
Paste any page URL → shows the Twitter share card preview.

---

### LinkedIn Share Preview

**LinkedIn Post Inspector**
```
https://www.linkedin.com/post-inspector
```
Paste your URL → shows how it looks when shared on LinkedIn.

---

### Structured Data / JSON-LD

**Google Rich Results Test**
```
https://search.google.com/test/rich-results
```

Two ways to test:
1. **Test URL** — paste your live URL (works after deploy)
2. **Test Code** — paste your page source HTML directly (works on localhost now)

To test locally: open homepage → `Ctrl+U` → copy all → paste into Test Code.

---

### Sitemap Validity

**XML Sitemap Validator**
```
https://www.xml-sitemaps.com/validate-xml-sitemap.html
```
Paste your sitemap URL after deploy. Checks for broken links and format errors.

---

### Full SEO Score

**Google PageSpeed Insights**
```
https://pagespeed.web.dev
```
Tests SEO + Performance + Accessibility + Best Practices. SEO score should now be 90+.

---

## After Deploy — Google Search Console (Most Important)

This is what actually tells Google to crawl your updated pages.

```
https://search.google.com/search-console
```

**Steps:**

```
1. Add Property
   → Enter: https://www.globalcyberassociates.com

2. Verify Ownership
   → Download the HTML file Google gives you
   → Place it in your /public folder
   → Deploy and confirm

3. Submit Sitemap
   → Sitemaps → Add sitemap
   → Enter: https://www.globalcyberassociates.com/sitemap.xml
   → Submit

4. Inspect Individual URLs
   → URL Inspection → paste any page URL
   → Click "Request Indexing"
   → Do this for homepage, /solutions, /products, /assessment
```

---

## Quick Local Test Checklist

Run through this after starting `npm run dev`:

```
[ ] http://192.168.29.189:5173/sitemap.xml    → 10 URLs visible
[ ] http://192.168.29.189:5173/robots.txt     → Allow: / and Sitemap present
[ ] Homepage Ctrl+U                           → og:title, description, canonical in <head>
[ ] Console: document.querySelectorAll('h1').length === 1
[ ] Tab title on / shows keyword-rich title
[ ] Tab title changes correctly on each page
[ ] Blog post page has og:image, canonical, JSON-LD
```

---

## Tool Summary Table

| Tool | What It Tests | When to Use |
|---|---|---|
| Browser `Ctrl+U` | Raw meta tags in source | Now (local) |
| Browser Console `querySelectorAll('h1')` | H1 count per page | Now (local) |
| Browser address bar `/sitemap.xml` | Sitemap content | Now (local) |
| metatags.io | OG + social previews | After deploy |
| Twitter Card Validator | Twitter share preview | After deploy |
| LinkedIn Post Inspector | LinkedIn share preview | After deploy |
| Google Rich Results Test | JSON-LD structured data | Now (paste source) or after deploy |
| Google PageSpeed Insights | Full SEO score | After deploy |
| Google Search Console | Indexing + crawl status | After deploy |
| XML Sitemap Validator | Sitemap format + broken links | After deploy |

---

*Generated by Claude Code · Global Cyber Associates · June 15, 2026*

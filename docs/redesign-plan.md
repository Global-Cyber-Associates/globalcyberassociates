# GCA Website Redesign Plan
**Theme:** Democratizing Cybersecurity
**Status:** Copy finalised. Ready for implementation.
**Last updated:** 2026-02-27

---

## Vision

Position GlobalCyberAssociates as the cybersecurity partner for **every** business size —
not just enterprise. Lead with access, not fear.

---

## Confirmed Decisions

| # | Decision | Status |
|---|---|---|
| 1 | Hero section copy — keep as finalised (incl. eyebrow tag) | ✅ Locked |
| 2 | Myth Buster chip: "Startup Packages Available" → **"Startup Co-Pilot"** | ✅ Locked |
| 3 | VisuN / VisuN+ CTAs → `mailto:` placeholders with pre-filled subjects | ✅ Locked |
| 4 | Contact page — remove all forms. Replace with 4 email CTA cards | ✅ Locked |
| 5 | Nav — remove Careers link (move to footer), add Products route | ✅ Locked |
| 6 | New emails: `sales@`, `products@` at globalcyberassociate.com | ✅ Created |

---

## Sitemap (Target)

```
/                  → Home
/services          → Services (VAPT, Compliance, Training, SOC)
/products          → Products (VisuN, VisuN+)
/assessment        → Free Risk Assessment  ← Lead Magnet
/about             → About Us
/contact           → Contact (email-only, no form)
```

---

## Navigation (Target)

`Home | Services | Products | About | [Free Assessment] | Contact`

- "Free Assessment" styled as a button/CTA in the nav
- "Careers" moved to footer only
- "Solutions" renamed to "Services"

---

## Homepage — Section-by-Section Copy

---

### SECTION 1 — Hero
**File:** `src/components/homepage/hero/hero.jsx`
**Status:** Add eyebrow tag. Update copy.

```
Eyebrow:  Startup Friendly · MSME Focused · Enterprise Ready

H1:       Enterprise-Grade Cybersecurity.
          Built for Every Business.

Sub:      Cybersecurity isn't a luxury reserved for large corporations.
          If you run a business — you're a target. We make serious protection
          accessible, affordable, and actionable at any scale.

CTA 1:    GET YOUR FREE RISK ASSESSMENT
          Sub-text: No commitment. Know your risk in minutes.

CTA 2:    EXPLORE SERVICES
          Sub-text: Security Testing · Compliance · Training · SOC
```

---

### SECTION 2 — Myth Buster
**File:** New component `src/components/homepage/mythbuster/mythbuster.jsx`
**Placement:** After Hero, before Features (4phases)
**Status:** New section. Needs to be created.

```
Section Label:  The Misconception We're Fixing

H2:   "Cybersecurity is for big companies."
      We hear this every day. It's also the most dangerous myth in business.

Body: Ransomware doesn't check your revenue. Phishing doesn't screen for
      headcount. Compliance fines don't scale with your team size.

      The truth is — small and mid-size businesses are the #1 target,
      precisely because attackers assume they're unprotected.

      At GlobalCyberAssociates, we designed our entire practice around one
      belief: every organization deserves a security posture that matches
      the threat they face — not just the budget they have.

Chips (inline, 3):
      [Startup Co-Pilot]  [MSME-Focused]  [Enterprise-Ready]
```

---

### SECTION 3 — Lead Magnet
**File:** New component `src/components/homepage/leadmagnet/leadmagnet.jsx`
**Placement:** After Myth Buster, before Services
**Status:** New section. Needs to be created.

```
Section Label:  Where Do You Stand?

H2:   Don't guess. Know.

Body: Our Free Risk Assessment Tool gives you a clear picture of your
      organization's security posture — in under 10 minutes. No jargon.
      No sales pitch. Just honest, actionable intelligence so you know
      what to fix first.

CTA:  TAKE THE FREE ASSESSMENT →  (link: /assessment)
```

> Design note: Full-width band, contrasting background. Primary conversion driver.

---

### SECTION 4 — Services
**File:** `src/components/homepage/service.js`
**Status:** Update all 4 entries. Replace Staffing with SOC Operations.

| # | Title | Sub-line |
|---|---|---|
| 1 | Security Testing | VAPT · Infrastructure · Network |
| 2 | Compliance Audits | GDPR · HIPAA · PCI-DSS |
| 3 | Corporate & Personnel Training | Technical · Executive · Awareness |
| 4 | SOC Operations | 24×7 Monitoring · Threat Detection · Incident Response |

```
Security Testing:
  Secure your digital assets before attackers find a way in. Our certified team
  conducts realistic penetration tests and vulnerability assessments across your
  applications, infrastructure, and network perimeter. You get a prioritised,
  actionable report — not theory, not noise.

Compliance Audits:
  Compliance isn't paperwork — it's your legal protection and your clients'
  trust. We audit your controls, identify gaps, and guide you to
  certification-readiness for GDPR, HIPAA, and PCI-DSS. Structured.
  Stress-free.

Corporate & Personnel Training:
  Your people are your first line of defence — and your biggest risk if
  untrained. We deliver hands-on, role-specific cybersecurity training for
  IT teams, leadership, and general staff. On-site or remote. Customised to
  your actual threat landscape.

SOC Operations:
  Threats don't work business hours. Our Security Operations Center monitors
  your environment around the clock, detects anomalies in real time, and
  responds before damage is done. Enterprise-grade SOC — scaled to your size
  and budget.
```

---

### SECTION 5 — Products
**File:** New page `src/components/products/products.jsx`
**Route:** `/products` (add to `src/App.jsx`)
**Status:** New page. Reuse service-section card styles.

**VisuN — Network Visibility & Control**
```
H2:   VisuN — See Everything on Your Network

Body: Most breaches start with something invisible: an unknown device,
      an unusual file movement, an unauthorized connection. VisuN eliminates
      that blind spot.

Features:
  • Network Visibility         — Real-time map of every connected device
  • Rogue Device Alerts        — Instant alert when an unknown device joins
  • File Outflow Control       — Monitor and restrict sensitive data leaving your systems
  • File Integrity Monitoring  — Know if critical files are modified, moved, or deleted
  • Remote Endpoint Mgmt       — Manage and secure devices regardless of location

CTA:  REQUEST A VISUN DEMO →
      mailto:products@globalcyberassociate.com?subject=VisuN%20%E2%80%94%20Demo%20Request
```

**VisuN+ — Workforce Intelligence**
```
H2:   VisuN+ — Visibility Into Your Workforce

Body: VisuN+ extends network visibility to people and productivity. Understand
      how your workforce operates, identify inefficiencies, and surface risk
      patterns — without becoming Big Brother.

Features:
  • Employee Productivity Monitoring  — Objective data on time and tool usage
  • Productivity Improvement Insights — Actionable trends to help teams work smarter
  • Policy Compliance Tracking        — Ensure acceptable use policies are followed

CTA:  REQUEST A VISUN+ DEMO →
      mailto:products@globalcyberassociate.com?subject=VisuN%2B%20%E2%80%94%20Demo%20Request
```

---

### SECTION 6 — Why Us
**File:** Inline in `src/components/homepage/home.jsx` (already exists)
**Status:** Update copy only.

```
H2:   Built on Honesty. Measured by Outcomes.

•  Realistic testing based on current attacker tactics — not checkbox audits
•  Business-focused remediation guidance, not just raw findings
•  Independent and confidential assessments — your data stays yours
•  Flexible engagements — from a lean startup to a multi-site enterprise
•  Transparent reporting with clear, prioritised next steps
•  Accessible pricing — serious security without the enterprise invoice
```

---

### SECTION 7 — About
**File:** `src/components/about/about.jsx`
**Status:** Update heading, lead, and description copy.

```
Section Label:  About Us
Subtitle:       We built this practice to level the playing field.

H2:   Driving Security Through Equal Access

Lead: The biggest cybersecurity risk facing businesses today isn't
      sophistication — it's assumption. The assumption that "we're too small
      to be targeted." We exist to fix that.

Body: Our team brings deep enterprise experience to every engagement —
      and we deploy it at the scale and price point that actually fits
      your business. From a founder-led startup to a multi-branch MSME,
      we meet you where you are and build you up from there.

Features:
  • Expert Team Collaboration  — Seasoned professionals, real-world attacker mindset
  • Startup-to-Enterprise Reach — Same rigour, right-sized engagement
```

---

### SECTION 8 — Contact Page
**File:** `src/components/contact/contact.jsx`
**Status:** Remove form entirely. Replace with 4 email CTA cards.

```
H1:   Ready to take the first step?

Body: We don't do complicated intake forms. Reach out directly to the right
      person and we'll respond within one business day.

Card 1 — Services & Assessments
  Label:  Services Enquiries
  Detail: For Security Testing, Compliance, Training, and SOC engagements
  Email:  sales@globalcyberassociate.com
  CTA:    [Send an Email]  mailto:sales@globalcyberassociate.com

Card 2 — Products (VisuN / VisuN+)
  Label:  Product Demos & Licensing
  Detail: For VisuN and VisuN+ trials, pricing, and deployment
  Email:  products@globalcyberassociate.com
  CTA:    [Request a Demo]  mailto:products@globalcyberassociate.com

Card 3 — North America
  Label:  North America
  Detail: Charlotte, NC · USA
  Email:  info@globalcyberassociate.com
  CTA:    [Contact US Team]  mailto:info@globalcyberassociate.com

Card 4 — India
  Label:  India
  Detail: Mylapore, Chennai · Tamil Nadu
  Email:  info@globalcyberassociates.com
  CTA:    [Contact India Team]  mailto:info@globalcyberassociates.com

Footer anchor:
  "Or start with no commitment — Take the Free Risk Assessment →"  (/assessment)
```

---

## Implementation Checklist

### Phase 1 — Copy updates to existing files ✅ DONE
- [x] `src/components/homepage/hero/hero.jsx` — Eyebrow tag, new H1, sub, CTAs swapped
- [x] `src/components/homepage/service.js` — 4 new descriptions, SOC replaces Staffing
- [x] `src/components/homepage/home.jsx` — "Built on Honesty" + 6-point list
- [x] `src/components/about/about.jsx` — Full narrative copy updated
- [x] `src/components/contact/contact.jsx` — Form removed, 4 email CTA cards
- [x] `src/components/contact/contact.css` — Email card grid styles added
- [x] `src/components/head.jsx` — Services, Products, About, Contact, Free Assessment (CTA)
- [x] `src/components/head.css` — `.nav-cta` button style added

### Phase 2 — New components ✅ DONE
- [x] `src/components/homepage/mythbuster/mythbuster.jsx` + `.css` — Myth Buster section
- [x] `src/components/homepage/leadmagnet/leadmagnet.jsx` + `.css` — Lead Magnet band
- [x] `src/components/products/products.jsx` + `.css` — Products page (VisuN + VisuN+)
- [x] `src/components/homepage/home.jsx` — MythBuster + LeadMagnet wired in after Hero

### Phase 3 — Routing & Footer ✅ DONE
- [x] `src/App.jsx` — `/products` route added, Products component imported
- [x] `src/components/footer/footer.jsx` — "Company" column added with About, Careers, Contact links
- [x] `src/components/footer/footer.css` — `.footer-links` list styles added

---

## Open Items / Deferred

| Item | Notes |
|---|---|
| VisuN / VisuN+ product pages | Placeholder `mailto:` CTAs in use until product snap-ready |
| Careers page | Kept in app, removed from primary nav, linked from footer |
| Blog / Insights | Not in scope for this phase |
| Testimonials | Section exists — review if content is current before going live |

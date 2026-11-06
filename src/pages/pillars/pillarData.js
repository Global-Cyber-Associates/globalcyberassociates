// Pillar/hub pages for the two real content clusters already covered across
// the 23 posts in src/blogs. Each spoke slug must exist there — these pages
// exist to give Google/AI engines one canonical, well-linked URL per topic
// instead of leaving the cluster as unlinked blog posts.

const pillars = {
  "employee-monitoring-software": {
    path: "/employee-monitoring-software",
    metaTitle: "Employee Monitoring Software & Insider Threat Protection Guide",
    metaDescription:
      "What employee monitoring software does, how insider threat detection works, and how to evaluate and deploy user activity monitoring without hurting trust or productivity.",
    keywords:
      "employee monitoring software, insider threat detection, user activity monitoring, endpoint monitoring, UEBA, data loss prevention, remote workforce monitoring",
    eyebrow: "Pillar Guide",
    heroTitle: "Employee Monitoring & Insider Threat Protection",
    heroIntro:
      "Employee monitoring software gives a business visibility into how work actually happens on company devices and accounts — application and web usage, file movement, endpoint and USB activity — so leadership can spot productivity gaps, policy violations, and insider risk before they become incidents. This guide covers what it is, why it matters, how to choose it, and links to the full set of in-depth guides on each sub-topic below.",
    sections: [
      {
        heading: "What employee monitoring software actually does",
        body: "At its core, employee monitoring software records and analyzes activity on company-issued devices and accounts: application and website usage, active vs. idle time, file transfers, USB and peripheral activity, and in more advanced tools, behavioral baselines that flag anomalies. The output ranges from simple time-and-attendance reporting to full insider-threat detection with real-time alerts."
      },
      {
        heading: "Why it matters now",
        body: "Hybrid and remote work removed the physical oversight that used to make risky behavior visible — a USB drive plugged in at a desk, a screen glanced at by a passing manager. At the same time, data exfiltration and insider-driven breaches have grown as a share of total incidents. Monitoring software is the control that restores visibility without restoring the commute."
      },
      {
        heading: "The core building blocks",
        body: "A complete program combines a few distinct capabilities: user activity monitoring (what people do), endpoint monitoring (device health and posture), USB/file-transfer monitoring (data leaving the organization), and user and entity behavior analytics or UEBA (flagging activity that deviates from a person's own baseline, not just matching rules). Most organizations start with one and expand — see the guides below for each."
      },
      {
        heading: "Rolling it out without destroying trust",
        body: "The programs that work are the ones that are disclosed upfront, scoped to company devices and work hours, tied to a written acceptable-use policy, and focused on patterns rather than reading every keystroke. Monitoring framed as surveillance breeds resentment; monitoring framed as the same accountability a shared office always had is far easier for a team to accept."
      }
    ],
    spokeGroups: [
      {
        heading: "Start here",
        spokes: [
          "employee-monitoring-software-guide",
          "employee-monitoring-software-buyers-checklist",
          "insider-threat-detection-guide"
        ]
      },
      {
        heading: "Go deeper on each control",
        spokes: [
          "user-activity-monitoring-guide",
          "endpoint-monitoring-guide",
          "usb-file-transfer-monitoring-data-exfiltration",
          "data-loss-prevention-for-smbs",
          "what-is-ueba-behavior-analytics",
          "remote-workforce-monitoring",
          "employee-monitoring-roi-productivity-loss"
        ]
      },
      {
        heading: "VisuN AI by industry",
        spokes: [
          "visun-ai-for-banking-and-finance",
          "visun-ai-for-bpo",
          "visun-ai-for-healthcare",
          "visun-ai-for-insurance",
          "visun-ai-for-it-companies",
          "visun-ai-for-kpo",
          "visun-ai-for-logistics"
        ]
      }
    ],
    faq: [
      {
        question: "Is employee monitoring software legal?",
        answer:
          "In most jurisdictions, yes, when it monitors company-owned devices and accounts, is disclosed to employees, and is tied to a legitimate business purpose. Rules vary by country and state — always confirm against local labor and privacy law before deploying."
      },
      {
        question: "Does monitoring hurt employee trust?",
        answer:
          "It depends entirely on how it's framed and scoped. Disclosed, policy-backed monitoring focused on security and productivity patterns is generally accepted; covert or excessive monitoring (reading personal messages, tracking off-hours activity) damages trust fast."
      },
      {
        question: "What's the difference between employee monitoring and insider threat detection?",
        answer:
          "Employee monitoring is the data collection layer — activity, time, device usage. Insider threat detection is the analysis layer built on top of it, using behavioral baselines and risk scoring to flag the small fraction of activity that's actually dangerous, rather than just logging everything."
      }
    ],
    cta: {
      label: "See how VisuN AI implements this",
      href: "/products/visunai"
    }
  },

  "cybersecurity-risk-management": {
    path: "/cybersecurity-risk-management",
    metaTitle: "Cybersecurity Risk Management, Compliance & Threat Prevention Guide",
    metaDescription:
      "A practical hub for cybersecurity risk management — zero trust, phishing and ransomware defense, web application security, and ISO 27001 / SOC 2 compliance monitoring.",
    keywords:
      "cybersecurity risk management, zero trust security, phishing prevention, ransomware protection, web application security, ISO 27001, SOC 2 compliance",
    eyebrow: "Pillar Guide",
    heroTitle: "Cybersecurity Risk Management & Compliance",
    heroIntro:
      "Cybersecurity risk management is the ongoing process of identifying where a business is exposed — weak access controls, unpatched systems, phishable employees, unmonitored web applications — and closing those gaps before they're exploited, while keeping compliance frameworks like ISO 27001 and SOC 2 satisfied along the way. This guide ties together the specific threats and controls covered in detail below.",
    sections: [
      {
        heading: "Risk management is a process, not a product",
        body: "No single tool eliminates cyber risk. A working program identifies assets and threats, prioritizes by actual business impact, applies layered controls (access, patching, monitoring, training), and revisits the assessment regularly — risk changes every time the business adds a vendor, a product, or a remote hire."
      },
      {
        heading: "The threats driving most incidents",
        body: "Phishing remains the most common initial access point into a business, and ransomware remains the most damaging outcome once attackers are in. Both are addressed less by a single product and more by a combination of user training, email and endpoint controls, backups that are actually tested, and fast detection — covered in the guides below."
      },
      {
        heading: "Zero trust as the underlying architecture",
        body: "Zero trust isn't a product either — it's the principle that no user or device is trusted by default, inside or outside the network perimeter, and every request for access is verified. It's the architecture that makes the rest of a risk program — monitoring, access control, segmentation — work together instead of relying on a hardened perimeter that modern, hybrid networks no longer have."
      },
      {
        heading: "Where compliance fits in",
        body: "ISO 27001 and SOC 2 don't mandate specific tools — they mandate that an organization can demonstrate ongoing monitoring, access control, and incident response. Done well, compliance monitoring is a byproduct of a genuinely working risk program, not a separate paperwork exercise bolted on before an audit."
      }
    ],
    spokeGroups: [
      {
        heading: "Core threats and defenses",
        spokes: [
          "phishing-attacks-how-to-prevent",
          "ransomware-protection-for-businesses",
          "zero-trust-security-explained",
          "web-application-security-for-developers"
        ]
      },
      {
        heading: "Compliance and fundamentals",
        spokes: [
          "iso-27001-soc2-compliance-monitoring",
          "cybersecurity-tips"
        ]
      }
    ],
    faq: [
      {
        question: "What's the first step in cybersecurity risk management?",
        answer:
          "An honest asset and threat inventory — knowing what systems, data, and third parties you actually have before deciding what to protect first. Most programs fail by buying tools before finishing this step."
      },
      {
        question: "Do I need ISO 27001 or SOC 2 if I'm a small business?",
        answer:
          "It depends on your customers. Enterprise and regulated buyers increasingly require one or the other before they'll sign a contract, which is usually the actual trigger for smaller companies to pursue certification rather than risk alone."
      },
      {
        question: "Is zero trust only for large enterprises?",
        answer:
          "No — the core practices (MFA everywhere, least-privilege access, continuous monitoring) scale down to any size business and are often easier to implement well in a smaller, less legacy-encumbered environment."
      }
    ],
    cta: {
      label: "Get a free risk assessment",
      href: "/assessment"
    }
  }
};

export default pillars;

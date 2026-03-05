import vuln from './vuln.png';
import audit from './audit.png';
import training from './training.png';
import staff from './staff.png';

const core = [
  {
    title: "VAPT",
    shortDescription: "Find what attackers will find — before they do.",
    description: "Secure your digital assets before attackers find a way in. Our certified team conducts realistic penetration tests and vulnerability assessments across your applications, infrastructure, and network perimeter — VAPT, infrastructure hardening, and network security. You get a prioritised, actionable report. Not theory, not noise.",
    icon: "bi-shield-lock-fill",
    tags: ["Apps", "Network", "Infra", "IOT"],
    image: vuln
  },
  {
    title: "Compliance Audits",
    shortDescription: "Turn regulatory requirements into your competitive advantage.",
    description: "Compliance isn't paperwork — it's your legal protection and your clients' trust. We audit your controls, identify gaps, and guide you to certification-readiness for NIST, GDPR, HIPAA, and PCI-DSS. Structured. Stress-free.",
    icon: "bi-patch-check-fill",
    tags: ["NIST", "GDPR", "HIPAA", "PCI-DSS", "ISO 27001"],
    image: audit
  },
  {
    title: "Corporate & Personnel Training",
    shortDescription: "Your people are your first line of defence.",
    description: "Your people are your first line of defence — and your biggest risk if untrained. We deliver hands-on, role-specific cybersecurity training for IT teams, leadership, and general staff. On-site or remote. Customised to your actual threat landscape.",
    icon: "bi-people-fill",
    tags: ["Awareness", "CTF Training", "Custom Modules"],
    image: training
  },
  {
    title: "SOC Operations",
    shortDescription: "Threats don't stop at 5pm. Neither do we.",
    description: "Threats don't work business hours. Our Security Operations Center monitors your environment around the clock, detects anomalies in real time, and responds before damage is done. Enterprise-grade SOC — scaled to your size and budget.",
    icon: "bi-display-fill",
    tags: ["24/7 Monitoring", "Threat Response", "SIEM"],
    image: staff
  }
];

export default core;

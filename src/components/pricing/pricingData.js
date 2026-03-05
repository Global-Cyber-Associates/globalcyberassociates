const pricingData = [
  {
    category: "Starter Audits",
    categoryIcon: "bi-lightning-charge-fill",
    unit: "one-time",
    depthLabels: {
      low: "Quick scan and actionable insights to strengthen your security",
      medium: "Standard evaluation with detailed remediation guidance",
      high: "Premium assessment with custom roadmap and support"
    },
    services: [
      { title: "Basic Cybersecurity Audit", low: 100, medium: 150, high: 200 },
    ]
  },
  {
    category: "VAPT",
    categoryIcon: "bi-shield-lock-fill",
    unit: "one-time",
    depthLabels: {
      low: "Automated + basic manual testing, OWASP Top 10 focus, standard report",
      medium: "Full manual testing, broader attack surface, detailed remediation report",
      high: "Red-team approach, full scope, executive + technical report, retest included"
    },
    services: [
      { title: "Web Application Testing", low: 300, medium: 500, high: 1000 },
      { title: "Mobile App Penetration Testing", low: 350, medium: 550, high: 1100 },
      { title: "Network Penetration Testing", low: 100, medium: 500, high: 1500 },
      { title: "Cloud Security Testing", low: 300, medium: 600, high: 1200 },
      { title: "API/IoT Testing", low: 300, medium: 700, high: 1300 },
      { title: "Infrastructure Testing", low: 450, medium: 900, high: 1700 },
      { title: "Endpoint Security Assessment", low: 249, medium: 549, high: 999 },
    ]
  },
  {
    category: "Compliance Audits",
    categoryIcon: "bi-patch-check-fill",
    unit: "one-time",
    depthLabels: {
      low: "Gap analysis + document review only",
      medium: "Full audit with evidence collection and findings report",
      high: "Full audit + remediation support + follow-up assessment"
    },
    services: [
      { title: "NIST CSF Compliance Audit", low: 799, medium: 1499, high: 2999 },
      { title: "GDPR Compliance Audit", low: 799, medium: 1499, high: 2999 },
      { title: "HIPAA Compliance Audit", low: 799, medium: 1499, high: 2999 },
      { title: "PCI-DSS Assessment", low: 999, medium: 1999, high: 3999 },
      { title: "ISO 27001 Gap Analysis", low: 1199, medium: 2499, high: 4999 },
    ]
  },
  {
    category: "Corporate & Personnel Training",
    categoryIcon: "bi-people-fill",
    unit: "per session",
    depthLabels: {
      low: "1 session (2–3 hrs), up to 20 participants, standard materials",
      medium: "2–3 sessions, tailored content, role-specific scenarios",
      high: "Full programme, custom materials, ongoing support + assessment"
    },
    services: [
      { title: "Security Awareness for Employees", low: 199, medium: 449, high: 899 },
      { title: "CTF-Based Corporate Training", low: 299, medium: 649, high: 1199 },
      { title: "Custom Training Modules", low: 499, medium: 999, high: 1999 },
    ]
  },
  {
    category: "SOC Operations",
    categoryIcon: "bi-display-fill",
    unit: "/month",
    depthLabels: {
      low: "Up to 50 endpoints, standard alerting, business-hours response",
      medium: "Up to 200 endpoints, advanced detection, 24/7 alerting",
      high: "Unlimited endpoints, dedicated analyst, full incident response"
    },
    services: [
      { title: "24/7 Threat Monitoring", low: 299, medium: 599, high: 999 },
      { title: "Incident Detection & Response", low: 399, medium: 799, high: 1399 },
      { title: "SIEM Integration & Management", low: 299, medium: 599, high: 999 },
    ]
  }
];

export default pricingData;

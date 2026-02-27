const solutionsData = [
  {
    category: "VAPT",
    categoryIcon: "bi-shield-lock-fill",
    solutions: [
      {
        icon: "bi-globe2",
        title: "Web Application Testing",
        description: "Identify injection flaws, broken auth, misconfigurations, and OWASP Top 10 vulnerabilities in your web apps."
      },
      {
        icon: "bi-phone",
        title: "Mobile App Penetration Testing",
        description: "Test iOS and Android apps for insecure data storage, weak authentication, and runtime vulnerabilities."
      },
      {
        icon: "bi-diagram-3",
        title: "Network Penetration Testing",
        description: "Internal and external testing to expose misconfigured services, weak protocols, and open attack surface."
      },
      {
        icon: "bi-cloud",
        title: "Cloud Security Testing",
        description: "Evaluate AWS, Azure, GCP.. for insecure policies, public data exposure, and privilege escalation paths."
      },
      {
        icon: "bi-plug",
        title: "API & IoT Testing",
        description: "Assess REST/GraphQL APIs and connected devices for auth gaps, data leakage, and protocol weaknesses."
      },
      {
        icon: "bi-server",
        title: "Infrastructure Testing",
        description: "Probe servers, databases, and routers for high-risk vulnerabilities and lateral movement opportunities."
      },
      {
        icon: "bi-laptop",
        title: "Endpoint Security Assessment",
        description: "Audit laptops, desktops, and mobile devices for weak configurations, unpatched software, and exposure risk."
      },
      {
        icon: "bi-code-slash",
        title: "Source Code Review",
        description: "Manual code analysis to surface logic errors, hardcoded credentials, and insecure patterns before they ship."
      }
    ]
  },
  {
    category: "Compliance Audits",
    categoryIcon: "bi-patch-check-fill",
    solutions: [
      {
        icon: "bi-shield-check",
        title: "GDPR Compliance Audit",
        description: "Assess data handling practices, consent mechanisms, and breach response readiness against EU GDPR requirements."
      },
      {
        icon: "bi-heart-pulse",
        title: "HIPAA Compliance Audit",
        description: "Review PHI safeguards, access controls, and audit trails to align with HIPAA Security and Privacy Rules."
      },
      {
        icon: "bi-credit-card",
        title: "PCI-DSS Assessment",
        description: "Evaluate cardholder data environments for compliance with PCI-DSS controls and reporting requirements."
      },
      {
        icon: "bi-award",
        title: "ISO 27001 Gap Analysis",
        description: "Identify gaps between your current controls and ISO 27001 requirements, with a prioritised remediation roadmap."
      }
    ]
  },
  {
    category: "Corporate & Personnel Training",
    categoryIcon: "bi-people-fill",
    solutions: [
      {
        icon: "bi-person-check",
        title: "Security Awareness for Employees",
        description: "Interactive sessions on phishing, social engineering, password hygiene, and safe IT practices — for every role."
      },
      {
        icon: "bi-flag",
        title: "CTF-Based Corporate Training",
        description: "Hands-on Capture The Flag challenges that build practical security skills and sharpen critical thinking."
      },
      {
        icon: "bi-puzzle",
        title: "Custom Training Modules",
        description: "Programmes designed around your team's roles, maturity level, and real-world threat landscape."
      }
    ]
  },
  {
    category: "SOC Operations",
    categoryIcon: "bi-display-fill",
    solutions: [
      {
        icon: "bi-eye",
        title: "24/7 Threat Monitoring",
        description: "Continuous surveillance of logs, traffic, and user behaviour with real-time alerting across your environment."
      },
      {
        icon: "bi-bell",
        title: "Incident Detection & Response",
        description: "Rapid investigation and containment when anomalies surface — minimising dwell time and blast radius."
      },
      {
        icon: "bi-graph-up",
        title: "SIEM Integration & Management",
        description: "Deploy and manage a Security Information and Event Management system tuned to your risk profile."
      }
    ]
  }
];

export default solutionsData;

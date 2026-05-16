import React, { useState } from 'react';
import './faq.css';
import { BiChevronRight } from 'react-icons/bi';

const faqData = [
  {
    question: 'What types of cybersecurity audits do you perform?',
    answer:
      'We perform internal and external cybersecurity audits, including IT infrastructure audits, compliance readiness audits (ISO 27001, SOC 2, GDPR), and configuration reviews for networks, cloud environments, and endpoints.',
  },
  {
    question: 'Why is a cybersecurity audit important for my business?',
    answer:
      'A cybersecurity audit identifies vulnerabilities, evaluates security posture, and ensures compliance with industry standards. It helps avoid data breaches, reputational damage, and regulatory fines.',
  },
  {
    question: 'How long does a typical cybersecurity audit take?',
    answer:
      'The duration depends on the scope and complexity. A basic audit for a small business may take 10 - 15 days, whereas enterprise-level audits could take several weeks including reporting and remediation recommendations.',
  },
  {
    question: 'What deliverables do we receive after the audit?',
    answer:
      'You’ll receive a detailed audit report, a risk scorecard, prioritized vulnerability list, compliance gap analysis, and actionable recommendations to strengthen your security framework.',
  },
  {
    question: 'Do you assist with fixing the issues found during the audit?',
    answer:
      'Yes. Beyond auditing, we offer remediation support including patch management, policy updates, architecture redesign, and security awareness training for your team.',
  },
  {
    question: 'Can you perform audits remotely?',
    answer:
      'Absolutely. We conduct both onsite and remote audits. Remote audits are secured via VPN and encrypted communication to ensure data confidentiality.',
  },
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFaq = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-section" id="faq">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
                      <p className="faq-eyebrow">Support</p>
            <h2 className="faq-title">Cybersecurity Audit FAQs</h2>
            <p className="faq-description">
              Find answers to commonly asked questions about our audit process, scope, compliance, and more.
            </p>
          </div>

          <div className="col-lg-7">
            <div className="faq-container">
              {faqData.map((faq, index) => (
                <div
                  className={`faq-item ${activeIndex === index ? 'faq-active' : ''}`}
                  key={index}
                  onClick={() => toggleFaq(index)}
                >
                  <h3>{faq.question}</h3>
                  <div className="faq-content">
                    <p>{faq.answer}</p>
                  </div>
                  <i className="faq-toggle">
                    <BiChevronRight />
                  </i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;

import React, { useRef } from 'react';
import './brief.css';
import Header from '../head.jsx';
import Footer from '../footer/footer.jsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png';

const Brief = () => {
  const contentRef = useRef(null);
  const navigate = useNavigate();

  const downloadPDF = async () => {
    if (!contentRef.current) return;

    const canvas = await html2canvas(contentRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('Global-Cyber-Associates-Brief.pdf');
  };

  return (
    <div className="container">
      {/* <Header title="Company Brief - Global Cyber Associates" /> */}
      <div className="brief-container">
        <div className="brief-actions">
          <button onClick={downloadPDF} className="btn download-btn">
            Download PDF
          </button>
        </div>
        <div ref={contentRef} className="brief-content">
          <div className="header">
            <div className="logo">
              <img src={logo} alt="Global Cyber Associates Logo" />
            </div>
            <div className="title">
              <h1>GLOBAL CYBER ASSOCIATES</h1>
              <h2>Fortify Your Digital Future with us</h2>
            </div>
          </div>

          {/* our services */}
          <div className="section">
            <div className="section-title">OUR SERVICES</div>
            <div className="service">
              <div className="service-title">IS and Cybersecurity Audit</div>
              <div className="service-desc">
                Our thorough information security and cybersecurity audits help identify vulnerabilities and compliance gaps in your digital infrastructure.
              </div>
            </div>
            <div className="service">
              <div className="service-title">Staffing Solutions</div>
              <div className="service-desc">
                Finding qualified cybersecurity professionals is challenging. We provide staffing solutions to meet your security personnel requirements.
              </div>
            </div>
            <div className="service">
              <div className="service-title">Corporate Trainings</div>
              <div className="service-desc">
                Enhance your team's security awareness and technical skills with our specialized cybersecurity training programs.
              </div>
            </div>
          </div>

          {/* why choose us */}
          <div className="section">
            <div className="section-title">WHY CHOOSE US?</div>
            <div className="reason">
              <div className="reason-title">Expert Team</div>
              <div className="reason-desc">
                Our security professionals come with extensive experience in protecting critical infrastructure across various industries.
              </div>
            </div>
            <div className="reason">
              <div className="reason-title">Rapid Response Capability</div>
              <div className="reason-desc">
                Immediate intervention to minimize damage from security incidents.
              </div>
            </div>
            <div className="reason">
              <div className="reason-title">Tailored Solutions</div>
              <div className="reason-desc">
                Customized security strategies based on your specific business needs.
              </div>
            </div>
          </div>

          {/* connect with us */}
          <div className="section">
            <div className="section-title">CONNECT WITH US</div>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-label">📱 Contact:</span> +91 89398 51788
              </div>
              <div className="contact-item">
                <span className="contact-label">✉️ Email:</span>{' '}
                <a href="mailto:info@globalcyberassociates.com">info@globalcyberassociates.com</a>
              </div>
              <div className="contact-item">
                <span className="contact-label">🌐 Website:</span>{' '}
                <a href="https://www.globalcyberassociates.com" target="_blank" rel="noopener noreferrer">
                  www.globalcyberassociates.com
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-label">🔗 LinkedIn:</span>{' '}
                <a href="https://linkedin.com/company/globalcyberassociate" target="_blank" rel="noopener noreferrer">
                  linkedin.com/company/globalcyberassociate
                </a>
              </div>
            </div>
          </div>

          <div className="cta">
            <div className="cta-text">Protect Your Business Today</div>
            <div className="cta-subtext">Schedule a free consultation and security assessment</div>
          </div>

          <div className="footer">
            © {new Date().getFullYear()} Global Cyber Associates | All Rights Reserved
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Brief;
import React, { useState, useRef, useEffect } from 'react';
import pricingData from './pricingData';
import './pricing.css';

const DEPTHS = ['low', 'medium', 'high'];
const DEPTH_LABELS = { low: 'Low', medium: 'Medium', high: 'High' };

const CustomSelect = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="csel-wrap" ref={ref}>
      <button
        type="button"
        className={`csel-trigger ${open ? 'open' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="csel-value">{selected?.label}</span>
        <i className={`bi bi-chevron-down csel-chevron ${open ? 'rotated' : ''}`}></i>
      </button>

      {open && (
        <div className="csel-menu" role="listbox">
          {options.map((opt) => (
            <div
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={`csel-option ${opt.value === value ? 'active' : ''}`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
              {opt.value === value && (
                <i className="bi bi-check2 csel-check"></i>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PricingCalculator = () => {
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [serviceIdx, setServiceIdx] = useState(0);
  const [depth, setDepth] = useState('medium');

  const category = pricingData[categoryIdx];
  const service = category.services[serviceIdx];
  const price = service[depth];

  const categoryOptions = pricingData.map((c, i) => ({ value: i, label: c.category }));
  const serviceOptions = category.services.map((s, i) => ({ value: i, label: s.title }));

  const handleCategoryChange = (val) => {
    setCategoryIdx(val);
    setServiceIdx(0);
  };

  return (
    <section className="pricing-calc-section" id="pricing">
      <div className="pricing-calc-container">
        <p className="pricing-eyebrow">Pricing</p>
        <h2 className="pricing-title">Estimate Your Investment</h2>
        <p className="pricing-sub">
          Baselines only — final scope confirmed on discovery call.
        </p>

        <div className="calc-card">
          <div className="calc-fields">

            <div className="calc-field">
              <label className="calc-label">Service Category</label>
              <CustomSelect
                value={categoryIdx}
                onChange={handleCategoryChange}
                options={categoryOptions}
              />
            </div>

            <div className="calc-field">
              <label className="calc-label">Specific Service</label>
              <CustomSelect
                value={serviceIdx}
                onChange={setServiceIdx}
                options={serviceOptions}
              />
            </div>

            <div className="calc-field">
              <label className="calc-label">Engagement Depth</label>
              <div className="depth-tabs">
                {DEPTHS.map((d) => (
                  <button
                    key={d}
                    className={`depth-tab ${depth === d ? 'active' : ''}`}
                    onClick={() => setDepth(d)}
                    type="button"
                  >
                    {DEPTH_LABELS[d]}
                  </button>
                ))}
              </div>
              <p className="depth-desc">{category.depthLabels[depth]}</p>

              <div className="advance-notice">
                <strong>Note:</strong> A 50% advance payment is required to initiate an engagement.
              </div>

              <div className="promo-banner">
                Get a Basic Cybersecurity Audit for just <strong>$100</strong> and gain actionable insights to strengthen your organization's digital security.
              </div>
            </div>

          </div>

          <div className="calc-result">
            <p className="result-service-name">{service.title}</p>
            <div className="result-depth-badge">{DEPTH_LABELS[depth]} depth</div>
            <div className="result-price">
              ${price.toLocaleString()}
              <span className="result-unit">{category.unit}</span>
            </div>

            <div className="result-range-bar">
              {DEPTHS.map((d) => (
                <div
                  key={d}
                  className={`range-segment ${d} ${depth === d ? 'active' : ''}`}
                  onClick={() => setDepth(d)}
                  title={`${DEPTH_LABELS[d]}: $${service[d].toLocaleString()}`}
                >
                  <span className="range-tier">{DEPTH_LABELS[d]}</span>
                  <span className="range-price">${service[d].toLocaleString()}</span>
                </div>
              ))}
            </div>

            <p className="result-disclaimer">
              Indicative pricing. Actual cost varies based on scope, asset count, and complexity.
            </p>
            <a
              href="mailto:sales@globalcyberassociate.com?subject=Pricing%20Enquiry"
              className="calc-cta"
            >
              Get Accurate Quote →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;

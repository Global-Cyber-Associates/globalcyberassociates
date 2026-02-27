import React, { useState } from 'react';
import pricingData from './pricingData';
import './pricing.css';

const DEPTHS = ['low', 'medium', 'high'];
const DEPTH_LABELS = { low: 'Low', medium: 'Medium', high: 'High' };

const PricingCalculator = () => {
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [serviceIdx, setServiceIdx] = useState(0);
  const [depth, setDepth] = useState('medium');

  const category = pricingData[categoryIdx];
  const service = category.services[serviceIdx];
  const price = service[depth];

  const handleCategoryChange = (e) => {
    setCategoryIdx(Number(e.target.value));
    setServiceIdx(0);
  };

  return (
    <section className="pricing-calc-section" id="pricing">
      <div className="pricing-calc-container">
        <p className="pricing-eyebrow">Pricing</p>
        <h2 className="pricing-title">Estimate Your Investment</h2>
        <p className="pricing-sub">
          USD pricing at Indian market rates. Baselines only — final scope confirmed on discovery call.
        </p>

        <div className="calc-card">
          <div className="calc-fields">

            {/* Category dropdown */}
            <div className="calc-field">
              <label className="calc-label">Service Category</label>
              <div className="calc-select-wrap">
                <select
                  className="calc-select"
                  value={categoryIdx}
                  onChange={handleCategoryChange}
                >
                  {pricingData.map((c, i) => (
                    <option key={i} value={i}>
                      {c.category}
                    </option>
                  ))}
                </select>
                <i className="bi bi-chevron-down calc-select-icon"></i>
              </div>
            </div>

            {/* Sub-service dropdown */}
            <div className="calc-field">
              <label className="calc-label">Specific Service</label>
              <div className="calc-select-wrap">
                <select
                  className="calc-select"
                  value={serviceIdx}
                  onChange={(e) => setServiceIdx(Number(e.target.value))}
                >
                  {category.services.map((s, i) => (
                    <option key={i} value={i}>{s.title}</option>
                  ))}
                </select>
                <i className="bi bi-chevron-down calc-select-icon"></i>
              </div>
            </div>

            {/* Depth tabs */}
            <div className="calc-field">
              <label className="calc-label">Engagement Depth</label>
              <div className="depth-tabs">
                {DEPTHS.map(d => (
                  <button
                    key={d}
                    className={`depth-tab ${depth === d ? 'active' : ''}`}
                    onClick={() => setDepth(d)}
                  >
                    {DEPTH_LABELS[d]}
                  </button>
                ))}
              </div>
              <p className="depth-desc">{category.depthLabels[depth]}</p>
            </div>

          </div>

          {/* Result */}
          <div className="calc-result">
            <p className="result-service-name">{service.title}</p>
            <div className="result-depth-badge">{DEPTH_LABELS[depth]} depth</div>
            <div className="result-price">
              ${price.toLocaleString()}
              <span className="result-unit">{category.unit}</span>
            </div>

            <div className="result-range-bar">
              {DEPTHS.map(d => (
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
              GET ACCURATE QUOTE →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;

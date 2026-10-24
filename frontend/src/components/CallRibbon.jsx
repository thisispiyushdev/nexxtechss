import React from "react";

export default function CallRibbon() {
  return (
    <div className="call-ribbon relative z-[50]" role="region" aria-label="Call Now Ribbon">
      <div className="ribbon-viewport">
        <div className="ribbon-track">
          {/* Content block 1 */}
          <span className="ribbon-item">📞 Call Now: <a href="tel:+919217179762">+91 92171 79762</a></span>
          <span className="ribbon-item">⭐ Free Demo Class Available</span>
          <span className="ribbon-item">📞 Call Now: <a href="tel:+919217179762">+91 92171 79762</a></span>
          <span className="ribbon-item">🚀 Talk to our counselors today</span>

          {/* Content block 2: exact duplicate of block 1 (needed for the seamless loop) */}
          <span className="ribbon-item">📞 Call Now: <a href="tel:+919217179762">+91 92171 79762</a></span>
          <span className="ribbon-item">⭐ Free Demo Class Available</span>
          <span className="ribbon-item">📞 Call Now: <a href="tel:+919217179762">+91 92171 79762</a></span>
          <span className="ribbon-item">🚀 Talk to our counselors today</span>
        </div>
      </div>

      <a className="call-btn" href="tel:+919217179762">📞 CALL NOW</a>
    </div>
  );
}

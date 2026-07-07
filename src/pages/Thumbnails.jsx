import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Image as ImageIcon, Sparkles, TrendingUp, Gamepad2, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import './Thumbnails.css';

const Thumbnails = () => {
  const skills = [
    "Thumbnail Design", "YouTube Thumbnails", "Photoshop", "Graphic Design", "YouTube Marketing", "CTR Optimization"
  ];

  return (
    <div className="thumbnails-page animate-fade-in">
      <SEO title="Thumbnail Design" description="High-CTR YouTube Thumbnails for Reaction and Gaming Channels." />
      
      {/* Hero Section */}
      <section className="thumbnails-hero">
        <h1 className="thumbnails-title">
          High-CTR <br />
          <span className="text-accent-gradient">Click-Worthy Thumbnails</span>
        </h1>
        <p className="thumbnails-subtitle">
          I'm a YouTube thumbnail designer specializing in high-CTR thumbnails for reaction, gaming, and commentary channels. The difference between a click and a scroll-past.
        </p>
        <div className="thumbnails-skills">
          {skills.map(skill => (
            <span key={skill} className="skill-badge">{skill}</span>
          ))}
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section-padding" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className="thumbnails-gigs">
            
            {/* Gig 1: Reaction/Commentary */}
            <div className="gig-section">
              <div className="gig-content">
                <h2>Reaction & Commentary</h2>
                <p>
                  I design thumbnails built around real emotional hooks pulled from your content—not generic templates—using proven high-CTR principles like facial expression, contrast, clean typography, and curiosity gap.
                </p>
                <ul className="gig-features">
                  <li><CheckCircle size={18} color="var(--accent)" /> Real reaction/emotion-driven composition</li>
                  <li><CheckCircle size={18} color="var(--accent)" /> 16:9 YouTube-ready exports</li>
                  <li><CheckCircle size={18} color="var(--accent)" /> Fast 24-48 hour delivery</li>
                  <li><CheckCircle size={18} color="var(--accent)" /> Tailored to your channel's specific audience</li>
                </ul>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <em>Perfect for: Reaction channels, commentary, tabloid content, movie/TV reaction creators.</em>
                </p>
              </div>
              <div className="gig-visuals">
                <div style={{ position: 'relative' }}>
                  <img src="/thumbnail-f9d9b037-d96f-494a-8221-f66ebd8d2263.png" alt="Reaction Thumbnail 1" />
                  <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', padding: '5px 10px', borderRadius: '8px', fontSize: '0.8rem' }}>Variation 1</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ position: 'relative' }}>
                    <img src="/vidiq_thumbnail_1 (2).png" alt="Reaction Thumbnail 2" />
                  </div>
                  <div style={{ position: 'relative' }}>
                    <img src="/vidiq_thumbnail_1 (3).png" alt="Reaction Thumbnail 3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Gig 2: Gaming */}
            <div className="gig-section" style={{ marginTop: '3rem' }}>
              <div className="gig-visuals" style={{ order: -1 }}>
                 <div className="gig-comparison">
                  <span className="gig-comparison-label">Before</span>
                  <img src="/bennett-before.jpg" alt="Gaming Thumbnail Before" />
                </div>
                <div className="gig-comparison">
                  <span className="gig-comparison-label" style={{ color: 'var(--accent)' }}>After (Redesign)</span>
                  <img src="/bennett-after.jpg" alt="Gaming Thumbnail After" />
                </div>
              </div>
              <div className="gig-content">
                <h2>Realistic In-Game Gaming</h2>
                <p>
                  Cinematic, in-game style gaming thumbnails inspired by top creators like Ludwig and Smii7y. I combine real gameplay assets with genuine reaction faces for maximum click-through.
                </p>
                <ul className="gig-features">
                  <li><CheckCircle size={18} color="var(--accent)" /> In-game asset compositing</li>
                  <li><CheckCircle size={18} color="var(--accent)" /> Reaction photo integration</li>
                  <li><CheckCircle size={18} color="var(--accent)" /> Bold, readable typography</li>
                  <li><CheckCircle size={18} color="var(--accent)" /> Fast turnaround</li>
                </ul>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <em>Send me a gameplay screenshot + your reaction photo and I'll build the concept.</em>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="thumbnails-pricing-section section-padding glass-panel" id="pricing" style={{ borderRadius: '40px 40px 0 0', borderBottom: 'none' }}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>Pricing</h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>Transparent starter tier pricing (First 2 weeks).</p>
          
          <div className="pricing-grid">
            {/* Basic Package */}
            <div className="pricing-card glass-panel" style={{ background: 'rgba(0,0,0,0.2)' }}>
              <div className="pricing-header">
                <h3>Basic</h3>
                <div className="price"><span>$15</span></div>
                <p className="pricing-desc">Starter Concept</p>
              </div>
              <ul className="pricing-features">
                <li><CheckCircle size={18} color="var(--accent)" /> 1 Thumbnail Concept</li>
                <li><CheckCircle size={18} color="var(--accent)" /> 2 Revisions</li>
                <li><CheckCircle size={18} color="var(--accent)" /> 2-Day Delivery</li>
              </ul>
              <a href="mailto:jnaneshwarareddysatti@gmail.com?subject=Basic Thumbnail Package" className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Book Basic</a>
            </div>

            {/* Standard Package */}
            <div className="pricing-card glass-panel premium-card">
              <div className="premium-badge">Most Popular</div>
              <div className="pricing-header">
                <h3>Standard</h3>
                <div className="price"><span>$25</span></div>
                <p className="pricing-desc">A/B Testing Ready</p>
              </div>
              <ul className="pricing-features">
                <li><CheckCircle size={18} color="var(--accent)" /> 2 Thumbnail Concepts</li>
                <li><CheckCircle size={18} color="var(--accent)" /> 3 Revisions</li>
                <li><CheckCircle size={18} color="var(--accent)" /> 2-Day Delivery</li>
              </ul>
              <a href="mailto:jnaneshwarareddysatti@gmail.com?subject=Standard Thumbnail Package" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Book Standard</a>
            </div>

            {/* Premium Package */}
            <div className="pricing-card glass-panel" style={{ background: 'rgba(0,0,0,0.2)' }}>
              <div className="pricing-header">
                <h3>Premium</h3>
                <div className="price"><span>$40</span></div>
                <p className="pricing-desc">Pro Agency Level</p>
              </div>
              <ul className="pricing-features">
                <li><CheckCircle size={18} color="var(--accent)" /> 3 Thumbnail Concepts</li>
                <li><CheckCircle size={18} color="var(--accent)" /> Unlimited Revisions</li>
                <li><CheckCircle size={18} color="var(--accent)" /> 1-Day Delivery</li>
                <li><CheckCircle size={18} color="var(--accent)" /> Source File Included</li>
              </ul>
              <a href="mailto:jnaneshwarareddysatti@gmail.com?subject=Premium Thumbnail Package" className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Book Premium</a>
            </div>
          </div>
          
        </div>
      </section>

    </div>
  );
};

export default Thumbnails;

import React from 'react';
import { CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import './FacelessThumbnails.css';

const FacelessThumbnails = () => {
  const skills = [
    "Drama & Gossip", "Faceless Commentary", "CTR Optimization", "Photoshop Expert", "Emotional Hooks"
  ];

  return (
    <div className="faceless-page animate-fade-in">
      <SEO title="Faceless Thumbnails" description="High-CTR YouTube Thumbnails for Faceless and Commentary Channels." />
      
      {/* Hero Section */}
      <section className="faceless-hero">
        <h1 className="faceless-title">
          <span className="text-accent-gradient">Faceless Thumbnail</span> Expert
        </h1>
        <p className="faceless-subtitle">
          I specialize in highly clickable thumbnails for drama, commentary, and documentary channels. I focus on intense facial emotion, sharp typography, and curiosity gaps to stop the scroll.
        </p>
        <div className="faceless-skills">
          {skills.map(skill => (
            <span key={skill} className="faceless-skill-badge">{skill}</span>
          ))}
        </div>
      </section>

      {/* Grid Section */}
      <section className="section-padding" style={{ paddingTop: '0' }}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Latest Viral Thumbnails</h2>
          <div className="faceless-grid-section">
            <div className="faceless-thumbnail-wrapper">
              <img src="/meghanmarklethumbnail.jpg" alt="Faceless Thumbnail Example 1" />
            </div>
            <div className="faceless-thumbnail-wrapper">
              <img src="/meghanmarklethumbnail (1).jpg" alt="Faceless Thumbnail Example 2" />
            </div>
            <div className="faceless-thumbnail-wrapper">
              <img src="/meghanmarklethumbnail (2).jpg" alt="Faceless Thumbnail Example 3" />
            </div>
            <div className="faceless-thumbnail-wrapper">
              <img src="/1782100834465-019eed7c-1559-78bc-aaf8-9f4685f9035b.jpg" alt="Faceless Thumbnail Example 4" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="faceless-pricing-section section-padding glass-panel" id="pricing" style={{ borderRadius: '40px 40px 0 0', borderBottom: 'none' }}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>Pricing</h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>Transparent starter tier pricing (First 2 weeks).</p>
          
          <div className="faceless-pricing-grid">
            {/* Basic Package */}
            <div className="faceless-pricing-card glass-panel" style={{ background: 'rgba(0,0,0,0.2)' }}>
              <div className="faceless-pricing-header">
                <h3>Basic</h3>
                <div className="faceless-price"><span>$15</span></div>
                <p className="faceless-pricing-desc">Starter Concept</p>
              </div>
              <ul className="faceless-pricing-features">
                <li><CheckCircle size={18} color="var(--accent)" /> 1 Thumbnail Concept</li>
                <li><CheckCircle size={18} color="var(--accent)" /> 2 Revisions</li>
                <li><CheckCircle size={18} color="var(--accent)" /> 2-Day Delivery</li>
              </ul>
              <a href="mailto:jnaneshwarareddysatti@gmail.com?subject=Basic Faceless Thumbnail Package" className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Book Basic</a>
            </div>

            {/* Standard Package */}
            <div className="faceless-pricing-card glass-panel faceless-premium-card">
              <div className="faceless-premium-badge">Most Popular</div>
              <div className="faceless-pricing-header">
                <h3>Standard</h3>
                <div className="faceless-price"><span>$25</span></div>
                <p className="faceless-pricing-desc">A/B Testing Ready</p>
              </div>
              <ul className="faceless-pricing-features">
                <li><CheckCircle size={18} color="var(--accent)" /> 2 Thumbnail Concepts</li>
                <li><CheckCircle size={18} color="var(--accent)" /> 3 Revisions</li>
                <li><CheckCircle size={18} color="var(--accent)" /> 2-Day Delivery</li>
              </ul>
              <a href="mailto:jnaneshwarareddysatti@gmail.com?subject=Standard Faceless Thumbnail Package" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Book Standard</a>
            </div>

            {/* Premium Package */}
            <div className="faceless-pricing-card glass-panel" style={{ background: 'rgba(0,0,0,0.2)' }}>
              <div className="faceless-pricing-header">
                <h3>Premium</h3>
                <div className="faceless-price"><span>$40</span></div>
                <p className="faceless-pricing-desc">Pro Agency Level</p>
              </div>
              <ul className="faceless-pricing-features">
                <li><CheckCircle size={18} color="var(--accent)" /> 3 Thumbnail Concepts</li>
                <li><CheckCircle size={18} color="var(--accent)" /> Unlimited Revisions</li>
                <li><CheckCircle size={18} color="var(--accent)" /> 1-Day Delivery</li>
                <li><CheckCircle size={18} color="var(--accent)" /> Source File Included</li>
              </ul>
              <a href="mailto:jnaneshwarareddysatti@gmail.com?subject=Premium Faceless Thumbnail Package" className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Book Premium</a>
            </div>
          </div>
          
        </div>
      </section>

    </div>
  );
};

export default FacelessThumbnails;

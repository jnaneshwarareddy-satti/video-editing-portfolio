import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import SEO from '../components/SEO';
import './Thumbnails.css';

const Thumbnails = () => {
  const skills = [
    "Thumbnail Design", "YouTube Thumbnails", "Photoshop", "Graphic Design", "YouTube Marketing", "CTR Optimization"
  ];

  const hardcodedImages = [
    "1782100834465-019eed7c-1559-78bc-aaf8-9f4685f9035b.jpg",
    "5jF5J7RV0KE-HD.jpg",
    "bennett-after.jpg",
    "bennett-before.jpg",
    "faceless-thumbnails.png",
    "latestthumbnail (1).png",
    "magicthumb_meghanmarkle.jpg",
    "meghanmarklethumbnail (1).jpg",
    "meghanmarklethumbnail (2).jpg",
    "meghanmarklethumbnail.jpg",
    "thumbnail-f9d9b037-d96f-494a-8221-f66ebd8d2263.png",
    "thumbnail_story_driven_v5.jpg",
    "vidiq_thumbnail_1 (2).png",
    "vidiq_thumbnail_1 (3).png"
  ];

  const [dynamicThumbnails, setDynamicThumbnails] = useState([]);

  useEffect(() => {
    const fetchThumbnails = async () => {
      try {
        const q = query(collection(db, 'thumbnails'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map(doc => doc.data().redesignedUrl);
        setDynamicThumbnails(fetched);
      } catch (error) {
        console.error("Error fetching dynamic thumbnails:", error);
      }
    };
    fetchThumbnails();
  }, []);

  return (
    <div className="thumbnails-page animate-fade-in">
      <SEO title="Thumbnail Design" description="High-CTR YouTube Thumbnails for Reaction and Gaming Channels." />
      
      {/* Hero Section */}
      <section className="thumbnails-hero" style={{ padding: '2rem 2rem 1rem 2rem' }}>
        <h1 className="thumbnails-title">
          High-CTR <br />
          <span className="text-accent-gradient">Click-Worthy Thumbnails</span>
        </h1>
        <p className="thumbnails-subtitle">
          I'm a YouTube thumbnail designer specializing in high-CTR thumbnails for reaction, gaming, and commentary channels. The difference between a click and a scroll-past.
        </p>
      </section>

      {/* Complete Portfolio Grid Section */}
      <section className="section-padding" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>My Previous Work</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {/* Dynamic Thumbnails from Admin */}
            {dynamicThumbnails.map((imgSrc, index) => (
              <div key={`dyn-${index}`} style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <img src={imgSrc.startsWith('http') ? imgSrc : `/${imgSrc.replace(/^\//, '')}`} alt={`Portfolio Item Dynamic ${index + 1}`} style={{ width: '100%', display: 'block', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'} />
              </div>
            ))}
            
            {/* Hardcoded Thumbnails */}
            {hardcodedImages.map((imgSrc, index) => (
              <div key={`static-${index}`} style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <img src={`/${imgSrc}`} alt={`Portfolio Item ${index + 1}`} style={{ width: '100%', display: 'block', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="thumbnails-pricing-section section-padding glass-panel" id="pricing" style={{ borderRadius: '40px 40px 0 0', borderBottom: 'none', marginTop: '2rem' }}>
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
      
      {/* Skills Section at Bottom */}
      <section className="section-padding" style={{ paddingTop: '3rem', paddingBottom: '4rem', textAlign: 'center' }}>
        <div className="container">
          <div className="thumbnails-skills">
            {skills.map(skill => (
              <span key={skill} className="skill-badge">{skill}</span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Thumbnails;

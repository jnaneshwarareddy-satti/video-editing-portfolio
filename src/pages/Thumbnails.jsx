import React, { useState, useEffect } from 'react';
import { CheckCircle, Mail, MessageCircle, Camera } from 'lucide-react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import SEO from '../components/SEO';
import './Thumbnails.css';

const Thumbnails = () => {
  const skills = [
    "Thumbnail Design", "YouTube Thumbnails", "Photoshop", "Graphic Design", "YouTube Marketing", "CTR Optimization"
  ];

  const [dynamicThumbnails, setDynamicThumbnails] = useState([]);
  const [categories, setCategories] = useState(["Reaction", "Gaming", "YouTube Faceless"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Categories
        const cSnap = await getDocs(collection(db, 'thumbnail_categories'));
        const customCats = cSnap.docs.map(doc => doc.data().name);
        
        // Merge default and custom categories, remove duplicates
        const allCats = Array.from(new Set(["Reaction", "Gaming", "YouTube Faceless", ...customCats]));
        setCategories(allCats);

        // Fetch Thumbnails
        const q = query(collection(db, 'thumbnails'), orderBy('createdAt', 'desc'));
        const tSnap = await getDocs(q);
        const fetched = tSnap.docs.map(doc => doc.data());
        setDynamicThumbnails(fetched);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const getThumbnailsForCategory = (cat) => {
    return dynamicThumbnails.filter(t => t.category === cat).map(t => t.redesignedUrl);
  };

  return (
    <div className="thumbnails-page animate-fade-in">
      <SEO title="Thumbnail Design" description="High-CTR YouTube Thumbnails for Reaction, Gaming, and Faceless Channels." />
      
      {/* Hero Section */}
      <section className="thumbnails-hero" style={{ padding: '2rem 2rem 0rem 2rem' }}>
        <h1 className="thumbnails-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          High-CTR <br />
          <span className="text-accent-gradient">Click-Worthy Thumbnails</span>
        </h1>
        <p className="thumbnails-subtitle" style={{ fontSize: '1.1rem', maxWidth: '600px' }}>
          I'm a YouTube thumbnail designer specializing in high-CTR thumbnails for reaction, gaming, and many more. The difference between a click and a scroll-past.
        </p>
      </section>

      {/* Complete Portfolio Grid Section */}
      <section className="section-padding" style={{ paddingTop: '2rem' }}>
        <div className="container">
          
          {categories.map(category => {
            const categoryThumbnails = getThumbnailsForCategory(category);
            
            // Only render the section if there are thumbnails in this category
            if (categoryThumbnails.length === 0) return null;

            return (
              <div key={category} style={{ marginBottom: '4rem' }}>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '2rem', borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', display: 'inline-block' }}>
                  {category}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {categoryThumbnails.map((imgSrc, index) => {
                    const finalSrc = imgSrc.startsWith('http') ? imgSrc : `/${imgSrc.replace(/^\//, '')}`;
                    return (
                      <div key={`${category}-${index}`} style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 25px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <img src={finalSrc} alt={`${category} Thumbnail ${index + 1}`} style={{ width: '100%', display: 'block', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

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

      {/* Skills Section at Bottom */}
      <section className="section-padding" style={{ paddingTop: '3rem', paddingBottom: '3rem', textAlign: 'center' }}>
        <div className="container">
          <div className="thumbnails-skills">
            {skills.map(skill => (
              <span key={skill} className="skill-badge">{skill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section section-padding">
        <div className="container">
          <div className="glass-panel" style={{ padding: '4rem', borderRadius: '24px', textAlign: 'center' }}>
            <h2 className="section-title" style={{ marginBottom: '2rem' }}>Get In Touch</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
              Ready to elevate your YouTube channel's CTR? Reach out to discuss your project, and let's start making thumbnails that demand clicks.
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
              <a href="https://wa.me/917780191704" target="_blank" rel="noreferrer" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <MessageCircle size={20} color="#25D366" /> +91 7780191704
              </a>
              <a href="https://twitter.com/Jreddy_freelanc" target="_blank" rel="noreferrer" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> @Jreddy_freelanc
              </a>
              <a href="https://instagram.com/jnaneshwar_39" target="_blank" rel="noreferrer" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Camera size={20} color="#E1306C" /> @jnaneshwar_39
              </a>
              <a href="mailto:jnaneshwarareddysatti@gmail.com" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Mail size={20} color="#EA4335" /> Email Me
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Thumbnails;

import React, { useState, useEffect } from 'react';
import { Sparkles, Globe, Target, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import SEO from '../components/SEO';
import './ThinkBeautifulPitch.css';

const ThinkBeautifulPitch = () => {
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    const fetchThumbnails = async () => {
      try {
        const thumbnailsRef = collection(db, 'thumbnails');
        const qThumbnails = query(thumbnailsRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(qThumbnails);
        setThumbnails(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching thumbnails:", error);
      }
    };

    fetchThumbnails();
  }, []);

  return (
    <div className="think-beautiful-page animate-fade-in">
      <SEO title="Hi Think Beautiful" description="Thumbnail Redesigns for Think Beautiful" />
      
      <section className="tb-hero">
        <h1 className="tb-title">
          Hi <span className="text-accent-gradient">Think Beautiful!</span>
        </h1>
        <p className="tb-subtitle">
          I've been analyzing your channel and while the content is fantastic, there's a massive opportunity to skyrocket your Click-Through Rates (CTR) and channel growth through optimized thumbnail design.
        </p>
      </section>

      <section className="tb-content">
        <div className="tb-card glass-panel" style={{ textAlign: 'center' }}>
          <h3><Target size={24} color="var(--accent)" style={{ margin: '0 auto' }} /> Why I Built This Page</h3>
          <p style={{ maxWidth: '800px', margin: '0 auto' }}>
            I am a professional Thumbnail Designer and Video Editor based in India. I noticed that your thumbnails could use a stronger visual hook to match the quality of your commentary. To prove my value and show you exactly what I mean, <strong>I have redesigned 5 of your recent video thumbnails completely for free.</strong>
          </p>
        </div>

        <div className="tb-thumbnails-section">
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '1rem' }}>The Before & After</h2>
          {thumbnails.length > 0 ? (
            thumbnails.map((thumb) => (
              <div key={thumb.id} className="thumbnail-comparison">
                <h3 className="thumbnail-comparison-title">{thumb.title}</h3>
                <div className="comparison-grid">
                  <div className="comparison-side">
                    <span className="comparison-label">Before (Original)</span>
                    <div className="comparison-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${thumb.originalVideoId}?rel=0`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                  <div className="comparison-side">
                    <span className="comparison-label" style={{ color: 'var(--accent)' }}>After (Redesigned)</span>
                    <img src={thumb.redesignedUrl} alt="Redesigned Thumbnail" className="comparison-image" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading thumbnail redesigns...</p>
          )}
        </div>

        <div className="tb-card glass-panel tb-profile-section">
          <img src="/profile.jpg" alt="Jnaneshwar" className="tb-profile-image" />
          <div className="tb-profile-content">
            <h3><Sparkles size={24} color="var(--accent)" /> Let's Grow Your Channel</h3>
            <p>
              My primary design platform is <strong>Adobe Photoshop</strong>, and I am also a highly skilled video editor. High-quality thumbnails transcend simple graphic design; they are the key to unlocking massive channel growth by capturing the algorithm's attention.
            </p>
            <p>
              <strong>Pricing:</strong> I am incredibly flexible. Whether you prefer a monthly retainer, or a per-thumbnail rate (whatever dollars works for your budget), I am ready to adapt. My goal is a long-term partnership.
            </p>
            <a href="mailto:jnaneshwarareddysatti@gmail.com?subject=Think Beautiful Thumbnails" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              Let's Talk <ArrowRight size={18} />
            </a>
          </div>
        </div>

      </section>
    </div>
  );
};

export default ThinkBeautifulPitch;

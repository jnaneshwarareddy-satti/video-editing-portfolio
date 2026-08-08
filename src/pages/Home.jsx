import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, TrendingUp, Video, Award, Mail, Camera, MessageCircle, CheckCircle, Star, Quote } from 'lucide-react';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import VideoEmbed from '../components/VideoEmbed';
import SEO from '../components/SEO';
import './Portfolio.css';
import './Home.css';

const Home = () => {
  const [featuredShorts, setFeaturedShorts] = useState([]);
  const [featuredLongs, setFeaturedLongs] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const videosRef = collection(db, 'videos');
        
        // Fetch Shorts
        const qShorts = query(videosRef, where("isShort", "==", true), orderBy("createdAt", "desc"), limit(3));
        const shortsSnapshot = await getDocs(qShorts);
        setFeaturedShorts(shortsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        // Fetch Longs
        const qLongs = query(videosRef, where("isShort", "==", false), orderBy("createdAt", "desc"), limit(2));
        const longsSnapshot = await getDocs(qLongs);
        setFeaturedLongs(longsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching featured videos:", error);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="home-page animate-fade-in">
      <SEO title="Home" />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Crafting <span className="text-accent-gradient">Faceless</span> <br />
              Masterpieces.
            </h1>
            <p className="hero-subtitle">
              I specialize in high-retention video editing for faceless YouTube channels. 
              Turning raw ideas into monetized, engaging content.
            </p>
            <div className="hero-actions">
              <Link to="/short-form" className="btn-primary">
                View Shorts <Play size={18} />
              </Link>
              <Link to="/long-form" className="btn-outline">
                Long Form <Video size={18} />
              </Link>
            </div>
          </div>
          
          <div className="hero-stats glass-panel">
            <div className="stat-item">
              <TrendingUp size={32} className="stat-icon" />
              <h3 className="stat-value">High</h3>
              <p className="stat-label">Retention Rate</p>
            </div>
            <div className="stat-item">
              <Video size={32} className="stat-icon" />
              <h3 className="stat-value">1 Year+</h3>
              <p className="stat-label">Experience</p>
            </div>
            <div className="stat-item">
              <Award size={32} className="stat-icon" />
              <h3 className="stat-value">Monetized</h3>
              <p className="stat-label">Proven Success</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section section-padding">
        <div className="container about-container glass-panel">
          <div className="about-grid">
            <div className="about-content">
              <h2 className="section-title">The Journey</h2>
              <p className="about-text">
                Over the past year, I dove deep into the world of faceless YouTube channels. 
                I learned the art of pacing, sound design, and visual storytelling—all without ever showing a face.
              </p>
              <p className="about-text">
                By applying these skills to my own channels, I successfully achieved monetization 
                and generated my first $500. Now, I use this proven, algorithmic-driven editing 
                approach to help clients scale their own channels.
              </p>
              <div className="software-stack" style={{ marginTop: '2.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Software Arsenal</h3>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  <span className="software-badge">Premiere Pro</span>
                  <span className="software-badge">DaVinci Resolve</span>
                  <span className="software-badge">CapCut Pro</span>
                  <span className="software-badge">Adobe Photoshop</span>
                </div>
              </div>
              <a href="mailto:jnaneshwarareddysatti@gmail.com" className="btn-primary" style={{ marginTop: '2.5rem', display: 'inline-block' }}>
                Let's Work Together
              </a>
            </div>
            <div className="about-image-wrapper">
              <img src="/profile.jpg" alt="Jnaneshwar" className="profile-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="featured-section section-padding">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Featured Work</h2>
          
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Recent Shorts</h3>
          {featuredShorts.length > 0 ? (
            <div className="video-grid short-grid" style={{ marginBottom: '4rem' }}>
              {featuredShorts.map(video => (
                <VideoEmbed key={video.id} videoId={video.videoId} title={video.title} isShort={true} />
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-secondary)', marginBottom: '4rem' }}>No shorts added yet.</p>
          )}

          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Cinematic Long Form</h3>
          {featuredLongs.length > 0 ? (
            <div className="video-grid long-grid">
              {featuredLongs.map(video => (
                <VideoEmbed key={video.id} videoId={video.videoId} title={video.title} isShort={false} />
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-secondary)' }}>No long form videos added yet.</p>
          )}
          
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link to="/short-form" className="btn-outline">View All Videos</Link>
          </div>
        </div>
      </section>

      {/* Services & Pricing Section */}
      <section className="pricing-section section-padding" id="pricing">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>Services & Pricing</h2>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '3rem' }}>Simple, transparent pricing for high-retention edits.</p>
          
          <div className="pricing-grid">
            {/* Short Form Package */}
            <div className="pricing-card glass-panel">
              <div className="pricing-header">
                <h3>Short Form</h3>
                <div className="price"><span>$15</span> / video</div>
                <p className="pricing-desc">Perfect for TikTok, Reels, and YT Shorts.</p>
              </div>
              <ul className="pricing-features">
                <li><CheckCircle size={18} color="var(--accent)" /> Viral Hooks & Pacing</li>
                <li><CheckCircle size={18} color="var(--accent)" /> Engaging Captions</li>
                <li><CheckCircle size={18} color="var(--accent)" /> Sound Design & SFX</li>
                <li><CheckCircle size={18} color="var(--accent)" /> 24-48h Turnaround</li>
              </ul>
              <a href="mailto:jnaneshwarareddysatti@gmail.com" className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Book Shorts</a>
            </div>

            {/* Long Form Package */}
            <div className="pricing-card glass-panel premium-card">
              <div className="premium-badge">Most Popular</div>
              <div className="pricing-header">
                <h3>Long Form</h3>
                <div className="price"><span>$50</span> / video</div>
                <p className="pricing-desc">Cinematic faceless documentary style.</p>
              </div>
              <ul className="pricing-features">
                <li><CheckCircle size={18} color="var(--accent)" /> Advanced Visual Storytelling</li>
                <li><CheckCircle size={18} color="var(--accent)" /> Motion Graphics & B-Roll</li>
                <li><CheckCircle size={18} color="var(--accent)" /> Pro Audio Mixing & Music</li>
                <li><CheckCircle size={18} color="var(--accent)" /> 3-4 Days Turnaround</li>
              </ul>
              <a href="mailto:jnaneshwarareddysatti@gmail.com" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Book Long Form</a>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2.5rem', padding: '1rem', background: 'rgba(236, 72, 153, 0.05)', borderRadius: '12px', border: '1px solid rgba(236, 72, 153, 0.1)' }}>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>
              <strong style={{ color: 'var(--accent)' }}>Looking for a full-time editor?</strong> Monthly retainer packages are available and pay is negotiable according to the volume of work. <a href="mailto:jnaneshwarareddysatti@gmail.com" style={{ color: 'white', textDecoration: 'underline' }}>Let's talk</a>.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section section-padding">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Client Feedback</h2>
          
          <div className="testimonials-grid">
            <div className="testimonial-card glass-panel">
              <Quote size={32} className="quote-icon" />
              <p className="testimonial-text">"Jnaneshwar completely transformed my channel. The retention graph is insanely flat, and I hit monetization in just 2 months!"</p>
              <div className="testimonial-author">
                <div className="stars"><Star size={16}/><Star size={16}/><Star size={16}/><Star size={16}/><Star size={16}/></div>
                <h4>Faceless Celebrity Channel</h4>
                <span>1.6k Subscribers</span>
              </div>
            </div>
            
            <div className="testimonial-card glass-panel">
              <Quote size={32} className="quote-icon" />
              <p className="testimonial-text">"The sound design and pacing in the long form videos are cinematic. Highly recommend for anyone looking to scale."</p>
              <div className="testimonial-author">
                <div className="stars"><Star size={16}/><Star size={16}/><Star size={16}/><Star size={16}/><Star size={16}/></div>
                <h4>Facts Channel</h4>
                <span>Monetized Creator</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section section-padding">
        <div className="container">
          <div className="glass-panel" style={{ padding: '4rem', borderRadius: '24px', textAlign: 'center' }}>
            <h2 className="section-title" style={{ marginBottom: '2rem' }}>Get In Touch</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
              Ready to elevate your YouTube channel? Reach out to discuss your project, and let's turn your raw footage into high-retention masterpieces.
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
              <a href="https://wa.me/917780191704" target="_blank" rel="noreferrer" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <MessageCircle size={20} color="#25D366" /> +91 7780191704
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

export default Home;

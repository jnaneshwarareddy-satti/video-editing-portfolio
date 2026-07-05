import React from 'react';
import { Sparkles, Target, CheckCircle, ArrowRight, Camera, Gamepad2 } from 'lucide-react';
import SEO from '../components/SEO';
import './BennettMeltPitch.css';

const BennettMeltPitch = () => {
  return (
    <div className="bennett-pitch-page animate-fade-in">
      <SEO title="Hi Bennett Melt!" description="Gaming Thumbnail Design Application for Bennett Melt" />
      
      <section className="bennett-hero">
        <h1 className="bennett-title">
          Hi <span className="text-accent-gradient">Bennett!</span>
        </h1>
        <p className="bennett-subtitle">
          I am a professional YouTube Thumbnail Designer specializing in high-quality, realistic "in-game" gaming thumbnails. I'm applying to be your go-to thumbnail designer.
        </p>
      </section>

      <section className="bennett-content">
        <div className="bennett-card glass-panel">
          <h3><Target size={24} color="var(--accent)" /> Why I'm the Perfect Fit</h3>
          <p>
            I read your ytjobs.co post and I know exactly what you mean by needing quality that matches Ludwig's Meccha Chameleon thumbnails or Smii7y's style. You need someone who can go beyond simple screenshots and create realistic, engaging in-game scenes.
          </p>
          <ul>
            <li><CheckCircle size={20} color="var(--accent)" style={{ flexShrink: 0 }} /> <strong>Realistic In-Game Look:</strong> I understand the lighting, framing, and post-processing needed to make gameplay look cinematic and clickable.</li>
            <li><CheckCircle size={20} color="var(--accent)" style={{ flexShrink: 0 }} /> <strong>Elevating Your Brand:</strong> My goal is to completely upgrade the visual identity of the Bennett Games channel.</li>
            <li><CheckCircle size={20} color="var(--accent)" style={{ flexShrink: 0 }} /> <strong>CTR Focused:</strong> I design for maximum click-through rate, combining clean composition with strong visual hooks.</li>
          </ul>
        </div>

        <div className="bennett-comparison-section">
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '1rem' }}>The Before & After</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
            To prove my skills, I took one of your recent thumbnails and redesigned it to show the "in-game realistic" quality you're looking for.
          </p>
          
          <div className="bennett-comparison-grid">
            <div className="bennett-comparison-side">
              <span className="bennett-comparison-label">Before (Original)</span>
              <img src="/bennett-before.jpg" alt="Bennett Melt Original Thumbnail" className="bennett-comparison-image" />
            </div>
            <div className="bennett-comparison-side">
              <span className="bennett-comparison-label" style={{ color: 'var(--accent)' }}>After (Redesigned)</span>
              <img src="/bennett-after.jpg" alt="Bennett Melt Redesigned Thumbnail" className="bennett-comparison-image" />
            </div>
          </div>
        </div>

        <div className="bennett-card glass-panel bennett-pricing">
          <h3><Gamepad2 size={24} color="var(--accent)" /> Let's Start Working Together</h3>
          <p>
            I am fully aligned with your <strong>$60-$100 per project</strong> rate and am ready to start ASAP on both short-form and long-form projects.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="mailto:jnaneshwarareddysatti@gmail.com?subject=Bennett Melt Thumbnail Designer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Hire Me <ArrowRight size={18} />
            </a>
            <a href="https://instagram.com/jnaneshwar_39" target="_blank" rel="noreferrer" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#E1306C', borderColor: '#E1306C' }}>
              <Camera size={18} /> @jnaneshwar_39
            </a>
          </div>
        </div>

      </section>
    </div>
  );
};

export default BennettMeltPitch;

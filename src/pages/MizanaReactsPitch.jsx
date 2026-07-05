import React from 'react';
import { Sparkles, Globe, Target, CheckCircle, ArrowRight, Camera } from 'lucide-react';
import SEO from '../components/SEO';
import './MizanaReactsPitch.css';

const MizanaReactsPitch = () => {
  return (
    <div className="mizana-pitch-page animate-fade-in">
      <SEO title="Hi Mizana Reacts!" description="Thumbnail Design Application for Mizana Reacts" />
      
      <section className="mizana-hero">
        <h1 className="mizana-title">
          Hi <span className="text-accent-gradient">Mizana Reacts Team!</span>
        </h1>
        <p className="mizana-subtitle">
          I am a professional YouTube Thumbnail Designer specializing in high-CTR, movie reaction thumbnails. I'm applying to be your long-term creative partner.
        </p>
      </section>

      <section className="mizana-content">
        <div className="mizana-card glass-panel">
          <h3><Target size={24} color="var(--accent)" /> Why I'm the Perfect Fit</h3>
          <p>
            I read your job post on ytjobs.co, and I understand exactly what you are looking for. You need someone who understands <strong>movie reactions specifically</strong>—not just generic gaming or finance thumbnails. 
          </p>
          <ul>
            <li><CheckCircle size={20} color="var(--accent)" style={{ flexShrink: 0 }} /> <strong>Performance Mindset:</strong> I design for CTR, focusing on authentic facial emotion, clean contrast, and readable text.</li>
            <li><CheckCircle size={20} color="var(--accent)" style={{ flexShrink: 0 }} /> <strong>Movie Iconography:</strong> I know how to combine instantly recognizable movie imagery with clean professional composition.</li>
            <li><CheckCircle size={20} color="var(--accent)" style={{ flexShrink: 0 }} /> <strong>Accuracy:</strong> I use real source material without altering obvious details or relying on lazy AI templates.</li>
          </ul>
        </div>

        <div className="mizana-variations-section">
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '1rem' }}>My Recreations For You</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
            To prove my ability, I took one of your recent concepts and completely recreated it in 3 distinct variations, demonstrating both the standard movie-recognition angle and the culture-angle.
          </p>
          
          <div className="variation-card">
            <h3 className="variation-title">Variation 1: High-Contrast Character Focus</h3>
            <p className="variation-desc">Maximizes facial emotion and contrast for instant readability on mobile.</p>
            <img src="/thumbnail-f9d9b037-d96f-494a-8221-f66ebd8d2263.png" alt="Mizana Reacts Variation 1" className="variation-image" />
          </div>

          <div className="variation-card">
            <h3 className="variation-title">Variation 2: Standard Movie-Recognition Angle</h3>
            <p className="variation-desc">Focuses on instantly recognizable movie poster iconography paired with a clean reaction.</p>
            <img src="/vidiq_thumbnail_1 (2).png" alt="Mizana Reacts Variation 2" className="variation-image" />
          </div>

          <div className="variation-card">
            <h3 className="variation-title">Variation 3: The Culture Angle</h3>
            <p className="variation-desc">A cleaner composition highlighting the reactor and the specific cultural context.</p>
            <img src="/vidiq_thumbnail_1 (3).png" alt="Mizana Reacts Variation 3" className="variation-image" />
          </div>
        </div>

        <div className="mizana-card glass-panel mizana-pricing">
          <h3><Sparkles size={24} color="var(--accent)" /> Let's Start Working Together</h3>
          <p>
            I am fully aligned with your ongoing rate of <strong>$40 per movie package (2 options)</strong>. I am also completely ready to complete the $20 paid finalist assignment whenever you are ready.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="mailto:jnaneshwarareddysatti@gmail.com?subject=Mizana Reacts Thumbnail Designer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
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

export default MizanaReactsPitch;

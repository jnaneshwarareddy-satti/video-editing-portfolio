import React, { useState, useEffect } from 'react';
import { Sparkles, Globe, Target, ArrowRight, CheckCircle, Image as ImageIcon, Video } from 'lucide-react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import VideoEmbed from '../components/VideoEmbed';
import SEO from '../components/SEO';
import './KyndallPitch.css';

const KyndallPitch = () => {
  const [featuredVideos, setFeaturedVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videosRef = collection(db, 'videos');
        const qVideos = query(videosRef, orderBy("createdAt", "desc"), limit(4));
        const snapshot = await getDocs(qVideos);
        setFeaturedVideos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="kyndall-pitch-page animate-fade-in">
      <SEO title="Hi Kyndall & Team" description="Video Editing Portfolio for Kyndall Ames" />
      
      <section className="pitch-hero">
        <h1 className="pitch-title">
          Hi Kyndall <span className="text-accent-gradient">& Team!</span>
        </h1>
        <p className="pitch-subtitle">
          I built this custom page because I'm incredibly excited about the opportunity to become your long-term creative partner and help scale the Kyndall Ames brand.
        </p>
      </section>

      <section className="pitch-content">
        <div className="pitch-card glass-panel">
          <h3><Sparkles size={24} color="var(--accent)" /> Why I'm the Right Fit</h3>
          <p>
            While I'll be fully transparent—I haven't explicitly edited beauty or lifestyle niche content in the past—my core expertise lies in the foundational pillars of all successful YouTube content: <strong>Storytelling, Pacing, and High Retention.</strong>
          </p>
          <p>
            I've spent the last year mastering how to keep viewers hooked, managing sound design, and driving algorithmic growth. I know how to apply these universal principles to lifestyle vlogs, product reviews, and UGC. I am highly adaptable and a very fast learner.
          </p>
        </div>

        <div className="pitch-card glass-panel">
          <h3><Globe size={24} color="var(--accent)" /> Global Experience & Highly Competitive</h3>
          <p>
            Being based in India allows me to offer highly competitive rates while maintaining an obsessive level of quality and dedication. Furthermore, all the content I edit is fully optimized for the USA demographic, proving my deep understanding of the Western audience's pacing and culture.
          </p>
          <ul>
            <li><CheckCircle size={20} color="var(--accent)" style={{ flexShrink: 0 }} /> <strong>Rates:</strong> $250 FLAT per long-form video (Shorts: $15-$25/each).</li>
            <li><CheckCircle size={20} color="var(--accent)" style={{ flexShrink: 0 }} /> <strong>Turnaround:</strong> 48-72 hours for long-form, 24 hours for shorts.</li>
            <li><CheckCircle size={20} color="var(--accent)" style={{ flexShrink: 0 }} /> <strong>Communication:</strong> Always highly responsive to feedback and revisions.</li>
          </ul>
        </div>

        <div className="pitch-card glass-panel">
          <h3><ImageIcon size={24} color="var(--accent)" /> Bonus: Free Thumbnail Design</h3>
          <p>
            As a bonus, I am also an experienced thumbnail designer. I understand CTR (Click-Through Rate) optimization and can design high-converting, aesthetic thumbnails for your videos as part of our workflow, so you don't have to hire a separate designer.
          </p>
        </div>

        <div className="pitch-card glass-panel">
          <h3><Target size={24} color="var(--accent)" /> Quick Critique on Current Edits</h3>
          <p>
            I absolutely love the authentic, grounded vibe of your current content. If I were editing, to take it to the next level, I would:
          </p>
          <ul>
            <li><CheckCircle size={20} color="var(--accent)" style={{ flexShrink: 0 }} /> <strong>Tighten the Hook:</strong> Slightly faster pacing during the first 15 seconds of the long-form vlogs to maximize initial viewer retention.</li>
            <li><CheckCircle size={20} color="var(--accent)" style={{ flexShrink: 0 }} /> <strong>Subtle Motion Graphics:</strong> Introduce soft, on-brand text tracking or aesthetic film burns to keep viewers engaged during longer conversational segments, without losing that organic UGC feel.</li>
          </ul>
        </div>

        <div className="pitch-card glass-panel" style={{ marginTop: '2rem' }}>
          <h3><Video size={24} color="var(--accent)" /> My Editing Examples</h3>
          <p style={{ marginBottom: '2rem' }}>
            Below are examples of my work. While they are from a different niche, they are 100% targeted to a USA audience and demonstrate my ability to maintain high retention, mix pristine audio, and utilize engaging visual storytelling.
          </p>
          {featuredVideos.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {featuredVideos.map(video => (
                <VideoEmbed key={video.id} videoId={video.videoId} title={video.title} isShort={video.isShort} />
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-secondary)' }}>Loading videos...</p>
          )}
        </div>

        <div className="trial-cta">
          <h3>Let Me Prove It to You</h3>
          <p>
            Because I am transitioning into the beauty/lifestyle space, I want to remove all the risk for you. <strong>I would love to edit a small trial video completely for free.</strong> Send me some raw footage, and let me show you how I can match your aesthetic and elevate the retention.
          </p>
          <a href="mailto:jnaneshwarareddysatti@gmail.com?subject=Glow! Let's do the trial edit." className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Request the Free Trial Edit <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default KyndallPitch;

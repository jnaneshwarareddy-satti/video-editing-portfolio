import React from 'react';
import { Target, Lightbulb, PlayCircle, Eye, Handshake, ArrowRight, Camera } from 'lucide-react';
import SEO from '../components/SEO';
import './JoshuaPitch.css';

const JoshuaPitch = () => {
  return (
    <div className="joshua-pitch-page animate-fade-in">
      <SEO title="Hi Joshua!" description="Video Concepts and Thumbnail Pitch for Joshua." />
      
      <section className="joshua-hero">
        <h1 className="joshua-title">
          Hi <span className="text-accent-gradient">Joshua!</span>
        </h1>
        <p className="joshua-subtitle">
          Here are two tailored video concepts and thumbnail designs perfectly aligned with what the channel's data currently rewards: money psychology, number-led contrarian titles, shock first lines, and high-CTR visuals.
        </p>
      </section>

      <section className="joshua-content">
        
        {/* Concept 1: Top of Funnel */}
        <div className="joshua-concept-card">
          <div className="joshua-concept-header">
            <span className="joshua-concept-tag">Top of Funnel (Reach)</span>
            <h2 className="joshua-concept-title">"I'm 64 and Wealthy. If You're Under 40, Fix These 5 Money Mistakes Now."</h2>
          </div>
          
          <div className="joshua-grid">
            <div className="joshua-thumbnail-wrapper">
              <img src="/sample_thumb-1.png" alt="Ken intimate jet-cabin selfie thumbnail" />
            </div>
            
            <div className="joshua-details">
              <div className="joshua-detail-section">
                <h4><Lightbulb size={18} /> The Idea</h4>
                <p>Ken talks straight to a younger viewer about the money regrets he watches people his age repeat. It's not a real-estate lecture — it's life-and-money wisdom anyone can feel. This format is built to travel and reach people who've never heard of him.</p>
              </div>
              
              <div className="joshua-detail-section">
                <h4><Eye size={18} /> Thumbnail Vision</h4>
                <p>Intimate jet-cabin "selfie" of Ken, calm and serious, looking down the lens. Two bold yellow words: <strong>"DON'T WAIT."</strong> No clutter.</p>
              </div>

              <div className="joshua-detail-section">
                <h4><PlayCircle size={18} /> The Hook</h4>
                <p>"I've talked to hundreds of guys in their 60s and 70s — some worth millions, some worth nothing — and almost all of them have the exact same regret."</p>
              </div>

              <div className="joshua-detail-section">
                <h4><Target size={18} /> What It Covers</h4>
                <p>What he chased in his 20s that didn't matter • Good debt vs. bad debt • Why "just save" fails • The one habit that compounds • What he'd tell his 25-year-old self.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Concept 2: Mid/Bottom Funnel */}
        <div className="joshua-concept-card">
          <div className="joshua-concept-header">
            <span className="joshua-concept-tag" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>Mid/Bottom Funnel (Conversion)</span>
            <h2 className="joshua-concept-title">"The Exact 5-Step Plan I'd Use to Replace My Salary With Rentals (Starting From $0)"</h2>
          </div>
          
          <div className="joshua-grid">
            <div className="joshua-thumbnail-wrapper">
              <img src="/sample_thumb-2.png" alt="Ken $0 to Freedom 5 Steps thumbnail" />
            </div>
            
            <div className="joshua-details">
              <div className="joshua-detail-section">
                <h4><Lightbulb size={18} /> The Idea</h4>
                <p>The natural next step for anyone the first video pulled in. Ken lays out the exact path he'd take starting from nothing today. It's specific enough that only people ready to act watch to the end — the perfect place to hand them a free tool and bring them into his world.</p>
              </div>
              
              <div className="joshua-detail-section">
                <h4><Eye size={18} /> Thumbnail Vision</h4>
                <p>Ken beside a simple 1→5 ladder ending on a house, <strong>"$0 → FREEDOM"</strong>; his face anchors it, <strong>"5 STEPS"</strong> in yellow.</p>
              </div>

              <div className="joshua-detail-section">
                <h4><PlayCircle size={18} /> The Hook</h4>
                <p>"If I lost everything tomorrow, this is the exact plan I'd follow to get back to financially free — and step one takes just 30 days."</p>
              </div>

              <div className="joshua-detail-section">
                <h4><Target size={18} /> What It Covers</h4>
                <p>Build the knowledge base fast • Find a cash-flowing deal from your couch • Fund it without your own money • The numbers that must work • Repeat and scale.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Synergy Section */}
        <div className="joshua-why-it-works">
          <h4>Why This Pair Works</h4>
          <p>
            The first video earns the <strong>reach</strong> by triggering curiosity and emotion through money psychology. The second video <strong>converts</strong> that reach by providing a concrete, number-led roadmap with a real CTA (free starter kit → email list → paid community/course).
          </p>
        </div>

        {/* CTA */}
        <div className="joshua-cta-section glass-panel">
          <h3><Handshake size={24} color="var(--accent)" /> Let's Execute This</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Ready to test this funnel and scale the channel's reach and conversions?
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:jnaneshwarareddysatti@gmail.com?subject=Thumbnail Test Run - Let's talk" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Let's Talk <ArrowRight size={18} />
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

export default JoshuaPitch;

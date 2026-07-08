import React from 'react';
import SEO from '../components/SEO';
import './JoshuaPitch.css';

const JoshuaPitch = () => {
  return (
    <div className="joshua-pitch-page animate-fade-in">
      <SEO title="Hi Joshua!" description="Video Concepts and Thumbnail Pitch for Joshua." />
      
      <section className="joshua-hero" style={{ paddingBottom: '2rem' }}>
        <h1 className="joshua-title">
          Hi <span className="text-accent-gradient">Joshua!</span>
        </h1>
      </section>

      <section className="joshua-content" style={{ gap: '3rem' }}>
        
        {/* Concept 1: Top of Funnel */}
        <div className="joshua-concept-card" style={{ textAlign: 'center' }}>
          <h2 className="joshua-concept-title" style={{ marginBottom: '2rem' }}>
            "I'm 64 and Wealthy. If You're Under 40, Fix These 5 Money Mistakes Now."
          </h2>
          <div className="joshua-thumbnail-wrapper" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <img src="/sample_thumb-1.png" alt="Ken intimate jet-cabin selfie thumbnail" />
          </div>
        </div>

        {/* Concept 2: Mid/Bottom Funnel */}
        <div className="joshua-concept-card" style={{ textAlign: 'center' }}>
          <h2 className="joshua-concept-title" style={{ marginBottom: '2rem' }}>
            "The Exact 5-Step Plan I'd Use to Replace My Salary With Rentals (Starting From $0)"
          </h2>
          <div className="joshua-thumbnail-wrapper" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <img src="/sample_thumb-2.png" alt="Ken $0 to Freedom 5 Steps thumbnail" />
          </div>
        </div>

      </section>
    </div>
  );
};

export default JoshuaPitch;

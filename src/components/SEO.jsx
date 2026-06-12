import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, type = "website" }) => {
  const siteTitle = title ? `${title} | Jnaneshwar Reddy - Video Editor` : "Jnaneshwar Reddy - Faceless Channel Video Editor";
  const siteDescription = description || "Specializing in high-retention video editing for faceless YouTube channels. I turn raw footage into monetized, engaging content.";
  const url = window.location.href;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content="/profile.jpg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={siteDescription} />
      <meta property="twitter:image" content="/profile.jpg" />
    </Helmet>
  );
};

export default SEO;

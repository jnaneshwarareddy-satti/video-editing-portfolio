import React from 'react';
import './VideoEmbed.css';

const VideoEmbed = ({ videoId, title, isShort = false }) => {
  // Use youtube-nocookie for better privacy and cleaner embed
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;

  return (
    <div className={`video-card glass-panel animate-fade-in ${isShort ? 'short-video' : 'long-video'}`}>
      <div className="video-wrapper">
        <iframe
          src={embedUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="video-iframe"
        ></iframe>
      </div>
      <div className="video-info">
        <h3 className="video-title">{title}</h3>
      </div>
    </div>
  );
};

export default VideoEmbed;

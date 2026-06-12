import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import VideoEmbed from '../components/VideoEmbed';
import SEO from '../components/SEO';
import './Portfolio.css';

const LongForm = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const q = query(
          collection(db, 'videos'), 
          where("isShort", "==", false),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        setVideos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching long form videos:", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="portfolio-page section-padding animate-fade-in">
      <SEO title="Long Form Portfolio" description="Watch my cinematic, documentary-style long form YouTube edits." />
      <div className="container">
        <h1 className="page-title text-gradient">Long Form Content</h1>
        <p className="page-subtitle">
          Cinematic pacing, expert sound design, and engaging visuals built to keep viewers watching till the end.
        </p>
        
        <div className="video-grid long-grid">
          {videos.map(video => (
            <VideoEmbed 
              key={video.id} 
              videoId={video.videoId} 
              title={video.title} 
              isShort={false} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LongForm;

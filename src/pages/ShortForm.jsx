import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import VideoEmbed from '../components/VideoEmbed';
import SEO from '../components/SEO';
import './Portfolio.css';

const ShortForm = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const q = query(
          collection(db, 'videos'), 
          where("isShort", "==", true),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        setVideos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching shorts:", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="portfolio-page section-padding animate-fade-in">
      <SEO title="Shorts Portfolio" description="Check out my viral YouTube Shorts portfolio featuring high-retention vertical edits." />
      <div className="container">
        <h1 className="page-title text-gradient">Short Form Content</h1>
        <p className="page-subtitle">
          High-impact, fast-paced edits designed for maximum retention on Shorts, Reels, and TikTok.
        </p>
        
        <div className="video-grid short-grid">
          {videos.map(video => (
            <VideoEmbed 
              key={video.id} 
              videoId={video.videoId} 
              title={video.title} 
              isShort={true} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShortForm;

import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signOut } from 'firebase/auth';
import { db, auth, storage } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit2, Trash2, Video, Image as ImageIcon } from 'lucide-react';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('videos'); // 'videos' or 'thumbnails'
  const [videos, setVideos] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Video Form State
  const [isVideoEditing, setIsVideoEditing] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isShort, setIsShort] = useState(false);

  // Thumbnail Form State
  const [thumbTitle, setThumbTitle] = useState('');
  const [thumbVideoUrl, setThumbVideoUrl] = useState('');
  const [thumbFile, setThumbFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const navigate = useNavigate();
  const videosCollectionRef = collection(db, 'videos');
  const thumbnailsCollectionRef = collection(db, 'thumbnails');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const vData = await getDocs(videosCollectionRef);
      setVideos(vData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      const tData = await getDocs(thumbnailsCollectionRef);
      setThumbnails(tData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const extractVideoId = (inputUrl) => {
    if (inputUrl.length === 11 && !inputUrl.includes('youtube.com') && !inputUrl.includes('youtu.be')) {
      return inputUrl;
    }
    const match = inputUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : inputUrl;
  };

  // --- VIDEO HANDLERS ---
  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    const videoId = extractVideoId(videoUrl);
    
    if (!videoId) {
      alert("Invalid YouTube URL or ID");
      return;
    }

    const payload = {
      title: videoTitle,
      videoId,
      isShort,
      updatedAt: serverTimestamp()
    };

    try {
      if (isVideoEditing) {
        const videoDoc = doc(db, 'videos', currentVideoId);
        await updateDoc(videoDoc, payload);
      } else {
        payload.createdAt = serverTimestamp();
        await addDoc(videosCollectionRef, payload);
      }
      
      setVideoTitle('');
      setVideoUrl('');
      setIsShort(false);
      setIsVideoEditing(false);
      setCurrentVideoId(null);
      
      fetchData();
    } catch (error) {
      console.error("Error saving video:", error);
      alert("Failed to save video.");
    }
  };

  const handleVideoEdit = (video) => {
    setIsVideoEditing(true);
    setCurrentVideoId(video.id);
    setVideoTitle(video.title);
    setVideoUrl(`https://www.youtube.com/watch?v=${video.videoId}`);
    setIsShort(video.isShort);
    setActiveTab('videos');
  };

  const handleVideoDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        await deleteDoc(doc(db, 'videos', id));
        fetchData();
      } catch (error) {
        console.error("Error deleting video:", error);
      }
    }
  };

  // --- THUMBNAIL HANDLERS ---
  const handleThumbnailSubmit = async (e) => {
    e.preventDefault();
    const videoId = extractVideoId(thumbVideoUrl);
    
    if (!videoId) {
      alert("Invalid YouTube URL or ID");
      return;
    }
    if (!thumbFile) {
      alert("Please select a redesigned thumbnail image.");
      return;
    }

    setIsUploading(true);
    try {
      const storageRef = ref(storage, `thumbnails/${Date.now()}_${thumbFile.name}`);
      const snapshot = await uploadBytes(storageRef, thumbFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const payload = {
        title: thumbTitle,
        originalVideoId: videoId,
        redesignedUrl: downloadURL,
        createdAt: serverTimestamp(),
      };
      
      await addDoc(thumbnailsCollectionRef, payload);
      
      setThumbTitle('');
      setThumbVideoUrl('');
      setThumbFile(null);
      e.target.reset();
      
      fetchData();
    } catch (error) {
      console.error("Error saving thumbnail:", error);
      alert("Failed to save thumbnail. Ensure Firebase Storage is enabled and rules allow writing.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleThumbnailDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this thumbnail? Note: This does not delete the image from Storage automatically.")) {
      try {
        await deleteDoc(doc(db, 'thumbnails', id));
        fetchData();
      } catch (error) {
        console.error("Error deleting thumbnail:", error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="admin-page section-padding animate-fade-in">
      <div className="container">
        <div className="admin-header">
          <h1 className="page-title text-gradient">Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn-outline logout-btn">
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="admin-tabs" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button 
            className={`btn-outline ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, justifyContent: 'center', background: activeTab === 'videos' ? 'var(--accent)' : 'transparent', color: activeTab === 'videos' ? 'white' : 'var(--text-primary)' }}
          >
            <Video size={18} /> Manage Videos
          </button>
          <button 
            className={`btn-outline ${activeTab === 'thumbnails' ? 'active' : ''}`}
            onClick={() => setActiveTab('thumbnails')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, justifyContent: 'center', background: activeTab === 'thumbnails' ? 'var(--accent)' : 'transparent', color: activeTab === 'thumbnails' ? 'white' : 'var(--text-primary)' }}
          >
            <ImageIcon size={18} /> Manage Thumbnails
          </button>
        </div>

        <div className="admin-grid">
          {/* Form Section */}
          <div className="admin-card glass-panel form-panel">
            {activeTab === 'videos' ? (
              <>
                <h2>{isVideoEditing ? 'Edit Video' : 'Add New Video'}</h2>
                <form onSubmit={handleVideoSubmit} className="admin-form">
                  <div className="input-group">
                    <label>Video Title</label>
                    <input type="text" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} required placeholder="e.g. Viral Hook Example" />
                  </div>
                  <div className="input-group">
                    <label>YouTube URL or Video ID</label>
                    <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} required placeholder="https://www.youtube.com/watch?v=..." />
                  </div>
                  <div className="input-group checkbox-group">
                    <label className="checkbox-container">
                      <input type="checkbox" checked={isShort} onChange={(e) => setIsShort(e.target.checked)} />
                      <span className="checkmark"></span>
                      Is this a YouTube Short? (Vertical 9:16)
                    </label>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-primary">
                      {isVideoEditing ? 'Update Video' : <><Plus size={18} /> Add Video</>}
                    </button>
                    {isVideoEditing && (
                      <button type="button" className="btn-outline" onClick={() => { setIsVideoEditing(false); setVideoTitle(''); setVideoUrl(''); setIsShort(false); }}>Cancel</button>
                    )}
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2>Add Thumbnail Redesign</h2>
                <form onSubmit={handleThumbnailSubmit} className="admin-form">
                  <div className="input-group">
                    <label>Title / Description</label>
                    <input type="text" value={thumbTitle} onChange={(e) => setThumbTitle(e.target.value)} required placeholder="e.g. Think Beautiful - Drama Hook" />
                  </div>
                  <div className="input-group">
                    <label>Original YouTube URL (For "Before")</label>
                    <input type="text" value={thumbVideoUrl} onChange={(e) => setThumbVideoUrl(e.target.value)} required placeholder="https://www.youtube.com/watch?v=..." />
                  </div>
                  <div className="input-group">
                    <label>Upload Redesigned Thumbnail (For "After")</label>
                    <input type="file" accept="image/*" onChange={(e) => setThumbFile(e.target.files[0])} required />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-primary" disabled={isUploading}>
                      {isUploading ? 'Uploading...' : <><Plus size={18} /> Upload Thumbnail</>}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* List Section */}
          <div className="admin-card glass-panel list-panel">
            <h2>{activeTab === 'videos' ? 'Manage Videos' : 'Manage Thumbnails'}</h2>
            {isLoading ? (
              <p>Loading...</p>
            ) : activeTab === 'videos' ? (
              videos.length === 0 ? <p>No videos found.</p> : (
                <div className="video-list">
                  {videos.map(video => (
                    <div key={video.id} className="video-list-item">
                      <div className="video-details">
                        <div className={`video-badge ${video.isShort ? 'short-badge' : 'long-badge'}`}>
                          {video.isShort ? 'Short' : 'Long Form'}
                        </div>
                        <h4 className="video-list-title">{video.title}</h4>
                        <p className="video-list-id">ID: {video.videoId}</p>
                      </div>
                      <div className="video-actions">
                        <button onClick={() => handleVideoEdit(video)} className="action-btn edit-btn"><Edit2 size={18} /></button>
                        <button onClick={() => handleVideoDelete(video.id)} className="action-btn delete-btn"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              thumbnails.length === 0 ? <p>No thumbnails found.</p> : (
                <div className="video-list" style={{ gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                  {thumbnails.map(thumb => (
                    <div key={thumb.id} className="video-list-item" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <img src={thumb.redesignedUrl} alt="thumbnail" style={{ width: '80px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} />
                      <div className="video-details" style={{ flex: 1 }}>
                        <h4 className="video-list-title">{thumb.title}</h4>
                        <p className="video-list-id">Original ID: {thumb.originalVideoId}</p>
                      </div>
                      <div className="video-actions">
                        <button onClick={() => handleThumbnailDelete(thumb.id)} className="action-btn delete-btn"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

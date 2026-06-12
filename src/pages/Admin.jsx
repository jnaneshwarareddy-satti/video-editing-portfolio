import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit2, Trash2 } from 'lucide-react';
import './Admin.css';

const Admin = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [isShort, setIsShort] = useState(false);
  
  const navigate = useNavigate();
  const videosCollectionRef = collection(db, 'videos');

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const data = await getDocs(videosCollectionRef);
      setVideos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const extractVideoId = (inputUrl) => {
    // If it's just an 11-character string, assume it's already an ID
    if (inputUrl.length === 11 && !inputUrl.includes('youtube.com') && !inputUrl.includes('youtu.be')) {
      return inputUrl;
    }
    const match = inputUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : inputUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const videoId = extractVideoId(url);
    
    if (!videoId) {
      alert("Invalid YouTube URL or ID");
      return;
    }

    const payload = {
      title,
      videoId,
      isShort,
      updatedAt: serverTimestamp()
    };

    try {
      if (isEditing) {
        const videoDoc = doc(db, 'videos', currentId);
        await updateDoc(videoDoc, payload);
      } else {
        payload.createdAt = serverTimestamp();
        await addDoc(videosCollectionRef, payload);
      }
      
      // Reset form
      setTitle('');
      setUrl('');
      setIsShort(false);
      setIsEditing(false);
      setCurrentId(null);
      
      fetchVideos();
    } catch (error) {
      console.error("Error saving video:", error);
      alert("Failed to save video.");
    }
  };

  const handleEdit = (video) => {
    setIsEditing(true);
    setCurrentId(video.id);
    setTitle(video.title);
    setUrl(`https://www.youtube.com/watch?v=${video.videoId}`);
    setIsShort(video.isShort);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        const videoDoc = doc(db, 'videos', id);
        await deleteDoc(videoDoc);
        fetchVideos();
      } catch (error) {
        console.error("Error deleting video:", error);
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

        <div className="admin-grid">
          {/* Form Section */}
          <div className="admin-card glass-panel form-panel">
            <h2>{isEditing ? 'Edit Video' : 'Add New Video'}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="input-group">
                <label>Video Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required 
                  placeholder="e.g. Viral Hook Example"
                />
              </div>
              <div className="input-group">
                <label>YouTube URL or Video ID</label>
                <input 
                  type="text" 
                  value={url} 
                  onChange={(e) => setUrl(e.target.value)} 
                  required 
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
              <div className="input-group checkbox-group">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    checked={isShort} 
                    onChange={(e) => setIsShort(e.target.checked)} 
                  />
                  <span className="checkmark"></span>
                  Is this a YouTube Short? (Vertical 9:16)
                </label>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {isEditing ? 'Update Video' : <><Plus size={18} /> Add Video</>}
                </button>
                {isEditing && (
                  <button 
                    type="button" 
                    className="btn-outline" 
                    onClick={() => {
                      setIsEditing(false);
                      setTitle('');
                      setUrl('');
                      setIsShort(false);
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List Section */}
          <div className="admin-card glass-panel list-panel">
            <h2>Manage Videos</h2>
            {isLoading ? (
              <p>Loading videos...</p>
            ) : videos.length === 0 ? (
              <p>No videos found. Add some above!</p>
            ) : (
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
                      <button onClick={() => handleEdit(video)} className="action-btn edit-btn">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(video.id)} className="action-btn delete-btn">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit2, Trash2, Video, Image as ImageIcon, Folder, ArrowUp, ArrowDown } from 'lucide-react';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('videos'); // 'videos', 'thumbnails', or 'categories'
  const [videos, setVideos] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [categories, setCategories] = useState([]);
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
  const [thumbImageUrl, setThumbImageUrl] = useState('');
  const [thumbCategory, setThumbCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  // Category Form State
  const [categoryName, setCategoryName] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const navigate = useNavigate();
  const videosCollectionRef = collection(db, 'videos');
  const thumbnailsCollectionRef = collection(db, 'thumbnails');
  const categoriesCollectionRef = collection(db, 'thumbnail_categories');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const vData = await getDocs(videosCollectionRef);
      setVideos(vData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      const qThumbnails = query(thumbnailsCollectionRef, orderBy('createdAt', 'desc'));
      const tData = await getDocs(qThumbnails);
      setThumbnails(tData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      const cData = await getDocs(categoriesCollectionRef);
      setCategories(cData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
    
    let videoId = '';
    if (thumbVideoUrl) {
      videoId = extractVideoId(thumbVideoUrl);
      if (!videoId) {
        alert("Invalid YouTube URL or ID");
        return;
      }
    }
    
    if (!thumbImageUrl) {
      alert("Please enter the redesigned thumbnail URL.");
      return;
    }
    if (!thumbCategory) {
      alert("Please select a category for this thumbnail.");
      return;
    }

    setIsUploading(true);
    try {
      const payload = {
        title: thumbTitle,
        originalVideoId: videoId,
        redesignedUrl: thumbImageUrl,
        category: thumbCategory,
        createdAt: serverTimestamp(),
      };
      
      await addDoc(thumbnailsCollectionRef, payload);
      
      setThumbTitle('');
      setThumbVideoUrl('');
      setThumbImageUrl('');
      setThumbCategory('');
      e.target.reset();
      
      fetchData();
    } catch (error) {
      console.error("Error saving thumbnail:", error);
      alert("Failed to save thumbnail.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleThumbnailDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this thumbnail?")) {
      try {
        await deleteDoc(doc(db, 'thumbnails', id));
        fetchData();
      } catch (error) {
        console.error("Error deleting thumbnail:", error);
      }
    }
  };

  const handleThumbnailCategoryChange = async (id, newCategory) => {
    try {
      const thumbDoc = doc(db, 'thumbnails', id);
      await updateDoc(thumbDoc, { category: newCategory });
      fetchData(); // Refresh the list
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update category.");
    }
  };

  const handleMoveUp = async (index, filteredThumbs) => {
    if (index === 0) return; // Already at top
    const current = filteredThumbs[index];
    const above = filteredThumbs[index - 1];

    try {
      // Swap their createdAt timestamps to swap their order
      const currentDoc = doc(db, 'thumbnails', current.id);
      const aboveDoc = doc(db, 'thumbnails', above.id);
      
      const tempTime = current.createdAt;
      await updateDoc(currentDoc, { createdAt: above.createdAt });
      await updateDoc(aboveDoc, { createdAt: tempTime });
      
      fetchData();
    } catch (error) {
      console.error("Error swapping order:", error);
    }
  };

  const handleMoveDown = async (index, filteredThumbs) => {
    if (index === filteredThumbs.length - 1) return; // Already at bottom
    const current = filteredThumbs[index];
    const below = filteredThumbs[index + 1];

    try {
      const currentDoc = doc(db, 'thumbnails', current.id);
      const belowDoc = doc(db, 'thumbnails', below.id);
      
      const tempTime = current.createdAt;
      await updateDoc(currentDoc, { createdAt: below.createdAt });
      await updateDoc(belowDoc, { createdAt: tempTime });
      
      fetchData();
    } catch (error) {
      console.error("Error swapping order:", error);
    }
  };

  // --- CATEGORY HANDLERS ---
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    try {
      await addDoc(categoriesCollectionRef, {
        name: categoryName.trim(),
        createdAt: serverTimestamp()
      });
      setCategoryName('');
      fetchData();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category.");
    }
  };

  const handleCategoryDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category? Note: Thumbnails using this category won't be deleted, but may not show correctly if the category is missing.")) {
      try {
        await deleteDoc(doc(db, 'thumbnail_categories', id));
        fetchData();
      } catch (error) {
        console.error("Error deleting category:", error);
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

  const migrateHardcoded = async () => {
    const hardcodedReaction = [
      "vidiq_thumbnail_1 (2).png",
      "vidiq_thumbnail_1 (3).png",
      "thumbnail-f9d9b037-d96f-494a-8221-f66ebd8d2263.png"
    ];
    const hardcodedGaming = [
      "bennett-after.jpg",
      "bennett-before.jpg"
    ];
    const hardcodedFaceless = [
      "1782100834465-019eed7c-1559-78bc-aaf8-9f4685f9035b.jpg",
      "5jF5J7RV0KE-HD.jpg",
      "faceless-thumbnails.png",
      "latestthumbnail (1).png",
      "magicthumb_meghanmarkle.jpg",
      "meghanmarklethumbnail (1).jpg",
      "meghanmarklethumbnail (2).jpg",
      "meghanmarklethumbnail.jpg",
      "thumbnail_story_driven_v5.jpg"
    ];

    if (!window.confirm("Are you sure? This will add all 14 hardcoded images to Firebase. Only click this ONCE.")) return;

    setIsLoading(true);
    try {
      const allThumbs = [
        ...hardcodedReaction.map(url => ({ title: "Reaction Thumbnail", redesignedUrl: "/" + url, category: "Reaction" })),
        ...hardcodedGaming.map(url => ({ title: "Gaming Thumbnail", redesignedUrl: "/" + url, category: "Gaming" })),
        ...hardcodedFaceless.map(url => ({ title: "Faceless Thumbnail", redesignedUrl: "/" + url, category: "YouTube Faceless" }))
      ];

      for (const t of allThumbs) {
        await addDoc(thumbnailsCollectionRef, {
          title: t.title,
          originalVideoId: "",
          redesignedUrl: t.redesignedUrl,
          category: t.category,
          createdAt: serverTimestamp()
        });
      }
      alert("Migration complete! Check the thumbnails tab.");
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Error during migration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-page section-padding animate-fade-in">
      <div className="container">
        <div className="admin-header">
          <h1 className="page-title text-gradient">Admin Dashboard</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={migrateHardcoded} className="btn-primary" style={{ background: '#f59e0b', borderColor: '#f59e0b' }}>
              Migrate Old Data (Click Once)
            </button>
            <button onClick={handleLogout} className="btn-outline logout-btn">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        <div className="admin-tabs" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button 
            className={`btn-outline ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, justifyContent: 'center', background: activeTab === 'videos' ? 'var(--accent)' : 'transparent', color: activeTab === 'videos' ? 'white' : 'var(--text-primary)' }}
          >
            <Video size={18} /> Videos
          </button>
          <button 
            className={`btn-outline ${activeTab === 'thumbnails' ? 'active' : ''}`}
            onClick={() => setActiveTab('thumbnails')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, justifyContent: 'center', background: activeTab === 'thumbnails' ? 'var(--accent)' : 'transparent', color: activeTab === 'thumbnails' ? 'white' : 'var(--text-primary)' }}
          >
            <ImageIcon size={18} /> Thumbnails
          </button>
          <button 
            className={`btn-outline ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, justifyContent: 'center', background: activeTab === 'categories' ? 'var(--accent)' : 'transparent', color: activeTab === 'categories' ? 'white' : 'var(--text-primary)' }}
          >
            <Folder size={18} /> Categories
          </button>
        </div>

        <div className="admin-grid">
          {/* Form Section */}
          <div className="admin-card glass-panel form-panel">
            {activeTab === 'videos' && (
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
            )}

            {activeTab === 'thumbnails' && (
              <>
                <h2>Add Thumbnail Redesign</h2>
                <form onSubmit={handleThumbnailSubmit} className="admin-form">
                  <div className="input-group">
                    <label>Title / Description</label>
                    <input type="text" value={thumbTitle} onChange={(e) => setThumbTitle(e.target.value)} required placeholder="e.g. Think Beautiful - Drama Hook" />
                  </div>
                  <div className="input-group">
                    <label>Original YouTube URL (Optional - For Before/After)</label>
                    <input type="text" value={thumbVideoUrl} onChange={(e) => setThumbVideoUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
                  </div>
                  <div className="input-group">
                    <label>Redesigned Thumbnail URL (For "After")</label>
                    <input type="text" value={thumbImageUrl} onChange={(e) => setThumbImageUrl(e.target.value)} required placeholder="e.g., /thumb1.jpg or https://imgur.com/..." />
                    <p style={{fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem'}}>Put the image in your public folder and type the path (e.g. /thumb1.jpg)</p>
                  </div>
                  <div className="input-group">
                    <label>Category</label>
                    {categories.length > 0 ? (
                      <select value={thumbCategory} onChange={(e) => setThumbCategory(e.target.value)} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', marginTop: '0.5rem' }}>
                        <option value="" disabled>Select a category</option>
                        <option value="Reaction">Reaction</option>
                        <option value="Gaming">Gaming</option>
                        <option value="YouTube Faceless">YouTube Faceless</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    ) : (
                      <select value={thumbCategory} onChange={(e) => setThumbCategory(e.target.value)} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', marginTop: '0.5rem' }}>
                        <option value="" disabled>Select a category</option>
                        <option value="Reaction">Reaction</option>
                        <option value="Gaming">Gaming</option>
                        <option value="YouTube Faceless">YouTube Faceless</option>
                      </select>
                    )}
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-primary" disabled={isUploading}>
                      {isUploading ? 'Saving...' : <><Plus size={18} /> Add Thumbnail</>}
                    </button>
                  </div>
                </form>
              </>
            )}

            {activeTab === 'categories' && (
              <>
                <h2>Add Thumbnail Category</h2>
                <form onSubmit={handleCategorySubmit} className="admin-form">
                  <div className="input-group">
                    <label>Category Name</label>
                    <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required placeholder="e.g. Vlogs, Documentaries" />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-primary">
                      <Plus size={18} /> Add Category
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* List Section */}
          <div className="admin-card glass-panel list-panel">
            <h2>{activeTab === 'videos' ? 'Manage Videos' : activeTab === 'thumbnails' ? 'Manage Thumbnails' : 'Manage Categories'}</h2>
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
            ) : activeTab === 'thumbnails' ? (
              <>
                <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <label style={{ color: 'var(--text-secondary)' }}>Filter by Category:</label>
                  <select 
                    value={filterCategory} 
                    onChange={(e) => setFilterCategory(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                  >
                    <option value="All">All Categories</option>
                    <option value="Reaction">Reaction</option>
                    <option value="Gaming">Gaming</option>
                    <option value="YouTube Faceless">YouTube Faceless</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                {thumbnails.filter(t => filterCategory === 'All' || t.category === filterCategory).length === 0 ? (
                  <p>No thumbnails found for this category.</p> 
                ) : (
                  <div className="video-list" style={{ gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                    {thumbnails
                      .filter(t => filterCategory === 'All' || t.category === filterCategory)
                      .map((thumb, index, arr) => (
                    <div key={thumb.id} className="video-list-item" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <img src={thumb.redesignedUrl} alt="thumbnail" style={{ width: '80px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} />
                      <div className="video-details" style={{ flex: 1 }}>
                        <h4 className="video-list-title">{thumb.title}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Category:</span>
                          <select 
                            value={thumb.category || ''} 
                            onChange={(e) => handleThumbnailCategoryChange(thumb.id, e.target.value)}
                            style={{ padding: '0.2rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--accent)', fontSize: '0.8rem' }}
                          >
                            <option value="" disabled>None</option>
                            <option value="Reaction">Reaction</option>
                            <option value="Gaming">Gaming</option>
                            <option value="YouTube Faceless">YouTube Faceless</option>
                            {categories.map(cat => (
                              <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="video-actions" style={{ display: 'flex', alignItems: 'center' }}>
                        {filterCategory !== 'All' && (
                          <div style={{ display: 'flex', gap: '0.2rem', marginRight: '0.5rem' }}>
                            <button onClick={() => handleMoveUp(index, arr)} disabled={index === 0} className="action-btn" style={{ padding: '0.2rem', opacity: index === 0 ? 0.3 : 1, cursor: index === 0 ? 'not-allowed' : 'pointer' }}><ArrowUp size={16} /></button>
                            <button onClick={() => handleMoveDown(index, arr)} disabled={index === arr.length - 1} className="action-btn" style={{ padding: '0.2rem', opacity: index === arr.length - 1 ? 0.3 : 1, cursor: index === arr.length - 1 ? 'not-allowed' : 'pointer' }}><ArrowDown size={16} /></button>
                          </div>
                        )}
                        <button onClick={() => handleThumbnailDelete(thumb.id)} className="action-btn delete-btn"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              </>
            ) : (
              categories.length === 0 ? <p>No custom categories found. (Default ones: Reaction, Gaming, YouTube Faceless)</p> : (
                <div className="video-list" style={{ gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                  {categories.map(cat => (
                    <div key={cat.id} className="video-list-item" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div className="video-details" style={{ flex: 1 }}>
                        <h4 className="video-list-title">{cat.name}</h4>
                      </div>
                      <div className="video-actions">
                        <button onClick={() => handleCategoryDelete(cat.id)} className="action-btn delete-btn"><Trash2 size={18} /></button>
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

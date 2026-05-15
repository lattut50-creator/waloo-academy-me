 "use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { allResources, resourceCategories, subjectCategories } from '../resourcesData';

export default function ResourcesPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedResourceType, setSelectedResourceType] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [requestedResources, setRequestedResources] = useState({});
  const [selectedResource, setSelectedResource] = useState(null);
  const [isPdfFullscreen, setIsPdfFullscreen] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [creatorPassword, setCreatorPassword] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestingResource, setRequestingResource] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const pdfContainerRef = useRef(null);

  // Creator password
  const CREATOR_PASSWORD = "waloo123";

  // Load requested counts from localStorage
  useEffect(() => {
    const savedRequests = localStorage.getItem('resource_requests');
    if (savedRequests) {
      setRequestedResources(JSON.parse(savedRequests));
    }
    // Check if creator is already logged in
    const savedCreatorStatus = localStorage.getItem('waloo_creator_logged_in');
    if (savedCreatorStatus === 'true') {
      setIsCreator(true);
    }
  }, []);

  // Creator login
  const handleCreatorLogin = () => {
    if (creatorPassword === CREATOR_PASSWORD) {
      setIsCreator(true);
      localStorage.setItem('waloo_creator_logged_in', 'true');
      setShowPasswordModal(false);
      setCreatorPassword("");
      alert("✅ Creator mode activated! You can now download all resources.");
    } else {
      alert("❌ Incorrect password!");
    }
  };

  // Creator logout
  const handleCreatorLogout = () => {
    setIsCreator(false);
    localStorage.removeItem('waloo_creator_logged_in');
    alert("👋 Creator mode deactivated.");
  };

  // Send request to Telegram
  const sendTelegramRequest = async (resourceTitle, name, email) => {
    setIsSending(true);
    try {
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `User requested access to resource: ${resourceTitle}`,
          resourceTitle: resourceTitle,
          userName: name,
          userEmail: email,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert(`✅ Request for "${resourceTitle}" sent to admin! You will be notified when approved.`);
        // Save to localStorage
        const updated = { ...requestedResources, [requestingResource.id]: (requestedResources[requestingResource.id] || 0) + 1 };
        setRequestedResources(updated);
        localStorage.setItem('resource_requests', JSON.stringify(updated));
      } else {
        alert("❌ Failed to send request. Please try again later.");
      }
    } catch (error) {
      alert("❌ Error sending request. Please try again.");
    } finally {
      setIsSending(false);
      setShowRequestForm(false);
      setUserName("");
      setUserEmail("");
      setRequestingResource(null);
    }
  };

  // Request resource with user info
  const handleRequestResource = (resource) => {
    setRequestingResource(resource);
    setShowRequestForm(true);
  };

  // Download for creator only
  const handleCreatorDownload = (resourceId, resourceTitle, fileLink) => {
    const updated = { ...requestedResources, [resourceId]: (requestedResources[resourceId] || 0) + 1 };
    setRequestedResources(updated);
    localStorage.setItem('resource_requests', JSON.stringify(updated));
    
    const link = document.createElement('a');
    link.href = fileLink;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert(`📥 Downloading: ${resourceTitle}`);
  };

  // View resource in modal
  const handleViewResource = (resource) => {
    setSelectedResource(resource);
  };

  // Close modal
  const closeModal = () => {
    setSelectedResource(null);
    setIsPdfFullscreen(false);
  };

  // Toggle fullscreen for PDF viewer
  const togglePdfFullscreen = () => {
    if (pdfContainerRef.current) {
      if (!document.fullscreenElement) {
        pdfContainerRef.current.requestFullscreen();
        setIsPdfFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsPdfFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsPdfFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Filter resources
  const filteredResources = allResources.filter(resource => {
    const matchesType = selectedResourceType === "All" || resource.resourceType === selectedResourceType;
    const matchesSubject = selectedSubject === "All" || resource.category === selectedSubject;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSubject && matchesSearch;
  });

  const mainColor = "#1a73e8";
  const mainColorDark = "#1557b0";
  const mainColorLight = "#e3f2fd";

  // Stats
  const stats = {
    total: allResources.length,
    cheatSheets: allResources.filter(r => r.resourceType === "Cheat Sheet").length,
    exams: allResources.filter(r => r.resourceType === "Practice Exam").length,
    templates: allResources.filter(r => r.resourceType === "Template").length,
    infographics: allResources.filter(r => r.resourceType === "Infographic").length
  };

  return (
    <div style={{ 
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif', 
      backgroundColor: darkMode ? '#0a0a0a' : '#f5f7fa', 
      minHeight: '100vh',
      color: darkMode ? '#e0e0e0' : '#333',
      transition: 'all 0.3s ease'
    }}>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .resource-card {
          transition: all 0.3s ease;
          background-color: ${darkMode ? '#1a1a2e' : 'white'};
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          border: 1px solid ${darkMode ? '#2a2a3e' : '#eef2f6'};
        }
        .resource-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.1);
          border-color: ${mainColor};
        }
        
        .filter-btn {
          background: transparent;
          border: 1px solid ${mainColor};
          color: ${mainColor};
          padding: 6px 16px;
          border-radius: 30px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.2s;
        }
        .filter-btn:hover, .filter-btn.active {
          background: ${mainColor};
          color: white;
        }
        
        .stat-card {
          background: ${darkMode ? '#1a1a2e' : 'white'};
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          border: 1px solid ${darkMode ? '#2a2a3e' : '#eef2f6'};
        }
        
        .logo { transition: transform 0.2s ease; }
        .logo:hover { transform: scale(1.05); }
        
        .view-btn {
          background-color: ${mainColor};
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.2s;
          width: 48%;
        }
        .view-btn:hover {
          background-color: ${mainColorDark};
          transform: scale(1.02);
        }
        
        .request-btn {
          background-color: #95a5a6;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.2s;
          width: 48%;
        }
        .request-btn:hover {
          background-color: #7f8c8d;
          transform: scale(1.02);
        }
        
        .download-btn {
          background-color: #2ecc71;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.2s;
          width: 48%;
        }
        .download-btn:hover {
          background-color: #27ae60;
          transform: scale(1.02);
        }
        
        .creator-badge {
          background-color: #f39c12;
          color: #fff;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
        }
        
        .creator-btn {
          background-color: #2ecc71;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.7rem;
          transition: all 0.2s;
        }
        .creator-btn:hover {
          background-color: #27ae60;
          transform: scale(1.02);
        }
        
        .logout-btn {
          background-color: #e74c3c;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.7rem;
          transition: all 0.2s;
        }
        .logout-btn:hover {
          background-color: #c0392b;
          transform: scale(1.02);
        }
        
        .info-banner {
          background: ${mainColorLight};
          border-left: 4px solid ${mainColor};
          padding: 16px 20px;
          border-radius: 12px;
          margin-bottom: 30px;
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.85);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .modal-content {
          background: ${darkMode ? '#1a1a2e' : 'white'};
          padding: 32px;
          border-radius: 24px;
          max-width: 900px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }
        
        .password-modal-content {
          background: ${darkMode ? '#1a1a2e' : 'white'};
          padding: 32px;
          border-radius: 24px;
          max-width: 400px;
          width: 90%;
          text-align: center;
        }
        
        .pdf-container {
          width: 100%;
          height: 550px;
          border-radius: 12px;
          overflow: auto;
          border: 1px solid ${darkMode ? '#444' : '#ddd'};
          background-color: ${darkMode ? '#1a1a1a' : '#f5f5f5'};
        }
        
        .pdf-container:fullscreen {
          width: 100%;
          height: 100%;
        }
        
        .pdf-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        
        .fullscreen-btn {
          transition: all 0.2s ease;
        }
        .fullscreen-btn:hover {
          transform: scale(1.05);
          background-color: ${mainColorDark} !important;
        }
        
        @media (max-width: 768px) {
          .resources-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .filter-bar { flex-direction: column; align-items: stretch; }
          .pdf-container { height: 400px; }
          .btn-group { flex-direction: column; gap: 10px; }
          .view-btn, .request-btn, .download-btn { width: 100%; }
        }
      `}</style>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="password-modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔐</div>
            <h3 style={{ color: mainColor, marginBottom: '16px' }}>Creator Access</h3>
            <p style={{ fontSize: '0.8rem', marginBottom: '20px', color: darkMode ? '#aaa' : '#666' }}>
              Enter password to enable download access
            </p>
            <input
              type="password"
              value={creatorPassword}
              onChange={(e) => setCreatorPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreatorLogin()}
              placeholder="Enter creator password"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: `1px solid ${darkMode ? '#444' : '#ddd'}`,
                background: darkMode ? '#2a2a2a' : 'white',
                color: darkMode ? '#fff' : '#333',
                marginBottom: '16px'
              }}
            />
            <button
              onClick={handleCreatorLogin}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: mainColor,
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Unlock Creator Mode
            </button>
            <button
              onClick={() => setShowPasswordModal(false)}
              style={{
                width: '100%',
                marginTop: '12px',
                padding: '12px',
                backgroundColor: 'transparent',
                color: darkMode ? '#aaa' : '#666',
                border: `1px solid ${darkMode ? '#444' : '#ddd'}`,
                borderRadius: '10px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Request Form Modal */}
      {showRequestForm && requestingResource && (
        <div className="modal-overlay" onClick={() => setShowRequestForm(false)}>
          <div className="password-modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📋</div>
            <h3 style={{ color: mainColor, marginBottom: '8px' }}>Request Resource</h3>
            <p style={{ fontSize: '0.8rem', marginBottom: '20px', color: darkMode ? '#aaa' : '#666' }}>
              {requestingResource.title}
            </p>
            
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your Name *"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: `1px solid ${darkMode ? '#444' : '#ddd'}`,
                background: darkMode ? '#2a2a2a' : 'white',
                color: darkMode ? '#fff' : '#333',
                marginBottom: '12px'
              }}
              required
            />
            
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Your Email *"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: `1px solid ${darkMode ? '#444' : '#ddd'}`,
                background: darkMode ? '#2a2a2a' : 'white',
                color: darkMode ? '#fff' : '#333',
                marginBottom: '20px'
              }}
              required
            />
            
            <button
              onClick={() => sendTelegramRequest(requestingResource.title, userName, userEmail)}
              disabled={!userName || !userEmail || isSending}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: mainColor,
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: (!userName || !userEmail || isSending) ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                opacity: (!userName || !userEmail || isSending) ? 0.6 : 1
              }}
            >
              {isSending ? 'Sending...' : 'Send Request'}
            </button>
            <button
              onClick={() => setShowRequestForm(false)}
              style={{
                width: '100%',
                marginTop: '12px',
                padding: '12px',
                backgroundColor: 'transparent',
                color: darkMode ? '#aaa' : '#666',
                border: `1px solid ${darkMode ? '#444' : '#ddd'}`,
                borderRadius: '10px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Resource Viewer Modal */}
      {selectedResource && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: darkMode ? '#fff' : '#888' }}>✕</button>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingRight: '30px' }}>
              <div>
                <h2 style={{ color: mainColor, fontSize: '1.3rem', marginBottom: '8px' }}>{selectedResource.title}</h2>
                <p style={{ fontSize: '0.8rem', color: darkMode ? '#aaa' : '#666' }}>
                  {selectedResource.resourceType} • {selectedResource.category} • {selectedResource.type}
                </p>
              </div>
              <button onClick={togglePdfFullscreen} className="fullscreen-btn" style={{ backgroundColor: mainColor, color: 'white', border: 'none', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.7rem' }}>
                {isPdfFullscreen ? '⛶ Exit' : '🖥️ Fullscreen'}
              </button>
            </div>
            <div ref={pdfContainerRef} className="pdf-container">
              {selectedResource.type === 'PDF' || selectedResource.type === 'PNG' ? (
                <iframe 
                  className="pdf-iframe" 
                  src={selectedResource.fileLink} 
                  title={selectedResource.title} 
                />
              ) : (
                <div style={{ textAlign: 'center', padding: '60px', color: darkMode ? '#aaa' : '#666' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📄</div>
                  <p>This resource is a {selectedResource.type} file.</p>
                  <p style={{ fontSize: '0.8rem' }}>Click the Request button below to ask for access.</p>
                </div>
              )}
            </div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
              {isCreator ? (
                <button 
                  className="download-btn"
                  onClick={() => handleCreatorDownload(selectedResource.id, selectedResource.title, selectedResource.fileLink)}
                  style={{ width: 'auto', padding: '10px 24px' }}
                >
                  📥 Download Resource
                </button>
              ) : (
                <button 
                  className="request-btn"
                  onClick={() => {
                    handleRequestResource(selectedResource);
                    closeModal();
                  }}
                  style={{ width: 'auto', padding: '10px 24px' }}
                >
                  📋 Request This Resource
                </button>
              )}
              <button 
                onClick={closeModal}
                style={{ background: 'transparent', border: `1px solid ${darkMode ? '#444' : '#ddd'}`, padding: '10px 24px', borderRadius: '25px', cursor: 'pointer', color: darkMode ? '#aaa' : '#666' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nav Bar */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '12px 40px', backgroundColor: mainColor, color: 'white', 
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
          <img src="/logo.png" alt="Logo" className="logo" style={{ width: '36px', height: '36px', borderRadius: '10px' }} />
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Waloo Academy</h2>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isCreator ? (
            <>
              <span className="creator-badge">👑 Creator Mode</span>
              <button onClick={handleCreatorLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <button onClick={() => setShowPasswordModal(true)} className="creator-btn">
              🔑 Creator Mode
            </button>
          )}
          <button onClick={() => setDarkMode(!darkMode)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '30px', cursor: 'pointer' }}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>← Back to Home</Link>
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: mainColor, fontSize: '2.5rem', marginBottom: '16px' }}>📚 Study Resources Library</h1>
          <p style={{ color: darkMode ? '#aaa' : '#666', fontSize: '1rem' }}>
            Browse and request study materials. All resources are reviewed before being made available.
          </p>
        </div>

        {/* Info Banner */}
        <div className="info-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.5rem' }}>{isCreator ? '👑' : '🔒'}</span>
            <div>
              <strong style={{ color: mainColor }}>
                {isCreator ? 'Creator Mode Active' : 'Request Mode'}
              </strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: darkMode ? '#aaa' : '#555' }}>
                {isCreator 
                  ? 'You have full access to download all resources. Click "Download Resource" to save files.'
                  : 'Click "View Resource" to preview. Click "Request Resource" to ask for access. The admin will be notified via Telegram.'}
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '40px' }}>
          <div className="stat-card">
            <div style={{ fontSize: '2rem' }}>📚</div>
            <h3 style={{ fontSize: '1.5rem', margin: '8px 0', color: mainColor }}>{stats.total}</h3>
            <p style={{ fontSize: '0.7rem', margin: 0 }}>Total Resources</p>
          </div>
          <div className="stat-card">
            <div style={{ fontSize: '2rem' }}>📝</div>
            <h3 style={{ fontSize: '1.5rem', margin: '8px 0', color: mainColor }}>{stats.cheatSheets}</h3>
            <p style={{ fontSize: '0.7rem', margin: 0 }}>Cheat Sheets</p>
          </div>
          <div className="stat-card">
            <div style={{ fontSize: '2rem' }}>📋</div>
            <h3 style={{ fontSize: '1.5rem', margin: '8px 0', color: mainColor }}>{stats.exams}</h3>
            <p style={{ fontSize: '0.7rem', margin: 0 }}>Practice Exams</p>
          </div>
          <div className="stat-card">
            <div style={{ fontSize: '2rem' }}>📄</div>
            <h3 style={{ fontSize: '1.5rem', margin: '8px 0', color: mainColor }}>{stats.templates}</h3>
            <p style={{ fontSize: '0.7rem', margin: 0 }}>Templates</p>
          </div>
          <div className="stat-card">
            <div style={{ fontSize: '2rem' }}>📊</div>
            <h3 style={{ fontSize: '1.5rem', margin: '8px 0', color: mainColor }}>{stats.infographics}</h3>
            <p style={{ fontSize: '0.7rem', margin: 0 }}>Infographics</p>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '30px' }}>
          <input
            type="text"
            placeholder="🔍 Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 20px',
              borderRadius: '40px',
              border: `1px solid ${darkMode ? '#444' : '#ddd'}`,
              background: darkMode ? '#2a2a2a' : 'white',
              color: darkMode ? '#fff' : '#333',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Filter Bar */}
        <div className="filter-bar" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {resourceCategories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${selectedResourceType === cat ? 'active' : ''}`}
                onClick={() => setSelectedResourceType(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {subjectCategories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${selectedSubject === cat ? 'active' : ''}`}
                onClick={() => setSelectedSubject(cat)}
              >
                📖 {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="resources-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
          {filteredResources.map(resource => (
            <div key={resource.id} className="resource-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ fontSize: '2rem' }}>{resource.icon}</div>
                <div>
                  <span style={{ background: mainColorLight, color: mainColor, padding: '2px 8px', borderRadius: '12px', fontSize: '0.6rem', fontWeight: 500 }}>
                    {resource.resourceType}
                  </span>
                  <span style={{ marginLeft: '8px', background: mainColorLight, color: mainColor, padding: '2px 8px', borderRadius: '12px', fontSize: '0.6rem', fontWeight: 500 }}>
                    {resource.category}
                  </span>
                </div>
              </div>
              
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: darkMode ? '#fff' : '#333' }}>{resource.title}</h3>
              <p style={{ fontSize: '0.8rem', color: darkMode ? '#aaa' : '#666', marginBottom: '16px', lineHeight: 1.5 }}>{resource.description}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.7rem', color: darkMode ? '#888' : '#999' }}>
                  {resource.questions && <span>📝 {resource.questions} questions • ⏱️ {resource.duration}</span>}
                  {resource.downloads && <span>⬇️ {(requestedResources[resource.id] || 0) + resource.downloads} requests</span>}
                </div>
                <span style={{ fontSize: '0.7rem', color: darkMode ? '#888' : '#999' }}>📄 {resource.type}</span>
              </div>
              
              <div className="btn-group" style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
                <button 
                  className="view-btn"
                  onClick={() => handleViewResource(resource)}
                >
                  👁️ View Resource
                </button>
                {isCreator ? (
                  <button 
                    className="download-btn"
                    onClick={() => handleCreatorDownload(resource.id, resource.title, resource.fileLink)}
                  >
                    📥 Download
                  </button>
                ) : (
                  <button 
                    className="request-btn"
                    onClick={() => handleRequestResource(resource)}
                  >
                    📋 Request Access
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: darkMode ? '#888' : '#999' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📭</div>
            <p>No resources found. Try different filters or search terms.</p>
          </div>
        )}

        {/* How to Upload Your Own Resources */}
        <div style={{ marginTop: '60px', padding: '30px', background: darkMode ? '#1a1a2e' : 'white', borderRadius: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📤</div>
          <h3 style={{ color: mainColor, marginBottom: '12px' }}>Want to Share Your Own Resources?</h3>
          <p style={{ fontSize: '0.85rem', color: darkMode ? '#aaa' : '#666', marginBottom: '16px' }}>
            Admin can upload PDFs, documents, and images using the <strong>Admin Upload</strong> section on the home page.
          </p>
          <Link href="/#documents">
            <button style={{ background: mainColor, color: 'white', border: 'none', padding: '10px 24px', borderRadius: '30px', cursor: 'pointer' }}>
              Go to Upload Section →
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: 'white', padding: '30px 20px', textAlign: 'center', marginTop: '40px' }}>
        <p style={{ fontSize: '0.7rem', opacity: 0.7 }}>© 2025 Waloo Academy. Where Knowledge Meets Innovation!</p>
        <div style={{ marginTop: '16px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link href="/" style={{ color: mainColor, textDecoration: 'none', fontSize: '0.75rem' }}>Home</Link>
          <Link href="/blog" style={{ color: mainColor, textDecoration: 'none', fontSize: '0.75rem' }}>Blog</Link>
          <Link href="/resources" style={{ color: mainColor, textDecoration: 'none', fontSize: '0.75rem' }}>Resources</Link>
        </div>
      </footer>
    </div>
  );
}
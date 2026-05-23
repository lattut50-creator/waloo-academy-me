 "use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ResourcesPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);
  const [isPdfFullscreen, setIsPdfFullscreen] = useState(false);
  const pdfContainerRef = useRef(null);

  // Resources Data - ONLY these files (located in public/courses/economics/)
  const allResources = [
    {
      id: 1,
      title: "N.Resource4",
      description: "HTML resource file - Educational material for students",
      icon: "🌐",
      type: "HTML",
      fileLink: "/courses/economics/N.Resource4.html",
      category: "Web Development",
      size: "245 KB"
    },
    {
      id: 2,
      title: "pptchapter3-5",
      description: "PowerPoint presentation covering chapters 3 to 5",
      icon: "📊",
      type: "HTML",
      fileLink: "/courses/economics/pptchapter3-5.html",
      category: "Presentation",
      size: "1.2 MB"
    }
  ];

  // Filter resources based on search
  const filteredResources = allResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mainColor = "#1a73e8";
  const mainColorDark = "#1557b0";
  const mainColorLight = "#e3f2fd";

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

  return (
    <div style={{ 
      fontFamily: 'Inter, system-ui, sans-serif', 
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
          cursor: pointer;
          border: 1px solid ${darkMode ? '#2a2a3e' : '#eef2f6'};
        }
        .resource-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.1);
          border-color: ${mainColor};
        }
        
        .search-input {
          width: 100%;
          padding: 14px 20px;
          border-radius: 40px;
          border: 1px solid ${darkMode ? '#444' : '#ddd'};
          background: ${darkMode ? '#2a2a2a' : 'white'};
          color: ${darkMode ? '#fff' : '#333'};
          font-size: 0.9rem;
          outline: none;
          margin-bottom: 30px;
        }
        
        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          margin-top: 20px;
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
          padding: 24px;
          border-radius: 24px;
          max-width: 900px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }
        .pdf-container {
          width: 100%;
          height: 550px;
          border-radius: 12px;
          overflow: auto;
          border: 1px solid ${darkMode ? '#444' : '#ddd'};
        }
        
        .logo { transition: transform 0.2s ease; }
        .logo:hover { transform: scale(1.05); }
        
        .resource-icon {
          font-size: 2.5rem;
          margin-bottom: 12px;
        }
        
        .resource-category {
          display: inline-block;
          background: ${mainColorLight};
          color: ${mainColor};
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.7rem;
          margin-right: 8px;
          margin-top: 8px;
        }
        
        .read-only-notice {
          text-align: center;
          font-size: 0.7rem;
          color: ${darkMode ? '#888' : '#999'};
          margin-top: 12px;
        }
        
        @media (max-width: 768px) {
          .resources-grid {
            grid-template-columns: 1fr;
          }
          .modal-content {
            padding: 20px;
            width: 95%;
          }
          .pdf-container {
            height: 400px;
          }
        }
      `}</style>

      {/* Navbar */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '12px 30px',
        backgroundColor: mainColor, 
        color: 'white', 
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
          <img src="/logo.png" alt="Logo" className="logo" style={{ width: '36px', height: '36px', borderRadius: '10px' }} />
          <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Waloo Academy</h2>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setDarkMode(!darkMode)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '30px', cursor: 'pointer' }}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>← Back to Home</Link>
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: mainColor, fontSize: '2.5rem', marginBottom: '16px' }}>📚 Resources Library</h1>
          <p style={{ color: darkMode ? '#aaa' : '#666', fontSize: '1rem' }}>
            Browse and view study materials online - No download required
          </p>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Resources Grid - Only 2 resources */}
        <div className="resources-grid">
          {filteredResources.map(resource => (
            <div 
              key={resource.id} 
              className="resource-card"
              onClick={() => setSelectedResource(resource)}
            >
              <div className="resource-icon">{resource.icon}</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: darkMode ? '#fff' : '#333' }}>
                {resource.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: darkMode ? '#aaa' : '#666', marginBottom: '12px', lineHeight: 1.5 }}>
                {resource.description}
              </p>
              <div>
                <span className="resource-category">{resource.type}</span>
                <span className="resource-category">{resource.category}</span>
              </div>
              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${darkMode ? '#2a2a3e' : '#eee'}`, paddingTop: '12px' }}>
                <span style={{ fontSize: '0.7rem', color: darkMode ? '#888' : '#999' }}>📄 {resource.size}</span>
                <span style={{ color: mainColor, fontSize: '0.7rem', fontWeight: 500 }}>Read Online →</span>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: darkMode ? '#888' : '#999' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
            <p>No resources found. Try a different search term.</p>
          </div>
        )}

        {/* Resource Modal - Read Only (No Download) */}
        {selectedResource && (
          <div className="modal-overlay" onClick={() => setSelectedResource(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedResource(null)} style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: darkMode ? '#fff' : '#888' }}>✕</button>
              <h2 style={{ color: mainColor, fontSize: '1.2rem', marginBottom: '8px' }}>{selectedResource.title}</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: darkMode ? '#aaa' : '#666' }}>{selectedResource.type} • {selectedResource.size} • Read Only</span>
                <button onClick={togglePdfFullscreen} style={{ backgroundColor: mainColor, color: 'white', border: 'none', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.7rem' }}>
                  {isPdfFullscreen ? '⛶ Exit' : '🖥️ Fullscreen'}
                </button>
              </div>
              <div ref={pdfContainerRef} className="pdf-container">
                <iframe 
                  src={selectedResource.fileLink} 
                  style={{ width: '100%', height: '100%', border: 'none' }} 
                  title={selectedResource.title}
                />
              </div>
              
              {/* NO DOWNLOAD BUTTON - Only Read Online Notice */}
              <div className="read-only-notice">
                📖 This material is for online reading only. No download available.
              </div>
              
              <button style={{ width: '100%', marginTop: '16px', padding: '10px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' }} onClick={() => setSelectedResource(null)}>Close</button>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: 'white', padding: '30px 20px', textAlign: 'center', marginTop: '40px' }}>
        <p style={{ fontSize: '0.7rem', opacity: 0.7 }}>© 2025 Waloo Academy. Where Knowledge Meets Innovation!</p>
        <div style={{ marginTop: '16px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link href="/" style={{ color: mainColor, textDecoration: 'none', fontSize: '0.75rem' }}>Home</Link>
          <Link href="/courses" style={{ color: mainColor, textDecoration: 'none', fontSize: '0.75rem' }}>Courses</Link>
          <Link href="/blog" style={{ color: mainColor, textDecoration: 'none', fontSize: '0.75rem' }}>Blog</Link>
          <Link href="/resources" style={{ color: mainColor, textDecoration: 'none', fontSize: '0.75rem' }}>Resources</Link>
        </div>
      </footer>
    </div>
  );
}
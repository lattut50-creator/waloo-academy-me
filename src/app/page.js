 "use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isPdfFullscreen, setIsPdfFullscreen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [navbarSearchTerm, setNavbarSearchTerm] = useState("");
  const [language, setLanguage] = useState("EN");
  const [mounted, setMounted] = useState(false);
  const [showMoreAbout, setShowMoreAbout] = useState(false);
  const pdfContainerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Courses Data (only used for homepage preview - will be removed)
  // Keeping minimal data for any remaining functionality

  // Events Data
  const events = [
    { id: 1, title: "Free Economics Webinar", date: "June 15, 2025", time: "3:00 PM", description: "Free online webinar on Ethiopian market dynamics" },
    { id: 2, title: "Programming Bootcamp", date: "June 22, 2025", time: "10:00 AM", description: "2-day intensive programming workshop" },
    { id: 3, title: "Data Analysis Workshop", date: "July 5, 2025", time: "2:00 PM", description: "Hands-on Excel and Power BI training" }
  ];

  // Load uploaded files from localStorage
  useEffect(() => {
    try {
      const savedFiles = localStorage.getItem('waloo_uploaded_files');
      if (savedFiles) {
        setUploadedFiles(JSON.parse(savedFiles));
      }
    } catch (error) {
      console.error("Error loading files:", error);
    }
  }, []);

  const deleteUploadedFile = (fileId) => {
    const updatedFiles = uploadedFiles.filter(f => f.id !== fileId);
    setUploadedFiles(updatedFiles);
    localStorage.setItem('waloo_uploaded_files', JSON.stringify(updatedFiles));
    alert('✅ File deleted successfully!');
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setShowTopBtn(window.scrollY > 500);
    });
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const mainColor = "#1a73e8";
  const mainColorDark = "#1557b0";
  const mainColorLight = "#e3f2fd";

  if (!mounted) {
    return null;
  }

  // Navbar items with proper links
  const navItems = [
    { name: "Home", href: "#", id: "home" },
    { name: "Courses", href: "/courses", id: "courses" },
    { name: "Blog", href: "/blog", id: "blog" },
    { name: "Resources", href: "/resources", id: "resources" },
    { name: "FAQ", href: "#faq", id: "faq" },
    { name: "Events", href: "#events", id: "events" },
    { name: "Contact", href: "#contact", id: "contact" }
  ];

  return (
    <div style={{ 
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
      backgroundColor: darkMode ? '#0a0a0a' : '#f5f7fa', 
      minHeight: '100vh', 
      scrollBehavior: 'smooth',
      color: darkMode ? '#e0e0e0' : '#333',
      transition: 'all 0.3s ease'
    }}>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          overflow-x: hidden;
        }
        
        .nav-link {
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: white;
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .nav-link:hover {
          transform: translateY(-2px);
        }
        
        .about-card {
          background: ${darkMode ? '#1a1a2e' : 'white'};
          border-radius: 24px;
          padding: 32px;
          border: 1px solid ${darkMode ? '#2a2a3e' : '#eef2f6'};
          transition: all 0.3s ease;
        }
        
        .more-about-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s ease;
        }
        
        .more-about-content.show {
          max-height: 800px;
        }
        
        .more-btn {
          background: transparent;
          border: none;
          color: ${mainColor};
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        
        .more-btn:hover {
          transform: translateX(4px);
        }
        
        .event-card {
          transition: all 0.3s ease;
          background-color: ${darkMode ? '#1a1a2e' : 'white'};
          padding: 20px;
          border-radius: 16px;
          width: 100%;
          max-width: 300px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          border: 1px solid ${darkMode ? '#2a2a3e' : '#eef2f6'};
          text-align: center;
        }
        .event-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          border-color: ${mainColor};
        }
        
        .form-input { 
          width: 100%; 
          padding: 12px 16px; 
          margin-bottom: 12px; 
          border-radius: 12px; 
          border: 1px solid #ddd; 
          outline: none; 
          font-size: 0.9rem;
          background: ${darkMode ? '#2a2a2a' : 'white'};
          color: ${darkMode ? '#fff' : '#333'};
          transition: border 0.2s;
        }
        .form-input:focus { 
          border-color: ${mainColor}; 
          box-shadow: 0 0 0 3px rgba(26,115,232,0.1); 
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
          animation: fadeIn 0.2s ease;
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
          text-align: left;
          animation: slideUp 0.2s ease;
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
        
        .video-container {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          border-radius: 12px;
          background-color: #000;
        }
        
        .video-iframe {
          position: absolute;
          top: 0;
          left: 0;
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
        
        .social-icon {
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          padding: 8px 16px;
          border-radius: 30px;
          background: ${darkMode ? '#1a1a2e' : '#f0f2f5'};
          text-decoration: none;
        }
        .social-icon:hover {
          transform: translateY(-2px);
          opacity: 0.8;
        }
        
        .section-title {
          font-size: clamp(1.5rem, 5vw, 2rem);
          font-weight: 700;
          margin-bottom: 16px;
          text-align: center;
          color: ${mainColor};
        }
        
        .logo { 
          transition: transform 0.2s ease; 
        }
        .logo:hover { 
          transform: scale(1.05); 
        }
        
        .navbar-search {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.15);
          border-radius: 30px;
          padding: 4px 12px;
          margin: 0 10px;
        }
        .navbar-search input {
          background: transparent;
          border: none;
          padding: 8px 12px;
          font-size: 0.85rem;
          color: white;
          outline: none;
          width: 160px;
        }
        .navbar-search input::placeholder { 
          color: rgba(255,255,255,0.7); 
        }
        .navbar-search span {
          color: rgba(255,255,255,0.8);
        }
        
        .language-selector {
          background: rgba(255,255,255,0.15);
          border: none;
          color: white;
          padding: 8px 12px;
          border-radius: 30px;
          font-size: 0.8rem;
          cursor: pointer;
          margin-right: 10px;
        }
        .language-selector option {
          background: ${mainColor};
          color: white;
        }
        
        .slogan-container {
          display: flex;
          gap: 12px;
          justify-content: flex-start;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        
        .slogan-badge {
          background: ${mainColorLight};
          padding: 6px 16px;
          border-radius: 30px;
          font-size: 0.8rem;
          font-weight: 500;
          color: ${mainColor};
        }
        
        .main-slogan {
          font-size: 1rem;
          color: ${darkMode ? '#ccc' : '#555'};
          margin-bottom: 25px;
          line-height: 1.6;
        }
        
        .faq-item {
          background: ${darkMode ? '#1a1a2e' : 'white'};
          border-radius: 16px;
          padding: 20px 24px;
          border: 1px solid ${darkMode ? '#2a2a3e' : '#eef2f6'};
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .faq-item:hover { 
          border-color: ${mainColor}; 
        }
        
        .uploaded-doc-card {
          transition: all 0.3s ease;
          background-color: ${darkMode ? '#1a1a2e' : 'white'};
          padding: 20px;
          border-radius: 16px;
          width: 100%;
          max-width: 280px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          text-align: left;
          cursor: pointer;
          border: 1px solid ${darkMode ? '#2a2a3e' : '#eef2f6'};
          position: relative;
        }
        .uploaded-doc-card:hover { 
          transform: translateY(-6px); 
          box-shadow: 0 12px 24px rgba(0,0,0,0.1); 
          border-color: ${mainColor}; 
        }
        
        .delete-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(231, 76, 60, 0.9);
          color: white;
          border: none;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          z-index: 10;
        }
        .delete-btn:hover {
          background: #c0392b;
          transform: scale(1.1);
        }
        
        @keyframes fadeIn { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        @keyframes slideUp { 
          from { transform: translateY(30px); opacity: 0; } 
          to { transform: translateY(0); opacity: 1; } 
        }

        @media (max-width: 768px) {
          .nav-links { 
            display: ${isOpen ? 'flex' : 'none'} !important; 
            flex-direction: column; 
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            width: 100%;
            background-color: ${mainColor};
            padding: 20px;
            gap: 15px;
            z-index: 999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          .nav-links a, .nav-links div {
            width: 100%;
            text-align: center;
          }
          .menu-icon { 
            display: block !important; 
          }
          .side-by-side-container { 
            flex-direction: column !important; 
            align-items: center !important; 
          }
          .side-box { 
            width: 100% !important; 
            min-width: unset !important; 
            margin-bottom: 16px;
          }
          .uploaded-doc-card {
            max-width: 100%;
            width: 100%;
          }
          .modal-content {
            padding: 20px;
            width: 95%;
          }
          .pdf-container {
            height: 400px;
          }
          .slogan-container {
            justify-content: center;
          }
          .main-slogan {
            text-align: center;
          }
          .navbar-search input {
            width: 100px;
          }
          .about-card {
            padding: 20px;
          }
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 1.3rem;
          }
          .navbar-search {
            display: none;
          }
          .about-card {
            padding: 16px;
          }
        }
        
        html, body {
          overflow-x: hidden;
          width: 100%;
          position: relative;
        }
        
        img {
          max-width: 100%;
          height: auto;
        }
      `}</style>

      {/* FIXED NAVBAR WITH PROPER LINKS */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '6px 20px',
        backgroundColor: mainColor, 
        color: 'white', 
        position: 'fixed',
        top: 0, 
        left: 0,
        right: 0,
        zIndex: 9999, 
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/logo.png" alt="Logo" className="logo" style={{ width: '28px', height: '28px', borderRadius: '6px', objectFit: 'cover' }} />
          <h2 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>Waloo Academy</h2>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }}>
          <div className="navbar-search">
            <span style={{ fontSize: '0.7rem' }}>🔍</span>
            <input 
              type="text" 
              placeholder="Search..." 
              value={navbarSearchTerm}
              onChange={(e) => setNavbarSearchTerm(e.target.value)}
              style={{ width: '120px', padding: '3px 6px', fontSize: '0.7rem', background: 'transparent', border: 'none', color: 'white', outline: 'none' }}
            />
          </div>
          
          <select className="language-selector" value={language} onChange={(e) => setLanguage(e.target.value)} style={{ padding: '3px 6px', fontSize: '0.65rem', background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', borderRadius: '20px', cursor: 'pointer' }}>
            <option value="EN">EN</option>
            <option value="AM">AM</option>
            <option value="OM">OM</option>
          </select>
          
          <button onClick={() => setDarkMode(!darkMode)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', fontSize: '0.7rem', cursor: 'pointer', padding: '3px 8px', borderRadius: '20px' }}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          
          <div className="menu-icon" style={{ display: 'none', fontSize: '1.2rem', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '✕' : '☰'}
          </div>
        </div>
        
        <div className="nav-links" ref={mobileMenuRef} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.7rem', flexWrap: 'wrap' }}>
          {navItems.map((item) => (
            <div key={item.id} className="nav-link">
              {item.name === "Courses" || item.name === "Blog" || item.name === "Resources" ? (
                <Link href={item.href} style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>
                  {item.name}
                </Link>
              ) : (
                <a 
                  href={item.href} 
                  style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}
          
          {isSignedIn && (
            <div className="nav-link">
              <a href="/dashboard" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Dashboard</a>
            </div>
          )}
          
          {!isSignedIn ? (
            <div style={{ display: 'flex', gap: '5px' }}>
              <SignInButton mode="modal">
                <button style={{ background: 'white', color: '#1a73e8', border: 'none', padding: '3px 10px', borderRadius: '20px', cursor: 'pointer', fontWeight: 500, fontSize: '0.65rem' }}>Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button style={{ background: 'transparent', color: 'white', border: '1px solid white', padding: '3px 10px', borderRadius: '20px', cursor: 'pointer', fontWeight: 500, fontSize: '0.65rem' }}>Sign Up</button>
              </SignUpButton>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
        </div>
      </nav>

      {/* MAIN CONTENT - NO FEATURED COURSES SECTION */}
      <main style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: '60px 20px 40px 20px',
        maxWidth: '1400px', 
        margin: '0 auto', 
        width: '100%' 
      }}>
        
        {/* Hero Section */}
        <div style={{ width: '100%', maxWidth: '1100px', textAlign: 'left', marginBottom: '30px' }}>
          <h1 style={{ color: mainColor, fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 700, marginBottom: '16px' }}>Waloo Academy</h1>
          
          <div className="slogan-container">
            <span className="slogan-badge">📚 Learn Anywhere</span>
            <span className="slogan-badge">🎓 Expert Instructors</span>
            <span className="slogan-badge">📜 Get Certified</span>
          </div>
          
          <p className="main-slogan">
            Bridging the gap between academic theory and professional excellence through modern learning!
          </p>
        </div>

        {/* Hero Image */}
        <div style={{ width: '100%', maxWidth: '800px', marginBottom: '30px', textAlign: 'center' }}>
          <img src="/profile2.png" alt="Students" loading="eager" width="700" height="400" style={{ width: '100%', maxWidth: '550px', borderRadius: '20px', boxShadow: '0 12px 30px rgba(0,0,0,0.1)', objectFit: 'cover' }} />
        </div>

        {/* About Me Section */}
        <div style={{ width: '100%', maxWidth: '1100px', marginBottom: '40px' }}>
          <div className="about-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: mainColorLight, 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '2.5rem'
              }}>
                👩‍💻
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: mainColor, marginBottom: '4px' }}>About Me</h2>
                <p style={{ fontSize: '0.8rem', color: darkMode ? '#aaa' : '#666' }}>Founder of Waloo Academy</p>
              </div>
            </div>
            
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: darkMode ? '#ddd' : '#444', marginBottom: '20px' }}>
              Hello! I am Rorisa, an Economics student at Addis Ababa University (AAU), a data enthusiast, and a web developer. 
              Combining my deep understanding of economic principles with modern technical skills, I am passionate about leveraging 
              data and technology to solve real-world problems and empower others.
            </p>
            
            <button 
              className="more-btn"
              onClick={() => setShowMoreAbout(!showMoreAbout)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {showMoreAbout ? '▲ Less About Rorisa' : '▼ More About Rorisa'}
            </button>
            
            <div className={`more-about-content ${showMoreAbout ? 'show' : ''}`}>
              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: `1px solid ${darkMode ? '#2a2a3e' : '#eef2f6'}` }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: mainColor, marginBottom: '16px' }}>📊 My Journey & Skills</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: darkMode ? '#ddd' : '#444', marginBottom: '20px' }}>
                  As a student of economics, I quickly realized the immense power of data in shaping our world. 
                  This inspired me to dive into the field of data analysis, mastering tools like Excel and Power BI 
                  to turn complex datasets into meaningful insights.
                </p>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: darkMode ? '#ddd' : '#444', marginBottom: '20px' }}>
                  Beyond data, I love building things for the digital world. I am a full-stack web developer experienced 
                  in creating modern, responsive platforms using HTML, CSS, JavaScript, and Next.js. My technical background 
                  allows me to build robust digital solutions from scratch.
                </p>
                
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: mainColor, marginBottom: '16px', marginTop: '24px' }}>🎯 The Vision Behind Waloo Academy</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: darkMode ? '#ddd' : '#444', marginBottom: '20px' }}>
                  I founded Waloo Academy to bridge the gap between academic theory and practical, real-world skills. 
                  My mission is to provide high-quality educational tutorials and resources for secondary and higher education students. 
                  I believe that by enriching our minds through quality education, we can build a brighter future together with modern skills.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* NO FEATURED COURSES SECTION - REMOVED */}

        {/* Uploaded Documents */}
        {uploadedFiles.length > 0 && (
          <div style={{ width: '100%', maxWidth: '1100px', marginBottom: '40px' }}>
            <h3 className="section-title" style={{ fontSize: '1.3rem' }}>📁 Uploaded Documents</h3>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {uploadedFiles.map(file => (
                <div key={file.id} className="uploaded-doc-card" onClick={() => setSelectedCourse({
                  id: file.id,
                  title: file.name,
                  detail: "Uploaded document",
                  teacher: "User Uploaded",
                  price: "Free",
                  type: "pdf",
                  contentLink: file.url
                })}>
                  <button 
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteUploadedFile(file.id);
                    }}
                  >
                    ✕
                  </button>
                  <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>📄</div>
                  <h3 style={{ fontSize: '0.8rem', marginBottom: '5px', fontWeight: 600 }}>{file.name.length > 30 ? file.name.substring(0, 30) + '...' : file.name}</h3>
                  <span style={{ backgroundColor: mainColorLight, color: mainColor, padding: '2px 8px', borderRadius: '12px', fontSize: '0.6rem' }}>📎 Uploaded</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Course Modal - PDF Viewer */}
        {selectedCourse && selectedCourse.type === 'pdf' && (
          <div className="modal-overlay" onClick={() => setSelectedCourse(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedCourse(null)} style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: darkMode ? '#fff' : '#888' }}>✕</button>
              <h2 style={{ color: mainColor, fontSize: '1.2rem', marginBottom: '8px', fontWeight: 700 }}>{selectedCourse.title}</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <h3 style={{ fontSize: '0.85rem', color: mainColor, fontWeight: 600 }}>📖 Document Viewer</h3>
                <button onClick={togglePdfFullscreen} className="fullscreen-btn" style={{ backgroundColor: mainColor, color: 'white', border: 'none', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 500 }}>
                  {isPdfFullscreen ? '⛶ Exit' : '🖥️ Fullscreen'}
                </button>
              </div>
              <div ref={pdfContainerRef} className="pdf-container">
                <iframe className="pdf-iframe" src={selectedCourse.contentLink} title={selectedCourse.title} />
              </div>
              <div style={{ marginTop: '24px' }}>
                <button style={{ width: '100%', padding: '12px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' }} onClick={() => setSelectedCourse(null)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Course Modal - Video */}
        {selectedCourse && selectedCourse.type === 'video' && (
          <div className="modal-overlay" onClick={() => setSelectedCourse(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedCourse(null)} style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: darkMode ? '#fff' : '#888' }}>✕</button>
              <h2 style={{ color: mainColor, fontSize: '1.2rem', marginBottom: '8px', fontWeight: 700 }}>{selectedCourse.title}</h2>
              <div className="video-container">
                <iframe className="video-iframe" src={selectedCourse.contentLink} title={selectedCourse.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
              <div style={{ marginTop: '24px' }}>
                <button style={{ width: '100%', padding: '12px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' }} onClick={() => setSelectedCourse(null)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div id="faq" style={{ width: '100%', maxWidth: '1100px', marginBottom: '60px', paddingTop: '40px' }}>
          <h2 className="section-title">FAQ</h2>
          <p style={{ textAlign: 'center', fontSize: '0.9rem', color: darkMode ? '#aaa' : '#666', marginBottom: '40px' }}>
            If you've got questions about anything, you've come to the right place.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="faq-item" onClick={(e) => {
              const answer = e.currentTarget.querySelector('.faq-answer');
              if (answer) answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600 }}>What is Waloo Academy?</h3>
                <span style={{ fontSize: '1rem', color: mainColor }}>▼</span>
              </div>
              <div className="faq-answer" style={{ display: 'none', marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${darkMode ? '#2a2a3e' : '#eee'}`, fontSize: '0.85rem', lineHeight: 1.5 }}>
                Waloo Academy is an online learning platform providing quality education in Data Analysis, Programming, Economics, and High School subjects.
              </div>
            </div>

            <div className="faq-item" onClick={(e) => {
              const answer = e.currentTarget.querySelector('.faq-answer');
              if (answer) answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Do I need a subscription?</h3>
                <span style={{ fontSize: '1rem', color: mainColor }}>▼</span>
              </div>
              <div className="faq-answer" style={{ display: 'none', marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${darkMode ? '#2a2a3e' : '#eee'}`, fontSize: '0.85rem', lineHeight: 1.5 }}>
                No! All our courses are FREE. Access all PDF materials and video lectures without any subscription.
              </div>
            </div>

            <div className="faq-item" onClick={(e) => {
              const answer = e.currentTarget.querySelector('.faq-answer');
              if (answer) answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600 }}>How can I report an issue?</h3>
                <span style={{ fontSize: '1rem', color: mainColor }}>▼</span>
              </div>
              <div className="faq-answer" style={{ display: 'none', marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${darkMode ? '#2a2a3e' : '#eee'}`, fontSize: '0.85rem', lineHeight: 1.5 }}>
                Use our Contact Us form or reach out on Telegram. We're committed to providing the best learning experience.
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: `1px solid ${darkMode ? '#2a2a3e' : '#eee'}` }}>
            <p style={{ fontSize: '0.85rem', color: darkMode ? '#aaa' : '#666' }}>
              Have more questions?{" "}
              <a href="https://t.me/latusaid" target="_blank" rel="noopener noreferrer" style={{ color: mainColor, textDecoration: 'none', fontWeight: 500 }}>Contact our support team on Telegram 📱</a>
            </p>
          </div>
        </div>

        {/* Events Section */}
        <div id="events" style={{ width: '100%', maxWidth: '1100px', marginBottom: '60px', paddingTop: '40px' }}>
          <h2 className="section-title">📅 Upcoming Events</h2>
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {events.map(event => (
              <div key={event.id} className="event-card">
                <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>📌</div>
                <h3 style={{ color: mainColor, marginBottom: '8px', fontSize: '0.95rem', fontWeight: 600 }}>{event.title}</h3>
                <p style={{ fontSize: '0.7rem', color: darkMode ? '#aaa' : '#666', marginBottom: '6px' }}>📅 {event.date} | ⏰ {event.time}</p>
                <p style={{ fontSize: '0.7rem', color: darkMode ? '#888' : '#777', marginBottom: '16px' }}>{event.description}</p>
                <button className="event-register-btn" style={{ width: '100%', padding: '8px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 500 }} onClick={() => setSelectedEvent(event)}>Register →</button>
              </div>
            ))}
          </div>
        </div>

        {/* Event Modal */}
        {selectedEvent && (
          <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
            <div className="modal-content" style={{ maxWidth: '450px' }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedEvent(null)} style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer' }}>✕</button>
              <h2 style={{ color: mainColor, fontSize: '1.2rem', marginBottom: '12px' }}>Register for {selectedEvent.title}</h2>
              <p style={{ fontSize: '0.8rem', marginBottom: '20px' }}>📅 {selectedEvent.date} | ⏰ {selectedEvent.time}</p>
              <form action="https://formspree.io/f/xnjwyyvn" method="POST">
                <input type="hidden" name="event" value={selectedEvent.title} />
                <input type="hidden" name="event_date" value={selectedEvent.date} />
                <input type="text" name="name" placeholder="Your Full Name" className="form-input" required />
                <input type="email" name="email" placeholder="Your Email Address" className="form-input" required />
                <button type="submit" style={{ width: '100%', marginTop: '16px', padding: '12px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}>Confirm Registration</button>
              </form>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div id="contact" className="side-by-side-container" style={{ display: 'flex', gap: '30px', justifyContent: 'center', width: '100%', maxWidth: '900px', marginBottom: '60px', flexWrap: 'wrap' }}>
          <div className="side-box" style={{ flex: 1, minWidth: '260px', backgroundColor: '#1e293b', color: 'white', padding: '24px', borderRadius: '20px' }}>
            <h3 style={{ color: mainColor, marginBottom: '10px', fontSize: '1.1rem' }}>📧 Get Updates</h3>
            <p style={{ fontSize: '0.7rem', opacity: 0.8, marginBottom: '16px' }}>Subscribe for new courses</p>
            <form action="https://formspree.io/f/mojrzzqb" method="POST">
              <input type="email" name="email" placeholder="Your email" style={{ width: '100%', padding: '12px', borderRadius: '30px', border: 'none', marginBottom: '12px', outline: 'none', fontSize: '0.8rem' }} required />
              <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '30px', fontWeight: 600, cursor: 'pointer' }}>Subscribe</button>
            </form>
          </div>
          <div className="side-box" style={{ flex: 1, minWidth: '260px', backgroundColor: darkMode ? '#1a1a2e' : mainColorLight, padding: '24px', borderRadius: '20px' }}>
            <h3 style={{ color: mainColor, marginBottom: '10px', fontSize: '1.1rem' }}>📩 Contact Us</h3>
            <form action="https://formspree.io/f/mojrzzqb" method="POST">
              <input type="text" name="name" placeholder="Your Name" className="form-input" required />
              <input type="email" name="_replyto" placeholder="Your Email" className="form-input" required />
              <textarea name="message" placeholder="Message..." className="form-input" style={{ minHeight: '80px' }} required></textarea>
              <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '30px', fontWeight: 600, cursor: 'pointer' }}>Send</button>
            </form>
          </div>
        </div>

      </main>

      {/* Back to Top Button */}
      {showTopBtn && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ 
          position: 'fixed', 
          bottom: '20px', 
          right: '20px', 
          backgroundColor: mainColor, 
          color: 'white', 
          border: 'none', 
          borderRadius: '50%', 
          width: '44px', 
          height: '44px', 
          fontSize: '20px', 
          cursor: 'pointer', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)', 
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>↑</button>
      )}

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <img src="/logo.png" alt="Logo" style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover' }} />
          <h3 style={{ margin: 0, fontSize: '1rem' }}>Waloo Academy</h3>
        </div>
        <p style={{ fontSize: '0.7rem', marginBottom: '20px', opacity: 0.7 }}>© 2025 Waloo Academy. Where Knowledge Meets Innovation!</p>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://t.me/latusaid" target="_blank" className="social-icon" style={{ color: '#0088cc', textDecoration: 'none', fontSize: '0.7rem' }}>📱 Telegram</a>
          <a href="https://youtube.com/@walooacademy" target="_blank" className="social-icon" style={{ color: '#ff0000', textDecoration: 'none', fontSize: '0.7rem' }}>▶️ YouTube</a>
          <a href="https://facebook.com/walooacademy" target="_blank" className="social-icon" style={{ color: '#1877f2', textDecoration: 'none', fontSize: '0.7rem' }}>👍 Facebook</a>
        </div>
        <div style={{ marginTop: '16px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.7rem' }}>
          <a href="#" style={{ color: mainColor, textDecoration: 'none' }}>Home</a>
          <Link href="/courses" style={{ color: mainColor, textDecoration: 'none' }}>Courses</Link>
          <Link href="/blog" style={{ color: mainColor, textDecoration: 'none' }}>Blog</Link>
          <Link href="/resources" style={{ color: mainColor, textDecoration: 'none' }}>Resources</Link>
          {isSignedIn && <Link href="/dashboard" style={{ color: mainColor, textDecoration: 'none' }}>Dashboard</Link>}
          <a href="#contact" style={{ color: mainColor, textDecoration: 'none' }}>Contact</a>
        </div>
        <p style={{ marginTop: '16px', fontSize: '0.55rem', opacity: 0.5 }}>Empowering Ethiopian education since 2025</p>
      </footer>
    </div>
  );
}
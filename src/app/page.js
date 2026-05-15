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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mounted, setMounted] = useState(false);
  const pdfContainerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { isSignedIn } = useAuth();

  // Fix hydration issues - only render after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Admin password
  const ADMIN_PASSWORD = "waloo123";

  // Categories for Documents
  const categories = [
    { id: 1, name: "Art", count: 6, icon: "🎨", color: "#e74c3c" },
    { id: 2, name: "Biography & Memoir", count: 4, icon: "📖", color: "#3498db" },
    { id: 3, name: "Business", count: 10, icon: "💼", color: "#2ecc71" },
    { id: 4, name: "Career & Growth", count: 6, icon: "📈", color: "#f39c12" },
    { id: 5, name: "Technology", count: 8, icon: "💻", color: "#9b59b6" },
    { id: 6, name: "Science", count: 7, icon: "🔬", color: "#1abc9c" }
  ];

  // Course Data by Category
  const coursesByCategory = {
    "Art": [
      { id: 1, title: "Digital Art Fundamentals", desc: "Learn digital drawing", type: "pdf", contentLink: "/uploads/art1.pdf" },
      { id: 2, title: "Color Theory", desc: "Master color combinations", type: "pdf", contentLink: "/uploads/art2.pdf" }
    ],
    "Business": [
      { id: 3, title: "Marketing Strategy", desc: "Learn modern marketing", type: "pdf", contentLink: "/uploads/business1.pdf" },
      { id: 4, title: "Financial Management", desc: "Master business finance", type: "pdf", contentLink: "/uploads/business2.pdf" },
      { id: 5, title: "Business Economics", desc: "Learn economics for business", type: "pdf", contentLink: "/uploads/macro.pdf" }
    ],
    "Career & Growth": [
      { id: 6, title: "CV Writing Masterclass", desc: "Create professional CV", type: "pdf", contentLink: "/uploads/career1.pdf" },
      { id: 7, title: "Interview Success", desc: "Ace your interviews", type: "video", contentLink: "https://www.youtube-nocookie.com/embed/nbEOo5ae1bs?modestbranding=1&rel=0&showinfo=0&controls=1" }
    ],
    "Technology": [
      { id: 8, title: "Programming Basics", desc: "Learn coding fundamentals", type: "pdf", contentLink: "/uploads/micro.pdf" },
      { id: 9, title: "Web Development", desc: "Build modern websites", type: "pdf", contentLink: "/uploads/civic.pdf" },
      { id: 10, title: "Economics Fundamentals", desc: "Learn economics", type: "video", contentLink: "https://www.youtube-nocookie.com/embed/nbEOo5ae1bs?modestbranding=1&rel=0&showinfo=0&controls=1" }
    ]
  };

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

  const handleFileUpload = (file) => {
    if (!file) return;
    const newFile = {
      name: file.name,
      url: URL.createObjectURL(file),
      size: file.size,
      type: file.type,
      id: Date.now() + Math.random()
    };
    const updatedFiles = [...uploadedFiles, newFile];
    setUploadedFiles(updatedFiles);
    localStorage.setItem('waloo_uploaded_files', JSON.stringify(updatedFiles));
    alert(`✅ Uploaded: ${file.name}`);
  };

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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const getCategoryCourses = (categoryName) => {
    return coursesByCategory[categoryName] || [];
  };

  const mainColor = "#1a73e8";
  const mainColorDark = "#1557b0";
  const mainColorLight = "#e3f2fd";

  // Combine all documents
  const allDocuments = [
    ...categories.flatMap(cat => 
      getCategoryCourses(cat.name).map(course => ({
        id: `course_${cat.name}_${course.id}`,
        title: course.title,
        type: 'course',
        fileLink: course.contentLink,
        icon: '📘',
        teacher: "Waloo Academy",
        category: cat.name
      }))
    ),
    ...uploadedFiles.map(file => ({
      id: `upload_${file.id}`,
      title: file.name,
      type: 'uploaded',
      fileLink: file.url,
      icon: '📄',
      teacher: 'User Uploaded',
      isUploaded: true,
      fileId: file.id
    }))
  ];

  const filteredDocuments = allDocuments.filter(doc =>
    doc.title.toLowerCase().includes(navbarSearchTerm.toLowerCase())
  );

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null;
  }

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
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          overflow-x: hidden;
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        .category-card {
          transition: all 0.3s ease;
          background-color: ${darkMode ? '#1a1a2e' : 'white'};
          padding: 24px 16px;
          border-radius: 20px;
          min-width: 160px;
          text-align: center;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          border: 1px solid ${darkMode ? '#2a2a3e' : '#eef2f6'};
        }
        .category-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.1);
          border-color: ${mainColor};
        }
        
        .course-card, .doc-card {
          transition: all 0.3s ease;
          background-color: ${darkMode ? '#1a1a2e' : 'white'};
          padding: 20px;
          border-radius: 16px;
          width: 100%;
          max-width: 280px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          text-align: left;
          will-change: transform;
          border: 1px solid ${darkMode ? '#2a2a3e' : '#eef2f6'};
          cursor: pointer;
          position: relative;
        }
        .course-card:hover, .doc-card:hover { 
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
        
        .hero-btn { 
          transition: all 0.3s ease; 
          will-change: transform;
        }
        .hero-btn:hover { 
          background-color: ${mainColorDark} !important; 
          transform: scale(1.02); 
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
        
        .categories-grid {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
          margin: 40px 0;
        }
        
        .view-all-link {
          color: ${mainColor};
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .view-all-link:hover { text-decoration: underline; }
        
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
        
        .admin-upload-summary {
          cursor: pointer;
          list-style: none;
        }
        .admin-upload-summary::-webkit-details-marker {
          display: none;
        }
        
        .nav-links a, .nav-links button {
          white-space: nowrap;
        }
        
        @keyframes fadeIn { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        @keyframes slideUp { 
          from { transform: translateY(30px); opacity: 0; } 
          to { transform: translateY(0); opacity: 1; } 
        }

        /* Tablet Styles */
        @media (max-width: 1024px) {
          .categories-grid {
            gap: 16px;
          }
          .category-card {
            min-width: 140px;
            padding: 20px 12px;
          }
        }

        /* Mobile Styles */
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
          .events-container { 
            flex-direction: column !important; 
            align-items: center !important; 
          }
          .why-testimonial-container { 
            flex-direction: column !important; 
            align-items: center !important; 
          }
          .courses-container, .documents-grid {
            justify-content: center !important;
          }
          .category-card {
            min-width: calc(50% - 16px);
            flex: 1;
          }
          .categories-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .course-card, .doc-card {
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
          .hero-btn {
            width: 100%;
            max-width: 280px;
          }
          .navbar-search input {
            width: 100px;
          }
          .navbar-search {
            margin: 0 5px;
          }
          .language-selector {
            padding: 6px 8px;
            font-size: 0.7rem;
          }
        }

        /* Small Mobile Styles */
        @media (max-width: 480px) {
          .category-card {
            min-width: 100%;
          }
          .categories-grid {
            grid-template-columns: 1fr;
          }
          .section-title {
            font-size: 1.3rem;
          }
          .navbar-search {
            display: none;
          }
        }
        
        /* Landscape orientation fix */
        @media (max-height: 500px) and (orientation: landscape) {
          .modal-content {
            max-height: 85vh;
          }
          .pdf-container {
            height: 300px;
          }
        }
        
        /* Prevent horizontal scroll */
        html, body {
          overflow-x: hidden;
          width: 100%;
          position: relative;
        }
        
        /* Ensure all images are responsive */
        img {
          max-width: 100%;
          height: auto;
        }
        
        /* Smooth transitions */
        button, a, .course-card, .category-card, .event-card {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>

      {/* Nav Bar with Dashboard Link */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '12px 20px',
        backgroundColor: mainColor, 
        color: 'white', 
        position: 'sticky', 
        top: 0, 
        zIndex: 100, 
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/logo.png" alt="Logo" className="logo" style={{ width: '36px', height: '36px', borderRadius: '10px', objectFit: 'cover' }} />
          <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Waloo Academy</h2>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div className="navbar-search">
            <span>🔍</span>
            <input 
              type="text" 
              placeholder="Search..." 
              value={navbarSearchTerm}
              onChange={(e) => setNavbarSearchTerm(e.target.value)}
            />
          </div>
          
          <select className="language-selector" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="EN">🌐 EN</option>
            <option value="AM">🇪🇹 AM</option>
            <option value="OM">🇪🇹 OM</option>
          </select>
          
          <button onClick={() => setDarkMode(!darkMode)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', fontSize: '0.9rem', cursor: 'pointer', padding: '6px 12px', borderRadius: '30px' }}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          
          <div className="menu-icon" style={{ display: 'none', fontSize: '1.6rem', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '✕' : '☰'}
          </div>
        </div>
        
        <div className="nav-links" ref={mobileMenuRef} style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '0.85rem', flexWrap: 'wrap' }}>
          <a href="#" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Home</a>
          <a href="#documents" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Categories</a>
          <a href="#courses" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Courses</a>
          <a href="/blog" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Blog</a>
          <a href="/resources" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Resources</a>
          {isSignedIn && (
            <a href="/dashboard" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Dashboard</a>
          )}
          <a href="#faq" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>FAQ</a>
          <a href="#events" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Events</a>
          <a href="#contact" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Contact</a>
          
          {!isSignedIn ? (
            <div style={{ display: 'flex', gap: '8px' }}>
              <SignInButton mode="modal">
                <button style={{ 
                  background: 'white', 
                  color: '#1a73e8', 
                  border: 'none', 
                  padding: '6px 14px', 
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '0.8rem'
                }}>
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button style={{ 
                  background: 'transparent', 
                  color: 'white', 
                  border: '1px solid white', 
                  padding: '6px 14px', 
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '0.8rem'
                }}>
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
        </div>
      </nav>

      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        
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

        {/* Explore Text */}
        <div style={{ textAlign: 'center', marginBottom: '20px', width: '100%' }}>
          <h2 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', fontWeight: 700, color: darkMode ? '#fff' : '#333', marginBottom: '8px' }}>Explore, learn, apply.</h2>
          <p style={{ fontSize: '0.9rem', color: darkMode ? '#aaa' : '#666' }}>With over 300+ million documents, find the answers you need to get work done.</p>
        </div>

        {/* Admin Upload Section */}
        <div style={{ marginBottom: '30px', textAlign: 'center', width: '100%', maxWidth: '500px' }}>
          <details style={{ cursor: 'pointer' }}>
            <summary className="admin-upload-summary" style={{ 
              display: 'inline-block',
              backgroundColor: mainColor,
              color: 'white',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '40px',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer'
            }}>
              📤 Admin Upload (Click to expand)
            </summary>
            <div style={{ marginTop: '20px', padding: '20px', background: darkMode ? '#1a1a2e' : 'white', borderRadius: '16px' }}>
              <p style={{ fontSize: '0.8rem', marginBottom: '15px', color: darkMode ? '#aaa' : '#666' }}>
                Enter admin password to upload files
              </p>
              <input
                type="password"
                id="adminPassword"
                placeholder="Enter admin password"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: `1px solid ${darkMode ? '#444' : '#ddd'}`,
                  background: darkMode ? '#2a2a2a' : 'white',
                  color: darkMode ? '#fff' : '#333',
                  marginBottom: '10px'
                }}
              />
              <div id="adminAuthStatus" style={{ fontSize: '0.7rem', marginBottom: '10px', color: '#e74c3c', display: 'none' }}></div>
              
              <button
                id="adminUploadBtn"
                style={{
                  display: 'block',
                  width: '100%',
                  backgroundColor: '#ccc',
                  color: '#666',
                  padding: '10px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  cursor: 'not-allowed',
                  fontSize: '0.8rem',
                  opacity: 0.6,
                  border: 'none'
                }}
                onClick={() => {
                  const password = document.getElementById('adminPassword').value;
                  if (password === ADMIN_PASSWORD) {
                    document.getElementById('adminFileUpload').click();
                  } else {
                    alert('❌ Incorrect password! Please enter the correct admin password.');
                  }
                }}
              >
                🔒 Enter correct password first
              </button>
              
              <input
                type="file"
                id="adminFileUpload"
                accept=".pdf,.doc,.docx,.txt"
                style={{ display: 'none' }}
                onChange={async (e) => {
                  const file = e.target.files[0];
                  const password = document.getElementById('adminPassword').value;
                  
                  if (password !== ADMIN_PASSWORD) {
                    alert('❌ Incorrect password! Only admin can upload.');
                    e.target.value = '';
                    return;
                  }
                  
                  if (!file) return;
                  handleFileUpload(file);
                  e.target.value = '';
                  setTimeout(() => window.location.reload(), 500);
                }}
              />
              <p style={{ fontSize: '0.7rem', color: darkMode ? '#888' : '#999', marginTop: '10px' }}>
                Only admin can upload files. Password: waloo123
              </p>
            </div>
          </details>
          {uploadedFiles.length > 0 && (
            <p style={{ fontSize: '0.7rem', color: darkMode ? '#888' : '#999', marginTop: '10px' }}>
              {uploadedFiles.length} file(s) uploaded
            </p>
          )}
        </div>

        {/* Categories Section */}
        <div id="documents" style={{ width: '100%', maxWidth: '1100px', marginBottom: '60px' }}>
          <div className="categories-grid">
            {categories.map(cat => (
              <div 
                key={cat.id} 
                className="category-card" 
                onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                style={{ borderBottom: selectedCategory === cat.name ? `3px solid ${mainColor}` : 'none' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '4px' }}>{cat.name}</h3>
                <p style={{ fontSize: '0.65rem', color: darkMode ? '#888' : '#999', marginBottom: '8px' }}>{cat.count} categories</p>
                <a href="#" className="view-all-link" onClick={(e) => { e.preventDefault(); setSelectedCategory(selectedCategory === cat.name ? null : cat.name); }}>View all →</a>
              </div>
            ))}
          </div>

          {selectedCategory && (
            <div style={{ marginTop: '30px', padding: '20px', background: darkMode ? '#1a1a2e' : 'white', borderRadius: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
                <h3 style={{ color: mainColor, fontSize: '1.2rem', fontWeight: 600 }}>{selectedCategory} Courses</h3>
                <button onClick={() => setSelectedCategory(null)} style={{ background: 'none', border: 'none', color: mainColor, cursor: 'pointer', fontSize: '0.8rem' }}>Close ✕</button>
              </div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                {getCategoryCourses(selectedCategory).map(course => (
                  <div key={course.id} className="course-card" onClick={() => setSelectedCourse({ ...course, teacher: "Waloo Academy", price: "Free", detail: course.desc })}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{course.type === 'video' ? '🎥' : '📄'}</div>
                    <h4 style={{ fontSize: '0.9rem', marginBottom: '5px', fontWeight: 600 }}>{course.title}</h4>
                    <p style={{ fontSize: '0.7rem', color: darkMode ? '#aaa' : '#666' }}>{course.desc}</p>
                    <span style={{ color: mainColor, fontSize: '0.65rem', marginTop: '10px', display: 'block' }}>{course.type === 'video' ? '▶ Watch →' : '📖 Read →'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Uploaded Documents */}
        {uploadedFiles.length > 0 && (
          <div style={{ width: '100%', maxWidth: '1100px', marginBottom: '40px' }}>
            <h3 className="section-title" style={{ fontSize: '1.3rem' }}>📁 Uploaded Documents</h3>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {uploadedFiles.map(file => (
                <div key={file.id} className="doc-card" onClick={() => setSelectedCourse({
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
                  <span className="section-badge" style={{ backgroundColor: mainColorLight, color: mainColor, padding: '2px 8px', borderRadius: '12px', fontSize: '0.6rem' }}>📎 Uploaded</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Course Modal */}
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

        {/* Courses Section */}
        <div id="courses" style={{ width: '100%', maxWidth: '1100px', marginBottom: '60px', paddingTop: '40px' }}>
          <h2 className="section-title">📖 Popular Courses</h2>
          <div className="categories-grid" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
            {Object.keys(coursesByCategory).slice(0, 4).map(cat => (
              <div key={cat} className="category-card" onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}>
                <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{categories.find(c => c.name === cat)?.icon || '📚'}</div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600 }}>{cat}</h3>
                <p style={{ fontSize: '0.6rem', color: darkMode ? '#888' : '#999' }}>{coursesByCategory[cat].length} courses</p>
              </div>
            ))}
          </div>
        </div>

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
                Waloo Academy is an online learning platform providing quality education in Economics, Data Analysis, Programming, Digital Marketing, and Graphic Design.
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
                <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}>Confirm Registration</button>
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
          transition: 'all 0.2s',
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
          <a href="/blog" style={{ color: mainColor, textDecoration: 'none' }}>Blog</a>
          <a href="/resources" style={{ color: mainColor, textDecoration: 'none' }}>Resources</a>
          {isSignedIn && <a href="/dashboard" style={{ color: mainColor, textDecoration: 'none' }}>Dashboard</a>}
          <a href="#contact" style={{ color: mainColor, textDecoration: 'none' }}>Contact</a>
        </div>
        <p style={{ marginTop: '16px', fontSize: '0.55rem', opacity: 0.5 }}>Empowering Ethiopian education since 2025</p>
      </footer>
    </div>
  );
}
 "use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");

  // Get base URL for PDF viewer
  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  // Course Data - 3 PDF Courses + 1 Video Course
  const courses = [
    { 
      id: 1, 
      title: "Macro Economics", 
      desc: "Learn Macro Economics.", 
      detail: "Macroeconomics is the branch of economics that studies the behavior and performance of an economy as a whole. Topics include GDP, inflation, unemployment, and economic growth.",
      teacher: "Rorisa (AAU Student)",
      price: "Free",
      type: "pdf",
      contentLink: "/uploads/macro.pdf"
    },
    { 
      id: 2, 
      title: "Micro Economics", 
      desc: "Learn Micro Economics.", 
      detail: "Microeconomics is the study of decisions made by individuals and businesses regarding the allocation of resources and prices of goods and services.",
      teacher: "Rorisa (AAU Student)",
      price: "Free",
      type: "pdf",
      contentLink: "/uploads/micro.pdf"
    },
    { 
      id: 3, 
      title: "Civic Education", 
      desc: "Learn Civic Education.", 
      detail: "Civic education is the study of the theoretical, political and practical aspects of citizenship, as well as its rights and duties.",
      teacher: "Rorisa (AAU Student)",
      price: "Free",
      type: "pdf",
      contentLink: "/uploads/civic.pdf"
    },
    { 
      id: 4, 
      title: "Economics Fundamentals", 
      desc: "Learn economics with video lectures.", 
      detail: "This comprehensive video covers key economics concepts including supply and demand, market structures, economic indicators, and real-world applications. Perfect for beginners and intermediate learners.",
      teacher: "Economics Expert",
      price: "Free",
      type: "video",
      contentLink: "https://www.youtube-nocookie.com/embed/nbEOo5ae1bs?modestbranding=1&rel=0&showinfo=0&controls=1&playsinline=1&iv_load_policy=3&color=white"
    }
  ];

  // Why Choose Us Data
  const whyChooseUs = [
    {
      id: 1,
      icon: "🎓",
      title: "Expert Instructors",
      description: "Learn from experienced professionals with real-world expertise."
    },
    {
      id: 2,
      icon: "💻",
      title: "Hands-on Projects",
      description: "Learn by doing with real-world projects and exercises."
    },
    {
      id: 3,
      icon: "📜",
      title: "Certificate",
      description: "Earn a certificate upon completion of each course."
    }
  ];

  // Testimonials Data
  const testimonials = [
    {
      id: 1,
      text: "Waloo Academy made learning easy for me. Truly a center of knowledge!",
      name: "Ayantu G.",
      role: "Economics Student",
      rating: "★★★★★"
    },
    {
      id: 2,
      text: "Programming was hard, but now I write code with confidence!",
      name: "Abdi K.",
      role: "Programming Student",
      rating: "★★★★★"
    },
    {
      id: 3,
      text: "The Economics course helped me understand Ethiopian market perfectly!",
      name: "Bethlehem M.",
      role: "Economics Student",
      rating: "★★★★★"
    }
  ];

  // Events Data
  const events = [
    {
      id: 1,
      title: "Free Economics Webinar",
      date: "June 15, 2025",
      time: "3:00 PM",
      description: "Free online webinar on Ethiopian market dynamics"
    },
    {
      id: 2,
      title: "Programming Bootcamp",
      date: "June 22, 2025",
      time: "10:00 AM",
      description: "2-day intensive programming workshop"
    },
    {
      id: 3,
      title: "Data Analysis Workshop",
      date: "July 5, 2025",
      time: "2:00 PM",
      description: "Hands-on Excel and Power BI training"
    }
  ];

  // Filter courses based on search
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show back to top button after scrolling
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setShowTopBtn(window.scrollY > 500);
    });
  }, []);

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Main color is BLUE (#1a73e8)
  const mainColor = "#1a73e8";
  const mainColorDark = "#1557b0";
  const mainColorLight = "#e3f2fd";

  return (
    <div style={{ 
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif', 
      backgroundColor: darkMode ? '#0a0a0a' : '#f5f7fa', 
      minHeight: '100vh', 
      scrollBehavior: 'smooth',
      color: darkMode ? '#e0e0e0' : '#333',
      transition: 'all 0.3s ease'
    }}>
      
      {/* CSS Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .course-card {
          transition: all 0.3s ease;
          background-color: ${darkMode ? '#1a1a2e' : 'white'};
          padding: 20px;
          border-radius: 16px;
          width: 260px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          text-align: left;
          will-change: transform;
          border: 1px solid ${darkMode ? '#2a2a3e' : '#eef2f6'};
        }
        .course-card:hover { transform: translateY(-6px); box-shadow: 0 12px 24px rgba(0,0,0,0.1); border-color: ${mainColor}; }
        
        .hero-btn { 
          transition: all 0.3s ease; 
          will-change: transform;
        }
        .hero-btn:hover { background-color: ${mainColorDark} !important; transform: scale(1.02); }
        
        .why-card, .testimonial-card, .event-card {
          transition: all 0.3s ease;
          background-color: ${darkMode ? '#1a1a2e' : 'white'};
          padding: 24px;
          border-radius: 20px;
          width: 300px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          border: 1px solid ${darkMode ? '#2a2a3e' : '#eef2f6'};
          text-align: center;
        }
        .why-card:hover, .testimonial-card:hover, .event-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.1);
          border-color: ${mainColor};
        }
        
        .form-input { 
          width: 100%; padding: 10px 14px; margin-bottom: 12px; border-radius: 10px; 
          border: 1px solid #ddd; outline: none; font-size: 0.85rem;
          background: ${darkMode ? '#2a2a2a' : 'white'};
          color: ${darkMode ? '#fff' : '#333'};
        }
        .form-input:focus { border-color: ${mainColor}; box-shadow: 0 0 0 2px rgba(26,115,232,0.1); }
        
        .modal-overlay { 
          position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
          background: rgba(0,0,0,0.85);
          display: flex; justify-content: center; 
          align-items: center; z-index: 1000; animation: fadeIn 0.2s ease;
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
          text-align: left;
          animation: slideUp 0.2s ease;
        }
        
        .pdf-container {
          width: 100%;
          height: 550px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid ${darkMode ? '#444' : '#ddd'};
          background-color: ${darkMode ? '#1a1a1a' : '#f5f5f5'};
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
          padding: 6px 12px;
          border-radius: 30px;
          background: ${darkMode ? '#1a1a2e' : '#f0f2f5'};
        }
        .social-icon:hover {
          transform: translateY(-2px);
          opacity: 0.8;
        }
        
        .event-register-btn {
          transition: all 0.2s;
          will-change: transform;
        }
        .event-register-btn:hover {
          transform: scale(1.02);
        }
        
        .section-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 40px;
          text-align: center;
          color: ${mainColor};
        }
        
        .section-subtitle {
          font-size: 1rem;
          text-align: center;
          color: ${darkMode ? '#aaa' : '#666'};
          margin-bottom: 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .slogan-text {
          font-size: 0.9rem;
          opacity: 0.8;
          letter-spacing: 0.5px;
        }
        
        .logo {
          transition: transform 0.2s ease;
        }
        .logo:hover {
          transform: scale(1.05);
        }
        
        .rating-stars {
          color: #fbbf24;
          font-size: 0.9rem;
          margin-bottom: 12px;
        }
        
        iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        
        img {
          content-visibility: auto;
        }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        @media (max-width: 768px) {
          .nav-links { display: ${isOpen ? 'flex' : 'none'} !important; flex-direction: column; 
          position: absolute; top: 65px; left: 0; width: 100%; background-color: ${mainColor}; 
          padding: 20px; gap: 12px; }
          .menu-icon { display: block !important; }
          .side-by-side-container { flex-direction: column !important; align-items: center !important; }
          .side-box { width: 95% !important; min-width: unset !important; }
          .row-container { flex-direction: column !important; align-items: center !important; }
          .why-card, .testimonial-card, .event-card { width: 90% !important; }
          .modal-content { padding: 20px; }
          .pdf-container { height: 400px; }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Nav Bar */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '12px 40px', backgroundColor: mainColor, color: 'white', 
        position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img 
            src="/logo.png" 
            alt="Waloo Academy Logo" 
            className="logo"
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '10px',
              objectFit: 'cover'
            }} 
          />
          <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 600 }}>Waloo Academy</h2>
        </div>
        
        <button 
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            color: 'white',
            fontSize: '1.1rem',
            cursor: 'pointer',
            marginLeft: 'auto',
            marginRight: '20px',
            padding: '6px 12px',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
        
        <div className="menu-icon" style={{ display: 'none', fontSize: '1.6rem', cursor: 'pointer' }} 
             onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '☰'}
        </div>
        
        <div className="nav-links" style={{ display: 'flex', gap: '20px', alignItems: 'center', fontSize: '0.9rem' }}>
          <a href="#" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Home</a>
          <a href="#courses" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Courses</a>
          <a href="#whyus" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Why Us</a>
          <a href="#testimonials" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Reviews</a>
          <a href="#events" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Events</a>
          <a href="#contact" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Contact</a>
        </div>
      </nav>

      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', textAlign: 'center' }}>
        
        {/* Hero Section */}
        <div style={{ maxWidth: '800px', marginBottom: '60px' }}>
          <h1 style={{ color: mainColor, fontSize: '2.8rem', fontWeight: 700, marginBottom: '12px', letterSpacing: '-0.5px' }}>
            Waloo Academy
          </h1>
          
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
            <span className="slogan-text" style={{ background: mainColorLight, padding: '4px 12px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 500, color: mainColor }}>📚 Learn Anywhere</span>
            <span className="slogan-text" style={{ background: mainColorLight, padding: '4px 12px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 500, color: mainColor }}>🎓 Expert Instructors</span>
            <span className="slogan-text" style={{ background: mainColorLight, padding: '4px 12px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 500, color: mainColor }}>📜 Get Certified</span>
          </div>
          
          <p style={{ fontSize: '1rem', color: darkMode ? '#aaa' : '#666', marginBottom: '20px', fontWeight: 400 }}>
            Empowering Ethiopian students with quality education in Economics, Data Analysis, and Programming
          </p>
          
          <div style={{ marginBottom: '30px' }}>
            <img src="/profile2.png" alt="Waloo Academy Students" 
                 loading="eager"
                 width="600" 
                 height="350"
                 style={{ width: '100%', maxWidth: '550px', borderRadius: '20px', 
                          boxShadow: '0 12px 30px rgba(0,0,0,0.1)', objectFit: 'cover' }} />
          </div>
          
          <button className="hero-btn" 
                  style={{ padding: '12px 32px', backgroundColor: mainColor, color: 'white', 
                           border: 'none', borderRadius: '40px', fontSize: '0.95rem', cursor: 'pointer', 
                           fontWeight: 600, marginBottom: '40px', boxShadow: `0 4px 12px ${mainColor}40` }}
                  onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}>
            Start Learning Today →
          </button>
        </div>

        {/* Why Choose Us Section */}
        <div id="whyus" style={{ width: '100%', maxWidth: '1100px', marginBottom: '60px', paddingTop: '40px' }}>
          <h2 className="section-title">✨ Why Choose Waloo Academy</h2>
          <p className="section-subtitle">We provide quality education with expert instructors and hands-on learning experiences</p>
          <div className="row-container" style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {whyChooseUs.map(item => (
              <div key={item.id} className="why-card">
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{item.icon}</div>
                <h3 style={{ color: mainColor, fontSize: '1.2rem', marginBottom: '12px', fontWeight: 600 }}>{item.title}</h3>
                <p style={{ fontSize: '0.85rem', color: darkMode ? '#bbb' : '#666', lineHeight: 1.5, margin: 0 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div id="testimonials" style={{ width: '100%', maxWidth: '1100px', marginBottom: '60px', paddingTop: '40px' }}>
          <h2 className="section-title">💬 What Our Students Say</h2>
          <p className="section-subtitle">Join thousands of happy students who transformed their careers with Waloo Academy</p>
          <div className="row-container" style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {testimonials.map(item => (
              <div key={item.id} className="testimonial-card">
                <div className="rating-stars">{item.rating}</div>
                <p style={{ fontSize: '0.9rem', color: darkMode ? '#ccc' : '#555', marginBottom: '20px', lineHeight: 1.5, fontStyle: 'italic' }}>"{item.text}"</p>
                <div style={{ marginTop: 'auto' }}>
                  <h4 style={{ color: mainColor, fontSize: '1rem', marginBottom: '4px', fontWeight: 600 }}>{item.name}</h4>
                  <p style={{ fontSize: '0.7rem', color: darkMode ? '#888' : '#999', margin: 0 }}>{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Search Bar */}
        <div style={{ marginBottom: '24px', width: '100%', maxWidth: '380px' }}>
          <input 
            type="text" 
            placeholder="🔍 Search courses..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px 16px', 
              borderRadius: '30px', 
              border: `1px solid ${darkMode ? '#444' : '#ddd'}`,
              fontSize: '0.85rem',
              outline: 'none',
              backgroundColor: darkMode ? '#2a2a2a' : 'white',
              color: darkMode ? '#fff' : '#333'
            }}
          />
        </div>

        {/* Courses Section */}
        <div id="courses" style={{ width: '100%', maxWidth: '1100px', marginBottom: '60px', paddingTop: '40px' }}>
          <h2 className="section-title">📖 Featured Courses</h2>
          <p className="section-subtitle">Choose from our selection of expert-led courses and start learning today</p>
          <div className="courses-container" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {filteredCourses.map(course => (
              <div key={course.id} className="course-card">
                <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{course.type === 'video' ? '🎥' : '📄'}</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '6px', color: darkMode ? '#fff' : '#333' }}>{course.title}</h3>
                <p style={{ fontSize: '0.8rem', color: darkMode ? '#aaa' : '#666', marginBottom: '12px' }}>{course.desc}</p>
                
                <span 
                  style={{ color: mainColor, fontWeight: 500, fontSize: '0.7rem', cursor: 'pointer', display: 'block', textAlign: 'center', marginTop: '12px', padding: '8px', borderRadius: '8px', backgroundColor: mainColorLight }}
                  onClick={() => setSelectedCourse(course)}
                >
                  {course.type === 'video' ? '▶ Watch Video →' : '📖 Read Course →'}
                </span>
              </div>
            ))}
          </div>
          {filteredCourses.length === 0 && (
            <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '0.85rem' }}>No courses found. Try a different search!</p>
          )}
        </div>

        {/* Course Modal - Supports both PDF and Video */}
        {selectedCourse && (
          <div className="modal-overlay" onClick={() => setSelectedCourse(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedCourse(null)} 
                      style={{ position: 'absolute', top: '20px', right: '24px', border: 'none', 
                               background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: darkMode ? '#fff' : '#888', zIndex: 1 }}>
                ✕
              </button>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingRight: '30px' }}>
                <div>
                  <h2 style={{ color: mainColor, fontSize: '1.5rem', marginBottom: '8px', fontWeight: 700 }}>{selectedCourse.title}</h2>
                  <p style={{ fontSize: '0.85rem', color: darkMode ? '#aaa' : '#666' }}>
                    <strong>Instructor:</strong> {selectedCourse.teacher} | <strong>Price:</strong> {selectedCourse.price}
                  </p>
                </div>
              </div>
              
              <p style={{ fontSize: '0.9rem', color: darkMode ? '#ccc' : '#555', marginBottom: '24px', lineHeight: 1.6 }}>
                {selectedCourse.detail}
              </p>
              
              {/* Content Based on Type */}
              {selectedCourse.type === 'video' ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1rem', color: mainColor, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      🎬 Video Lecture
                    </h3>
                    <button
                      onClick={toggleFullscreen}
                      className="fullscreen-btn"
                      style={{
                        backgroundColor: mainColor,
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {isFullscreen ? '⛶ Exit Fullscreen' : '🖥️ Fullscreen'}
                    </button>
                  </div>
                  <div className="video-container">
                    <iframe
                      className="video-iframe"
                      src={selectedCourse.contentLink}
                      title={selectedCourse.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                    <h3 style={{ fontSize: '1rem', color: mainColor, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      📖 Course Materials
                    </h3>
                    <button
                      onClick={toggleFullscreen}
                      className="fullscreen-btn"
                      style={{
                        backgroundColor: mainColor,
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: 500
                      }}
                    >
                      {isFullscreen ? '⛶ Exit Fullscreen' : '🖥️ Fullscreen'}
                    </button>
                  </div>
                  
                  {/* Google PDF Viewer - Works on ALL devices */}
                  <div className="pdf-container">
                    <iframe
                      src={`https://docs.google.com/viewer?url=${baseUrl}${selectedCourse.contentLink}&embedded=true`}
                      title={`${selectedCourse.title} PDF Viewer`}
                      allowFullScreen
                    />
                  </div>
                  
                  <p style={{ fontSize: '0.7rem', color: darkMode ? '#888' : '#999', marginTop: '12px', textAlign: 'center' }}>
                    📄 PDF document - Use the toolbar to zoom, download, or print. Works on all devices!
                  </p>
                </>
              )}
              
              {/* Enroll Button */}
              <div style={{ marginTop: '24px' }}>
                <button style={{ width: '100%', padding: '14px', backgroundColor: mainColor, 
                                color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, 
                                cursor: 'pointer', fontSize: '0.9rem' }}
                        onClick={() => { 
                          alert(`✅ You have successfully enrolled in ${selectedCourse.title}! Start learning now.`); 
                          setSelectedCourse(null);
                        }}>
                  Enroll Now - Start Learning
                </button>
                <p style={{ fontSize: '0.7rem', color: darkMode ? '#888' : '#999', marginTop: '12px', textAlign: 'center' }}>
                  Enroll to track your progress and get certified
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Event Registration Modal */}
        {selectedEvent && (
          <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
            <div className="modal-content" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedEvent(null)} 
                      style={{ position: 'absolute', top: '16px', right: '20px', border: 'none', 
                               background: 'none', fontSize: '1.3rem', cursor: 'pointer', color: darkMode ? '#fff' : '#888' }}>
                ✕
              </button>
              <h2 style={{ color: mainColor, fontSize: '1.3rem', marginBottom: '12px' }}>Register for {selectedEvent.title}</h2>
              <p style={{ fontSize: '0.85rem', marginBottom: '20px' }}>
                📅 {selectedEvent.date} | ⏰ {selectedEvent.time}
              </p>
              <form action="https://formspree.io/f/xnjwyyvn" method="POST">
                <input type="hidden" name="event" value={selectedEvent.title} />
                <input type="hidden" name="event_date" value={selectedEvent.date} />
                <input type="text" name="name" placeholder="Your Full Name" className="form-input" style={{ fontSize: '0.85rem' }} required />
                <input type="email" name="email" placeholder="Your Email Address" className="form-input" style={{ fontSize: '0.85rem' }} required />
                <input type="tel" name="phone" placeholder="Your Phone Number (optional)" className="form-input" style={{ fontSize: '0.85rem' }} />
                <button type="submit" style={{ width: '100%', marginTop: '16px', padding: '12px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>
                  Confirm Registration
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Upcoming Events Section */}
        <div id="events" style={{ width: '100%', maxWidth: '1100px', marginBottom: '60px', paddingTop: '40px' }}>
          <h2 className="section-title">📅 Upcoming Events</h2>
          <p className="section-subtitle">Join our free webinars and workshops to enhance your skills</p>
          <div className="events-container" style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {events.map(event => (
              <div key={event.id} className="event-card">
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📌</div>
                <h3 style={{ color: mainColor, marginBottom: '10px', fontSize: '1.1rem', fontWeight: 600 }}>{event.title}</h3>
                <p style={{ fontSize: '0.8rem', color: darkMode ? '#aaa' : '#666', marginBottom: '8px' }}>
                  📅 {event.date} | ⏰ {event.time}
                </p>
                <p style={{ fontSize: '0.8rem', color: darkMode ? '#888' : '#777', marginBottom: '16px', lineHeight: 1.4 }}>{event.description}</p>
                <button className="event-register-btn" style={{ width: '100%', padding: '10px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500 }} onClick={() => setSelectedEvent(event)}>
                  Register Now →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter & Contact Section */}
        <div id="contact" className="side-by-side-container" style={{ display: 'flex', gap: '30px', justifyContent: 'center', width: '100%', maxWidth: '900px', marginBottom: '60px', padding: '0 16px' }}>
          
          <div className="side-box" style={{ flex: 1, backgroundColor: '#1e293b', color: 'white', padding: '28px', borderRadius: '20px', minWidth: '260px' }}>
            <h3 style={{ color: mainColor, marginBottom: '12px', fontSize: '1.2rem' }}>📧 Get Updates</h3>
            <p style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '20px' }}>Subscribe for new courses and special offers</p>
            <form action="https://formspree.io/f/mojrzzqb" method="POST">
              <input 
                type="email" 
                name="email"
                placeholder="Your email address" 
                style={{ width: '100%', padding: '12px', borderRadius: '30px', border: 'none', marginBottom: '15px', outline: 'none', fontSize: '0.85rem' }} 
                required
              />
              <button type="submit" 
                      style={{ width: '100%', padding: '12px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '30px', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>
                Subscribe Now
              </button>
            </form>
          </div>
          
          <div className="side-box" style={{ flex: 1, backgroundColor: darkMode ? '#1a1a2e' : mainColorLight, padding: '28px', borderRadius: '20px', minWidth: '260px' }}>
            <h3 style={{ color: mainColor, marginBottom: '12px', fontSize: '1.2rem' }}>📩 Contact Us</h3>
            <form action="https://formspree.io/f/mojrzzqb" method="POST">
              <input type="text" name="name" placeholder="Your Name" className="form-input" style={{ fontSize: '0.85rem', marginBottom: '12px' }} required />
              <input type="email" name="_replyto" placeholder="Your Email" className="form-input" style={{ fontSize: '0.85rem', marginBottom: '12px' }} required />
              <textarea name="message" placeholder="Your Message..." className="form-input" style={{ fontSize: '0.85rem', minHeight: '80px', borderRadius: '12px', marginBottom: '12px' }} required></textarea>
              <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '30px', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>Send Message</button>
            </form>
          </div>
        </div>

      </main>

      {/* Back to Top Button */}
      {showTopBtn && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ 
          position: 'fixed', bottom: '20px', right: '20px', backgroundColor: mainColor, color: 'white', 
          border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '18px', 
          cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 1000 
        }}>↑</button>
      )}

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
          <img 
            src="/logo.png" 
            alt="Waloo Academy Logo" 
            style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '8px',
              objectFit: 'cover'
            }} 
          />
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Waloo Academy</h3>
        </div>
        <p style={{ fontSize: '0.75rem', marginBottom: '20px', opacity: 0.7 }}>© 2025 Waloo Academy. Where Knowledge Meets Innovation!</p>
        
        <div style={{ marginBottom: '24px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://t.me/walooacademy" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: '#0088cc', textDecoration: 'none', fontSize: '0.8rem' }}>
            📱 Telegram
          </a>
          <a href="https://youtube.com/@walooacademy" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: '#ff0000', textDecoration: 'none', fontSize: '0.8rem' }}>
            ▶️ YouTube
          </a>
          <a href="https://facebook.com/walooacademy" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: '#1877f2', textDecoration: 'none', fontSize: '0.8rem' }}>
            👍 Facebook
          </a>
        </div>
        
        <div style={{ marginTop: '20px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.75rem' }}>
          <a href="#" style={{ color: mainColor, textDecoration: 'none' }}>Home</a>
          <a href="#courses" style={{ color: mainColor, textDecoration: 'none' }}>Courses</a>
          <a href="#whyus" style={{ color: mainColor, textDecoration: 'none' }}>Why Us</a>
          <a href="#testimonials" style={{ color: mainColor, textDecoration: 'none' }}>Reviews</a>
          <a href="#events" style={{ color: mainColor, textDecoration: 'none' }}>Events</a>
          <a href="#contact" style={{ color: mainColor, textDecoration: 'none' }}>Contact</a>
        </div>
        
        <p style={{ marginTop: '20px', fontSize: '0.65rem', opacity: 0.5 }}>Empowering Ethiopian education since 2025</p>
      </footer>
    </div>
  );
}
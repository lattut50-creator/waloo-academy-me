 "use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function CoursesPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isPdfFullscreen, setIsPdfFullscreen] = useState(false);
  const pdfContainerRef = useRef(null);

  // All Courses Data
  const allCourses = [
    {
      id: 1,
      title: "Data Analytics Bootcamp",
      description: "Master SQL, Excel, Power BI, and Python for data analysis. Build real-world projects.",
      icon: "📊",
      duration: "8 weeks",
      level: "Beginner to Advanced",
      students: "5,000+",
      type: "video",
      contentLink: "https://www.youtube-nocookie.com/embed/nbEOo5ae1bs?modestbranding=1&rel=0&showinfo=0&controls=1",
      features: ["45+ hours of content", "10 real projects", "Career guidance"],
      category: "Data Analysis"
    },
    {
      id: 2,
      title: "SQL for Data Analysis",
      description: "Learn to write complex queries, join tables, and analyze data like a pro.",
      icon: "🗄️",
      duration: "4 weeks",
      level: "Beginner",
      students: "3,200+",
      type: "video",
      contentLink: "https://www.youtube-nocookie.com/embed/nbEOo5ae1bs?modestbranding=1&rel=0&showinfo=0&controls=1",
      features: ["20+ hours of content", "100+ practice exercises", "Interview prep"],
      category: "Data Analysis"
    },
    {
      id: 3,
      title: "Python Programming",
      description: "Master Python from basics to advanced data structures and algorithms.",
      icon: "🐍",
      duration: "6 weeks",
      level: "Beginner",
      students: "4,100+",
      type: "video",
      contentLink: "https://www.youtube-nocookie.com/embed/nbEOo5ae1bs?modestbranding=1&rel=0&showinfo=0&controls=1",
      features: ["30+ hours of content", "15 coding projects", "Certification"],
      category: "Programming"
    },
    {
      id: 4,
      title: "Excel & Power BI",
      description: "Create stunning dashboards and automate reports using Excel and Power BI.",
      icon: "📈",
      duration: "5 weeks",
      level: "Beginner to Intermediate",
      students: "2,800+",
      type: "video",
      contentLink: "https://www.youtube-nocookie.com/embed/nbEOo5ae1bs?modestbranding=1&rel=0&showinfo=0&controls=1",
      features: ["25+ hours of content", "8 dashboards", "Real datasets"],
      category: "Data Analysis"
    },
    {
      id: 5,
      title: "Macro Economics",
      description: "Understand GDP, inflation, monetary policy, and global economic trends.",
      icon: "📉",
      duration: "6 weeks",
      level: "Intermediate",
      students: "1,500+",
      type: "pdf",
      contentLink: "/uploads/macro.pdf",
      features: ["Comprehensive notes", "Case studies", "Practice exams"],
      category: "Economics"
    },
    {
      id: 6,
      title: "Micro Economics",
      description: "Master supply & demand, market structures, and consumer behavior.",
      icon: "📊",
      duration: "6 weeks",
      level: "Intermediate",
      students: "1,200+",
      type: "pdf",
      contentLink: "/uploads/micro.pdf",
      features: ["Detailed explanations", "Real examples", "Quiz included"],
      category: "Economics"
    },
    {
      id: 7,
      title: "Economics Grade 12",
      description: "Complete grade 12 economics curriculum with exam preparation.",
      icon: "🎓",
      duration: "8 weeks",
      level: "High School",
      students: "2,000+",
      type: "pdf",
      contentLink: "/uploads/economics-grade-12.pdf",
      features: ["Full syllabus", "Past papers", "Exam tips"],
      category: "High School"
    }
  ];

  // Filter courses based on search
  const filteredCourses = allCourses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get unique categories for filter
  const categories = ["All", ...new Set(allCourses.map(c => c.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredByCategory = filteredCourses.filter(course =>
    selectedCategory === "All" || course.category === selectedCategory
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
        
        .course-card {
          transition: all 0.3s ease;
          background-color: ${darkMode ? '#1a1a2e' : 'white'};
          border-radius: 20px;
          padding: 24px;
          cursor: pointer;
          border: 1px solid ${darkMode ? '#2a2a3e' : '#eef2f6'};
        }
        .course-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.1);
          border-color: ${mainColor};
        }
        
        .category-filter {
          background: transparent;
          border: 1px solid ${mainColor};
          color: ${mainColor};
          padding: 6px 16px;
          border-radius: 30px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.2s;
        }
        .category-filter:hover, .category-filter.active {
          background: ${mainColor};
          color: white;
        }
        
        .search-input {
          width: 100%;
          padding: 12px 20px;
          border-radius: 40px;
          border: 1px solid ${darkMode ? '#444' : '#ddd'};
          background: ${darkMode ? '#2a2a2a' : 'white'};
          color: ${darkMode ? '#fff' : '#333'};
          font-size: 0.9rem;
          outline: none;
        }
        
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          margin-top: 30px;
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
        .video-container {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          border-radius: 12px;
        }
        .video-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
        
        .logo { transition: transform 0.2s ease; }
        .logo:hover { transform: scale(1.05); }
        
        @media (max-width: 768px) {
          .courses-grid {
            grid-template-columns: 1fr;
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
          <h1 style={{ color: mainColor, fontSize: '2.5rem', marginBottom: '16px' }}>📚 All Courses</h1>
          <p style={{ color: darkMode ? '#aaa' : '#666', fontSize: '1rem' }}>
            Choose from our selection of expert-led courses and start learning today
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '30px' }}>
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search courses by title, description, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '30px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-filter ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {filteredByCategory.map(course => (
            <div key={course.id} className="course-card" onClick={() => setSelectedCourse(course)}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{course.icon}</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: darkMode ? '#fff' : '#333' }}>{course.title}</h3>
              <p style={{ fontSize: '0.8rem', color: darkMode ? '#aaa' : '#666', marginBottom: '12px', lineHeight: 1.5 }}>
                {course.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                <span style={{ background: mainColorLight, color: mainColor, padding: '4px 10px', borderRadius: '20px', fontSize: '0.65rem' }}>{course.duration}</span>
                <span style={{ background: mainColorLight, color: mainColor, padding: '4px 10px', borderRadius: '20px', fontSize: '0.65rem' }}>{course.level}</span>
                <span style={{ background: mainColorLight, color: mainColor, padding: '4px 10px', borderRadius: '20px', fontSize: '0.65rem' }}>{course.category}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${darkMode ? '#2a2a3e' : '#eee'}`, paddingTop: '12px' }}>
                <span style={{ fontSize: '0.7rem', color: darkMode ? '#888' : '#999' }}>👨‍🎓 {course.students}</span>
                <span style={{ color: mainColor, fontSize: '0.7rem', fontWeight: 500 }}>{course.type === 'video' ? '▶ Watch →' : '📖 Open →'}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredByCategory.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: darkMode ? '#888' : '#999' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
            <p>No courses found. Try a different search term.</p>
          </div>
        )}

        {/* Course Modal - PDF */}
        {selectedCourse && selectedCourse.type === 'pdf' && (
          <div className="modal-overlay" onClick={() => setSelectedCourse(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedCourse(null)} style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer' }}>✕</button>
              <h2 style={{ color: mainColor, fontSize: '1.2rem', marginBottom: '8px' }}>{selectedCourse.title}</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: darkMode ? '#aaa' : '#666' }}>Free • {selectedCourse.duration}</span>
                <button onClick={togglePdfFullscreen} style={{ backgroundColor: mainColor, color: 'white', border: 'none', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.7rem' }}>
                  {isPdfFullscreen ? '⛶ Exit' : '🖥️ Fullscreen'}
                </button>
              </div>
              <div ref={pdfContainerRef} className="pdf-container">
                <iframe src={selectedCourse.contentLink} style={{ width: '100%', height: '100%', border: 'none' }} title={selectedCourse.title} />
              </div>
              <button style={{ width: '100%', marginTop: '16px', padding: '10px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' }} onClick={() => setSelectedCourse(null)}>Close</button>
            </div>
          </div>
        )}

        {/* Course Modal - Video */}
        {selectedCourse && selectedCourse.type === 'video' && (
          <div className="modal-overlay" onClick={() => setSelectedCourse(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedCourse(null)} style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer' }}>✕</button>
              <h2 style={{ color: mainColor, fontSize: '1.2rem', marginBottom: '8px' }}>{selectedCourse.title}</h2>
              <span style={{ fontSize: '0.8rem', color: darkMode ? '#aaa' : '#666', display: 'block', marginBottom: '16px' }}>Free • {selectedCourse.duration}</span>
              <div className="video-container">
                <iframe className="video-iframe" src={selectedCourse.contentLink} title={selectedCourse.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
              <button style={{ width: '100%', marginTop: '16px', padding: '10px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer' }} onClick={() => setSelectedCourse(null)}>Close</button>
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
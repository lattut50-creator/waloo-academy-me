 "use client";
import { useState, useEffect } from 'react';

// Place your image in 'public/' folder named 'profile.png'
const profileImageUrl = "/profile.png"; 

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Course Data - 3 Courses with PDF files
  const courses = [
    { 
      id: 1, 
      title: "Macro Economics", 
      desc: "Learn Macro Economics.", 
      detail: "Macroeconomics is the branch of economics that studies the behavior and performance of an economy as a whole.",
      teacher: "Rorisa (AAU Student)",
      price: "Free",
      fileLink: "/uploads/macro.pdf"
    },
    { 
      id: 2, 
      title: "Micro Economics", 
      desc: "Learn Micro Economics.", 
      detail: "Microeconomics is the study of decisions made by individuals and businesses regarding the allocation of resources.",
      teacher: "Rorisa (AAU Student)",
      price: "Free",
      fileLink: "/uploads/micro.pdf"
    },
    { 
      id: 3, 
      title: "Civic Education", 
      desc: "Learn Civic Education.", 
      detail: "Civic education is the study of the theoretical, political and practical aspects of citizenship.",
      teacher: "Rorisa (AAU Student)",
      price: "Free",
      fileLink: "/uploads/civic.pdf"
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
        
        .testimonial-card, .why-card { 
          background: ${darkMode ? '#1a1a2e' : 'white'}; 
          padding: 20px;
          border-radius: 16px;
          width: 280px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: all 0.3s ease;
        }
        .testimonial-card:hover, .why-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
        
        .form-input { 
          width: 100%; padding: 10px 14px; margin-bottom: 12px; border-radius: 10px; 
          border: 1px solid #ddd; outline: none; font-size: 0.85rem;
          background: ${darkMode ? '#2a2a2a' : 'white'};
          color: ${darkMode ? '#fff' : '#333'};
        }
        .form-input:focus { border-color: ${mainColor}; box-shadow: 0 0 0 2px rgba(26,115,232,0.1); }
        
        .modal-overlay { 
          position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
          background: rgba(0,0,0,0.8); display: flex; justify-content: center; 
          align-items: center; z-index: 1000; animation: fadeIn 0.2s ease;
        }
        .modal-content { 
          background: ${darkMode ? '#1a1a2e' : 'white'}; 
          padding: 32px; border-radius: 24px; max-width: 500px; width: 90%; 
          position: relative; text-align: left; animation: slideUp 0.2s ease;
        }
        
        .event-card {
          background: ${darkMode ? '#1a1a2e' : 'white'};
          padding: 16px;
          border-radius: 16px;
          width: 280px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          border-left: 4px solid ${mainColor};
          transition: all 0.3s ease;
        }
        .event-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
        
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
        
        .download-btn {
          transition: all 0.2s;
        }
        .download-btn:hover {
          transform: scale(1.02);
        }
        
        .section-title {
          font-size: 1.6rem;
          font-weight: 600;
          margin-bottom: 32px;
          text-align: center;
          color: ${mainColor};
        }
        
        .slogan-text {
          font-size: 0.9rem;
          opacity: 0.8;
          letter-spacing: 0.5px;
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
          .events-container { flex-direction: column !important; align-items: center !important; }
          .why-testimonial-container { flex-direction: column !important; align-items: center !important; }
          .courses-container { justify-content: center !important; }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* 1. Nav Bar */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '12px 40px', backgroundColor: mainColor, color: 'white', 
        position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <h2 style={{ margin: 0, cursor: 'pointer', fontSize: '1.4rem', fontWeight: 600 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Waloo Academy
        </h2>
        
        {/* Dark Mode Toggle Button */}
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
          <a href="#events" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Events</a>
          <a href="#why-testimonial" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>About</a>
          <a href="#contact" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Contact</a>
        </div>
      </nav>

      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', textAlign: 'center' }}>
        
        {/* Hero Section with Slogans */}
        <div style={{ maxWidth: '800px', marginBottom: '40px' }}>
          <h1 style={{ color: mainColor, fontSize: '2.8rem', fontWeight: 700, marginBottom: '12px', letterSpacing: '-0.5px' }}>
            Waloo Academy
          </h1>
          
          {/* Slogans */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
            <span className="slogan-text" style={{ background: mainColorLight, padding: '4px 12px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 500, color: mainColor }}>📚 Learn Anywhere</span>
            <span className="slogan-text" style={{ background: mainColorLight, padding: '4px 12px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 500, color: mainColor }}>🎓 Expert Instructors</span>
            <span className="slogan-text" style={{ background: mainColorLight, padding: '4px 12px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: 500, color: mainColor }}>📜 Get Certified</span>
          </div>
          
          <p style={{ fontSize: '1rem', color: darkMode ? '#aaa' : '#666', marginBottom: '20px', fontWeight: 400 }}>
            Empowering Ethiopian students with quality education in Economics, Data Analysis, and Programming
          </p>
          
          <div style={{ marginBottom: '30px' }}>
            <img src={profileImageUrl} alt="Waloo Academy" 
                 loading="eager"
                 width="600" 
                 height="300"
                 style={{ width: '100%', maxWidth: '550px', borderRadius: '20px', 
                          boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }} />
          </div>
          
          <button className="hero-btn" 
                  style={{ padding: '12px 32px', backgroundColor: mainColor, color: 'white', 
                           border: 'none', borderRadius: '40px', fontSize: '0.95rem', cursor: 'pointer', 
                           fontWeight: 600, marginBottom: '40px', boxShadow: `0 4px 12px ${mainColor}40` }}
                  onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}>
            Start Learning Today →
          </button>
        </div>

        {/* Why Choose Us & Testimonials - Side by Side */}
        <div id="why-testimonial" style={{ width: '100%', maxWidth: '1100px', marginBottom: '60px', paddingTop: '40px' }}>
          <div className="why-testimonial-container" style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
            
            {/* Why Choose Us Section - Compact */}
            <div style={{ flex: 1, minWidth: '280px' }}>
              <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '24px' }}>✨ Why Choose Us</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="why-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div style={{ fontSize: '1.5rem' }}>🎓</div>
                    <h4 style={{ color: mainColor, margin: 0, fontSize: '1rem' }}>Expert Instructors</h4>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: darkMode ? '#bbb' : '#666', margin: 0, lineHeight: 1.4 }}>Learn from experienced professionals with real-world expertise.</p>
                </div>
                <div className="why-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div style={{ fontSize: '1.5rem' }}>💻</div>
                    <h4 style={{ color: mainColor, margin: 0, fontSize: '1rem' }}>Hands-on Projects</h4>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: darkMode ? '#bbb' : '#666', margin: 0, lineHeight: 1.4 }}>Learn by doing with real-world projects and exercises.</p>
                </div>
                <div className="why-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div style={{ fontSize: '1.5rem' }}>📜</div>
                    <h4 style={{ color: mainColor, margin: 0, fontSize: '1rem' }}>Certificate</h4>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: darkMode ? '#bbb' : '#666', margin: 0, lineHeight: 1.4 }}>Earn a certificate upon completion of each course.</p>
                </div>
              </div>
            </div>

            {/* Testimonials Section - Compact */}
            <div style={{ flex: 1, minWidth: '280px' }}>
              <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '24px' }}>💬 Student Reviews</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="testimonial-card">
                  <p style={{ fontSize: '0.85rem', color: darkMode ? '#ccc' : '#555', marginBottom: '12px', lineHeight: 1.4, fontStyle: 'italic' }}>"Waloo Academy made learning easy for me. Truly a center of knowledge!"</p>
                  <h5 style={{ margin: 0, color: mainColor, fontSize: '0.85rem', fontWeight: 600 }}>— Ayantu G.</h5>
                </div>
                <div className="testimonial-card">
                  <p style={{ fontSize: '0.85rem', color: darkMode ? '#ccc' : '#555', marginBottom: '12px', lineHeight: 1.4, fontStyle: 'italic' }}>"Programming was hard, but now I write code with confidence!"</p>
                  <h5 style={{ margin: 0, color: mainColor, fontSize: '0.85rem', fontWeight: 600 }}>— Abdi K.</h5>
                </div>
                <div className="testimonial-card">
                  <p style={{ fontSize: '0.85rem', color: darkMode ? '#ccc' : '#555', marginBottom: '12px', lineHeight: 1.4, fontStyle: 'italic' }}>"The Economics course helped me understand Ethiopian market perfectly!"</p>
                  <h5 style={{ margin: 0, color: mainColor, fontSize: '0.85rem', fontWeight: 600 }}>— Bethlehem M.</h5>
                </div>
              </div>
            </div>
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

        {/* Courses Section - Distinct Section */}
        <div id="courses" style={{ width: '100%', maxWidth: '1100px', marginBottom: '60px', paddingTop: '40px' }}>
          <h2 className="section-title">📖 Featured Courses</h2>
          <div className="courses-container" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {filteredCourses.map(course => (
              <div key={course.id} className="course-card">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '6px', color: darkMode ? '#fff' : '#333' }}>{course.title}</h3>
                <p style={{ fontSize: '0.8rem', color: darkMode ? '#aaa' : '#666', marginBottom: '12px' }}>{course.desc}</p>
                
                {/* Download PDF Button */}
                <a href={course.fileLink} download target="_blank" style={{ textDecoration: 'none' }}>
                  <button className="download-btn" style={{
                    backgroundColor: mainColor,
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginTop: '12px',
                    marginBottom: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    width: '100%'
                  }}>
                    📥 Download PDF
                  </button>
                </a>
                
                <span 
                  style={{ color: mainColor, fontWeight: 500, fontSize: '0.7rem', cursor: 'pointer', display: 'block', textAlign: 'center' }}
                  onClick={() => setSelectedCourse(course)}
                >
                  View details →
                </span>
              </div>
            ))}
          </div>
          {filteredCourses.length === 0 && (
            <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '0.85rem' }}>No courses found. Try a different search!</p>
          )}
        </div>

        {/* Course Modal */}
        {selectedCourse && (
          <div className="modal-overlay" onClick={() => setSelectedCourse(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedCourse(null)} 
                      style={{ position: 'absolute', top: '16px', right: '20px', border: 'none', 
                               background: 'none', fontSize: '1.3rem', cursor: 'pointer', color: darkMode ? '#fff' : '#888' }}>
                ✕
              </button>
              <h2 style={{ color: mainColor, fontSize: '1.4rem', marginBottom: '12px' }}>{selectedCourse.title}</h2>
              <p style={{ fontSize: '0.85rem', color: darkMode ? '#ccc' : '#555', marginBottom: '16px', lineHeight: 1.5 }}>{selectedCourse.detail}</p>
              <div style={{ background: darkMode ? '#0a0a0a' : '#f5f7fa', padding: '12px', borderRadius: '12px', marginBottom: '16px' }}>
                <p style={{ fontSize: '0.8rem', margin: '4px 0' }}><strong>Instructor:</strong> {selectedCourse.teacher}</p>
                <p style={{ fontSize: '0.8rem', margin: '4px 0' }}><strong>Price:</strong> {selectedCourse.price}</p>
              </div>
              
              <a href={selectedCourse.fileLink} download target="_blank" style={{ textDecoration: 'none' }}>
                <button style={{ width: '100%', marginBottom: '12px', padding: '10px', backgroundColor: '#4caf50', 
                                 color: 'white', border: 'none', borderRadius: '10px', fontWeight: 500, cursor: 'pointer', fontSize: '0.8rem' }}>
                  📥 Download PDF
                </button>
              </a>
              
              <button style={{ width: '100%', padding: '10px', backgroundColor: mainColor, 
                              color: 'white', border: 'none', borderRadius: '10px', fontWeight: 500, cursor: 'pointer', fontSize: '0.8rem' }}
                      onClick={() => { 
                        alert(`Enrollment started for ${selectedCourse.title}! We'll contact you.`); 
                        setSelectedCourse(null);
                      }}>
                Enroll Now
              </button>
            </div>
          </div>
        )}

        {/* Event Registration Modal */}
        {selectedEvent && (
          <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedEvent(null)} 
                      style={{ position: 'absolute', top: '16px', right: '20px', border: 'none', 
                               background: 'none', fontSize: '1.3rem', cursor: 'pointer', color: darkMode ? '#fff' : '#888' }}>
                ✕
              </button>
              <h2 style={{ color: mainColor, fontSize: '1.3rem', marginBottom: '12px' }}>Register for {selectedEvent.title}</h2>
              <p style={{ fontSize: '0.85rem', marginBottom: '16px' }}>
                📅 {selectedEvent.date} | ⏰ {selectedEvent.time}
              </p>
              <form action="https://formspree.io/f/xnjwyyvn" method="POST">
                <input type="hidden" name="event" value={selectedEvent.title} />
                <input type="hidden" name="event_date" value={selectedEvent.date} />
                <input type="text" name="name" placeholder="Your Full Name" className="form-input" style={{ fontSize: '0.8rem' }} required />
                <input type="email" name="email" placeholder="Your Email Address" className="form-input" style={{ fontSize: '0.8rem' }} required />
                <input type="tel" name="phone" placeholder="Your Phone Number (optional)" className="form-input" style={{ fontSize: '0.8rem' }} />
                <button type="submit" style={{ width: '100%', marginTop: '8px', padding: '10px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '10px', fontWeight: 500, cursor: 'pointer', fontSize: '0.8rem' }}>
                  Confirm Registration
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Upcoming Events Section */}
        <div id="events" style={{ width: '100%', maxWidth: '1100px', marginBottom: '60px', paddingTop: '40px' }}>
          <h2 className="section-title">📅 Upcoming Events</h2>
          <div className="events-container" style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {events.map(event => (
              <div key={event.id} className="event-card">
                <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>📌</div>
                <h3 style={{ color: mainColor, marginBottom: '8px', fontSize: '1rem' }}>{event.title}</h3>
                <p style={{ fontSize: '0.75rem', color: darkMode ? '#aaa' : '#666', marginBottom: '6px' }}>
                  📅 {event.date} | ⏰ {event.time}
                </p>
                <p style={{ fontSize: '0.75rem', color: darkMode ? '#888' : '#777', marginBottom: '12px' }}>{event.description}</p>
                <button className="event-register-btn" style={{ width: '100%', padding: '8px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 500 }} onClick={() => setSelectedEvent(event)}>
                  Register Now →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter & Contact Section */}
        <div id="contact" className="side-by-side-container" style={{ display: 'flex', gap: '24px', justifyContent: 'center', width: '100%', maxWidth: '900px', marginBottom: '60px', padding: '0 16px' }}>
          
          {/* Newsletter Box */}
          <div className="side-box" style={{ flex: 1, backgroundColor: '#1e293b', color: 'white', padding: '20px', borderRadius: '20px', minWidth: '260px' }}>
            <h3 style={{ color: mainColor, marginBottom: '8px', fontSize: '1.1rem' }}>📧 Get Updates</h3>
            <p style={{ fontSize: '0.7rem', opacity: 0.8, marginBottom: '16px' }}>Subscribe for new courses and offers.</p>
            <form action="https://formspree.io/f/mojrzzqb" method="POST">
              <input 
                type="email" 
                name="email"
                placeholder="Your email" 
                style={{ width: '100%', padding: '10px', borderRadius: '30px', border: 'none', marginBottom: '12px', outline: 'none', fontSize: '0.8rem' }} 
                required
              />
              <button type="submit" 
                      style={{ width: '100%', padding: '10px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '30px', fontWeight: 500, cursor: 'pointer', fontSize: '0.8rem' }}>
                Subscribe
              </button>
            </form>
          </div>
          
          {/* Contact Form Box */}
          <div className="side-box" style={{ flex: 1, backgroundColor: darkMode ? '#1a1a2e' : mainColorLight, padding: '20px', borderRadius: '20px', minWidth: '260px' }}>
            <h3 style={{ color: mainColor, marginBottom: '8px', fontSize: '1.1rem' }}>📩 Contact Us</h3>
            <form action="https://formspree.io/f/mojrzzqb" method="POST">
              <input type="text" name="name" placeholder="Your Name" className="form-input" style={{ fontSize: '0.8rem', marginBottom: '8px' }} required />
              <input type="email" name="_replyto" placeholder="Your Email" className="form-input" style={{ fontSize: '0.8rem', marginBottom: '8px' }} required />
              <textarea name="message" placeholder="Your Message..." className="form-input" style={{ fontSize: '0.8rem', minHeight: '50px', borderRadius: '12px', marginBottom: '8px' }} required></textarea>
              <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '30px', fontWeight: 500, cursor: 'pointer', fontSize: '0.8rem' }}>Send Message</button>
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

      {/* Footer with Social Media - Reduced Size */}
      <footer style={{ backgroundColor: '#0f172a', color: 'white', padding: '30px 20px', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '1.1rem' }}>Waloo Academy</h3>
        <p style={{ fontSize: '0.7rem', marginBottom: '16px', opacity: 0.7 }}>© 2025 Waloo Academy. Where Knowledge Meets Innovation!</p>
        
        {/* Social Media Links - Reduced Size */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://t.me/walooacademy" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: '#0088cc', textDecoration: 'none', fontSize: '0.75rem' }}>
            📱 Telegram
          </a>
          <a href="https://youtube.com/@walooacademy" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: '#ff0000', textDecoration: 'none', fontSize: '0.75rem' }}>
            ▶️ YouTube
          </a>
          <a href="https://facebook.com/walooacademy" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: '#1877f2', textDecoration: 'none', fontSize: '0.75rem' }}>
            👍 Facebook
          </a>
        </div>
        
        <div style={{ marginTop: '16px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.7rem' }}>
          <a href="#" style={{ color: mainColor, textDecoration: 'none' }}>Home</a>
          <a href="#courses" style={{ color: mainColor, textDecoration: 'none' }}>Courses</a>
          <a href="#events" style={{ color: mainColor, textDecoration: 'none' }}>Events</a>
          <a href="#why-testimonial" style={{ color: mainColor, textDecoration: 'none' }}>About</a>
          <a href="#contact" style={{ color: mainColor, textDecoration: 'none' }}>Contact</a>
        </div>
        
        <p style={{ marginTop: '16px', fontSize: '0.6rem', opacity: 0.5 }}>Empowering Ethiopian education</p>
      </footer>
    </div>
  );
}
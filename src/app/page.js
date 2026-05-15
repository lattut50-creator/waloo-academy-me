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
      fontFamily: 'sans-serif', 
      backgroundColor: darkMode ? '#1a1a1a' : '#f0f2f5', 
      minHeight: '100vh', 
      scrollBehavior: 'smooth',
      color: darkMode ? '#fff' : '#333',
      transition: 'all 0.3s ease'
    }}>
      
      {/* CSS Styles */}
      <style jsx global>{`
        .course-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background-color: ${darkMode ? '#2d2d2d' : 'white'};
          padding: 25px; border-radius: 15px; width: 280px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05); text-align: left;
          will-change: transform;
        }
        .course-card:hover { transform: translateY(-10px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); border: 1px solid ${mainColor}; }
        
        .hero-btn { 
          transition: background-color 0.3s, transform 0.2s; 
          will-change: transform;
        }
        .hero-btn:hover { background-color: ${mainColorDark} !important; transform: scale(1.05); }
        
        .testimonial-card { 
          background: ${darkMode ? '#2d2d2d' : 'white'}; 
          padding: 25px; border-radius: 15px; width: 320px; font-style: italic; 
          border-left: 6px solid ${mainColor}; box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        
        .form-input { 
          width: 100%; padding: 10px; margin-bottom: 12px; border-radius: 8px; 
          border: 1px solid #ddd; outline: none; font-size: 0.9rem;
          background: ${darkMode ? '#333' : 'white'};
          color: ${darkMode ? '#fff' : '#333'};
        }
        .form-input:focus { border-color: ${mainColor}; box-shadow: 0 0 0 2px rgba(26,115,232,0.2); }
        
        .modal-overlay { 
          position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
          background: rgba(0,0,0,0.7); display: flex; justify-content: center; 
          align-items: center; z-index: 1000; animation: fadeIn 0.3s ease;
        }
        .modal-content { 
          background: ${darkMode ? '#2d2d2d' : 'white'}; 
          padding: 40px; border-radius: 20px; max-width: 500px; width: 90%; 
          position: relative; text-align: left; animation: slideUp 0.3s ease;
        }
        
        .event-card {
          background: ${darkMode ? '#2d2d2d' : 'white'};
          padding: 20px;
          border-radius: 15px;
          width: 300px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          border-left: 4px solid ${mainColor};
        }
        
        .social-icon {
          transition: transform 0.3s ease;
          display: inline-block;
          will-change: transform;
        }
        .social-icon:hover {
          transform: translateY(-5px);
        }
        
        .event-register-btn {
          transition: transform 0.2s;
          will-change: transform;
        }
        .event-register-btn:hover {
          transform: scale(1.05);
        }
        
        .download-btn {
          transition: all 0.3s ease;
        }
        .download-btn:hover {
          transform: scale(1.05);
        }
        
        img {
          content-visibility: auto;
        }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        @media (max-width: 768px) {
          .nav-links { display: ${isOpen ? 'flex' : 'none'} !important; flex-direction: column; 
          position: absolute; top: 65px; left: 0; width: 100%; background-color: ${mainColor}; 
          padding: 20px; gap: 15px; }
          .menu-icon { display: block !important; }
          .side-by-side-container { flex-direction: column !important; align-items: center !important; }
          .side-box { width: 95% !important; min-width: unset !important; }
          .events-container { flex-direction: column !important; align-items: center !important; }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* 1. Nav Bar - NO SIGN IN/UP BUTTONS */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '15px 50px', backgroundColor: mainColor, color: 'white', 
        position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ margin: 0, cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Waloo Academy
        </h2>
        
        {/* Dark Mode Toggle Button */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.3rem',
            cursor: 'pointer',
            marginLeft: 'auto',
            marginRight: '20px'
          }}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        
        <div className="menu-icon" style={{ display: 'none', fontSize: '1.8rem', cursor: 'pointer' }} 
             onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '☰'}
        </div>
        
        <div className="nav-links" style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <a href="#" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Home</a>
          <a href="#courses" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Courses</a>
          <a href="#events" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Events</a>
          <a href="#about" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>About Us</a>
          <a href="#contact" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Contact Us</a>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px 20px', textAlign: 'center' }}>
        
        {/* Hero Section */}
        <h1 style={{ color: mainColor, fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
          Waloo Academy
        </h1>
        <p style={{ fontSize: '1.5rem', color: darkMode ? '#ccc' : '#555', marginBottom: '30px', fontWeight: '500' }}>
          Where Knowledge Meets Innovation!
        </p>
        <div style={{ marginBottom: '40px' }}>
          <img src={profileImageUrl} alt="Waloo Academy" 
               loading="eager"
               width="700" 
               height="400"
               style={{ width: '100%', maxWidth: '700px', borderRadius: '30px', 
                        boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }} />
        </div>
        <button className="hero-btn" 
                style={{ padding: '18px 50px', backgroundColor: mainColor, color: 'white', 
                         border: 'none', borderRadius: '40px', fontSize: '1.3rem', cursor: 'pointer', 
                         fontWeight: 'bold', marginBottom: '80px', boxShadow: `0 8px 20px ${mainColor}4D` }}
                onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}>
          Start Learning!
        </button>

        {/* Why Choose Us Section */}
        <div id="about" style={{ marginBottom: '100px', width: '100%', maxWidth: '1000px', paddingTop: '70px' }}>
          <h2 style={{ color: mainColor, marginBottom: '45px', fontSize: '2.2rem' }}>Why Choose Us?</h2>
          <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
             <div style={{ backgroundColor: darkMode ? '#2d2d2d' : mainColorLight, padding: '30px', 
                           borderRadius: '20px', width: '280px', transition: 'transform 0.3s' }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎓</div>
                <h4 style={{ color: mainColor }}>Expert Instructors</h4>
                <p>Learn from experienced professionals.</p>
             </div>
             <div style={{ backgroundColor: darkMode ? '#2d2d2d' : mainColorLight, padding: '30px', 
                           borderRadius: '20px', width: '280px', transition: 'transform 0.3s' }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>💻</div>
                <h4 style={{ color: mainColor }}>Hands-on Projects</h4>
                <p>Learn by doing, not just theory.</p>
             </div>
             <div style={{ backgroundColor: darkMode ? '#2d2d2d' : mainColorLight, padding: '30px', 
                           borderRadius: '20px', width: '280px', transition: 'transform 0.3s' }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📜</div>
                <h4 style={{ color: mainColor }}>Certificate</h4>
                <p>Receive a certificate upon completion.</p>
             </div>
          </div>
        </div>

        {/* Course Search Bar */}
        <div style={{ marginBottom: '30px', width: '100%', maxWidth: '500px' }}>
          <input 
            type="text" 
            placeholder="🔍 Search courses..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '12px 20px', 
              borderRadius: '25px', 
              border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
              fontSize: '1rem',
              outline: 'none',
              backgroundColor: darkMode ? '#333' : 'white',
              color: darkMode ? '#fff' : '#333'
            }}
          />
        </div>

        {/* Our Courses Section */}
        <div id="courses" style={{ paddingTop: '70px', marginBottom: '100px' }}>
          <h2 style={{ color: mainColor, marginBottom: '40px', fontSize: '2.2rem' }}>Our Courses</h2>
          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1200px' }}>
            {filteredCourses.map(course => (
              <div key={course.id} className="course-card" style={{ cursor: 'default' }}>
                <h3>{course.title}</h3>
                <p>{course.desc}</p>
                
                {/* Download PDF Button */}
                <a href={course.fileLink} download target="_blank" style={{ textDecoration: 'none' }}>
                  <button className="download-btn" style={{
                    backgroundColor: mainColor,
                    color: 'white',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginTop: '15px',
                    marginBottom: '10px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    width: '100%'
                  }}>
                    📥 Download PDF
                  </button>
                </a>
                
                <span 
                  style={{ color: mainColor, fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', display: 'block', textAlign: 'center' }}
                  onClick={() => setSelectedCourse(course)}
                >
                  View details →
                </span>
              </div>
            ))}
          </div>
          {filteredCourses.length === 0 && (
            <p style={{ textAlign: 'center', marginTop: '40px' }}>No courses found. Try a different search!</p>
          )}
        </div>

        {/* Course Modal */}
        {selectedCourse && (
          <div className="modal-overlay" onClick={() => setSelectedCourse(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedCourse(null)} 
                      style={{ position: 'absolute', top: '15px', right: '20px', border: 'none', 
                               background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: darkMode ? '#fff' : '#666' }}>
                ✕
              </button>
              <h2 style={{ color: mainColor }}>{selectedCourse.title}</h2>
              <p style={{ color: darkMode ? '#ccc' : '#444', margin: '20px 0' }}>{selectedCourse.detail}</p>
              <div style={{ backgroundColor: darkMode ? '#1a1a1a' : '#f0f2f5', padding: '15px', borderRadius: '10px' }}>
                <p><strong>Instructor:</strong> {selectedCourse.teacher}</p>
                <p><strong>Price:</strong> {selectedCourse.price}</p>
              </div>
              
              {/* Download PDF Button in Modal */}
              <a href={selectedCourse.fileLink} download target="_blank" style={{ textDecoration: 'none' }}>
                <button style={{ width: '100%', marginTop: '15px', padding: '12px', backgroundColor: '#4caf50', 
                                 color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                  📥 Download PDF
                </button>
              </a>
              
              <button style={{ width: '100%', marginTop: '15px', padding: '12px', backgroundColor: mainColor, 
                              color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
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
                      style={{ position: 'absolute', top: '15px', right: '20px', border: 'none', 
                               background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: darkMode ? '#fff' : '#666' }}>
                ✕
              </button>
              <h2 style={{ color: mainColor }}>Register for {selectedEvent.title}</h2>
              <p style={{ color: darkMode ? '#ccc' : '#444', marginBottom: '20px' }}>
                📅 {selectedEvent.date} | ⏰ {selectedEvent.time}
              </p>
              <form action="https://formspree.io/f/xnjwyyvn" method="POST">
                <input type="hidden" name="event" value={selectedEvent.title} />
                <input type="hidden" name="event_date" value={selectedEvent.date} />
                <input type="text" name="name" placeholder="Your Full Name" className="form-input" style={{ borderRadius: '10px', marginBottom: '12px' }} required />
                <input type="email" name="email" placeholder="Your Email Address" className="form-input" style={{ borderRadius: '10px', marginBottom: '12px' }} required />
                <input type="tel" name="phone" placeholder="Your Phone Number (optional)" className="form-input" style={{ borderRadius: '10px', marginBottom: '12px' }} />
                <button type="submit" style={{ width: '100%', marginTop: '10px', padding: '12px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Confirm Registration
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Upcoming Events Section */}
        <div id="events" style={{ marginBottom: '100px', width: '100%', maxWidth: '1200px', paddingTop: '70px' }}>
          <h2 style={{ color: mainColor, marginBottom: '45px', fontSize: '2.2rem' }}>📅 Upcoming Events</h2>
          <div className="events-container" style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {events.map(event => (
              <div key={event.id} className="event-card">
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📌</div>
                <h3 style={{ color: mainColor, marginBottom: '10px' }}>{event.title}</h3>
                <p style={{ fontSize: '0.9rem', color: darkMode ? '#ccc' : '#666', marginBottom: '8px' }}>
                  📅 {event.date} | ⏰ {event.time}
                </p>
                <p style={{ fontSize: '0.85rem', color: darkMode ? '#aaa' : '#777' }}>{event.description}</p>
                <button className="event-register-btn" style={{ marginTop: '15px', padding: '8px 20px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '0.8rem' }} onClick={() => setSelectedEvent(event)}>
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Student Testimonials */}
        <div style={{ width: '100vw', padding: '60px 20px', marginBottom: '80px', backgroundColor: darkMode ? '#2d2d2d' : '#fff', borderTop: `1px solid ${darkMode ? '#444' : '#eee'}` }}>
           <h2 style={{ color: mainColor, marginBottom: '50px', fontSize: '2.2rem' }}>What Our Students Say</h2>
           <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <div className="testimonial-card">
                 <p style={{ fontSize: '1.1rem', color: darkMode ? '#ccc' : '#444' }}>"Waloo Academy made learning easy for me. It's truly a center of knowledge!"</p>
                 <h5 style={{ marginTop: '20px', color: mainColor, fontSize: '1.1rem' }}>— Ayantu G.</h5>
              </div>
              <div className="testimonial-card">
                 <p style={{ fontSize: '1.1rem', color: darkMode ? '#ccc' : '#444' }}>"Programming was hard for me, but now I write code with confidence."</p>
                 <h5 style={{ marginTop: '20px', color: mainColor, fontSize: '1.1rem' }}>— Abdi K.</h5>
              </div>
              <div className="testimonial-card">
                 <p style={{ fontSize: '1.1rem', color: darkMode ? '#ccc' : '#444' }}>"The Economics course helped me understand Ethiopian market perfectly!"</p>
                 <h5 style={{ marginTop: '20px', color: mainColor, fontSize: '1.1rem' }}>— Bethlehem M.</h5>
              </div>
           </div>
        </div>

        {/* Newsletter & Contact Section */}
        <div id="contact" className="side-by-side-container" style={{ display: 'flex', gap: '20px', justifyContent: 'center', width: '100%', maxWidth: '1000px', marginBottom: '80px', padding: '0 10px' }}>
          <div className="side-box" style={{ flex: 1, backgroundColor: '#1e293b', color: 'white', padding: '25px', borderRadius: '20px', minWidth: '320px' }}>
            <h3 style={{ color: mainColor, marginBottom: '10px' }}>Get Latest Updates!</h3>
            <p style={{ fontSize: '0.8rem', opacity: '0.8', marginBottom: '20px' }}>Subscribe for new courses and offers.</p>
            <form action="https://formspree.io/f/mojrzzqb" method="POST">
              <input type="email" name="email" placeholder="Your email..." style={{ width: '100%', padding: '12px', borderRadius: '25px', border: 'none', marginBottom: '15px', outline: 'none' }} required />
              <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' }}>Subscribe</button>
            </form>
          </div>
          <div className="side-box" style={{ flex: 1, backgroundColor: darkMode ? '#2d2d2d' : mainColorLight, padding: '25px', borderRadius: '20px', minWidth: '320px' }}>
            <h3 style={{ color: mainColor, marginBottom: '10px' }}>Contact Us</h3>
            <form action="https://formspree.io/f/mojrzzqb" method="POST">
              <input type="text" name="name" placeholder="Your Name" className="form-input" style={{ borderRadius: '20px' }} required />
              <input type="email" name="_replyto" placeholder="Your Email" className="form-input" style={{ borderRadius: '20px', marginBottom: '12px' }} required />
              <textarea name="message" placeholder="Your Message..." className="form-input" style={{ minHeight: '60px', borderRadius: '15px' }} required></textarea>
              <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' }}>Send Message</button>
            </form>
          </div>
        </div>
      </main>

      {/* Back to Top Button */}
      {showTopBtn && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: mainColor, color: 'white', border: 'none', borderRadius: '50%', width: '50px', height: '50px', fontSize: '24px', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', zIndex: 1000 }}>↑</button>
      )}

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '10px' }}>Waloo Academy</h3>
        <p>© 2025 Waloo Academy. Where Knowledge Meets Innovation!</p>
        <div style={{ marginTop: '25px', marginBottom: '25px', display: 'flex', gap: '30px', justifyContent: 'center' }}>
          <a href="https://t.me/walooacademy" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: '#0088cc', textDecoration: 'none', fontSize: '1.8rem' }}>📱 Telegram</a>
          <a href="https://youtube.com/@walooacademy" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: '#ff0000', textDecoration: 'none', fontSize: '1.8rem' }}>📺 YouTube</a>
          <a href="https://facebook.com/walooacademy" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: '#1877f2', textDecoration: 'none', fontSize: '1.8rem' }}>👍 Facebook</a>
        </div>
        <div style={{ marginTop: '20px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#" style={{ color: mainColor, textDecoration: 'none' }}>Home</a>
          <a href="#courses" style={{ color: mainColor, textDecoration: 'none' }}>Courses</a>
          <a href="#events" style={{ color: mainColor, textDecoration: 'none' }}>Events</a>
          <a href="#about" style={{ color: mainColor, textDecoration: 'none' }}>About</a>
          <a href="#contact" style={{ color: mainColor, textDecoration: 'none' }}>Contact</a>
        </div>
        <p style={{ marginTop: '20px', fontSize: '0.8rem', opacity: '0.7' }}>Follow us on social media for updates and new courses!</p>
      </footer>
    </div>
  );
}
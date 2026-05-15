"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

export default function DashboardPage() {
  const { isSignedIn, userId, user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [courseProgress, setCourseProgress] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [learningStreak, setLearningStreak] = useState(0);
  const [totalHours, setTotalHours] = useState(0);

  // Load user data from localStorage
  useEffect(() => {
    if (isSignedIn && userId) {
      // Load enrolled courses
      const savedEnrollments = localStorage.getItem(`enrollments_${userId}`);
      if (savedEnrollments) {
        setEnrolledCourses(JSON.parse(savedEnrollments));
      }
      
      // Load completed courses
      const savedCompleted = localStorage.getItem(`completed_${userId}`);
      if (savedCompleted) {
        setCompletedCourses(JSON.parse(savedCompleted));
      }
      
      // Load course progress
      const savedProgress = localStorage.getItem(`progress_${userId}`);
      if (savedProgress) {
        setCourseProgress(JSON.parse(savedProgress));
      }
      
      // Load recent activity
      const savedActivity = localStorage.getItem(`activity_${userId}`);
      if (savedActivity) {
        setRecentActivity(JSON.parse(savedActivity));
      }
      
      // Load earned badges
      const savedBadges = localStorage.getItem(`badges_${userId}`);
      if (savedBadges) {
        setEarnedBadges(JSON.parse(savedBadges));
      }
      
      // Load learning streak
      const savedStreak = localStorage.getItem(`streak_${userId}`);
      if (savedStreak) {
        setLearningStreak(parseInt(savedStreak));
      }
      
      // Load total hours
      const savedHours = localStorage.getItem(`hours_${userId}`);
      if (savedHours) {
        setTotalHours(parseInt(savedHours));
      }
    }
  }, [isSignedIn, userId]);

  // Update course progress
  const updateProgress = (courseId, progress) => {
    const updated = { ...courseProgress, [courseId]: progress };
    setCourseProgress(updated);
    localStorage.setItem(`progress_${userId}`, JSON.stringify(updated));
    
    // Add to recent activity
    const course = enrolledCourses.find(c => c.id === courseId);
    const newActivity = {
      id: Date.now(),
      type: 'progress',
      courseTitle: course?.title || 'Course',
      message: `You reached ${progress}% completion`,
      date: new Date().toISOString(),
      icon: '📈'
    };
    const updatedActivity = [newActivity, ...recentActivity].slice(0, 20);
    setRecentActivity(updatedActivity);
    localStorage.setItem(`activity_${userId}`, JSON.stringify(updatedActivity));
    
    // Update streak (add activity for today)
    updateStreak();
  };
  
  // Mark course as completed
  const completeCourse = (courseId) => {
    const course = enrolledCourses.find(c => c.id === courseId);
    if (course && !completedCourses.find(c => c.id === courseId)) {
      const updatedCompleted = [...completedCourses, course];
      setCompletedCourses(updatedCompleted);
      localStorage.setItem(`completed_${userId}`, JSON.stringify(updatedCompleted));
      
      // Update progress to 100%
      updateProgress(courseId, 100);
      
      // Add to recent activity
      const newActivity = {
        id: Date.now(),
        type: 'completion',
        courseTitle: course.title,
        message: `Congratulations! You completed ${course.title}`,
        date: new Date().toISOString(),
        icon: '🏆'
      };
      const updatedActivity = [newActivity, ...recentActivity].slice(0, 20);
      setRecentActivity(updatedActivity);
      localStorage.setItem(`activity_${userId}`, JSON.stringify(updatedActivity));
      
      // Check for new badges
      checkBadges(updatedCompleted.length);
    }
  };
  
  // Update learning streak
  const updateStreak = () => {
    const today = new Date().toDateString();
    const lastActivity = localStorage.getItem(`last_activity_${userId}`);
    
    if (lastActivity === today) return;
    
    let newStreak = learningStreak;
    if (lastActivity) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastActivity === yesterday.toDateString()) {
        newStreak++;
      } else if (lastActivity !== today) {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }
    
    setLearningStreak(newStreak);
    localStorage.setItem(`streak_${userId}`, newStreak.toString());
    localStorage.setItem(`last_activity_${userId}`, today);
  };
  
  // Check and award badges
  const checkBadges = (totalCompleted) => {
    const allBadges = [
      { id: 1, name: "First Step", icon: "🚀", requirement: "Complete 1 course", condition: totalCompleted >= 1 },
      { id: 2, name: "Rising Star", icon: "⭐", requirement: "Complete 3 courses", condition: totalCompleted >= 3 },
      { id: 3, name: "Scholar", icon: "🎓", requirement: "Complete 5 courses", condition: totalCompleted >= 5 },
      { id: 4, name: "Master", icon: "👑", requirement: "Complete 10 courses", condition: totalCompleted >= 10 },
      { id: 5, name: "Consistency King", icon: "🔥", requirement: "7-day learning streak", condition: learningStreak >= 7 },
      { id: 6, name: "Dedicated Learner", icon: "💪", requirement: "30-day learning streak", condition: learningStreak >= 30 },
    ];
    
    const newBadges = allBadges.filter(badge => badge.condition && !earnedBadges.find(b => b.id === badge.id));
    if (newBadges.length > 0) {
      const updatedBadges = [...earnedBadges, ...newBadges];
      setEarnedBadges(updatedBadges);
      localStorage.setItem(`badges_${userId}`, JSON.stringify(updatedBadges));
      
      // Add activity for new badges
      newBadges.forEach(badge => {
        const newActivity = {
          id: Date.now() + Math.random(),
          type: 'badge',
          badgeName: badge.name,
          message: `You earned the ${badge.name} badge! 🎉`,
          date: new Date().toISOString(),
          icon: badge.icon
        };
        const updatedActivity = [newActivity, ...recentActivity].slice(0, 20);
        setRecentActivity(updatedActivity);
        localStorage.setItem(`activity_${userId}`, JSON.stringify(updatedActivity));
      });
    }
  };

  // Add learning time
  const addLearningTime = (minutes) => {
    const updatedHours = totalHours + (minutes / 60);
    setTotalHours(updatedHours);
    localStorage.setItem(`hours_${userId}`, updatedHours.toString());
  };

  const mainColor = "#1a73e8";
  const mainColorDark = "#1557b0";
  const mainColorLight = "#e3f2fd";

  // If not signed in, show sign in prompt
  if (!isSignedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: darkMode ? '#0a0a0a' : '#f5f7fa',
        fontFamily: 'sans-serif'
      }}>
        <div style={{
          textAlign: 'center',
          backgroundColor: darkMode ? '#1a1a2e' : 'white',
          padding: '50px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          maxWidth: '400px'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔐</div>
          <h2 style={{ color: mainColor, marginBottom: '20px' }}>Please Sign In</h2>
          <p style={{ marginBottom: '30px', color: darkMode ? '#aaa' : '#666' }}>You need to be signed in to view your dashboard and track your progress.</p>
          <Link href="/">
            <button style={{
              backgroundColor: mainColor,
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}>
              ← Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const completionRate = enrolledCourses.length > 0 
    ? Math.round((completedCourses.length / enrolledCourses.length) * 100) 
    : 0;

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
        
        .stat-card {
          background: ${darkMode ? '#1a1a2e' : 'white'};
          border-radius: 20px;
          padding: 24px;
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid ${darkMode ? '#2a2a3e' : '#eef2f6'};
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.1);
          border-color: ${mainColor};
        }
        
        .badge-card {
          background: ${darkMode ? '#1a1a2e' : 'white'};
          border-radius: 16px;
          padding: 16px;
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid ${darkMode ? '#2a2a3e' : '#eef2f6'};
        }
        
        .progress-bar {
          background: ${darkMode ? '#2a2a2a' : '#e0e0e0'};
          border-radius: 10px;
          height: 8px;
          overflow: hidden;
        }
        
        .progress-fill {
          background: ${mainColor};
          height: 100%;
          border-radius: 10px;
          transition: width 0.3s ease;
        }
        
        .logo { transition: transform 0.2s ease; }
        .logo:hover { transform: scale(1.05); }
        
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .badges-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* Nav Bar */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '12px 40px', backgroundColor: mainColor, color: 'white', 
        position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
          <img src="/logo.png" alt="Logo" className="logo" style={{ width: '36px', height: '36px', borderRadius: '10px' }} />
          <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>Waloo Academy</h2>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setDarkMode(!darkMode)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '30px', cursor: 'pointer' }}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>← Back to Home</Link>
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Welcome Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: mainColor, marginBottom: '8px' }}>
            Welcome back, {user?.firstName || 'Learner'}! 👋
          </h1>
          <p style={{ color: darkMode ? '#aaa' : '#666' }}>
            Track your learning progress, continue where you left off, and celebrate your achievements.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', marginBottom: '40px' }}>
          <div className="stat-card">
            <div style={{ fontSize: '2.5rem' }}>📚</div>
            <h3 style={{ fontSize: '1.8rem', color: mainColor, margin: '8px 0' }}>{enrolledCourses.length}</h3>
            <p style={{ fontSize: '0.8rem', margin: 0 }}>Enrolled Courses</p>
          </div>
          <div className="stat-card">
            <div style={{ fontSize: '2.5rem' }}>✅</div>
            <h3 style={{ fontSize: '1.8rem', color: mainColor, margin: '8px 0' }}>{completedCourses.length}</h3>
            <p style={{ fontSize: '0.8rem', margin: 0 }}>Completed</p>
          </div>
          <div className="stat-card">
            <div style={{ fontSize: '2.5rem' }}>📊</div>
            <h3 style={{ fontSize: '1.8rem', color: mainColor, margin: '8px 0' }}>{completionRate}%</h3>
            <p style={{ fontSize: '0.8rem', margin: 0 }}>Completion Rate</p>
          </div>
          <div className="stat-card">
            <div style={{ fontSize: '2.5rem' }}>🔥</div>
            <h3 style={{ fontSize: '1.8rem', color: mainColor, margin: '8px 0' }}>{learningStreak}</h3>
            <p style={{ fontSize: '0.8rem', margin: 0 }}>Day Streak</p>
          </div>
          <div className="stat-card">
            <div style={{ fontSize: '2.5rem' }}>⏱️</div>
            <h3 style={{ fontSize: '1.8rem', color: mainColor, margin: '8px 0' }}>{Math.floor(totalHours)}</h3>
            <p style={{ fontSize: '0.8rem', margin: 0 }}>Hours Learned</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          
          {/* Left Column - My Courses */}
          <div style={{ flex: 2, minWidth: '280px' }}>
            <div style={{ 
              background: darkMode ? '#1a1a2e' : 'white', 
              borderRadius: '20px', 
              padding: '24px',
              marginBottom: '30px',
              border: `1px solid ${darkMode ? '#2a2a3e' : '#eef2f6'}`
            }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', color: mainColor }}>📖 My Courses</h2>
              
              {enrolledCourses.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📭</div>
                  <p style={{ marginBottom: '16px' }}>You haven't enrolled in any courses yet.</p>
                  <Link href="/#courses">
                    <button style={{ backgroundColor: mainColor, color: 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', cursor: 'pointer' }}>
                      Browse Courses →
                    </button>
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {enrolledCourses.map(course => {
                    const progress = courseProgress[course.id] || 0;
                    const isCompleted = completedCourses.find(c => c.id === course.id);
                    return (
                      <div key={course.id} style={{ 
                        borderBottom: `1px solid ${darkMode ? '#2a2a3e' : '#eee'}`, 
                        paddingBottom: '16px',
                        opacity: isCompleted ? 0.7 : 1
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                          <div>
                            <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>{course.title}</h3>
                            <p style={{ fontSize: '0.7rem', color: darkMode ? '#888' : '#999' }}>{course.teacher}</p>
                          </div>
                          {isCompleted ? (
                            <span style={{ backgroundColor: '#2ecc71', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem' }}>✅ Completed</span>
                          ) : (
                            <button
                              onClick={() => completeCourse(course.id)}
                              style={{ backgroundColor: mainColor, color: 'white', border: 'none', padding: '4px 12px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.7rem' }}
                            >
                              Mark Complete
                            </button>
                          )}
                        </div>
                        
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                          <span style={{ fontSize: '0.7rem', color: darkMode ? '#888' : '#999' }}>{progress}% Complete</span>
                          <button
                            onClick={() => updateProgress(course.id, Math.min(progress + 10, 100))}
                            style={{ background: 'none', border: 'none', color: mainColor, cursor: 'pointer', fontSize: '0.7rem' }}
                          >
                            +10%
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Recent Activity & Badges */}
          <div style={{ flex: 1.5, minWidth: '280px' }}>
            
            {/* Recent Activity */}
            <div style={{ 
              background: darkMode ? '#1a1a2e' : 'white', 
              borderRadius: '20px', 
              padding: '24px',
              marginBottom: '30px',
              border: `1px solid ${darkMode ? '#2a2a3e' : '#eef2f6'}`
            }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', color: mainColor }}>📋 Recent Activity</h2>
              
              {recentActivity.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '20px', color: darkMode ? '#888' : '#999' }}>No activity yet. Start learning!</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {recentActivity.slice(0, 10).map(activity => (
                    <div key={activity.id} style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                      <div style={{ fontSize: '1.5rem' }}>{activity.icon}</div>
                      <div>
                        <p style={{ fontSize: '0.85rem', margin: 0 }}>{activity.message}</p>
                        <p style={{ fontSize: '0.65rem', color: darkMode ? '#888' : '#999', marginTop: '4px' }}>
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Badges Earned */}
            <div style={{ 
              background: darkMode ? '#1a1a2e' : 'white', 
              borderRadius: '20px', 
              padding: '24px',
              border: `1px solid ${darkMode ? '#2a2a3e' : '#eef2f6'}`
            }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', color: mainColor }}>🏅 Badges Earned</h2>
              
              {earnedBadges.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '20px', color: darkMode ? '#888' : '#999' }}>No badges yet. Complete courses to earn badges!</p>
              ) : (
                <div className="badges-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {earnedBadges.map(badge => (
                    <div key={badge.id} className="badge-card">
                      <div style={{ fontSize: '2rem' }}>{badge.icon}</div>
                      <h4 style={{ fontSize: '0.85rem', margin: '8px 0 4px 0' }}>{badge.name}</h4>
                      <p style={{ fontSize: '0.6rem', margin: 0, color: darkMode ? '#888' : '#999' }}>{badge.requirement}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Next badges to earn */}
              {earnedBadges.length < 6 && (
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: `1px solid ${darkMode ? '#2a2a3e' : '#eee'}` }}>
                  <p style={{ fontSize: '0.7rem', color: darkMode ? '#888' : '#999', marginBottom: '12px' }}>🎯 Next Achievement:</p>
                  <div style={{ fontSize: '0.8rem', padding: '8px', background: darkMode ? '#0a0a0a' : '#f5f7fa', borderRadius: '8px' }}>
                    {earnedBadges.length === 0 && "Complete 1 course to earn 'First Step' badge"}
                    {earnedBadges.length === 1 && "Complete 2 more courses to earn 'Rising Star' badge"}
                    {earnedBadges.length === 2 && "Complete 2 more courses to earn 'Scholar' badge"}
                    {earnedBadges.length === 3 && "Complete 2 more courses to earn 'Master' badge"}
                    {earnedBadges.length === 4 && "Maintain a 7-day learning streak"}
                    {earnedBadges.length === 5 && "Maintain a 30-day learning streak"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ 
          marginTop: '40px',
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link href="/#courses">
            <button style={{ 
              backgroundColor: mainColor, 
              color: 'white', 
              border: 'none', 
              padding: '12px 24px', 
              borderRadius: '30px', 
              cursor: 'pointer',
              fontWeight: 600
            }}>
              📖 Continue Learning
            </button>
          </Link>
          <Link href="/resources">
            <button style={{ 
              backgroundColor: 'transparent', 
              color: mainColor, 
              border: `1px solid ${mainColor}`, 
              padding: '12px 24px', 
              borderRadius: '30px', 
              cursor: 'pointer',
              fontWeight: 600
            }}>
              📚 Browse Resources
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
          <Link href="/dashboard" style={{ color: mainColor, textDecoration: 'none', fontSize: '0.75rem' }}>Dashboard</Link>
        </div>
      </footer>
    </div>
  );
}
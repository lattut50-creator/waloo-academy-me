"use client";
import { useAuth, SignInButton } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const { isSignedIn, userId } = useAuth();
  const [userEnrollments, setUserEnrollments] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Main color
  const mainColor = "#1a73e8";

  // Load user data from localStorage (temporary storage)
  useEffect(() => {
    if (isSignedIn && userId) {
      // Load enrolled courses
      const savedEnrollments = localStorage.getItem(`enrollments_${userId}`);
      if (savedEnrollments) {
        setUserEnrollments(JSON.parse(savedEnrollments));
      }
      
      // Load registered events
      const savedEvents = localStorage.getItem(`events_${userId}`);
      if (savedEvents) {
        setUserEvents(JSON.parse(savedEvents));
      }
      
      setLoading(false);
    }
  }, [isSignedIn, userId]);

  // Remove enrollment
  const removeEnrollment = (courseId) => {
    const updated = userEnrollments.filter(c => c.id !== courseId);
    setUserEnrollments(updated);
    localStorage.setItem(`enrollments_${userId}`, JSON.stringify(updated));
  };

  // Remove event registration
  const removeEvent = (eventId) => {
    const updated = userEvents.filter(e => e.id !== eventId);
    setUserEvents(updated);
    localStorage.setItem(`events_${userId}`, JSON.stringify(updated));
  };

  // If not signed in, show sign in prompt
  if (!isSignedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
        fontFamily: 'sans-serif'
      }}>
        <div style={{
          textAlign: 'center',
          backgroundColor: 'white',
          padding: '50px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: mainColor, marginBottom: '20px' }}>Please Sign In</h2>
          <p style={{ marginBottom: '30px', color: '#666' }}>You need to be signed in to view your dashboard.</p>
          <SignInButton mode="modal">
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
              Sign In to Continue
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'sans-serif'
    }}>
      
      {/* Navigation Bar */}
      <nav style={{
        backgroundColor: mainColor,
        color: 'white',
        padding: '15px 50px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ margin: 0, cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
          Waloo Academy
        </h2>
        <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </nav>

      {/* Dashboard Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Welcome Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          <h1 style={{ color: mainColor, marginBottom: '10px' }}>My Dashboard</h1>
          <p style={{ color: '#666' }}>Welcome to your learning dashboard! Track your enrolled courses and registered events here.</p>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          
          {/* Enrolled Courses Column */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              height: '100%'
            }}>
              <h2 style={{ color: mainColor, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                📚 My Enrolled Courses
                <span style={{
                  backgroundColor: mainColor,
                  color: 'white',
                  borderRadius: '20px',
                  padding: '2px 10px',
                  fontSize: '0.8rem'
                }}>
                  {userEnrollments.length}
                </span>
              </h2>
              
              {loading ? (
                <p style={{ color: '#999', textAlign: 'center', padding: '40px' }}>Loading...</p>
              ) : userEnrollments.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <p style={{ color: '#999', marginBottom: '20px' }}>You haven't enrolled in any courses yet.</p>
                  <Link href="/#courses">
                    <button style={{
                      backgroundColor: mainColor,
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '25px',
                      cursor: 'pointer'
                    }}>
                      Browse Courses
                    </button>
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {userEnrollments.map((course) => (
                    <div key={course.id} style={{
                      border: '1px solid #eee',
                      borderRadius: '10px',
                      padding: '15px',
                      transition: 'transform 0.2s'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                          <h3 style={{ margin: '0 0 5px 0', color: mainColor }}>{course.title}</h3>
                          <p style={{ margin: '0', fontSize: '0.9rem', color: '#666' }}>{course.desc}</p>
                          <p style={{ margin: '10px 0 0 0', fontSize: '0.8rem', color: '#999' }}>
                            Instructor: {course.teacher}
                          </p>
                        </div>
                        <button
                          onClick={() => removeEnrollment(course.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ff4444',
                            cursor: 'pointer',
                            fontSize: '1.2rem'
                          }}
                          title="Remove from my courses"
                        >
                          ✕
                        </button>
                      </div>
                      <div style={{ marginTop: '10px' }}>
                        <div style={{
                          backgroundColor: '#e3f2fd',
                          borderRadius: '5px',
                          height: '8px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            backgroundColor: mainColor,
                            width: '30%',
                            height: '100%',
                            borderRadius: '5px'
                          }}></div>
                        </div>
                        <p style={{ fontSize: '0.7rem', color: '#999', marginTop: '5px' }}>30% Complete</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Registered Events Column */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              height: '100%'
            }}>
              <h2 style={{ color: mainColor, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                🎟️ My Registered Events
                <span style={{
                  backgroundColor: mainColor,
                  color: 'white',
                  borderRadius: '20px',
                  padding: '2px 10px',
                  fontSize: '0.8rem'
                }}>
                  {userEvents.length}
                </span>
              </h2>
              
              {loading ? (
                <p style={{ color: '#999', textAlign: 'center', padding: '40px' }}>Loading...</p>
              ) : userEvents.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <p style={{ color: '#999', marginBottom: '20px' }}>You haven't registered for any events yet.</p>
                  <Link href="/#events">
                    <button style={{
                      backgroundColor: mainColor,
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '25px',
                      cursor: 'pointer'
                    }}>
                      View Events
                    </button>
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {userEvents.map((event) => (
                    <div key={event.id} style={{
                      border: '1px solid #eee',
                      borderRadius: '10px',
                      padding: '15px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                          <h3 style={{ margin: '0 0 5px 0', color: mainColor }}>{event.title}</h3>
                          <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#666' }}>
                            📅 {event.date} | ⏰ {event.time}
                          </p>
                          <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#777' }}>
                            {event.description}
                          </p>
                        </div>
                        <button
                          onClick={() => removeEvent(event.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ff4444',
                            cursor: 'pointer',
                            fontSize: '1.2rem'
                          }}
                          title="Cancel registration"
                        >
                          ✕
                        </button>
                      </div>
                      <div style={{ marginTop: '15px' }}>
                        <span style={{
                          backgroundColor: '#e8f5e9',
                          color: '#4caf50',
                          padding: '4px 12px',
                          borderRadius: '15px',
                          fontSize: '0.75rem'
                        }}>
                          ✓ Registered
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div style={{
          marginTop: '30px',
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'center',
            flex: '1',
            minWidth: '150px'
          }}>
            <div style={{ fontSize: '2rem' }}>📚</div>
            <h3 style={{ margin: '10px 0', color: mainColor }}>{userEnrollments.length}</h3>
            <p style={{ color: '#666', margin: 0 }}>Active Courses</p>
          </div>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'center',
            flex: '1',
            minWidth: '150px'
          }}>
            <div style={{ fontSize: '2rem' }}>🎟️</div>
            <h3 style={{ margin: '10px 0', color: mainColor }}>{userEvents.length}</h3>
            <p style={{ color: '#666', margin: 0 }}>Upcoming Events</p>
          </div>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'center',
            flex: '1',
            minWidth: '150px'
          }}>
            <div style={{ fontSize: '2rem' }}>⭐</div>
            <h3 style={{ margin: '10px 0', color: mainColor }}>In Progress</h3>
            <p style={{ color: '#666', margin: 0 }}>Learning Journey</p>
          </div>
        </div>
      </main>
    </div>
  );
}
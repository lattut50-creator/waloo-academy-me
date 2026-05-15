 "use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { blogPosts, blogCategories } from '../blogData';

export default function BlogPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});

  // Load likes from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem('blog_likes');
    if (savedLikes) {
      setLikedPosts(JSON.parse(savedLikes));
    }
  }, []);

  // Save likes to localStorage
  const handleLike = (postId) => {
    const updated = { ...likedPosts, [postId]: (likedPosts[postId] || 0) + 1 };
    setLikedPosts(updated);
    localStorage.setItem('blog_likes', JSON.stringify(updated));
  };

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const mainColor = "#1a73e8";
  const mainColorLight = "#e3f2fd";

  return (
    <div style={{ 
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif', 
      backgroundColor: darkMode ? '#0a0a0a' : '#f5f7fa', 
      minHeight: '100vh',
      color: darkMode ? '#e0e0e0' : '#333',
      transition: 'all 0.3s ease'
    }}>
      
      {/* Global Styles for Blog - Moved to the top level */}
      <style jsx global>{`
        .blog-content h3 { color: ${mainColor}; margin-top: 24px; margin-bottom: 12px; }
        .blog-content p { margin-bottom: 16px; line-height: 1.6; }
        .blog-content ul, .blog-content ol { margin-bottom: 16px; padding-left: 24px; }
        .modal-overlay { animation: fadeIn 0.2s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        .blog-card {
          transition: all 0.3s ease;
          background-color: ${darkMode ? '#1a1a2e' : 'white'};
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          border: 1px solid ${darkMode ? '#2a2a3e' : '#eef2f6'};
        }
        .blog-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.1);
          border-color: ${mainColor};
        }
        
        .category-btn {
          background: transparent;
          border: 1px solid ${mainColor};
          color: ${mainColor};
          padding: 6px 16px;
          border-radius: 30px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.2s;
        }
        .category-btn:hover, .category-btn.active {
          background: ${mainColor};
          color: white;
        }
        
        .logo { transition: transform 0.2s ease; }
        .logo:hover { transform: scale(1.05); }
        
        .like-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.1rem;
          transition: transform 0.2s;
        }
        .like-btn:hover { transform: scale(1.1); }
        
        @media (max-width: 768px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

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
        
        <button onClick={() => setDarkMode(!darkMode)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '30px', cursor: 'pointer' }}>
          {darkMode ? '☀️' : '🌙'}
        </button>
        
        <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>← Back to Home</Link>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Blog Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: mainColor, fontSize: '2.5rem', marginBottom: '16px' }}>📝 Waloo Academy Blog</h1>
          <p style={{ color: darkMode ? '#aaa' : '#666', fontSize: '1rem' }}>
            Insights, tutorials, and career advice from our expert instructors
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="🔍 Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '12px 20px',
              borderRadius: '40px',
              border: `1px solid ${darkMode ? '#444' : '#ddd'}`,
              background: darkMode ? '#2a2a2a' : 'white',
              color: darkMode ? '#fff' : '#333',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
          {blogCategories.map(cat => (
            <button
              key={cat}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
          {filteredPosts.map(post => (
            <div key={post.id} className="blog-card">
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ background: mainColorLight, color: mainColor, padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 500 }}>
                    {post.category}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: darkMode ? '#888' : '#999' }}>{post.readTime}</span>
                </div>
                
                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: darkMode ? '#fff' : '#333', cursor: 'pointer' }} onClick={() => setSelectedPost(post)}>
                  {post.title}
                </h3>
                
                <p style={{ fontSize: '0.85rem', color: darkMode ? '#aaa' : '#666', marginBottom: '16px', lineHeight: 1.5 }}>
                  {post.excerpt}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, margin: 0 }}>{post.author}</p>
                    <p style={{ fontSize: '0.7rem', color: darkMode ? '#888' : '#999', margin: 0 }}>{post.role}</p>
                  </div>
                  <p style={{ fontSize: '0.7rem', color: darkMode ? '#888' : '#999' }}>{post.date}</p>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${darkMode ? '#2a2a3e' : '#eee'}`, paddingTop: '16px' }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <button className="like-btn" onClick={() => handleLike(post.id)} style={{ color: '#e74c3c' }}>
                      ❤️ {(likedPosts[post.id] || 0) + post.likes}
                    </button>
                    <span style={{ fontSize: '0.8rem', color: darkMode ? '#888' : '#999' }}>💬 {post.comments}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedPost(post)}
                    style={{ background: 'none', border: 'none', color: mainColor, cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <p style={{ textAlign: 'center', color: darkMode ? '#888' : '#999', padding: '60px' }}>
            No articles found. Try a different search or category.
          </p>
        )}

        {/* Blog Post Modal */}
        {selectedPost && (
          <div className="modal-overlay" onClick={() => setSelectedPost(null)} style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)',
            display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
          }}>
            <div style={{
              background: darkMode ? '#1a1a2e' : 'white',
              borderRadius: '24px',
              maxWidth: '800px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px',
              position: 'relative'
            }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedPost(null)} style={{
                position: 'absolute', top: '16px', right: '20px',
                background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer'
              }}>✕</button>
              
              <div style={{ marginBottom: '20px' }}>
                <span style={{ background: mainColorLight, color: mainColor, padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem' }}>
                  {selectedPost.category}
                </span>
                <span style={{ marginLeft: '12px', fontSize: '0.7rem', color: darkMode ? '#888' : '#999' }}>{selectedPost.readTime}</span>
              </div>
              
              <h1 style={{ fontSize: '1.8rem', marginBottom: '16px', color: mainColor }}>{selectedPost.title}</h1>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: `1px solid ${darkMode ? '#2a2a3e' : '#eee'}` }}>
                <div>
                  <p style={{ fontWeight: 600, margin: 0 }}>{selectedPost.author}</p>
                  <p style={{ fontSize: '0.75rem', color: darkMode ? '#888' : '#999', margin: 0 }}>{selectedPost.role}</p>
                </div>
                <p style={{ fontSize: '0.8rem', color: darkMode ? '#888' : '#999' }}>{selectedPost.date}</p>
              </div>
              
              <div 
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                style={{ fontSize: '0.95rem', lineHeight: 1.7, color: darkMode ? '#ddd' : '#444' }}
              />
              
              <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: `1px solid ${darkMode ? '#2a2a3e' : '#eee'}`, display: 'flex', gap: '20px' }}>
                <button className="like-btn" onClick={() => handleLike(selectedPost.id)} style={{ color: '#e74c3c', fontSize: '1rem' }}>
                  ❤️ {(likedPosts[selectedPost.id] || 0) + selectedPost.likes} Likes
                </button>
                <span style={{ fontSize: '0.9rem', color: darkMode ? '#888' : '#999' }}>💬 {selectedPost.comments} Comments</span>
              </div>
              
              <div style={{ marginTop: '20px', background: darkMode ? '#0a0a0a' : '#f5f7fa', padding: '16px', borderRadius: '12px' }}>
                <p style={{ margin: 0, fontSize: '0.8rem', color: darkMode ? '#aaa' : '#666' }}>
                  📚 Want to learn more? Enroll in our courses to dive deeper into these topics!
                </p>
                <Link href="/#courses">
                  <button style={{ marginTop: '10px', background: mainColor, color: 'white', border: 'none', padding: '8px 20px', borderRadius: '25px', cursor: 'pointer' }}>
                    Explore Courses →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: 'white', padding: '30px 20px', textAlign: 'center', marginTop: '40px' }}>
        <p style={{ fontSize: '0.7rem', opacity: 0.7 }}>© 2025 Waloo Academy. Where Knowledge Meets Innovation!</p>
        <div style={{ marginTop: '16px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link href="/" style={{ color: mainColor, textDecoration: 'none', fontSize: '0.75rem' }}>Home</Link>
          <Link href="/blog" style={{ color: mainColor, textDecoration: 'none', fontSize: '0.75rem' }}>Blog</Link>
          <a href="#contact" style={{ color: mainColor, textDecoration: 'none', fontSize: '0.75rem' }}>Contact</a>
        </div>
      </footer>
    </div>
  );
}
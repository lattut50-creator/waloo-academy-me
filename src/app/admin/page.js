"use client";
import { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("uncategorized");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(true);

  const categories = [
    "uncategorized", "Art", "Business", "Career & Growth", 
    "Technology", "Science", "Economics", "Programming"
  ];

  // Check authentication
  const authenticate = async () => {
    try {
      const res = await fetch(`/api/upload?password=${password}`);
      if (res.ok) {
        setIsAuthenticated(true);
        setShowPasswordPrompt(false);
        loadFiles();
      } else {
        setMessage("❌ Incorrect password");
      }
    } catch (error) {
      setMessage("❌ Authentication failed");
    }
  };

  // Load all uploaded files
  const loadFiles = async () => {
    const res = await fetch(`/api/upload?password=${password}`);
    const data = await res.json();
    if (data.files) {
      setFiles(data.files);
    }
  };

  // Upload file
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", password);
    formData.append("category", selectedCategory);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`✅ Uploaded: ${file.name} to ${selectedCategory}`);
        loadFiles();
      } else {
        setMessage(`❌ Upload failed: ${data.error}`);
      }
    } catch (error) {
      setMessage("❌ Upload failed");
    }
    setUploading(false);
    e.target.value = "";
  };

  // Delete file
  const deleteFile = async (fileUrl) => {
    if (confirm("Are you sure you want to delete this file?")) {
      const res = await fetch(`/api/upload?url=${encodeURIComponent(fileUrl)}&password=${password}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setMessage("✅ File deleted");
        loadFiles();
      } else {
        setMessage(`❌ Delete failed: ${data.error}`);
      }
    }
  };

  if (showPasswordPrompt) {
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
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <h2 style={{ color: '#1a73e8', marginBottom: '20px' }}>Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && authenticate()}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              marginBottom: '15px',
              fontSize: '1rem'
            }}
          />
          <button
            onClick={authenticate}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#1a73e8',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            Login
          </button>
          {message && <p style={{ marginTop: '15px', color: '#e74c3c' }}>{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'sans-serif',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#1a73e8' }}>📁 Admin Dashboard</h1>
          <button
            onClick={() => {
              setShowPasswordPrompt(true);
              setIsAuthenticated(false);
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>

        {message && (
          <div style={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            {message}
          </div>
        )}

        {/* Upload Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ marginBottom: '20px', color: '#1a73e8' }}>📤 Upload New Document</h2>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '0.9rem'
                }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div style={{ flex: 2 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Select File (PDF, DOC, etc.)</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                onChange={handleUpload}
                disabled={uploading}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '8px',
                  border: '1px solid #ddd'
                }}
              />
            </div>
          </div>
          {uploading && <p style={{ marginTop: '15px', color: '#1a73e8' }}>Uploading...</p>}
          <p style={{ marginTop: '15px', fontSize: '0.8rem', color: '#666' }}>
            Files are organized by: Category → Year-Month-Day → filename
          </p>
        </div>

        {/* Files List with Delete Option */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ marginBottom: '20px', color: '#1a73e8' }}>📄 Uploaded Files ({files.length})</h2>
          
          {files.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999', padding: '40px' }}>No files uploaded yet</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {files.map((file, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>📄</span>
                    <span style={{ marginLeft: '8px', fontWeight: 500 }}>{file.name}</span>
                    <span style={{ marginLeft: '10px', fontSize: '0.7rem', color: '#999' }}>{file.url}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#1a73e8',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontSize: '0.8rem'
                      }}
                    >
                      View
                    </a>
                    <button
                      onClick={() => deleteFile(file.url)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <p style={{ marginTop: '20px', fontSize: '0.75rem', color: '#999', textAlign: 'center' }}>
          Files are stored in: public/uploads/[category]/[year-month-day]/[filename]
        </p>
      </div>
    </div>
  );
}
import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const PlaceholderPage = ({ title, description }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        
        <div className="glass-panel animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', borderRadius: '16px', minHeight: '400px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '16px', background: 'linear-gradient(to right, var(--primary-color), var(--secondary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '500px', textAlign: 'center', lineHeight: '1.6' }}>
            {description || `The ${title} module is currently under development. Please check back later for updates.`}
          </p>
          
          <div style={{ marginTop: '40px', opacity: 0.5 }}>
            <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;

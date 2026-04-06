import React, { useState } from 'react';
import { Search, Bell, User } from 'lucide-react';
import { authService } from '../services/api';

const Navbar = ({ onSearch }) => {
  const user = authService.getCurrentUser();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="glass-panel" style={{ 
      padding: '16px 30px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      marginBottom: '30px',
      borderRadius: '16px',
      position: 'relative'
    }}>
      <div style={{ position: 'relative', width: '300px' }}>
        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
        <input 
          type="text" 
          placeholder="Search students..." 
          className="input-field" 
          style={{ paddingLeft: '40px', borderRadius: '20px', background: 'rgba(0,0,0,0.2)' }}
          onChange={(e) => onSearch && onSearch(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ position: 'relative' }}>
          <div 
            onClick={() => setShowNotifications(!showNotifications)} 
            style={{ cursor: 'pointer', padding: '8px' }}
          >
            <Bell size={20} color="var(--text-secondary)" />
            <div style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', background: 'var(--danger-color)', borderRadius: '50%' }}></div>
          </div>
          
          {showNotifications && (
            <div className="glass-panel animate-fade-in" style={{
              position: 'absolute',
              top: '100%',
              right: '0',
              marginTop: '10px',
              width: '300px',
              padding: '16px',
              borderRadius: '12px',
              zIndex: 50,
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
            }}>
              <h4 style={{ margin: '0 0 12px 0', borderBottom: '1px solid var(--glass-border)', paddingBottom: '8px' }}>Notifications</h4>
              <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
                No new notifications.
              </div>
            </div>
          )}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid var(--glass-border)', paddingLeft: '20px' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{user?.username || 'Admin'}</p>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>{user?.role || 'Administrator'}</p>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={20} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

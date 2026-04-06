import React from 'react';
import { LayoutDashboard, Users, UserPlus, FileBarChart, Settings, LogOut, BookOpen } from 'lucide-react';
import { authService } from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/dashboard') return true;
    return location.pathname === path || (path === '/' && location.pathname === '/');
  };

  return (
    <div className="glass-panel" style={{ 
      width: '260px', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      borderRight: '1px solid var(--glass-border)',
      borderTop: 'none',
      borderBottom: 'none',
      borderLeft: 'none',
      borderRadius: '0'
    }}>
      <div style={{ padding: '30px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ background: 'var(--primary-color)', padding: '8px', borderRadius: '8px', display: 'flex' }}>
          <BookOpen size={24} color="white" />
        </div>
        <h2 style={{ fontSize: '18px', margin: 0, background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          EduManage
        </h2>
      </div>

      <div style={{ flex: 1, padding: '0 16px' }}>
        <p className="input-label" style={{ paddingLeft: '8px', marginBottom: '12px' }}>MAIN MENU</p>
        <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={isActive('/') && !isActive('/students')} onClick={() => navigate('/')} />
        <SidebarItem icon={<Users size={20} />} label="Students" active={isActive('/students')} onClick={() => navigate('/students')} />
        <SidebarItem icon={<UserPlus size={20} />} label="Admissions" active={isActive('/admissions')} onClick={() => navigate('/admissions')} />
        <SidebarItem icon={<FileBarChart size={20} />} label="Reports" active={isActive('/reports')} onClick={() => navigate('/reports')} />
        
        <p className="input-label" style={{ paddingLeft: '8px', marginTop: '30px', marginBottom: '12px' }}>PREFERENCES</p>
        <SidebarItem icon={<Settings size={20} />} label="Settings" active={isActive('/settings')} onClick={() => navigate('/settings')} />
      </div>

      <div style={{ padding: '24px 16px', borderTop: '1px solid var(--glass-border)' }}>
        <button onClick={handleLogout} className="btn" style={{ width: '100%', background: 'transparent', color: 'var(--text-secondary)', justifyContent: 'flex-start' }}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => {
  return (
    <div onClick={onClick} style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px',
      borderRadius: '8px',
      cursor: 'pointer',
      marginBottom: '8px',
      transition: 'var(--transition)',
      background: active ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.15), transparent)' : 'transparent',
      color: active ? 'var(--primary-color)' : 'var(--text-secondary)',
      borderLeft: active ? '3px solid var(--primary-color)' : '3px solid transparent'
    }}>
      {icon}
      <span style={{ fontWeight: active ? '600' : '500', fontSize: '14px' }}>{label}</span>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PlaceholderPage from './pages/PlaceholderPage';
import { authService } from './services/api';

const PrivateRoute = ({ children }) => {
  const user = authService.getCurrentUser();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/students" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/admissions" element={<PrivateRoute><PlaceholderPage title="Admissions" description="Manage new student applications and admission processes here." /></PrivateRoute>} />
        <Route path="/reports" element={<PrivateRoute><PlaceholderPage title="Reports" description="Generate and view detailed analytical reports here." /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><PlaceholderPage title="Settings" description="Configure system preferences and user settings here." /></PrivateRoute>} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

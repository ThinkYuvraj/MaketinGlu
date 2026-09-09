import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

interface AdminAppProps {
  onBackToSite: () => void;
}

export default function AdminApp({ onBackToSite }: AdminAppProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('marketinglu_admin_session') === 'authenticated';
  });

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('marketinglu_admin_session');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <AdminLogin 
        onLoginSuccess={handleLoginSuccess} 
        onBackToSite={onBackToSite} 
      />
    );
  }

  return (
    <AdminDashboard 
      onBackToSite={onBackToSite} 
      onLogout={handleLogout} 
    />
  );
}

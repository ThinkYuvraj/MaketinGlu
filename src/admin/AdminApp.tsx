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

  useEffect(() => {
    const token = localStorage.getItem('marketinglu_admin_token');
    if (token) {
      // Validate session with backend server
      fetch('/api/admin/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (!data.valid) {
          localStorage.removeItem('marketinglu_admin_session');
          localStorage.removeItem('marketinglu_admin_token');
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        // If server is unreachable momentarily, maintain session
      });
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('marketinglu_admin_token');
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch {
        // Ignore logout network error
      }
    }
    localStorage.removeItem('marketinglu_admin_session');
    localStorage.removeItem('marketinglu_admin_token');
    localStorage.removeItem('marketinglu_admin_user');
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

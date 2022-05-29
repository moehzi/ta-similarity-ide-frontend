import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLocation, Navigate, useNavigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const { setToken } = useAuth();

  useEffect(() => {
    if (token) {
      setToken(token);
    }
  }, []);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

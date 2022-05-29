import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  const { token } = useAuth();
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

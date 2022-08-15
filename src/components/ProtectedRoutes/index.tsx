import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLocation, Navigate, Outlet, useNavigate } from 'react-router-dom';

const RequireAuth = () => {
  const location = useLocation();
  const { setToken, token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      setToken(token);
    }

    if (!token) {
      navigate('/login');
    }
  }, [navigate, setToken, token]);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Dashboard = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('token');

    if (!accessToken) {
      navigate('/login');
    }

    setToken(localStorage.getItem('token'));
  }, [token]);

  return <div>Dashbaord</div>;
};

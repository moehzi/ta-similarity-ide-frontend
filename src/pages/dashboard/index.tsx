import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext, UserProvider } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';

export const Dashboard = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const { user, isLoading } = useContext(UserContext);

  useEffect(() => {
    const accessToken = localStorage.getItem('token');

    if (!accessToken) {
      navigate('/login');
    }

    if (accessToken) {
      setToken(localStorage.getItem('token'));
    }
  }, [token]);

  return (
    <div>
      ddd
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div>
          {user.username} {user.role}
        </div>
      )}
    </div>
  );
};

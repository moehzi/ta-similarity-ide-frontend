import { Button } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';

export const Dashboard = () => {
  const { user, isLoading } = useContext(UserContext);
  const { setToken } = useAuth();
  const navigate = useNavigate();
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
      <Button
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          localStorage.clear();
          setToken('');
        }}
      >
        Logout
      </Button>
    </div>
  );
};

import { Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarWithHeader from '../../components/Sidebar';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';

export const Dashboard = () => {
  const { user, isLoading } = useContext(UserContext);
  const { setToken } = useAuth();
  const navigate = useNavigate();
  return (
    <SidebarWithHeader name={user.name} role={user.role}>
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
    </SidebarWithHeader>
  );
};

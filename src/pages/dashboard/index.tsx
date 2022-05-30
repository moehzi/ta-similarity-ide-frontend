import { Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarWithHeader from '../../components/Sidebar';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';
import { DashboardStudent } from './DashboardStudent';
import { DashboardTeacher } from './DashboardTeacher';

export const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user.role === 'teacher' && <DashboardTeacher />}
      {user.role === 'student' && <DashboardStudent />}
    </div>
  );
};

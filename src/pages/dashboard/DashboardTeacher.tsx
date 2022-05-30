import React from 'react';
import { Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarWithHeader from '../../components/Sidebar';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';

export const DashboardTeacher = () => {
  const { user, isLoading } = useContext(UserContext);
  const { setToken } = useAuth();
  const navigate = useNavigate();
  return (
    <SidebarWithHeader
      name={user.name}
      role={user.role}
      handleLogout={(e: React.MouseEvent) => {
        e.preventDefault();
        localStorage.clear();
        setToken('');
      }}
    >
      {isLoading ? <div>loading...</div> : <div>Kamu adalah teacher</div>}
    </SidebarWithHeader>
  );
};

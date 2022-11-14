import React from 'react';
import { useContext } from 'react';
import SidebarWithHeader from '../../components/Sidebar';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';

const DashboardTeacher = () => {
  const { user, isLoading } = useContext(UserContext);
  const { setToken } = useAuth();
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

export default DashboardTeacher;

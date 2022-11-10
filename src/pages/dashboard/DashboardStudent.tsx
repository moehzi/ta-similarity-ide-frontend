import React from 'react';
import { useContext } from 'react';
import SidebarWithHeader from '../../components/Sidebar';
import { UserContext } from '../../context/UserContext';
import { useAuth } from '../../hooks/useAuth';

const DashboardStudent = () => {
  const { user, loading } = useContext(UserContext);
  const { setToken } = useAuth();
  return (
    <SidebarWithHeader
      name={user?.name}
      role={user?.role}
      handleLogout={(e: React.MouseEvent) => {
        e.preventDefault();
        localStorage.clear();
        setToken('');
      }}
    >
      {loading ? <div>loading...</div> : <div>Kamu adalah Student</div>}
    </SidebarWithHeader>
  );
};

export default DashboardStudent;

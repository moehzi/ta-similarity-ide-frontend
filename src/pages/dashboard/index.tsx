import { useContext } from 'react';
import { Loader } from '../../components/spinner';
import { UserContext } from '../../context/UserContext';
import { DashboardStudent } from './DashboardStudent';

import { DashboardTeacher } from './DashboardTeacher';

export const Dashboard = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {user?.role === 'teacher' && <DashboardTeacher />}
      {user?.role === 'student' && <DashboardStudent />}
    </div>
  );
};

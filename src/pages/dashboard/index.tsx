import { useContext, lazy } from 'react';
import { Loader } from '../../components/spinner';
import { UserContext } from '../../context/UserContext';

const DashboardStudent = lazy(() => import('./DashboardStudent'));
const DashboardTeacher = lazy(() => import('./DashboardTeacher'));

const Dashboard = () => {
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

export default Dashboard;

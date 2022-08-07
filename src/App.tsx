import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './components/ProtectedRoutes';
import { UserProvider } from './context/UserContext';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Course } from './pages/course';
import { Dashboard } from './pages/dashboard';
import { Login } from './pages/Login';
import { CourseProvider } from './hooks/useCourse';

export default function App() {
  const { setToken } = useAuth();
  const access_token = localStorage.getItem('token');

  useEffect(() => {
    if (!access_token) {
      localStorage.setItem('token', access_token as string);
      setToken(access_token);
    }
  }, [access_token, setToken]);

  return (
    <UserProvider>
      <CourseProvider>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/courses" element={<Course />} />
            </Route>
          </Routes>
        </div>
      </CourseProvider>
    </UserProvider>
  );
}

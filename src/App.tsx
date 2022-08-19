import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RequireAuth from './components/ProtectedRoutes';
import { UserProvider } from './context/UserContext';
import { useAuth } from './hooks/useAuth';
import { Course } from './pages/course';
import { Dashboard } from './pages/dashboard';
import { Login } from './pages/Login';
import { CourseProvider } from './hooks/useCourse';
import { WorkArea } from './pages/workarea';
import { CodeProvider } from './context/CodeContext';
import { Works } from './pages/works';

export default function App() {
  const { setToken } = useAuth();
  const access_token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (access_token) {
      setToken(access_token);
    }
    if (!access_token) {
      navigate('/login');
    }
  }, [access_token, setToken]);

  return (
    <UserProvider>
      <CourseProvider>
        <CodeProvider>
          <div>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/courses/:courseId" element={<Works />} />
              <Route element={<RequireAuth />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/courses" element={<Course />} />
              </Route>
              <Route path="/text-editor" element={<WorkArea />} />
            </Routes>
          </div>
        </CodeProvider>
      </CourseProvider>
    </UserProvider>
  );
}

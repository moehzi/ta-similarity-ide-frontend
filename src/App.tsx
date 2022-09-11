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
import { DetailCourseProvider } from './context/DetailCourseContext';
import 'antd/dist/antd.min.css';
import { DetailWorkProvider } from './context/DetailWorkContext';
import { DetailWork } from './pages/DetailWork';
import { DetailStudentWork } from './pages/DetailStudentWork';
import { DetailStudentWorkProvider } from './context/DetailStudentWorkContext';

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
  }, [access_token, navigate, setToken]);

  return (
    <CodeProvider>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/courses/:courseId"
            element={
              <DetailCourseProvider>
                <Works />
              </DetailCourseProvider>
            }
          />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/courses"
              element={
                <CourseProvider>
                  <Course />
                </CourseProvider>
              }
            />
            <Route
              path="/work/:workId"
              element={
                <DetailWorkProvider>
                  <DetailWork />
                </DetailWorkProvider>
              }
            />
            <Route
              path="/text-editor/:workId"
              element={
                <DetailWorkProvider>
                  <WorkArea />
                </DetailWorkProvider>
              }
            />
            <Route
              path="/detail-work/:workId/student/:studentId"
              element={
                <DetailStudentWorkProvider>
                  <DetailStudentWork />
                </DetailStudentWorkProvider>
              }
            />
          </Route>
        </Routes>
      </div>
    </CodeProvider>
  );
}

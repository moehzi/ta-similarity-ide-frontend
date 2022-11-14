import { useEffect, lazy, Suspense } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RequireAuth from './components/ProtectedRoutes';
import { UserProvider } from './context/UserContext';
import { useAuth } from './hooks/useAuth';
import { CourseProvider } from './hooks/useCourse';
import { CodeProvider } from './context/CodeContext';
import { DetailCourseProvider } from './context/DetailCourseContext';
import 'antd/dist/antd.min.css';
import { DetailWorkProvider } from './context/DetailWorkContext';
import { DetailStudentWorkProvider } from './context/DetailStudentWorkContext';
import { ClassProvider } from './context/ListClassCourse';
import { ListClassProvider } from './context/ClassContext';
import { UserClassProvider } from './context/UserClassContext';
import { Loader } from './components/spinner';

// Lazy load for performance purpose
const Login = lazy(() => import('./pages/Login'));
const Course = lazy(() => import('./pages/course'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const WorkArea = lazy(() => import('./pages/workarea'));
const Works = lazy(() => import('./pages/works'));
const DetailWork = lazy(() => import('./pages/DetailWork'));
const DetailStudentWork = lazy(() => import('./pages/DetailStudentWork'));
const DetailCourse = lazy(() => import('./pages/DetailCourse'));
const UserClass = lazy(() => import('./pages/course/UserClass'));
const Register = lazy(() => import('./pages/Register'));
const NotFound = lazy(() => import('./pages/404'));

export default function App() {
  const { setToken } = useAuth();
  const access_token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (access_token) {
      setToken(access_token);
    }
    // if (!access_token) {
    //   navigate('/login');
    // }
  }, [access_token, navigate, setToken]);

  return (
    <Suspense fallback={<Loader />}>
      <UserProvider>
        <CodeProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/users/register" element={<Register />} />
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/courses"
                element={
                  <ListClassProvider>
                    <CourseProvider>
                      <Course />
                    </CourseProvider>
                  </ListClassProvider>
                }
              />
              <Route
                path="/classes"
                element={
                  <ListClassProvider>
                    <CourseProvider>
                      <UserClassProvider>
                        <UserClass />
                      </UserClassProvider>
                    </CourseProvider>
                  </ListClassProvider>
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
              <Route
                path="/courses/:courseId/class"
                element={
                  <ClassProvider>
                    <UserClassProvider>
                      <DetailCourse />
                    </UserClassProvider>
                  </ClassProvider>
                }
              />
            </Route>
            <Route
              path="/courses/:courseId"
              element={
                <DetailCourseProvider>
                  <Works />
                </DetailCourseProvider>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CodeProvider>
      </UserProvider>
    </Suspense>
  );
}

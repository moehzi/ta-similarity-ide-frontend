import { Route, Routes } from 'react-router-dom';
import RequireAuth from './components/ProtectedRoutes';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './hooks/useAuth';
import { Course } from './pages/course';
import { Dashboard } from './pages/dashboard';
import { Login } from './pages/Login';

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/courses" element={<Course />} />
            </Route>
          </Routes>
        </div>
      </UserProvider>
    </AuthProvider>
  );
}

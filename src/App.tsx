import { useEffect } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/ProtectedRoutes';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Dashboard } from './pages/dashboard';
import { Login } from './pages/Login';

export default function App() {
  return (
    <AuthProvider>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

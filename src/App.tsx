import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

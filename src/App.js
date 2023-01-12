import { lazy } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// project imports
import Loadable from 'ui-component/Loadable';

// layout
import AdminLayout from 'layout/AdminLayout';

// views
// auth
const LoginPage = Loadable(lazy(() => import('views/auth/Login')));

// admin
const DashboardPage = Loadable(lazy(() => import('views/pages/Dashboard')));
const HomePage = Loadable(lazy(() => import('views/pages/Home')));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

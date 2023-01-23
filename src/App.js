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
const HomePage = Loadable(lazy(() => import('views/pages/Home')));
const WorkVisitPage = Loadable(lazy(() => import('views/pages/work-visit')));

const UserManagementPage = Loadable(lazy(() => import('views/pages/user-management')));
const UserManagementAddForm = Loadable(lazy(() => import('views/pages/user-management/form')));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/work-visit" element={<WorkVisitPage />} />
        <Route path="/user-management" element={<UserManagementPage />} />
        <Route path="/user-management-add-form" element={<UserManagementAddForm />} />
      </Route>
    </Routes>
  );
}

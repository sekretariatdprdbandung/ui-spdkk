import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';

// views
const LoginPage = Loadable(lazy(() => import('views/auth/Login')));

const AuthRoutes = {
  path: '/admin',
  element: <LoginPage />,
};

export default AuthRoutes;

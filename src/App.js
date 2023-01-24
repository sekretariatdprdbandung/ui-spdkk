import { lazy, useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// API
import { API, setAuthToken } from 'config/API';

// context
import { AuthContext } from 'context/AuthContext';

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
  // context
  const [state, dispatch] = useContext(AuthContext);

  // navigate
  let navigate = useNavigate();

  // set token
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false) {
      navigate('/login');
    } else {
      navigate('/');
    }
  }, [state]);

  // check user
  const checkUser = async () => {
    try {
      const response = await API.get('/auth/check-auth');

      // check token valid
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data;

      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<AdminLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/work-visit" element={<WorkVisitPage />} />
        <Route path="/user-management" element={<UserManagementPage />} />
        <Route path="/user-management-add-form" element={<UserManagementAddForm />} />
      </Route>
    </Routes>
  );
}

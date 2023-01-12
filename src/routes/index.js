import { useRoutes } from 'react-router-dom';

// routes
import AuthRoutes from './AuthRoutes';

export default function MainRoutes() {
  return useRoutes([AuthRoutes]);
}

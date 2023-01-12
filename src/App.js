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

export default function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<LoginPage />} /> */}
      {/* <Route path="/" element={<DashboardPage />} /> */}
      {/* <Route
        path="/"
        element={
          <AdminLayout>
            <DashboardPage />
          </AdminLayout>
        }
      /> */}
      <Route path="/" element={<AdminLayout />}>
        <Route path="/" element={<DashboardPage />} />
      </Route>

      {/* customer */}

      <Route path="/dashboard" element={<DashboardPage />} />
      {/* <Route path="/detailProduct/:id" element={<DetailProduct />} /> */}
      {/* <Route path="/profile" element={<Profile />} /> */}
      {/* <Route path="/customerComplain" element={<CustomerComplain />} /> */}

      {/* admin */}
      {/* <Route path="/transaction" element={<Transaction />} />
        <Route path="/adminComplain" element={<AdminComplain />} />
        <Route path="/product" element={<Product />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/editProduct/:id" element={<EditProduct />} />  */}
    </Routes>
  );
}

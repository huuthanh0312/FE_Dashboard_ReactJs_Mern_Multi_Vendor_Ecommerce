import { lazy } from 'react';
// import AdminDashboard from '../../views/admin/AdminDashboard';

//import Home from "../../views/pages/Home";
const AdminDashboard = lazy(() => import('../../views/admin/AdminDashboard'));

export const adminRoutes = [
  {
    path: 'admin/dashboard',
    element: <AdminDashboard />,
    role: 'admin'
  }
]
import { lazy } from 'react'
//import Home from "../../views/pages/Home";
const AdminDashboard = lazy(() => import('../../views/admin/AdminDashboard'))
const Orders = lazy(() => import('../../views/admin/Orders'))
const Category = lazy(() => import('../../views/admin/Category'))

export const adminRoutes = [
  {
    path: 'admin/dashboard',
    element: <AdminDashboard />,
    role: 'admin'
  },
  {
    path: 'admin/orders',
    element: <Orders />,
    role: 'admin'
  },
  {
    path: 'admin/category',
    element: <Category />,
    role: 'admin'
  }
]

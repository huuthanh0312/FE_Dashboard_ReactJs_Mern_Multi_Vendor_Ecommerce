import React, { lazy } from 'react'
const Login = lazy(() => import('../../views/auth/Login'))
const Register = lazy(() => import('../../views/auth/Register'))
const AdminLogin = lazy(() => import('../../views/auth/AdminLogin'))
const Home = lazy(() => import('../../views/Home'))
const Unauthorized = lazy(() => import('../../views/Unauthorized'))

const publicRoutes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/admin/login',
    element: <AdminLogin />
  },
  {
    path: '/',
    element: <Home />,
  },

  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },
]

export default publicRoutes

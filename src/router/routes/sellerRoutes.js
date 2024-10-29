import { lazy } from 'react'
//import Home from "../../views/pages/Home";
const Home = lazy(() => import('../../views/Home'))
const SellerDashboard = lazy(() => import('../../views/seller/SellerDashboard'))
const AddProduct = lazy(() => import('../../views/seller/AddProduct'))
const Products = lazy(() => import('../../views/seller/Products'))
const DiscountProducts = lazy(() => import('../../views/seller/DiscountProducts'))
const Orders = lazy(() => import('../../views/seller/Orders'))
const Payments = lazy(() => import('../../views/seller/Payments'))

export const sellerRoutes = [
  {
    path: '/',
    element: <Home />,
    ability: ['admin', 'seller']
  },
  {
    path: '/seller/dashboard',
    element: <SellerDashboard />,
    role: ['seller'],
    status: 'active'
  },
  {
    path: '/seller/add-product',
    element: <AddProduct />,
    role: ['seller'],
    status: 'active'
  },
  {
    path: '/seller/all-product',
    element: <Products />,
    role: ['seller'],
    status: 'active'
  },
  {
    path: '/seller/discount-product',
    element: <DiscountProducts />,
    role: ['seller'],
    status: 'active'
  },
  {
    path: '/seller/orders',
    element: <Orders />,
    role: ['seller'],
    ability: ['active', 'deactive']
  },
  {
    path: '/seller/payments',
    element: <Payments />,
    role: ['seller'],
    status: 'active'
  }
]

import { lazy } from 'react'
//import Home from "../../views/pages/Home";
const Home = lazy(() => import('../../views/Home'))
const SellerDashboard = lazy(() => import('../../views/seller/SellerDashboard'))
const AddProduct = lazy(() => import('../../views/seller/AddProduct'))
const Products = lazy(() => import('../../views/seller/Products'))
const DiscountProducts = lazy(() => import('../../views/seller/DiscountProducts'))
const Orders = lazy(() => import('../../views/seller/Orders'))
const Payments = lazy(() => import('../../views/seller/Payments'))
const ChatToCustomer = lazy(() => import('../../views/seller/ChatToCustomer'))
const ChatToAdmin = lazy(() => import('../../views/seller/ChatToAdmin'))

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
  },
  {
    path: '/seller/chat-support',
    element: <ChatToAdmin />,
    ability: ['active', 'deactive', 'pending']
  },
  {
    path: '/seller/chat-customer',
    element: <ChatToCustomer />,
    role: ['seller'],
    ability: ['active']
  },
  {
    path: '/seller/chat-customer/:customerId',
    element: <ChatToCustomer />,
    role: ['seller'],
    ability: ['active']
  }
]

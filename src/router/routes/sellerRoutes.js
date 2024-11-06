import React, { lazy } from 'react'
//import Home from "../../views/pages/Home";
const SellerDashboard = lazy(() => import('../../views/seller/SellerDashboard'))
const AddProduct = lazy(() => import('../../views/seller/AddProduct'))
const Products = lazy(() => import('../../views/seller/Products'))
const DiscountProducts = lazy(() => import('../../views/seller/DiscountProducts'))
const Orders = lazy(() => import('../../views/seller/Orders'))
const Payments = lazy(() => import('../../views/seller/Payments'))
const ChatToCustomer = lazy(() => import('../../views/seller/ChatToCustomer'))
const ChatToAdmin = lazy(() => import('../../views/seller/ChatToAdmin'))
const Profile = lazy(() => import('../../views/seller/Profile'))
const EditProduct = lazy(() => import('../../views/seller/EditProduct'))
const OrderDetails = lazy(() => import('../../views/seller/OrderDetails'))
const Pending = lazy(() => import('../../views/Pending'))
const Deactive = lazy(() => import('../../views/Deactive'))

export const sellerRoutes = [
  {
    path: '/seller/account-pending',
    element: <Pending />,
    ability: 'seller'
  },
  {
    path: '/seller/account-deactive',
    element: <Deactive />,
    ability: 'seller'
  },
  {
    path: '/seller/dashboard',
    element: <SellerDashboard />,
    role: 'seller',
    status: 'active'
  },
  {
    path: '/seller/add-product',
    element: <AddProduct />,
    role: 'seller',
    status: 'active'
  },
  {
    path: '/seller/edit-product/:productId',
    element: <EditProduct />,
    role: 'seller',
    status: 'active'
  },
  {
    path: '/seller/all-products',
    element: <Products />,
    role: 'seller',
    status: 'active'
  },
  {
    path: '/seller/discount-product',
    element: <DiscountProducts />,
    role: 'seller',
    status: 'active'
  },
  {
    path: '/seller/orders',
    element: <Orders />,
    role: 'seller',
    visibility: ['active', 'deactive']
  },
  {
    path: '/seller/order/details/:orderId',
    element: <OrderDetails />,
    role: 'seller',
    visibility: ['active', 'deactive']
  },
  {
    path: '/seller/payments',
    element: <Payments />,
    role: 'seller',
    status: 'active'
  },
  {
    path: '/seller/chat-customer',
    element: <ChatToCustomer />,
    role: 'seller',
    status: 'active'
  },
  {
    path: '/seller/chat-customer/:customerId',
    element: <ChatToCustomer />,
    role: 'seller',
    status: 'active'
  },
  {
    path: '/seller/chat-support',
    element: <ChatToAdmin />,
    role: 'seller',
    visibility: ['active', 'deactive', 'pending']
  },
  {
    path: '/seller/profile',
    element: <Profile />,
    role: 'seller',
    visibility: ['active', 'deactive', 'pending']
  }
]

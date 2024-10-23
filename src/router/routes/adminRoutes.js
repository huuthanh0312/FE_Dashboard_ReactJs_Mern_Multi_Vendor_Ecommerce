import { lazy } from 'react'
//import Home from "../../views/pages/Home";
const AdminDashboard = lazy(() => import('../../views/admin/AdminDashboard'))
const Orders = lazy(() => import('../../views/admin/Orders'))
const Category = lazy(() => import('../../views/admin/Category'))
const Sellers = lazy(() => import('../../views/admin/Sellers'))
const PaymentRequest = lazy(() => import('../../views/admin/PaymentRequest'))
const DeactiveSellers = lazy(() => import('../../views/admin/DeactiveSellers'))
const SellerRequest = lazy(() => import('../../views/admin/SellerRequest'))
const SellerDetails = lazy(() => import('../../views/admin/SellerDetails'))
const ChatSeller = lazy(() => import('../../views/admin/ChatSeller'))

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
  },
  {
    path: 'admin/sellers',
    element: <Sellers />,
    role: 'admin'
  },
  {
    path: 'admin/payment-request',
    element: <PaymentRequest />,
    role: 'admin'
  },
  {
    path: 'admin/deactive-sellers',
    element: <DeactiveSellers />,
    role: 'admin'
  },
  {
    path: 'admin/sellers-request',
    element: <SellerRequest />,
    role: 'admin'
  },
  {
    path: 'admin/seller/details/:sellerId',
    element: <SellerDetails />,
    role: 'admin'
  },
  {
    path: 'admin/chat-seller',
    element: <ChatSeller />,
    role: 'admin'
  }
]

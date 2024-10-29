import { lazy } from 'react'

//import Home from "../../views/pages/Home";
const Home = lazy(() => import('../../views/Home'))
const SellerDashboard = lazy(() => import('../../views/seller/SellerDashboard'))
const AddProduct = lazy(() => import('../../views/seller/AddProduct'))

export const sellerRoutes = [
  {
    path: '/',
    element: <Home />,
    ability: ['admin', 'seller']
  },
  {
    path: '/seller/dashboard',
    element: <SellerDashboard />,
    ability: ['admin', 'seller']
  },
  {
    path: '/seller/add-product',
    element: <AddProduct />,
    ability: ['admin', 'seller']
  }
]

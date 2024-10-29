import { lazy } from 'react'
//import Home from "../../views/pages/Home";
const Home = lazy(() => import('../../views/Home'))
const SellerDashboard = lazy(() => import('../../views/seller/SellerDashboard'))
const AddProduct = lazy(() => import('../../views/seller/AddProduct'))
const Products = lazy(() => import('../../views/seller/Products'))
const DiscountProduct = lazy(() => import('../../views/seller/DiscountProduct'))

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
  },
  {
    path: '/seller/all-product',
    element: <Products />,
    ability: ['admin', 'seller']
  },
  {
    path: '/seller/discount-product',
    element: <DiscountProduct />,
    ability: ['admin', 'seller']
  }
]

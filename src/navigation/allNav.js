import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import {
  FaProductHunt,
  FaRegListAlt,
  FaShopify,
  FaShoppingCart,
  FaUserCog,
  FaUserTie,
  FaUserTimes
} from 'react-icons/fa'
import {
  MdOutlineCategory,
  MdOutlineDashboard,
  MdOutlineMessage,
  MdOutlinePayment
} from 'react-icons/md'
import { FaCodePullRequest } from 'react-icons/fa6'
import { IoIosChatbubbles } from 'react-icons/io'
import { RiDiscountPercentLine } from 'react-icons/ri'

export const allNav = [
  {
    //navigation admin
    id: 1,
    title: 'Dashboard',
    icon: <MdOutlineDashboard size={18} />,
    role: 'admin',
    path: '/admin/dashboard'
  },
  {
    id: 2,
    title: 'Category',
    icon: <FaRegListAlt size={18} />,
    role: 'admin',
    path: '/admin/category'
  },
  {
    id: 3,
    title: 'Orders',
    icon: <AiOutlineShoppingCart size={18} />,
    role: 'admin',
    path: '/admin/orders'
  },
  {
    id: 4,
    title: 'Sellers',
    icon: <FaUserCog size={18} />,
    role: 'admin',
    path: '/admin/sellers'
  },
  {
    id: 5,
    title: 'Payment Request',
    icon: <MdOutlinePayment size={18} />,
    role: 'admin',
    path: '/admin/payment-request'
  },
  {
    id: 6,
    title: 'Deactive Sellers',
    icon: <FaUserTimes size={18} />,
    role: 'admin',
    path: '/admin/deactive-sellers'
  },
  {
    id: 7,
    title: 'Seller Request',
    icon: <FaCodePullRequest size={18} />,
    role: 'admin',
    path: '/admin/sellers-request'
  },
  {
    id: 8,
    title: 'Live Chat',
    icon: <IoIosChatbubbles size={18} />,
    role: 'admin',
    path: '/admin/chat-seller'
  },
  //seller navigation
  {
    id: 9,
    title: 'Dashboard',
    icon: <MdOutlineDashboard size={18} />,
    role: 'seller',
    path: '/seller/dashboard'
  },
  {
    id: 10,
    title: 'Add Product',
    icon: <FaShopify size={18} />,
    role: 'seller',
    path: '/seller/add-product'
  },
  {
    id: 11,
    title: 'All Product',
    icon: <FaProductHunt size={18} />,
    role: 'seller',
    path: '/seller/all-products'
  },
  {
    id: 12,
    title: 'Discount Product',
    icon: <RiDiscountPercentLine size={18} />,
    role: 'seller',
    path: '/seller/discount-product'
  },
  {
    id: 13,
    title: 'Orders',
    icon: <FaShoppingCart size={18} />,
    role: 'seller',
    path: '/seller/orders'
  },
  {
    id: 14,
    title: 'Payments',
    icon: <MdOutlinePayment size={18} />,
    role: 'seller',
    path: '/seller/payments'
  },
  {
    id: 15,
    title: 'Chat Customer',
    icon: <MdOutlineMessage size={18} />,
    role: 'seller',
    path: '/seller/chat-customer'
  },
  {
    id: 16,
    title: 'Chat Support',
    icon: <IoIosChatbubbles size={18} />,
    role: 'seller',
    path: '/seller/chat-support'
  },
  {
    id: 17,
    title: 'Profile',
    icon: <FaUserTie size={18} />,
    role: 'seller',
    path: '/seller/profile'
  }
]

import { AiOutlineDashboard, AiOutlineShoppingCart } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi'
import { FaUserCog, FaUsersCog, FaUserTie, FaUserTimes } from 'react-icons/fa'
import { MdOutlinePayment } from 'react-icons/md'
import { FaCodePullRequest } from 'react-icons/fa6'
import { IoIosChatbubbles } from 'react-icons/io'

export const allNav = [
  {
    //navigation admin
    id: 1,
    title: 'Dashboard',
    icon: <AiOutlineDashboard size={18} />,
    role: 'admin',
    path: '/admin/dashboard'
  },
  {
    id: 2,
    title: 'Orders',
    icon: <AiOutlineShoppingCart size={18} />,
    role: 'admin',
    path: '/admin/orders'
  },
  {
    id: 3,
    title: 'Category',
    icon: <BiCategory size={18} />,
    role: 'admin',
    path: '/admin/category'
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
    icon: <AiOutlineDashboard size={18} />,
    role: 'seller',
    path: '/seller/dashboard'
  },
  {
    id: 10,
    title: 'Add Product',
    icon: <AiOutlineDashboard size={18} />,
    role: 'seller',
    path: '/seller/add-product'
  },
  {
    id: 11,
    title: 'All Product',
    icon: <AiOutlineDashboard size={18} />,
    role: 'seller',
    path: '/seller/all-product'
  },
  {
    id: 12,
    title: 'Discount Product',
    icon: <AiOutlineDashboard size={18} />,
    role: 'seller',
    path: '/seller/discount-product'
  },
  {
    id: 13,
    title: 'Orders',
    icon: <AiOutlineDashboard size={18} />,
    role: 'seller',
    path: '/seller/orders'
  },
  {
    id: 14,
    title: 'Payments',
    icon: <AiOutlineDashboard size={18} />,
    role: 'seller',
    path: '/seller/payments'
  },
  {
    id: 15,
    title: 'Chat Customers',
    icon: <AiOutlineDashboard size={18} />,
    role: 'seller',
    path: '/seller/chat-customers'
  },
  {
    id: 16,
    title: 'Chat Support',
    icon: <AiOutlineDashboard size={18} />,
    role: 'seller',
    path: '/seller/chat-support'
  }
]

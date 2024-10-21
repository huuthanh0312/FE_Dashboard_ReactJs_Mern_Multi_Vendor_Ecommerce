import { AiOutlineDashboard, AiOutlineShoppingCart } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi'
import { FaUserCog, FaUsersCog, FaUserTie, FaUserTimes } from 'react-icons/fa'
import { MdOutlinePayment } from 'react-icons/md'
import { FaCodePullRequest } from 'react-icons/fa6'
import { IoIosChatbubbles } from 'react-icons/io'

export const allNav = [
  {
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
  }
]

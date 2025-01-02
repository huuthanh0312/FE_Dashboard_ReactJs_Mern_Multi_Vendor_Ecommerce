import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getNav } from '../navigation'
import { FaClosedCaptioning, FaLongArrowAltUp, FaSignOutAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Footer from './Footer'
import { logout } from '../store/Reducers/authReducer'
import { MdClose } from 'react-icons/md'

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const dispatch = useDispatch()
  const { role } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  // navigation
  const [allNav, setAllNav] = useState([])
  useEffect(() => {
    const navs = getNav(role)
    setAllNav(navs)
  }, [role])

  // Cập nhật khi resize màn hình
  useEffect(() => {
    const handleResize = () => {
      const currentIsXL = window.innerWidth >= 768
      // Reset trạng thái show khi chuyển qua màn hình xl
      if (currentIsXL) setShowSidebar(false)
      // Lắng nghe sự kiện resize
      window.addEventListener('resize', handleResize)
    }
    // Gọi handleResize lần đầu để đảm bảo state đúng khi component mount
    handleResize()

    // Cleanup event listener khi component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <div>
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed duration-300 transition-all ease-in-out
          ${!showSidebar ? 'invisible' : 'visible'}
          w-screen h-screen bg-[#22292f89] top-0 left-0 z-20 `}
      ></div>
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="absolute right-1 top-1  z-[99991] hover:bg-slate-500 hover:rounded-full active:scale-95 active:translate-y-[2px] transform transition duration-150 ease-in-out"
        >
          <span className="text-white">
            <MdClose size={28} />
          </span>
        </div>
      )}
      <div
        className={`w-[260px] fixed bg-[#ffffff] z-[9999] top-0 h-screen flex flex-col shadow-md shadow-slate-400 transition-all
          ${showSidebar ? 'left-0' : '-left-[260px] lg:left-0'}`}
      >
        <div className="h-[69px] flex justify-center items-center mb-2 py-2 shadow-md">
          <Link to="/" className="w-[180px] h-[55px]">
            <img
              src="http://localhost:3000/images/logo-admin.png"
              className="w-full h-full"
              alt=""
            />
          </Link>
        </div>

        <div className=" py-2 flex-grow overflow-y-auto">
          <ul>
            {allNav.map((n, i) => (
              <li key={i}>
                <Link
                  to={n.path}
                  className={`${
                    pathname === n.path
                      ? 'font-bold bg-gradient-to-t  from-gray-200 to-white border-l-4 border-blue-600 text-blue-600 shadow-md shadow-gray-500/50 duration-500'
                      : 'text-[#383737] font-bold duration-300 hover:bg-gray-100'
                  } cursor-pointer px-5 py-2 flex justify-start items-center gap-2 hover:pl-6 transition-all w-full mb-1`}
                >
                  <span>{n.icon}</span>
                  <span>{n.title}</span>
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <button
                onClick={() => dispatch(logout({ navigate, role }))}
                className="text-[#383737] font-bold duration-300 hover:bg-indigo-50 cursor-pointer px-5 py-2 rounded-md flex justify-start items-center gap-2 hover:pl-6 transition-all w-full mb-1 border-t"
              >
                <span>
                  <FaSignOutAlt />
                </span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
        {/* Footer */}
        <div className="py-2">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Sidebar

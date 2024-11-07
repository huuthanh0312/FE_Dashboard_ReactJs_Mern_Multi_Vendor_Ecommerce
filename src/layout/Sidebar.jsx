import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getNav } from '../navigation'
import { FaLongArrowAltUp, FaSignOutAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const dispatch = useDispatch()
  const { role } = useSelector((state) => state.auth)
  const { pathname } = useLocation()
  // navigation
  const [allNav, setAllNav] = useState([])
  useEffect(() => {
    const navs = getNav(role)
    setAllNav(navs)
  }, [role])

  return (
    <div>
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed duration-200 
          ${!showSidebar ? 'invisible' : 'visible'}
          w-screen h-screen bg-[#22292f89] top-0 left-0 z-20`}
      ></div>
      <div
        className={`w-[260px] fixed bg-[#ffffff] z-[9999] top-0 h-screen shadow-lg shadow-slate-400 transition-all
          ${showSidebar ? 'left-0' : '-left-[260px] lg:left-0'}`}
      >
        <div className="h-[69px] flex justify-center items-center mb-2 py-2 shadow-lg">
          <Link to="/" className="w-[180px] h-[55px]">
            <img
              src="http://localhost:3000/images/logo-admin.png"
              className="w-full h-full"
              alt=""
            />
          </Link>
        </div>

        <div className="px-[16px] py-2">
          <ul>
            {allNav.map((n, i) => (
              <li key={i}>
                <Link
                  to={n.path}
                  className={`${
                    pathname === n.path
                      ? 'font-bold bg-gradient-to-t from-gray-200 to-white border-l-4 border-blue-600 text-blue-600 shadow-md shadow-gray-500/50 duration-500'
                      : 'text-[#383737] font-bold duration-200 hover:bg-gray-100'
                  } cursor-pointer px-3 py-2 flex justify-start items-center gap-2 hover:pl-5 transition-all w-full mb-1`}
                >
                  <span>{n.icon}</span>
                  <span>{n.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <button className="text-[#383737] font-bold duration-200 hover:bg-indigo-50 cursor-pointer px-3 py-2 rounded-md flex justify-start items-center gap-2 hover:pl-4 transition-all w-full mb-1">
                <span>
                  <FaSignOutAlt />
                </span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

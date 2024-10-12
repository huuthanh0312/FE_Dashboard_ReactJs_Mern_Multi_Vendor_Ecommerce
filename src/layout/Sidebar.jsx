import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getNav } from '../navigation'
import { FaLongArrowAltUp, FaSignOutAlt } from 'react-icons/fa'

const Sidebar = () => {
  const { pathname } = useLocation()
  // navigation
  const [allNav, setAllNav] = useState([])
  useEffect(() => {
    const navs = getNav('admin')
    setAllNav(navs)
  }, [])

  return (
    <div>
      <div></div>
      <div
        className={`w-[260px] fixed bg-[#ffffff] z-50 top-0 h-screen shadow-slate-400 shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all`}
      >
        <div className="h-[70px] flex justify-center items-center">
          <Link to="/" className="w-[180px] h-[50px]">
            <img src="http://localhost:3000/images/logo.png" className="w-full h-full" alt="" />
          </Link>
        </div>

        <div className="px-[16px]">
          <ul>
            {allNav.map((n, i) => (
              <li key={i}>
                <Link
                  to={n.path}
                  className={`${
                    pathname === n.path
                      ? 'font-bold bg-gradient-to-tr from-gray-400 to-gray-100 text-gray-900 shadow-md shadow-gray-500/50 duration-500'
                      : 'text-gray-600 font-bold duration-200 hover:bg-indigo-50'
                  } cursor-pointer px-3 py-2 rounded-md flex justify-start items-center gap-2 hover:pl-5 transition-all w-full mb-1`}
                >
                  <span>{n.icon}</span>
                  <span>{n.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <button className="text-gray-600 font-bold duration-200 hover:bg-indigo-50 cursor-pointer px-3 py-2 rounded-md flex justify-start items-center gap-2 hover:pl-4 transition-all w-full mb-1">
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

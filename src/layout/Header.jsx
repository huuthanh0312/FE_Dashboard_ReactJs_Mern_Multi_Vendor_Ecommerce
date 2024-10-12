import React from 'react'
import { FaList } from 'react-icons/fa'

const Header = ({ showSidebar, setShowSidebar }) => {
  return (
    <div className="fixed top-0 left-0 w-full py-2 px-2 lg:px-5 z-40">
      <div className="ml-0 lg:ml-[260px] rounded-md shadow-md shadow-slate-400 h-[55px] flex justify-between items-center bg-white px-5 transition-all">
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-9 h-9 flex lg:hidden rounded-md border-1 shadow-md shadow-gray-400 hover:shadow-gray-500 justify-center items-center cursor-pointer"
        >
          <span>
            <FaList />
          </span>
        </div>
        {/* search */}
        <div className="hidden md:block">
          <input
            type="text"
            className="px-3 py-2 outline-none border shadow-sm bg-transparent border-slate-800 rounded-md text-gray-600 focus:border-indigo-300 overflow-hidden"
            name="search"
            placeholder="search"
          />
        </div>
        {/*  */}
        <div className="flex justify-center items-center gap-8 relative">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-3">
              <div className="flex justify-center items-center flex-col text-end">
                <h2 className="text-md font-bold">Thanh Admin</h2>
                <span className="text-[14px] w-full font-normal"> Admin</span>
              </div>
              <img
                className="w-[45px] h-p45px]"
                src="http://localhost:3000/images/admin.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header

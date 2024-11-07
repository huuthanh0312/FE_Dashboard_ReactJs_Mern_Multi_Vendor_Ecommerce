import React, { useEffect, useState } from 'react'
import { FaList } from 'react-icons/fa'

const Header = ({ showSidebar, setShowSidebar }) => {
  const [sticky, setSticky] = useState(false)
  //handle scroll function
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 0) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    //fixed top-0 left-0 w-full
    <div
      className={`fixed top-0 left-0 w-full z-20 mx-auto transition-all duration-300 
						${sticky ? 'p-[7px] shadow-lg  bg-white hover:shadow-indigo-200' : 'py-2 px-2 md:px-5 '}`}
    >
      <div
        className={`ml-0 lg:ml-[260px] h-[55px] flex justify-between items-center bg-white px-5 transition-all  ${
          sticky ? '' : 'rounded-md shadow-md hover:shadow-indigo-200 '
        }`}
      >
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
            className="px-3 py-1.5 outline-none border shadow-sm bg-transparent rounded-md text-gray-600 border-gray-400 focus:border-indigo-300 overflow-hidden"
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
                className="w-[45px] h-[45px] border-2 border-sky-700 rounded-full"
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

import React, { useEffect, useState } from 'react'
import { FaList, FaSearch } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const Header = ({ showSidebar, setShowSidebar }) => {
  const { userInfo } = useSelector((state) => state.auth)
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
        <div className="hidden md:block relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <FaSearch className="w-4 h-4 text-gray-500" />
          </div>
          <input
            type="text"
            className="ps-10 p-1.5 outline-none focus:border-b border-blue-500  bg-transparent text-gray-600 overflow-hidden font-semibold"
            name="search"
            placeholder="Search..."
          />
        </div>
        {/*  */}
        <div className="flex justify-center items-center gap-8 relative">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-3">
              <div className="flex justify-center items-center flex-col text-end">
                <h2 className="text-md font-bold">{userInfo.name}</h2>
                <span className="text-[14px] w-full font-normal">{userInfo.role}</span>
              </div>
              <img
                className={`${
                  sticky ? 'w-[45px] h-[45px]' : 'w-[40px] h-[40px]'
                } p-[2px] border-2 border-blue-700 rounded-full`}
                src={
                  userInfo.image
                    ? userInfo.image
                    : 'http://localhost:3000/images/no_user_images.png'
                }
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

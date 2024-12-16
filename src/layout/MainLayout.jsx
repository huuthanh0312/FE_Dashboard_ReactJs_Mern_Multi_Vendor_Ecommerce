import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { socket } from './../utils/utils'

const MainLayout = () => {
  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (userInfo && userInfo.role === 'seller') {
      socket.emit('add_seller', userInfo._id, userInfo)
    } else if (userInfo && userInfo.role === 'admin') {
      socket.emit('add_admin', userInfo._id, userInfo)
    }
  })
  //show sidebar
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <div className="bg-[#E5E5E5] w-full min-h-screen">
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="ml-0 lg:ml-[260px] pt-[90px] transition-all">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout

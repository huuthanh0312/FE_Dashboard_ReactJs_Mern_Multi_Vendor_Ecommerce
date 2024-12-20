import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { socket } from './../utils/utils'
import Footer from './Footer'
import { updateCustomers, updateSellers } from '../store/Reducers/chatReducer'

const MainLayout = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (userInfo && userInfo.role === 'seller') {
      socket.emit('add_seller', userInfo._id, userInfo)
    } else if (userInfo && userInfo.role === 'admin') {
      socket.emit('add_admin', userInfo)
    }
  }, [userInfo])
  useEffect(() => {
    //for sellers
    socket.on('activeCustomer', (customers) => {
      dispatch(updateCustomers(customers))
    })
    //for admins
    socket.on('activeSeller', (sellers) => {
      dispatch(updateSellers(sellers))
    })
  })
  //show sidebar
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <div className="bg-[#E5E5E5] w-full min-h-screen">
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="ml-0 lg:ml-[260px] pt-[90px] transition-all duration-100">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout

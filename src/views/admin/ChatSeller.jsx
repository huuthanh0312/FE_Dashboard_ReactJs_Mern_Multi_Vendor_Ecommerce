import React, { useEffect, useRef, useState } from 'react'
import { FaHome, FaList } from 'react-icons/fa'
import { IoIosArrowForward, IoIosSend, IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {
  adminSendMessageToSeller,
  getSellerMessagesByAdmin,
  getSellersByAdmin,
  messageClear,
  updateAdminMessage
} from '../../store/Reducers/chatReducer'
import { PiListChecksBold, PiSelectionAllBold, PiUserListBold } from 'react-icons/pi'
import { socket } from '../../utils/utils'
import toast from 'react-hot-toast'

const ChatSeller = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const {
    sellers,
    activeSeller,
    currentSeller,
    admin_seller_messages,
    successMessage,
    errorMessage
  } = useSelector((state) => state.chat)
  const { sellerId } = useParams()
  useEffect(() => {
    dispatch(getSellersByAdmin(userInfo._id))
  }, [])

  useEffect(() => {
    if (sellerId) {
      dispatch(getSellerMessagesByAdmin(sellerId))
    }
  }, [sellerId])

  const [show, setShow] = useState(false)
  //state mesage input
  const [message, setMessage] = useState('')
  //receiver message seller send to admin
  const [receiverMessage, setReceiverMessage] = useState('')

  // connection socket and seller send message to client
  useEffect(() => {
    socket.on('seller_send_message_admin', (msg) => {
      setReceiverMessage(msg)
    })
  }, [])

  //
  useEffect(() => {
    //console.log(receiverMessage)
    if (!receiverMessage) return // Nếu không có tin nhắn, thoát khỏi useEffect
    // Kiểm tra tin nhắn có đến từ Admin hiện tại và gửi cho seller hiện tại không
    const isMessageFromCurrentSeller = sellerId === receiverMessage.senderId

    if (isMessageFromCurrentSeller) {
      dispatch(updateAdminMessage(receiverMessage)) // Cập nhật tin nhắn vào Redux
      toast.success(`${receiverMessage.senderName} sent a message`) // Hiển thị thông báo
    }
  }, [receiverMessage])

  // handleSenMessage
  const handleSendMessageSeller = (e) => {
    e.preventDefault()
    if (message && sellerId) {
      dispatch(
        adminSendMessageToSeller({
          senderId: '',
          senderName: 'Admin Support',
          receiverId: sellerId,
          message
        })
      )
      setMessage('')
    }
  }

  // check send success push client message
  useEffect(() => {
    if (successMessage) {
      socket.emit(
        'admin_send_message_seller',
        admin_seller_messages[admin_seller_messages.length - 1]
      )
      dispatch(messageClear()) //message clear function reudx
    }
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear()) //message clear function reudx
    }
  }, [successMessage, errorMessage])

  //Bottom Ref Scroll
  const messageEndRef = useRef(null) // Tạo ref cho container tin nhắn
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [admin_seller_messages])

  // Cập nhật khi resize màn hình
  useEffect(() => {
    const handleResize = () => {
      const currentIsXL = window.innerWidth >= 768
      // Reset trạng thái show khi chuyển qua màn hình xl
      if (currentIsXL) setShow(false)
      // Lắng nghe sự kiện resize
      window.addEventListener('resize', handleResize)
    }
    // Gọi handleResize lần đầu để đảm bảo state đúng khi component mount
    handleResize()

    // Cleanup event listener khi component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  //Khi click choose seller thì show huỷ
  useEffect(() => {
    if (sellerId && show) {
      setShow(false)
    }
  }, [sellerId])
  return (
    <div>
      <div className="px-2 md:px-5 pb-5">
        {/*  Breadcrumbs */}
        <div className="flex justify-start text-center text-[#383737] font-bold items-center px-5 py-2 mb-5 bg-white rounded-md shadow-md hover:shadow-indigo-200">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link className="inline-flex text-sm font-medium text-gray-700 hover:text-blue-600">
                <FaHome className="w-4 h-4 me-1 pt-[1px]" />
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <IoIosArrowForward size={18} className="block mx-1 text-gray-400" />
                <Link className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2">
                  Chat Seller
                </Link>
              </div>
            </li>
          </ol>
        </div>
        {/* End Breadcrumbs */}
        <div className="w-full h-[calc(100vh-140px)] p-5 rounded-md shadow-md hover:shadow-indigo-200 bg-white ">
          <div className="flex w-full relative ">
            <div
              className={`md:w-96 w-64 sm:w-72 h-full absolute z-10 md:left-0 md:relative transition-all  ${
                show ? '-left-5 -top-5' : '-left-[480px] top-0'
              }`}
            >
              {/* // */}
              <div className="w-full h-[calc(100vh-140px)] md:h-[calc(100vh-180px)] pb-7 md:pb-2 rounded-md rounded-br-none bg-gradient-to-l from-white to-[#eeeeee] shadow-[0px_0_2px_rgba(0,0,0,0.2)]">
                <div
                  className={`flex md:px-4 py-3 px-2 text-xl justify-between rounded-md rounded-b-none items-center border-b bg-blue-500 text-white`}
                >
                  <h2 className="font-medium">Sellers</h2>
                  <span
                    onClick={() => setShow(!show)}
                    className="block cursor-pointer hover:bg-blue-600 hover:rounded-full md:hidden p-1"
                  >
                    <IoMdClose />
                  </span>
                </div>
                <div className="p-2 overflow-y-auto">
                  {sellers.map((s, i) => (
                    <Link key={i} to={`/admin/chat-seller/${s._id}`}>
                      <div
                        className={`mb-1 px-2 py-1.5 flex justify-start gap-2 items-center rounded-md cursor-pointer hover:shadow-sm hover:bg-indigo-200 border-blue-500 transition-all ease-in-out duration-200
                              ${
                                sellerId && s._id === sellerId
                                  ? 'border-l-[3px] bg-white shadow-sm'
                                  : ''
                              }`}
                      >
                        <div className="relative">
                          <img
                            className="w-[35px] border rounded-full"
                            src={
                              s.image ? s.image : 'http://localhost:3000/images/no_user_images.png'
                            }
                            alt=""
                          />
                          {activeSeller.some((a) => a.sellerId === s._id) && (
                            <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                          )}
                        </div>
                        <div className="flex justify-center items-start flex-col w-full">
                          <div className="flex justify-between items-center w-full">
                            <h2 className="text-base font-semibold text-gray-700">{s.name}</h2>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* end */}
            <div className="w-full md:h-[calc(100%-200px)] md:pl-4">
              <div className="flex justify-between items-center">
                {sellerId ? (
                  sellers.map((s, i) => {
                    if (currentSeller._id === s._id) {
                      return (
                        <div key={i} className="flex justify-start items-center gap-3">
                          <div className="relative">
                            <img
                              className="w-[40px] h-[40px] p-[2px] border-2 border-indigo-500 rounded-full"
                              src={
                                s.image
                                  ? s.image
                                  : 'http://localhost:3000/images/no_user_images.png'
                              }
                              alt=""
                            />
                            {activeSeller.some((a) => a.sellerId === s._id) && (
                              <div className="w-[12px] h-[12px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                            )}
                          </div>
                          <h2 className="text-base font-semibold text-[#383737]">{s.name}</h2>
                        </div>
                      )
                    }
                  })
                ) : (
                  <>
                    <div className="flex justify-start items-center gap-3">
                      <div className="relative">
                        <img
                          className="w-[40px] h-[40px] p-[2px] border-2 border-indigo-500 rounded-full"
                          src="http://localhost:3000/images/no_user_images.png"
                          alt=""
                        />
                      </div>
                      <h2 className="text-base font-semibold text-[#383737]">Select Sellers</h2>
                    </div>
                  </>
                )}
                <div
                  onClick={() => setShow(!show)}
                  className="flex w-[35px] md:hidden h-[35px] rounded-md bg-blue-500 shadow-lg justify-center items-center text-white hover:shadow-blue-500/50"
                >
                  <span>
                    {show ? <PiListChecksBold size={20} /> : <PiUserListBold size={20} />}
                  </span>
                </div>
              </div>
              <div className="py-3 ">
                <div className="h-[calc(100vh-290px)] bg-[#e5e5e5] rounded-md p-3 overflow-y-auto">
                  <div className={`w-full  flex flex-col gap-3 ${sellerId ? '' : 'h-full'}`}>
                    {sellerId ? (
                      admin_seller_messages.map((m, i) => {
                        if (m.senderId === sellerId) {
                          return (
                            <div
                              key={i}
                              ref={messageEndRef}
                              className="w-full flex justify-start items-center"
                            >
                              <div className="flex justify-start items-center gap-2  max-w-full lg:max-w-[85%]">
                                <div>
                                  <img
                                    className="max-w-[35px] h-[35px] p-[2px] border-2 border-indigo-500 rounded-full shadow-md"
                                    src={
                                      currentSeller.image
                                        ? currentSeller.image
                                        : 'http://localhost:3000/images/no_user_images.png'
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="flex justify-center items-start flex-col w-full bg-white border shadow-md text-[#383737] px-2 py-1 rounded-tl-lg rounded-tr-lg rounded-br-lg">
                                  <span>{m.message}</span>
                                </div>
                              </div>
                            </div>
                          )
                        } else {
                          return (
                            <div
                              key={i}
                              ref={messageEndRef}
                              className="w-full flex justify-end items-center"
                            >
                              <div className="flex justify-start items-center gap-2 max-w-full lg:max-w-[85%]">
                                <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-md text-white px-2 py-1 rounded-tl-lg rounded-tr-lg rounded-bl-lg">
                                  <span>{m.message}</span>
                                </div>
                                <div>
                                  <img
                                    className="max-w-[35px] h-[35px] p-[2px] border-2 border-sky-700 rounded-full shadow-md "
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
                          )
                        }
                      })
                    ) : (
                      <div className="w-full h-full flex justify-center items-center text-lg rounded-md overflow-hidden">
                        <div className="w-full justify-center flex items-center gap-2 font-medium text-slate-600 ">
                          <PiSelectionAllBold size={28} />
                          <span>Select Sellers...</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <form
                onSubmit={handleSendMessageSeller}
                className="flex gap-3 justify-center items-center"
              >
                <input
                  readOnly={sellerId ? false : true}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-[35px] flex px-2 border shadow border-gray-400 py-[5px] focus:border-blue-500 focus:shadow-indigo-200 rounded-md outline-none bg-transparent my-2 "
                  placeholder="Input Your Message"
                />
                <button
                  disabled={sellerId ? false : true}
                  className="w-[60px] h-[35px] flex justify-center items-center font-semibold rounded-md shadow-md bg-blue-500 text-white 
                           active:scale-95 active:translate-y-[2px] transform transition duration-150 ease-in-out"
                >
                  <IoIosSend size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatSeller

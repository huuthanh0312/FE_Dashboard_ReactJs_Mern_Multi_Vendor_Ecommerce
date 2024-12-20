import React, { useEffect, useRef, useState } from 'react'
import { FaHome, FaList } from 'react-icons/fa'
import { IoIosArrowForward, IoIosSend, IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  getAdminMessagesBySeller,
  messageClear,
  sellerSendMessageToAdmin,
  updateSellerMessage
} from '../../store/Reducers/chatReducer'
import { socket } from '../../utils/utils'
import toast from 'react-hot-toast'

const ChatToAdmin = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const { admin_seller_messages, successMessage, errorMessage } = useSelector((state) => state.chat)
  //state mesage input
  const [message, setMessage] = useState('')
  //receiver message seller send to customer
  const [receiverMessage, setReceiverMessage] = useState('')

  useEffect(() => {
    dispatch(getAdminMessagesBySeller())
  }, [])

  // connection socket and seller send message to client
  useEffect(() => {
    socket.on('admin_send_message_seller', (msg) => {
      setReceiverMessage(msg)
    })
  }, [])

  //
  useEffect(() => {
    //console.log(receiverMessage)
    if (receiverMessage) {
      dispatch(updateSellerMessage(receiverMessage)) // Cập nhật tin nhắn vào Redux
      toast.success(`${receiverMessage.senderName} sent a message`) // Hiển thị thông báo
    } // Nếu không có tin nhắn, thoát khỏi useEffect
  }, [receiverMessage])

  // check send success push client message
  useEffect(() => {
    if (successMessage) {
      socket.emit(
        'seller_send_message_admin',
        admin_seller_messages[admin_seller_messages.length - 1]
      )
      dispatch(messageClear()) //message clear function reudx
    }
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear()) //message clear function reudx
    }
  }, [successMessage, errorMessage])

  // handleSenMessage
  const handleSendMessageAdmin = (e) => {
    e.preventDefault()
    if (message && userInfo._id) {
      dispatch(
        sellerSendMessageToAdmin({
          senderId: userInfo._id,
          senderName: userInfo?.name,
          receiverId: '',
          message
        })
      )
      setMessage('')
    }
  }

  //Bottom Ref Scroll
  const messageEndRef = useRef(null) // Tạo ref cho container tin nhắn
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [admin_seller_messages])

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
                  Chat Support
                </Link>
              </div>
            </li>
          </ol>
        </div>
        {/* End Breadcrumbs */}
        <div className="w-full h-[calc(100vh-140px)] p-5 rounded-md shadow-md hover:shadow-indigo-200 bg-white ">
          <div className="flex w-full relative ">
            <div className="w-full md:h-[calc(100%-200px)]">
              <div className="flex justify-between items-center">
                <div className="flex justify-start items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-[45px] h-[45px] max-w-[45px] p-[2px] border-2 border-indigo-500 rounded-full"
                      src="http://localhost:3000/images/demo.jpg"
                      alt=""
                    />
                  </div>
                  <h2 className="text-base font-semibold text-gray-700">Support</h2>
                </div>
              </div>
              <div className="py-3 ">
                <div className="h-[calc(100vh-290px)] bg-[#e5e5e5] rounded-md p-3 overflow-y-auto">
                  <div className={`w-full  flex flex-col gap-3 ${userInfo?._id ? '' : 'h-full'}`}>
                    {admin_seller_messages.map((m, i) => {
                      if (m.senderId === userInfo?._id) {
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
                      } else {
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
                                  src={m.image ? m.image : 'http://localhost:3000/images/demo.jpg'}
                                  alt=""
                                />
                              </div>
                              <div className="flex justify-center items-start flex-col w-full bg-white border shadow-md text-[#383737] px-2 py-1 rounded-tl-lg rounded-tr-lg rounded-br-lg">
                                <span>{m.message}</span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                    })}
                  </div>
                </div>
              </div>
              <form
                onSubmit={handleSendMessageAdmin}
                className="flex gap-3 justify-center items-center"
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-[35px] flex px-2 border shadow-md border-gray-400 py-[5px] focus:border-blue-500 focus:shadow-indigo-200 rounded-md outline-none bg-transparent my-2 "
                  placeholder="Input Your Message"
                />
                <button className="w-[70px] h-[35px] flex justify-center items-center font-semibold rounded-md shadow-md  border bg-blue-500 text-white hover:shadow-indigo-200 hover:border-2">
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

export default ChatToAdmin

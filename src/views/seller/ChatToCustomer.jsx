import React, { useEffect, useRef, useState } from 'react'
import { FaHome, FaList } from 'react-icons/fa'
import { IoIosArrowForward, IoIosSend, IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {
  getCustomerMessagesBySeller,
  getCustomersBySeller,
  messageClear,
  sellerSendMessageToCustomer,
  updateMessageSellerAndCustomer
} from '../../store/Reducers/chatReducer'
import { AiOutlineMessage } from 'react-icons/ai'
import { PiSelectionAllBold } from 'react-icons/pi'
import toast from 'react-hot-toast'
import { socket } from './../../utils/utils'

const ChatToCustomer = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const { customers, currentCustomer, seller_customer_messages, successMessage, errorMessage } =
    useSelector((state) => state.chat)
  const { customerId } = useParams()
  useEffect(() => {
    dispatch(getCustomersBySeller(userInfo._id))
  }, [])

  useEffect(() => {
    if (customerId) {
      dispatch(getCustomerMessagesBySeller(customerId))
    }
  }, [customerId])

  const [show, setShow] = useState(false)

  //state mesage input
  const [message, setMessage] = useState('')
  //receiver message seller send to customer
  const [receiverMessage, setReceiverMessage] = useState('')
  // socket active Seller
  const [activeCustomer, setActiveCustomer] = useState([])

  // connection socket and seller send message to client
  useEffect(() => {
    socket.on('customer_send_message_seller', (msg) => {
      setReceiverMessage(msg)
    })
    socket.on('activeCustomer', (customers) => {
      console.log(customers)
      setActiveCustomer(customers)
    })
  }, [])

  //
  useEffect(() => {
    console.log(receiverMessage)
    if (!receiverMessage) return // Nếu không có tin nhắn, thoát khỏi useEffect
    // Kiểm tra tin nhắn có đến từ customer hiện tại và gửi cho seller hiện tại không
    const isMessageFromCurrentSeller =
      customerId === receiverMessage.senderId && userInfo._id === receiverMessage.receiverId

    if (isMessageFromCurrentSeller) {
      dispatch(updateMessageSellerAndCustomer(receiverMessage)) // Cập nhật tin nhắn vào Redux
      toast.success(`${receiverMessage.senderName} sent a message`) // Hiển thị thông báo
      dispatch(messageClear()) // Xóa tin nhắn trong Redux
    }
  }, [receiverMessage, customerId])

  // handleSenMessage
  const handleSendMessageCustomer = (e) => {
    e.preventDefault()
    if (message && customerId) {
      dispatch(
        sellerSendMessageToCustomer({
          senderId: userInfo._id,
          name: userInfo?.shopInfo?.shopName,
          receiverId: customerId,
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
        'seller_send_message_customer',
        seller_customer_messages[seller_customer_messages.length - 1]
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
  }, [seller_customer_messages])
  return (
    <div>
      <div className="px-2 md:px-5 pb-5">
        {/*  Breadcrumbs */}
        <div className="flex justify-start text-center text-[#383737] font-bold items-center px-4 py-2 mb-5 bg-white rounded-md shadow-md hover:shadow-indigo-200">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link
                to="/seller/dashboard"
                className="inline-flex text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                <FaHome className="w-4 h-4 me-1 pt-[1px]" />
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <IoIosArrowForward size={18} className="block mx-1 text-gray-400" />
                <Link className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2">
                  Chat Customer
                </Link>
              </div>
            </li>
          </ol>
        </div>
        {/* End Breadcrumbs */}
        <div className="w-full h-[calc(100vh-140px)] p-5 rounded-md shadow-md hover:shadow-indigo-200 bg-white ">
          <div className="flex w-full relative ">
            <div
              className={`w-[320px] h-full absolute z-10 md:left-0 md:relative transition-all  ${
                show ? '-left-5 -top-5' : '-left-[360px] top-0'
              }`}
            >
              <div className="w-full h-[calc(100vh-177px)] bg-gradient-to-l from-[#E5E5E5] to-white rounded-md md:rounded-r-none shadow-md md:shadow-none md:bg-transparent overflow-y-auto border-r">
                <div className="flex p-3 text-xl justify-between md:py-3 md:px-2 items-center border-b border-gray-300">
                  <h2 className="inline-flex justify-center items-center gap-2 font-medium">
                    <span>
                      <AiOutlineMessage />
                    </span>
                    Customers
                  </h2>
                  <span onClick={() => setShow(!show)} className="block cursor-pointer md:hidden">
                    <IoMdClose />
                  </span>
                </div>
                <div className="px-2">
                  {customers.map((c, i) => (
                    <Link key={i} to={`/seller/chat-customer/${c.friendId}`}>
                      <div
                        className={`mt-2 px-2 py-1.5 flex justify-start gap-2 items-center rounded-md cursor-pointer shadow hover:bg-slate-200 hover:border-l-2 border-blue-500 transition-all ease-in-out duration-300
                       ${customerId && c.friendId === customerId ? 'border-l-2 bg-white' : ''}`}
                      >
                        <div className="relative">
                          <img
                            className="w-[35px] h-35px] p-[2px] border-2 border-indigo-500 rounded-full"
                            src={
                              c.image ? c.image : 'http://localhost:3000/images/no_user_images.png'
                            }
                            alt=""
                          />
                          {activeCustomer.some((a) => a.customerId === c.friendId) && (
                            <div className="w-[12px] h-[12px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                          )}
                        </div>
                        <div className="flex justify-center items-start flex-col w-full">
                          <div className="flex justify-between items-center w-full">
                            <h2 className="text-base font-semibold text-gray-700">{c.name}</h2>
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
                {customerId ? (
                  customers.map((c, i) => {
                    if (currentCustomer._id === c.friendId) {
                      return (
                        <div key={i} className="flex justify-start items-center gap-3">
                          <div className="relative">
                            <img
                              className="w-[40px] h-[40px] p-[2px] border-2 border-indigo-500 rounded-full"
                              src={
                                c.image
                                  ? c.image
                                  : 'http://localhost:3000/images/no_user_images.png'
                              }
                              alt=""
                            />
                            {activeCustomer.some((a) => a.customerId === c.friendId) && (
                              <div className="w-[12px] h-[12px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                            )}
                          </div>
                          <h2 className="text-base font-semibold text-gray-700">{c.name}</h2>
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
                      <h2 className="text-base font-semibold text-gray-700">Select Customers</h2>
                    </div>
                  </>
                )}
                <div
                  onClick={() => setShow(!show)}
                  className="flex w-[35px] md:hidden h-[35px] rounded-md bg-blue-500 shadow-lg justify-center items-center text-white hover:shadow-blue-500/50"
                >
                  <span>
                    <FaList />
                  </span>
                </div>
              </div>
              <div className="py-3 ">
                <div className="h-[calc(100vh-290px)] bg-[#e5e5e5] rounded-md p-3 overflow-y-auto">
                  <div className="w-full flex flex-col gap-3">
                    {customerId ? (
                      seller_customer_messages.map((m, i) => {
                        if (m.senderId === customerId) {
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
                                      m.image
                                        ? m.image
                                        : 'http://localhost:3000/images/no_user_images.png'
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="flex justify-center items-start flex-col w-full bg-white border shadow text-gray-600 px-2 py-1 rounded-tl-lg rounded-tr-lg rounded-br-lg">
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
                              <div className="flex justify-start items-center gap-2  max-w-full lg:max-w-[85%]">
                                <div className="flex justify-center items-start flex-col w-full bg-blue-500 border shadow text-white px-2 py-1 rounded-tl-lg rounded-tr-lg rounded-bl-lg">
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
                        <div className="">
                          <div className="flex items-center gap-2 font-medium ">
                            <PiSelectionAllBold size={28} />
                            <span>Select Customer ...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <form
                onSubmit={handleSendMessageCustomer}
                className="flex gap-3 justify-center items-center"
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-[35px] flex px-2 border shadow border-gray-400 py-[5px] focus:border-blue-500 focus:shadow-indigo-200 rounded-md outline-none bg-transparent my-2 "
                  placeholder="Input Your Message"
                />
                <button
                  className="w-[70px] h-[35px] flex justify-center items-center font-semibold rounded-md shadow-md bg-blue-500 text-white 
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

export default ChatToCustomer

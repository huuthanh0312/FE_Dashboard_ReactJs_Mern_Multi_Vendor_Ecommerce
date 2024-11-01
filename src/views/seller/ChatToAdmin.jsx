import React, { useState } from 'react'
import { FaHome, FaList } from 'react-icons/fa'
import { IoIosArrowForward, IoIosSend, IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'

const ChatToAdmin = () => {
  return (
    <div>
      <div className="px-2 lg:px-5 pb-5">
        {/*  Breadcrumbs */}
        <div className="flex justify-start text-center text-[#383737] font-bold items-center px-4 py-2 mb-5 bg-white rounded-md shadow-md hover:shadow-indigo-200">
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
        <div className="w-full h-[calc(100vh-140px)] p-4 rounded-md shadow-md hover:shadow-indigo-200 bg-white ">
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
                    <div className="w-[12px] h-[12px] bg-green-500 rounded-full absolute right-0 bottom-0 animate-bounce"></div>
                  </div>
                  <h2 className="text-base font-semibold text-gray-700">Support</h2>
                </div>
              </div>
              <div className="py-3 ">
                <div className="h-[calc(100vh-290px)] bg-[#e5e5e5] rounded-md p-3 overflow-y-auto">
                  {/* message left*/}
                  <div className="w-full flex justify-start items-center">
                    <div className="flex justify-start items-center gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                      <div>
                        <img
                          className="w-[38px] h-[38px] max-w-[38px] p-[2px] border-2 border-indigo-500 rounded-full shadow-md shadow-blue-500/50"
                          src="http://localhost:3000/images/demo.jpg"
                          alt=""
                        />
                      </div>
                      <div className="flex justify-center items-start flex-col w-full bg-white shadow-lg shadow-blue-500/50 text-gray-700 px-2 py-1 rounded-md">
                        <span>How Are You?</span>
                      </div>
                    </div>
                  </div>
                  {/* end message */}

                  {/* message right*/}
                  <div className="w-full flex justify-end items-center">
                    <div className="flex justify-start items-center gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                      <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white px-2 py-1 rounded-md">
                        <span>How Are You?</span>
                      </div>
                      <div>
                        <img
                          className="w-[38px] h-[38px] max-w-[38px] p-[2px] border-2 border-sky-700 rounded-full shadow-md shadow-blue-500/50"
                          src="http://localhost:3000/images/admin.jpg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  {/* end message */}
                  {/* message left*/}
                  <div className="w-full flex justify-start items-center">
                    <div className="flex justify-start items-center gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                      <div>
                        <img
                          className="w-[38px] h-[38px] max-w-[38px] p-[2px] border-2 border-indigo-500 rounded-full shadow-md shadow-blue-500/50"
                          src="http://localhost:3000/images/demo.jpg"
                          alt=""
                        />
                      </div>
                      <div className="flex justify-center items-start flex-col w-full bg-white shadow-lg shadow-blue-500/50 text-gray-700 px-2 py-1 rounded-md">
                        <span>I Need some help ::))</span>
                      </div>
                    </div>
                  </div>
                  {/* end message */}
                </div>
              </div>
              <form action="" className="flex gap-3 justify-center items-center">
                <input
                  type="text"
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

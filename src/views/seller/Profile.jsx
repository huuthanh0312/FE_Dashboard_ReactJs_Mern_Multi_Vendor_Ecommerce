import React from 'react'
import { FaHome, FaImages, FaRegEdit } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { FadeLoader } from 'react-spinners'

const Profile = () => {
  const image = true
  const loader = true
  const status = 'active'
  const userInfo = false
  return (
    <div className="px-2 lg:px-5 pb-6 ">
      {/*  Breadcrumbs */}
      <div className="flex justify-start text-center text-[#383737] font-bold items-center px-5 py-2 mb-5 bg-white rounded-md shadow-md hover:shadow-indigo-200">
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
                Profile
              </Link>
            </div>
          </li>
        </ol>
      </div>
      {/* End Breadcrumbs  */}
      <div className="w-full flex flex-wrap ">
        <div className="w-full md:w-6/12 ">
          <div className="w-full p-4 bg-white rounded-md shadow-md hover:shadow-indigo-200">
            <div className="flex justify-center items-center py-3">
              {image ? (
                <label
                  htmlFor="img"
                  className="h-[180px] w-[200px] rounded-md shadow-md cursor-pointer relative overflow-hidden hover:shadow-indigo-200"
                >
                  <img src="http://localhost:3000/images/demo.jpg" alt="" />
                  {!loader && (
                    <div className="bg-slate-300 absolute top-0 left-0 pl-2 w-full h-full flex justify-center items-center opacity-50 z-20">
                      <FadeLoader />
                    </div>
                  )}
                </label>
              ) : (
                <label
                  className="flex justify-center items-center flex-col h-[180px] w-[200px] text-[#383737] rounded-md cursor-pointer border border-dashed border-blue-200 shadow-md hover:border-indigo-500 hover:shadow-indigo-200 relative"
                  htmlFor="img"
                >
                  <span className="flex justify-center items-center">
                    <FaImages size={30} />
                  </span>
                  <span className="font-semibold ">Select Image</span>
                  {loader && (
                    <div className="bg-slate-300 absolute top-0 left-0 pl-2 w-full h-full flex justify-center items-center opacity-50 z-20">
                      <FadeLoader />
                    </div>
                  )}
                </label>
              )}
              <input type="file" className="hidden" id="img" />
            </div>
            <div className="px-1 sm:px-2 py-2">
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#e5e5e5] rounded-md relative ">
                <span className="p-[4px] top-2 right-2 border-2 border-yellow-500 rounded-md shadow-lg shadow-yellow-700 text-yellow-600 hover:shadow-lg hover:shadow-yellow-500/50 hover:scale-110 absolute">
                  <FaRegEdit size={18} />
                </span>
                <div className="flex gap-2 ">
                  <span className="font-semibold">Name:</span>
                  <span>Thanh Nguyen</span>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-semibold">Email:</span>
                  <span>Thanh Nguyen</span>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-semibold">Role:</span>
                  <span>Thanh Nguyen</span>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-semibold">Status:</span>
                  <span>Thanh Nguyen</span>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-semibold">Payment Acount:</span>
                  <p>
                    {status === 'active' ? (
                      <span className="bg-green-500 text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded-md text-white">
                        Pending
                      </span>
                    ) : (
                      <span className="bg-blue-500 text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded-md shadow-md text-white">
                        Click Active
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-1 sm:px-2 py-2">
              {/* logic : if different userInfo show form and opposite */}
              {!userInfo && (
                <form>
                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="shop" className="font-semibold">
                      Shop Name
                    </label>
                    <input
                      type="text"
                      name="shop"
                      id="shop"
                      className="px-4 py-2 border-gray-400 focus:border-indigo-500 outline-none border rounded-md"
                      placeholder="Shop Name"
                    />
                  </div>
                  {/*  */}
                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="division" className="font-semibold">
                      Division Name
                    </label>
                    <input
                      type="text"
                      name="division"
                      id="division"
                      className="px-4 py-2 border-gray-400 focus:border-indigo-500 outline-none border rounded-md"
                      placeholder="Division Name"
                    />
                  </div>
                  {/*  */}
                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="district" className="font-semibold">
                      District Name
                    </label>
                    <input
                      type="text"
                      name="district"
                      id="district"
                      className="px-4 py-2 border-gray-400 focus:border-indigo-500 outline-none border rounded-md"
                      placeholder="District Name"
                    />
                  </div>
                  {/*  */}
                  {/*  */}
                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="sub_district" className="font-semibold">
                      Sub District Name
                    </label>
                    <input
                      type="text"
                      name="sub_district"
                      id="sub_district"
                      className="px-4 py-2 border-gray-400 focus:border-indigo-500 outline-none border rounded-md"
                      placeholder="Sub Division Name"
                    />
                  </div>
                  {/*  */}
                  <div>
                    <button className="w-full px-7 py-2 font-semibold rounded-md shadow-md my-2 bg-blue-900 text-white hover:scale-y-105 hover:shadow-indigo-200">
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-6/12">
          <div className="w-full pl-0 md:pl-5 mt-6 md:mt-0 rounded-md text-[#383737]">
            <div className="rounded-md text-[#383737] p-5 bg-white">
              <div className="flex text-lg p-2 font-bold uppercase border-b-2 border-blue-700 justify-center items-center bg-[#E5E5E5] rounded-t-md">
                <h2>Change Password</h2>
              </div>

              <form className="py-2">
                <div className="flex flex-col w-full gap-1 mb-2">
                  <label htmlFor="email" className="font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="px-4 py-2 border-gray-400 focus:border-indigo-500 outline-none border rounded-md"
                    placeholder="Email"
                  />
                </div>
                {/*  */}
                <div className="flex flex-col w-full gap-1 mb-2">
                  <label htmlFor="old_password" className="font-semibold">
                    Old Password
                  </label>
                  <input
                    type="password"
                    name="old_password"
                    id="old_password"
                    className="px-4 py-2 border-gray-400 focus:border-indigo-500 outline-none border rounded-md"
                    placeholder="Old Password"
                  />
                </div>
                {/*  */}
                <div className="flex flex-col w-full gap-1 mb-2">
                  <label htmlFor="new_password" className="font-semibold">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="new_password"
                    id="new_password"
                    className="px-4 py-2 border-gray-400 focus:border-indigo-500 outline-none border rounded-md"
                    placeholder="New Password"
                  />
                </div>
                {/*  */}

                <div>
                  <button className="w-full px-7 py-2 font-semibold rounded-md shadow-md my-2 bg-blue-900 text-white hover:scale-y-105 hover:shadow-indigo-200">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

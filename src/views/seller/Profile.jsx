import React, { useEffect, useState } from 'react'
import { FaHome, FaImages, FaRegEdit } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { ClipLoader, FadeLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeSellerInfo,
  messageClear,
  uploadSellerProfileImage
} from '../../store/Reducers/authReducer'
import toast from 'react-hot-toast'

const Profile = () => {
  const dispatch = useDispatch()
  const { userInfo, loader, successMessage, errorMessage } = useSelector((state) => state.auth) //state loader

  //upload image profile
  const addProfileImage = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData()
      formData.append('image', e.target.files[0])
      dispatch(uploadSellerProfileImage(formData))
    }
  }

  // use Effect check toast message error
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear()) //message clear function reudx
    }
    if (successMessage) {
      toast.success(successMessage)
      dispatch(messageClear()) //message clear function reudx
    }
  }, [errorMessage, successMessage])

  const [state, setState] = useState({
    division: '',
    district: '',
    shopName: '',
    sub_district: ''
  })
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  // add userInfo Seller
  const addSellerInfo = (e) => {
    e.preventDefault()
    dispatch(changeSellerInfo(state))
  }
  return (
    <div className="px-2 md:px-5 pb-6 ">
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
          <div className="w-full p-4 bg-white rounded-md shadow-md hover:shadow-indigo-200 relative">
            {/* Overlay only displays when loading */}
            {loader && (
              <div className="absolute inset-0 bg-gray-50 bg-opacity-70 flex justify-center items-center z-10">
                <ClipLoader color="#4A90E2" size={50} />
              </div>
            )}
            <div className="flex justify-center items-center py-3">
              {userInfo?.image ? (
                <label
                  htmlFor="img"
                  className="w-[200px] rounded-md shadow-lg cursor-pointer relative overflow-hidden hover:shadow-indigo-200 "
                >
                  <img src={userInfo.image} alt="" className="object-contain " />
                  {loader && (
                    <div className="bg-slate-300 absolute top-0 left-0 pl-2 w-full h-full flex justify-center items-center opacity-50 z-20">
                      <FadeLoader />
                    </div>
                  )}
                </label>
              ) : (
                <label
                  className="flex justify-center items-center flex-col h-[180px] w-[200px] bg-gray-200 text-[#383737] rounded-md cursor-pointer border border-dashed border-blue-200 shadow-md hover:border-indigo-500 hover:shadow-indigo-200 relative"
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
              <input onChange={addProfileImage} type="file" className="hidden" id="img" />
            </div>
            <div className="px-1 sm:px-2 py-2">
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#e5e5e5] rounded-md relative ">
                <span className="p-[4px] top-2 right-2 border-2 border-yellow-500 rounded-md shadow-lg hover:shadow-yellow-500/50 hover:text-yellow-600 hover:scale-105 absolute">
                  <FaRegEdit size={18} />
                </span>
                <div className="flex gap-2 ">
                  <span className="font-semibold">Name:</span>
                  <span>{userInfo.name}</span>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-semibold">Email:</span>
                  <span>{userInfo.email}</span>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-semibold">Role:</span>
                  <span>{userInfo.role}</span>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-semibold">Status:</span>
                  <span
                    className={`${
                      userInfo.status === 'active'
                        ? 'bg-green-500'
                        : userInfo.status === 'deactive'
                        ? 'bg-red-500'
                        : 'bg-indigo-500'
                    } text-xs cursor-pointer font-normal px-2 py-0.5 rounded-md text-center text-white`}
                  >
                    {userInfo.status}
                  </span>
                </div>
                <div className="flex gap-2 ">
                  <span className="font-semibold">Payment Acount:</span>
                  <p>
                    {userInfo.payment === 'active' ? (
                      <span className="bg-green-500 text-xs cursor-pointer font-norma px-2 py-0.5 rounded-md text-white">
                        {userInfo.payment}
                      </span>
                    ) : (
                      <span className="bg-blue-500 text-xs cursor-pointer font-normal px-2 py-1 rounded-md shadow-md text-white">
                        Click Active
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-1 sm:px-2 py-2 ">
              {/* logic : if different userInfo show form and opposite */}
              {userInfo?.shopInfo ? (
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#e5e5e5] rounded-md relative ">
                  <span className="p-[4px] top-2 right-2 border-2 border-yellow-500 rounded-md shadow-lg hover:shadow-yellow-500/50 hover:text-yellow-600 hover:scale-105 absolute">
                    <FaRegEdit size={18} />
                  </span>
                  <div className="flex gap-2 ">
                    <span className="font-semibold">Shop Name:</span>
                    <span>{userInfo.shopInfo?.shopName}</span>
                  </div>
                  <div className="flex gap-2 ">
                    <span className="font-semibold">Division:</span>
                    <span>{userInfo.shopInfo?.division}</span>
                  </div>
                  <div className="flex gap-2 ">
                    <span className="font-semibold">District:</span>
                    <span>{userInfo.shopInfo?.district}</span>
                  </div>
                  <div className="flex gap-2 ">
                    <span className="font-semibold">Sub District:</span>
                    <span>{userInfo.shopInfo?.sub_district}</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={addSellerInfo}>
                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="shopName" className="font-semibold">
                      Shop Name
                    </label>
                    <input
                      type="text"
                      value={state.shopName}
                      onChange={inputHandle}
                      name="shopName"
                      id="shopName"
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
                      value={state.division}
                      onChange={inputHandle}
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
                      value={state.district}
                      onChange={inputHandle}
                      name="district"
                      id="district"
                      className="px-4 py-2 border-gray-400 focus:border-indigo-500 outline-none border rounded-md"
                      placeholder="District Name"
                    />
                  </div>
                  {/*  */}
                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="sub_district" className="font-semibold">
                      Sub District Name
                    </label>
                    <input
                      type="text"
                      value={state.sub_district}
                      onChange={inputHandle}
                      name="sub_district"
                      id="sub_district"
                      className="px-4 py-2 border-gray-400 focus:border-indigo-500 outline-none border rounded-md"
                      placeholder="Sub Division Name"
                    />
                  </div>
                  {/*  */}
                  <div>
                    <button
                      disabled={loader ? true : false}
                      className={`w-full bg-blue-900 flex justify-center items-center gap-1 md:w-auto px-7 py-2 font-semibold rounded-md shadow-md my-2 hover:scale-y-105 text-white hover:shadow-indigo-200 
                    ${loader ? ' text-gray-400 ' : ''}`}
                    >
                      {loader ? <ClipLoader size={18} color="#ffffff" /> : ''}
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-6/12">
          <div className="w-full pl-0 md:pl-5 mt-6 md:mt-0">
            <div className="rounded-md p-5 bg-white shadow-md hover:shadow-indigo-200 relative">
              {/* Overlay only displays when loading */}
              {loader && (
                <div className="absolute inset-0 bg-gray-50 bg-opacity-70 flex justify-center items-center z-10">
                  <ClipLoader color="#4A90E2" size={50} />
                </div>
              )}
              <div className="flex text-lg p-2 font-bold uppercase  justify-center items-center bg-[#E5E5E5]">
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

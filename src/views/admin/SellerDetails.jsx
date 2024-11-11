import React, { useEffect, useState } from 'react'
import { FaHome } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'
import { ClipLoader, FadeLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { getSeller, messageClear, updateSellerStatus } from '../../store/Reducers/sellerReducer'

const SellerDetails = () => {
  const dispatch = useDispatch()
  const { loader, errorMessage, successMessage, seller } = useSelector((state) => state.seller) //state loader
  const { sellerId } = useParams()
  const [status, setStatus] = useState('')
  useEffect(() => {
    dispatch(getSeller(sellerId))
  }, [])

  const submitStatus = (e) => {
    e.preventDefault()
    dispatch(updateSellerStatus({ sellerId, status }))
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

  return (
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
                Seller Details
              </Link>
            </div>
          </li>
        </ol>
      </div>
      {/* End Breadcrumbs */}
      <div className="w-full flex flex-wrap p-5 rounded-md shadow-md hover:shadow-indigo-200 bg-white relative">
        {/* Overlay only displays when loading */}
        {loader && (
          <div className="absolute inset-0 bg-gray-50 bg-opacity-70 flex justify-center items-center z-10">
            <ClipLoader color="#4A90E2" size={30} />
          </div>
        )}
        <div className="w-full md:w-7/12 text-[#383737] px-0 md:pr-5 shadow-lg hover:shadow-indigo-200">
          <div className="flex text-lg uppercase font-bold p-1 border-b-2 border-blue-700 justify-center items-center bg-[#E5E5E5] rounded-t-md">
            <h2>Basic Info</h2>
          </div>
          <div className="flex rounded-b-md shadow-md">
            <div className="flex justify-center items-center md:items-start md:pt-6 pl-4 md:py-4 lg:pr-5 ">
              <img
                src={seller?.image ? seller?.image : 'http://localhost:3000/images/no_image.jpg'}
                className="w-[100px] sm:w-[120px] md:w-[150px] h-auto rounded-md shadow-lg shadow-gray-800"
                alt=""
              />
            </div>
            <div className="flex flex-col text-sm gap-2 py-4 px-2 sm:p-5 font-bold md:h-[200px]  ">
              <div className="flex gap-2 ">
                <span>Name: </span>
                <span>{seller?.name}</span>
              </div>
              <div className="flex gap-2 ">
                <span>Email: </span>
                <span>{seller?.email}</span>
              </div>
              <div className="flex gap-2 ">
                <span>Role: </span>
                <span>{seller?.role}</span>
              </div>
              <div className="flex gap-2">
                <span>Status: </span>
                <span>{seller?.status}</span>
              </div>
              <div className="flex gap-2 ">
                <span>Payment Status: </span>
                <span>{seller?.payment}</span>
              </div>
            </div>
          </div>
        </div>
        {/* end */}
        {/*  */}
        <div className="w-full md:w-5/12 mt-5 md:mt-0 text-[#383737] px-0 shadow-lg hover:shadow-indigo-200">
          <div className="flex text-lg p-1 font-bold uppercase border-b-2 border-blue-700 justify-center items-center bg-[#E5E5E5] rounded-t-md">
            <h2>Address</h2>
          </div>
          <div className="flex flex-col text-sm justify-items-center gap-2 border p-4 rounded-b-md font-bold md:h-[200px] shadow-md ">
            <div className="flex gap-2  ">
              <span>Shop Name: </span>
              <span>{seller?.shopInfo ? seller?.shopInfo?.shopName : 'No Data'}</span>
            </div>
            <div className="flex gap-2 ">
              <span>Division: </span>
              <span>{seller?.shopInfo ? seller?.shopInfo?.division : 'No Data'}</span>
            </div>
            <div className="flex gap-2 ">
              <span>District: </span>
              <span>{seller?.shopInfo ? seller?.shopInfo?.district : 'No Data'}</span>
            </div>
            <div className="flex gap-2 ">
              <span>State: </span>
              <span>{seller?.shopInfo ? seller?.shopInfo?.state : 'No Data'}</span>
            </div>
          </div>
        </div>
        {/* end */}
        <div className="">
          <form onSubmit={submitStatus}>
            <div className="flex gap-4 py-3">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                name=""
                id=""
                className="px-1 font-semibold border-2 my-2 outline-none bg-[#E5E5E5] border-blue-700 rounded-md text-center focus:border-blue-500"
              >
                <option value="">--Select Status--</option>
                <option value="active" selected={seller?.status === 'active'}>
                  Active
                </option>
                <option value="deactive" selected={seller?.status === 'deactive'}>
                  Deactive
                </option>
              </select>

              <button
                disabled={loader ? true : false}
                className={`w-full bg-blue-900 flex justify-center items-center gap-1 md:w-auto px-9 sm:px-12 py-2 font-semibold rounded-md shadow-md my-2 hover:scale-y-105 text-white hover:shadow-indigo-200 
                    ${loader ? ' text-gray-400 ' : ''}`}
              >
                {loader ? <ClipLoader size={18} color="#ffffff" /> : ''}
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SellerDetails

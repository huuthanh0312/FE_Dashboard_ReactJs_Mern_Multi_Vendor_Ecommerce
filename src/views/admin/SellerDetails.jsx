import React from 'react'
import { FaHome } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'

const SellerDetails = () => {
  return (
    <div className="px-2 lg:px-5 pb-5">
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
      <div className="w-full flex flex-wrap p-5 rounded-md shadow-md hover:shadow-indigo-200 bg-white ">
        <div className="w-3/12 flex justify-between items-center">
          <div>
            <img
              src="http://localhost:3000/images/admin.jpg"
              className="w-full h-full lg:h-[278px] border-2 border-black rounded-md"
              alt=""
            />
          </div>
        </div>
        {/*  */}
        <div className="w-4/12 text-[#383737] px-0 md:px-5 hover:scale-105">
          <div className="flex text-lg uppercase font-bold p-1 border-b-2 border-blue-700 justify-center items-center bg-[#E5E5E5] rounded-t-md">
            <h2>Basic Info</h2>
          </div>
          <div className="flex flex-col text-sm justify-items-center gap-2 border p-4 rounded-b-md font-bold md:h-[240px] shadow-md ">
            <div className="flex gap-2 ">
              <span>Name: </span>
              <span>Thanh Nguyen</span>
            </div>
            <div className="flex gap-2 ">
              <span>Email: </span>
              <span>Thanh Nguyen</span>
            </div>
            <div className="flex gap-2 ">
              <span>Role: </span>
              <span>seller</span>
            </div>
            <div className="flex gap-2">
              <span>Stats: </span>
              <span>Active</span>
            </div>
            <div className="flex gap-2 ">
              <span>Payment Status: </span>
              <span>Active</span>
            </div>
          </div>
        </div>
        {/* end */}
        {/*  */}
        <div className="w-5/12 text-[#383737] px-0 hover:scale-105">
          <div className="flex text-lg p-1 font-bold uppercase border-b-2 border-blue-700 justify-center items-center bg-[#E5E5E5] rounded-t-md">
            <h2>Address</h2>
          </div>
          <div className="flex flex-col text-sm justify-items-center gap-2 border p-4 rounded-b-md font-bold md:h-[240px] shadow-md ">
            <div className="flex gap-2  ">
              <span>Shop Name: </span>
              <span>Thanh Nguyen</span>
            </div>
            <div className="flex gap-2 ">
              <span>Division: </span>
              <span>Thanh Nguyen</span>
            </div>
            <div className="flex gap-2 ">
              <span>District: </span>
              <span>seller</span>
            </div>
            <div className="flex gap-2 ">
              <span>State: </span>
              <span>Active</span>
            </div>
          </div>
        </div>
        {/* end */}
        <div className="">
          <form>
            <div className="flex gap-4 py-3">
              <select
                name=""
                id=""
                className="px-1 font-semibold border-2 my-2 outline-none bg-[#E5E5E5] border-slate-700 rounded-md text-center focus:border-blue-500"
              >
                <option value="">--Seleter Status--</option>
                <option value="">Active</option>
                <option value="">Deactive</option>
              </select>
              <button className="w-full px-12 py-1.5 font-semibold text-blue-500 rounded-md shadow-md border-blue-500 border-2 my-2 hover:bg-blue-500 hover:text-white">
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

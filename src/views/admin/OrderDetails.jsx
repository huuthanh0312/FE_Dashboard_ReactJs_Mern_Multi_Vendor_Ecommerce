import React from 'react'
import { FaHome } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'

const OrderDetails = () => {
  return (
    <div>
      <div className="px-2 md:px-5 pb-6 ">
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
                  Order Details
                </Link>
              </div>
            </li>
          </ol>
        </div>
        {/* End Breadcrumbs  */}
        <div className="w-full p-5 bg-white rounded-md shadow-md hover:shadow-indigo-200">
          <div className="flex justify-between items-center px-4 font-semibold border-b pb-2 shadow-b-md">
            <h2 className="text-xl text-[#383737]">Order Details</h2>
            <select
              name=""
              id=""
              className="px-4 py-1.5 border-2 focus:border-indigo-500 outline-none bg-[#e5e5e5] rounded-md shadow-md text-[#383737]"
            >
              <option value="">pending</option>
              <option value="">processing</option>
              <option value="">warehouse</option>
              <option value="">placed</option>
              <option value="">cancelled</option>
            </select>
          </div>
          {/* end */}
          <div className="p-4">
            <div className="flex text-lg text-[#383737] ">
              <h2>#343434</h2>
              <span>3 Jan 2024</span>
            </div>
            <div className="flex flex-wrap">
              <div className="w-[35%]">
                <div className="pr-3 text-[#383737] text-lg">
                  <div className="flex flex-col gap-1 font-semibold">
                    <h2>Deliver To : Thanh Nguyen</h2>
                    <p>
                      <span className="text-sm">Ha Noi Viet Nam</span>
                    </p>
                  </div>
                  {/*  */}
                  <div className="flex justify-start items-center gap-3">
                    <h2>Payment Status: </h2>
                    <span className="text-base">Paid</span>
                  </div>
                  {/*  */}
                  <span>Price: $433</span>
                  {/*  */}
                  <div className="mt-4 p-2 flex flex-col justify-between items-center gap-4 bg-[#e5e5e5] rounded-md shadow-md">
                    <div className="text-[#383737]">
                      <div className="flex gap-3 text-md items-center">
                        <img
                          className="w-[50px] h-[50px] rounded-md"
                          src={`http://localhost:3000/images/category/1.jpg`}
                          alt=""
                        />
                        <div className="">
                          <h2>Product Name Here</h2>
                          <p>
                            <span>Brand : </span>
                            <span>Thanh Shop </span>

                            <span className="text-lg">Quantity: 3</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="mt-4 p-2 flex flex-col justify-between items-center gap-4 bg-[#e5e5e5] rounded-md shadow-md">
                    <div className="text-[#383737]">
                      <div className="flex gap-3 text-md items-center">
                        <img
                          className="w-[50px] h-[50px] rounded-md"
                          src={`http://localhost:3000/images/category/1.jpg`}
                          alt=""
                        />
                        <div className="">
                          <h2>Product Name Here</h2>
                          <p>
                            <span>Brand : </span>
                            <span>Thanh Shop </span>

                            <span className="text-lg">Quantity: 3</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="mt-4 p-2 flex flex-col justify-between items-center gap-4 bg-[#e5e5e5] rounded-md shadow-md">
                    <div className="text-[#383737]">
                      <div className="flex gap-3 text-md items-center">
                        <img
                          className="w-[50px] h-[50px] rounded-md"
                          src={`http://localhost:3000/images/category/1.jpg`}
                          alt=""
                        />
                        <div className="">
                          <h2>Product Name Here</h2>
                          <p>
                            <span>Brand : </span>
                            <span>Thanh Shop </span>

                            <span className="text-lg">Quantity: 3</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end dave 35% */}
              <div className="w-[65%]">
                <div className="pl-3">
                  <div className="flex flex-col bg-[#e5e5e5] rounded-md shadow-md py-4 ">
                    <div className="text-[#383737] px-4">
                      <div className="flex justify-start items-center gap-3">
                        <h2>Seller 1 Order : </h2>
                        <span>pending</span>
                      </div>
                      <div className="flex gap-3 text-md items-center mt-2">
                        <img
                          className="w-[50px] h-[50px] rounded-md"
                          src={`http://localhost:3000/images/category/1.jpg`}
                          alt=""
                        />
                        <div className="">
                          <h2>Product Name Here</h2>
                          <p>
                            <span>Brand : </span>
                            <span>Thanh Shop </span>

                            <span className="text-lg">Quantity: 3</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end dave 65% */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails

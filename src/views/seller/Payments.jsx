import React, { forwardRef } from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import {
  MdCurrencyExchange,
  MdOutlineAddShoppingCart,
  MdOutlineProductionQuantityLimits,
  MdOutlineRemoveShoppingCart
} from 'react-icons/md'
import { FixedSizeList as List } from 'react-window'

function handleOnWheel({ daltaY }) {
  console.log('handleOnWheel', daltaY)
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
))

const Payments = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const Row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm font-medium text-black">
        <div className="w-[10%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[30%] p-2  whitespace-nowrap">$343434</div>
        <div className="w-[30%] p-2  whitespace-nowrap">
          <span className="py-[2px] px-[5px] bg-blue-500 rounded-md text-sm text-white shadow-sm">
            Pending
          </span>
        </div>
        <div className="w-[30%] p-2 whitespace-nowrap ">12 Jub 2023</div>
      </div>
    )
  }
  return (
    <div>
      <div className="px-2 pb-6 md:px-5">
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
                  Payments
                </Link>
              </div>
            </li>
          </ol>
        </div>
        {/* End Breadcrumbs  */}
        {/*  */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="flex justify-between items-center p-5 bg-white rounded-md gap-3 shadow-lg hover:shadow-indigo-200">
            <div className="flex flex-col justify-start items-start text-[#383737]">
              <h2 className="text-2xl font-bold">$3434</h2>
              <span className="text-sm font-medium">Total Sale</span>
            </div>
            <div className="w-[45px] h-[45px] justify-center items-center flex rounded-full border-2 border-yellow-500 shadow-lg">
              <MdCurrencyExchange size="26px" />
            </div>
          </div>
          <div className="flex justify-between items-center p-5 bg-white rounded-md gap-3 shadow-lg hover:shadow-indigo-200">
            <div className="flex flex-col justify-start items-start text-[#383737]">
              <h2 className="text-2xl font-bold">$5067</h2>
              <span className="text-sm font-medium">Available Amount</span>
            </div>
            <div className="w-[45px] h-[45px] justify-center items-center flex rounded-full border-2 border-blue-500 shadow-lg">
              <MdOutlineProductionQuantityLimits size="26px" />
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between items-center p-5 bg-white rounded-md gap-3 shadow-lg hover:shadow-indigo-200">
            <div className="flex flex-col justify-start items-start text-[#383737]">
              <h2 className="text-2xl font-bold">$1006</h2>
              <span className="text-sm font-medium">WithDrawal Amount</span>
            </div>
            <div className="w-[45px] h-[45px] justify-center items-center flex rounded-full border-2 border-green-500 shadow-lg">
              <MdOutlineAddShoppingCart size="26px" />
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between items-center p-5 bg-white rounded-md gap-3 shadow-lg hover:shadow-indigo-200">
            <div className="flex flex-col justify-start items-start text-[#383737]">
              <h2 className="text-2xl font-bold">$48</h2>
              <span className="text-sm font-medium">Pending Amount</span>
            </div>
            <div className="w-[45px] h-[45px] justify-center items-center flex rounded-full border-2 border-red-500 shadow-lg">
              <MdOutlineRemoveShoppingCart size="26px" />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 py-5 gap-5 ">
          <div className="p-5 bg-white shadow-lg rounded-md text-[#383737] hover:shadow-indigo-200">
            <div className="text-lg font-semibold">
              <h2>Send Request</h2>
            </div>
            <div className="py-2 border-b">
              <form>
                <div className="flex gap-3">
                  <input
                    type="text"
                    min={0}
                    className="px-3 py-1 w-full border border-blue-900 hover:border-indigo-500 focus:border-indigo-500 outline-none rounded-md focus:shadow-lg text-[#383737]"
                    name="amount"
                    placeholder="Search"
                  />
                  <button className="px-6 py-1 font-semibold rounded-md shadow-md border-blue-900 border text-white bg-blue-800 active:scale-95 active:translate-y-[2px] transform transition duration-150 ease-in-out">
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="w-full">
              <div className="text-lg font-semibold pt-2">
                <h2>Pending Request</h2>
              </div>
              <div className="w-full overflow-x-auto py-4">
                <div className="flex bg-[#E5E5E5] uppercase text-sm font-bold min-w-[340px] border">
                  <div className="w-[10%] p-2">No</div>
                  <div className="w-[30%] p-2">Amount</div>
                  <div className="w-[30%] p-2">Status</div>
                  <div className="w-[30%] p-2">Date</div>
                </div>
                {
                  <List
                    style={{ minWidth: '340px' }}
                    className="List"
                    height={370}
                    itemCount={100}
                    itemSize={37}
                    outerElementType={outerElementType}
                  >
                    {Row}
                  </List>
                }
              </div>
            </div>
          </div>
          {/*  */}
          <div className="p-5 bg-white shadow-lg rounded-md text-[#383737] hover:shadow-indigo-200">
            <div className=" text-lg font-semibold border-b pb-2">
              <h2>Success WithDrawal</h2>
            </div>
            <div className="w-full py-4">
              <div className="w-full overflow-x-auto">
                <div className="flex bg-[#E5E5E5] uppercase text-sm font-bold min-w-[340px] border">
                  <div className="w-[10%] p-2">No</div>
                  <div className="w-[30%] p-2">Amount</div>
                  <div className="w-[30%] p-2">Status</div>
                  <div className="w-[30%] p-2">Date</div>
                </div>
                {
                  <List
                    style={{ minWidth: '340px' }}
                    className="List"
                    height={370}
                    itemCount={100}
                    itemSize={37}
                    outerElementType={outerElementType}
                  >
                    {Row}
                  </List>
                }
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  )
}

export default Payments

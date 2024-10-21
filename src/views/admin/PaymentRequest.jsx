import React, { forwardRef } from 'react'
import { FaHome } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'

import { FixedSizeList as List } from 'react-window'

function handleOnWheel({ daltaY }) {
  console.log('handleOnWheel', daltaY)
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
))
const PaymentRequest = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const Row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm font-semibold">
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2  whitespace-nowrap">$343434</div>
        <div className="w-[25%] p-2  whitespace-nowrap">
          <span className="py-[2px] px-[5px] bg-blue-500 rounded-md text-sm text-white shadow-sm">
            Pending
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap ">Pending</div>

        <div className="w-[25%] p-2 whitespace-nowrap">
          <button className="px-3 py-[2px] cursor-pointer bg-gray-100 border-2 border-blue-500 rounded-lg shadow-md hover:text-blue-600 hover:shadow-md hover:shadow-blue-500/50 hover:scale-110">
            Confirm
          </button>
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className="px-2 lg:px-5 pb-5 ">
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
                  Payment Request
                </Link>
              </div>
            </li>
          </ol>
        </div>
        {/* End Breadcrumbs  */}
        <div className="w-full p-4 rounded-md shadow-md hover:shadow-indigo-200 bg-white ">
          <h2 className="text-xl font-semibold rounded-sm bg-[#E5E5E5] text-center uppercase p-2 shadow-sm">
            Withdrawal Request
          </h2>
          <br />
          <div className="w-full">
            <div className="w-full overflow-x-auto">
              <div className="flex bg-[#E5E5E5] uppercase text-sm font-bold min-w-[340px] border">
                <div className="w-[25%] p-2">No</div>
                <div className="w-[25%] p-2">Amount</div>
                <div className="w-[25%] p-2">Status</div>
                <div className="w-[25%] p-2">Date</div>
                <div className="w-[25%] p-2">Action</div>
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
    </div>
  )
}

export default PaymentRequest

import React, { useState } from 'react'
import { LuArrowDownSquare } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import Pagination from '../Pagination'

const Orders = () => {
  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setsearchValue] = useState('')
  const [parPage, setParPage] = useState(5)
  const [show, setShow] = useState(false)

  return (
    <div className="px-2 lg:px-5 pb-6 ">
      <div className="w-full p-4 bg-white rounded-md shadow-md hover:shadow-indigo-200">
        <div className="flex justify-between items-center">
          <select
            onChange={(e) => {
              setParPage(parseInt(e.target.value))
            }}
            className="px-4 py-2 hover:border-indigo-500 outline-none border border-gray-400 rounded-md text-black shadow-md focus:shadow-indigo-200"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <input
            type="text"
            className="px-4 py-2 hover:border-indigo-500 focus:border-indigo-500 outline-none text-[#383737] border border-gray-400 rounded-md shadow-md focus:shadow-indigo-200"
            placeholder="search"
          />
        </div>
        {/* table */}
        <div className="relative mt-5 overflow-x-auto pb-1 ">
          <div className="w-full text-sm text-left ">
            <div className="text-sm uppercase bg-[#E5E5E5] border-1 px-2">
              <div className="flex justify-center items-center font-bold">
                <div className="py-3 w-[25%]">Order id</div>
                <div className="py-3 w-[13%]">Price</div>
                <div className="py-3 w-[18%]">Paymenr Status</div>
                <div className="py-3 w-[18%]">Order Status</div>
                <div className="py-3 w-[18%]">Action</div>
                <div className="py-3 w-[8%]">
                  <LuArrowDownSquare />
                </div>
              </div>
            </div>
            {/* body table */}
            <div
              className={`text-[#383737] 
						${
              show
                ? 'shadow-lg border-r px-1 border-l-4 border-l-[#3b82f6] text-blue-500 bg-gray-100'
                : 'border border-1 px-2 hover:text-blue-500 bg-white'
            }`}
            >
              <div className="flex justify-center items-start font-medium ">
                <div className="py-3 w-[25%] whitespace-nowrap">#34332</div>
                <div className="py-3 w-[13%]">$532</div>
                <div className="py-3 w-[18%]">Pending</div>
                <div className="py-3 w-[18%]">Pending</div>
                <div className="py-3 w-[18%]">
                  <Link>View</Link>
                </div>
                <div onClick={(e) => setShow(!show)} className="py-3 w-[8%]">
                  <LuArrowDownSquare />
                </div>
              </div>
            </div>
            <div className={show ? 'block border bg-white px-2 pb-2' : 'hidden'}>
              <div className="flex justify-center items-start font-medium border-b border-b-[#3b82f6] hover:text-blue-400">
                <div className="py-3 w-[25%] whitespace-nowrap px-2">#34332</div>
                <div className="py-3 w-[13%]">$532</div>
                <div className="py-3 w-[18%]">Pending</div>
                <div className="py-3 w-[18%]">Pending</div>
                <div className="py-3 w-[18%]">
                  <Link>View</Link>
                </div>
                <div className="py-3 w-[8%]"></div>
              </div>
              <div className="flex justify-center items-start font-medium border-b border-b-[#3b82f6] hover:text-blue-400">
                <div className="py-3 w-[25%] whitespace-nowrap px-2">#34332</div>
                <div className="py-3 w-[13%]">$532</div>
                <div className="py-3 w-[18%]">Pending</div>
                <div className="py-3 w-[18%]">Pending</div>
                <div className="py-3 w-[18%]">
                  <Link>View</Link>
                </div>
                <div className="py-3 w-[8%]"></div>
              </div>
            </div>
          </div>
        </div>
        {/* end table */}
        {/* Paginantion */}
        <div className="flex w-full justify-between items-center mt-2">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">1</span> to{' '}
            <span className="font-semibold text-gray-900 dark:text-white">10</span> of{' '}
            <span className="font-semibold text-gray-900 dark:text-white">100</span> Entries
          </span>
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}
            parPage={parPage}
            showItem={3}
          />
        </div>

        {/* end Paginantion */}
      </div>
    </div>
  )
}

export default Orders

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Pagination from '../Pagination'
import { FaEdit, FaEye, FaHome, FaImage, FaTrash } from 'react-icons/fa'
import { IoIosArrowForward, IoMdCloseCircle } from 'react-icons/io'

const SellerRequest = () => {
  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setsearchValue] = useState('')
  const [parPage, setParPage] = useState(5)
  const [show, setShow] = useState(false)
  return (
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
                Seller Request
              </Link>
            </div>
          </li>
        </ol>
      </div>
      {/* End Breadcrumbs */}
      <div className="w-full p-4 rounded-md shadow-md hover:shadow-indigo-200 bg-white">
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
        <div className="relative overflow-x-auto pt-4 ">
          <table className="w-full text-sm text-left rounded-md shadow-md">
            <thead className="uppercase border bg-[#E5E5E5]">
              <tr>
                <th className="py-3 px-4" scope="col">
                  No
                </th>

                <th className="py-3 px-4" scope="col">
                  Name
                </th>
                <th className="py-3 px-4" scope="col">
                  Email
                </th>
                <th className="py-3 px-4" scope="col">
                  Payment Status
                </th>

                <th className="py-3 px-4" scope="col">
                  Status
                </th>
                <th className="py-3 px-4" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((d, i) => (
                <tr className="hover:bg-gray-100 border">
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    {d}
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    huuthanh
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    huuthanh@gmail.com
                  </td>
                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    Active
                  </td>

                  <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                    Pending
                  </td>
                  <td scope="row" className="py-1 px-4 whitespace-nowrap">
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to="/admin/seller/details/:2"
                        className="p-[6px] bg-gray-100 border-2 border-green-500 rounded-md shadow-md hover:text-green-600 hover:shadow-lg hover:shadow-yellow-500/50 hover:scale-110"
                      >
                        <FaEye></FaEye>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* end table */}
        {/* Paginantion */}
        <div className="flex w-full justify-between items-center mt-2 ">
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

export default SellerRequest

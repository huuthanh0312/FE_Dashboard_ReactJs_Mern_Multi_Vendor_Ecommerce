import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Pagination from '../Pagination'
import { FaEdit, FaImage, FaTrash } from 'react-icons/fa'
import { IoMdCloseCircle } from 'react-icons/io'

const Category = () => {
  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setsearchValue] = useState('')
  const [parPage, setParPage] = useState(5)
  const [show, setShow] = useState(false)
  return (
    <div className="px-2 lg:px-5 pb-5 ">
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-white rounded-md shadow-md hover:shadow-indigo-200">
        <h1 className="text-[#383737] font-bold text-lg">Category</h1>
        <button
          onClick={() => setShow(true)}
          className="px-4 py-2 font-semibold text-blue-500 rounded-md shadow-md border-blue-500 border-2 my-2 hover:bg-blue-500 hover:text-white"
        >
          Add
        </button>
      </div>
      <div className="w-full flex flex-wrap ">
        <div className="w-full lg:w-7/12 p-4 rounded-md shadow-md hover:shadow-indigo-200 bg-white">
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
                    Image
                  </th>
                  <th className="py-3 px-4" scope="col">
                    Name
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
                      #343444
                    </td>
                    <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                      <img
                        className="w-[45px] h-[45px]"
                        src={`http://localhost:3000/images/category/${d}.jpg`}
                        alt=""
                      />
                    </td>
                    <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
                      Peding
                    </td>
                    <td scope="row" className="py-1 px-4 whitespace-nowrap">
                      <div className="flex justify-start items-center gap-4">
                        <Link className="p-[6px] bg-gray-100 border-2 border-yellow-500 rounded shadow-md hover:text-yellow-600 hover:shadow-lg hover:shadow-yellow-500/50 hover:scale-110">
                          <FaEdit></FaEdit>
                        </Link>
                        <Link className="p-[6px] border-2 border-red-500 rounded shadow-md hover:shadow-lg hover:text-red-600 hover:shadow-red-500/50 hover:scale-110">
                          <FaTrash></FaTrash>
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
        {/*  */}
        <div
          className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
            show ? 'right-0' : '-right-[340px]'
          } z-[9999] top-0 transition-all duration-500`}
        >
          <div className="w-full pl-5">
            <div className="h-screen lg:h-auto px-4 py-4 rounded-md shadow-md hover:shadow-indigo-200 bg-white">
              <h1 className="font-bold text-xl p-2 mb-4 w-full text-center border-b bg-gray-200 uppercase">
                Add Category
              </h1>
              <div
                onClick={() => setShow(false)}
                className="lg:hidden block border-2 border-red-500 fixed top-1 -ml-3 rounded-full shadow-md hover:shadow-gray-400 hover:bg-gray-200 hover:text-red-500 hover:border-gray-600"
              >
                <IoMdCloseCircle size={20} />
              </div>
              <form action="">
                <div className="flex flex-col w-full gap-1 mb-3 text-[#383737]">
                  <label htmlFor="name" className="text-[#383737] font-semibold">
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="px-4 py-2 border-gray-400 focus:border-indigo-500 outline-none border rounded-md"
                    name="category_name"
                    placeholder="Category Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="flex justify-center items-center flex-col h-[238px] font-semibold cursor-pointer border border-dashed hover:border-blue-500 w-full border-gray-400"
                  >
                    <span>
                      <FaImage size={24} />
                    </span>
                    <span>Select Image</span>
                  </label>
                  <input type="file" name="image" className="hidden" id="image" />

                  <button className="w-full px-7 py-2 font-semibold text-blue-500 rounded-md shadow-md border-blue-500 border-2 my-2 hover:bg-blue-500 hover:text-white">
                    Add Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* end */}
      </div>
    </div>
  )
}

export default Category

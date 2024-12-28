import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Pagination from '../Pagination'
import { FaEdit, FaEye, FaHome, FaImage, FaTrash } from 'react-icons/fa'
import { IoIosArrowForward, IoMdCloseCircle } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { getActiveSellers } from '../../store/Reducers/sellerReducer'
import Search from '../components/Search'
const Sellers = () => {
  const dispatch = useDispatch()
  const { loader, errorMessage, successMessage, sellers, totalSeller } = useSelector(
    (state) => state.seller
  )
  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setsearchValue] = useState('')
  const [parPage, setParPage] = useState(5)
  const [show, setShow] = useState(false)

  useEffect(() => {
    // object
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue
    }
    dispatch(getActiveSellers(obj))
  }, [currentPage, searchValue, parPage])
  return (
    <div className="px-2 md:px-5 pb-5 ">
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
                Sellers
              </Link>
            </div>
          </li>
        </ol>
      </div>
      {/* End Breadcrumbs  */}
      <div className="w-full p-5 rounded-md shadow-md hover:shadow-indigo-200 bg-white">
        {/* search */}
        <Search setParPage={setParPage} setSearchValue={setsearchValue} searchValue={searchValue} />
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
                  Shop Name
                </th>
                <th className="py-3 px-4" scope="col">
                  Email
                </th>
                <th className="py-3 px-4" scope="col">
                  District
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
              {sellers.map((s, i) => (
                <tr key={i} className="hover:bg-gray-100 border">
                  <td className="py-1.5 px-4 font-medium whitespace-nowrap">{i + 1}</td>
                  <td className="py-1.5 px-4 font-medium whitespace-nowrap">
                    <img
                      className="w-[40px] h-[40px] rounded-full"
                      src={s.image ? s.image : '/images/no_user_images.png'}
                      alt=""
                    />
                  </td>
                  <td className="py-1.5 px-4 font-medium whitespace-nowrap">{s.name}</td>
                  <td className="py-1.5 px-4 font-medium whitespace-nowrap">
                    {s.shopInfo?.shopName}
                  </td>
                  <td className="py-1.5 px-4 font-medium whitespace-nowrap">{s.email}</td>
                  <td className="py-1.5 px-4 font-medium whitespace-nowrap">
                    {s.shopInfo?.district}
                  </td>
                  <td className="py-1.5 px-4 font-medium whitespace-nowrap">
                    <span
                      className={`${
                        s.payment === 'active' ? 'bg-green-500' : 'bg-red-500'
                      } text-xs cursor-pointer font-normal px-2 py-0.5 rounded-md text-center text-white`}
                    >
                      {s.payment}
                    </span>
                  </td>
                  <td className="py-1.5 px-4 font-medium whitespace-nowrap">
                    <span
                      className={`${
                        s.status === 'active'
                          ? 'bg-green-500'
                          : s.status === 'deactive'
                          ? 'bg-red-500'
                          : 'bg-indigo-500'
                      } text-xs cursor-pointer font-normal px-2 py-0.5 rounded-md text-center text-white`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="py-1.5 px-4 whitespace-nowrap">
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/admin/seller/details/${s._id}`}
                        className="p-[6px] bg-gray-100 border-2 border-green-500 rounded-md shadow-md hover:text-green-600 hover:shadow-lg hover:shadow-yellow-500/50 hover:scale-110"
                      >
                        <FaEye />
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
        <div className="flex w-full justify-between items-center mt-3">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900">{currentPage}</span> to{' '}
            <span className="font-semibold text-gray-900">{parPage}</span> of{' '}
            <span className="font-semibold text-gray-900">{totalSeller}</span> Entries
          </span>
          {totalSeller > parPage && (
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalSeller}
              parPage={parPage}
              showItem={Math.floor(totalSeller / parPage)}
            />
          )}
        </div>
        {/* end Paginantion */}
      </div>
    </div>
  )
}

export default Sellers

import React, { useEffect, useState } from 'react'
import { LuArrowDownSquare } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import Pagination from '../Pagination'
import { FaEdit, FaEye, FaHome, FaTrash } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { getSellerOrders } from '../../store/Reducers/orderReducer'
import Search from '../components/Search'

const Orders = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const { myOrders, totalOrder } = useSelector((state) => state.order)
  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setsearchValue] = useState('')
  const [parPage, setParPage] = useState(5)
  console.log(currentPage, searchValue, parPage)
  useEffect(() => {
    // object
    const obj = {
      sellerId: userInfo._id,
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue
    }
    dispatch(getSellerOrders(obj))
  }, [currentPage, searchValue, parPage])

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
                Orders
              </Link>
            </div>
          </li>
        </ol>
      </div>
      {/* End Breadcrumbs  */}
      <div className="w-full p-5 bg-white rounded-md shadow-md hover:shadow-indigo-200">
        {/* search */}
        <Search setParPage={setParPage} setSearchValue={setsearchValue} searchValue={searchValue} />
        {/* table */}
        <div className="relative mt-5 overflow-x-auto pb-1 ">
          <table className="w-full text-sm text-left">
            <thead className="uppercase border bg-[#E5E5E5]">
              <tr>
                <th className="py-3 px-4" scope="col">
                  Order Id
                </th>
                <th className="py-3 px-4" scope="col">
                  Price
                </th>
                <th className="py-3 px-4" scope="col">
                  Payment Status
                </th>
                <th className="py-3 px-4" scope="col">
                  Order Status
                </th>
                <th className="py-3 px-4" scope="col">
                  Date
                </th>
                <th className="py-3 px-4" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((o, i) => (
                <tr key={i} className="hover:bg-gray-100 border">
                  <td className="py-1.5 px-4 font-medium whitespace-nowrap">#{o._id}</td>
                  <td className="py-1.5 px-4 font-medium whitespace-nowrap">${o.price}</td>
                  <td className="py-1.5 px-4 font-medium whitespace-nowrap">{o.payment_status}</td>
                  <td className="py-1.5 px-4 font-medium whitespace-nowrap">{o.delivery_status}</td>
                  <td className="py-1.5 px-4 font-medium whitespace-nowrap">{o.date}</td>
                  <td className="py-1.5 px-4 whitespace-nowrap">
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/seller/order/details/${o._id}`}
                        className="p-[6px] border-2 border-green-500 rounded-md shadow hover:text-green-600 hover:shadow-lg hover:shadow-green-500/50 active:scale-95 active:translate-y-[2px] transform transition duration-150 ease-in-out "
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
        <div className="flex w-full justify-between items-center mt-2">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900">{currentPage}</span> to{' '}
            <span className="font-semibold text-gray-900">{parPage}</span> of{' '}
            <span className="font-semibold text-gray-900">{totalOrder}</span> Entries
          </span>
          {totalOrder > parPage && (
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalOrder}
              parPage={parPage}
              showItem={Math.floor(totalOrder / parPage)}
            />
          )}
        </div>
        {/* end Paginantion */}
      </div>
    </div>
  )
}

export default Orders

import React, { useEffect, useState } from 'react'
import { LuArrowDownSquare } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import Pagination from '../Pagination'
import { FaEye, FaHome } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminOrders } from '../../store/Reducers/orderReducer'
import Search from '../components/Search'

const Orders = () => {
  const dispatch = useDispatch()
  const { loader, errorMessage, successMessage, myOrders, totalOrder } = useSelector(
    (state) => state.order
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
    dispatch(getAdminOrders(obj))
  }, [currentPage, searchValue, parPage])

  return (
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
          <div className="w-full text-sm text-left">
            <div className="text-sm uppercase bg-[#E5E5E5] border px-2">
              <div className="flex justify-center items-center font-bold">
                <div className="py-3 w-[25%]">Order id</div>
                <div className="py-3 w-[13%]">Price</div>
                <div className="py-3 w-[18%]">Payment Status</div>
                <div className="py-3 w-[18%]">Order Status</div>
                <div className="py-3 w-[18%]">Action</div>
                <div className="py-3 w-[8%]">{/* <LuArrowDownSquare size={20} /> */}</div>
              </div>
            </div>
            {/* body table */}
            {myOrders.map((o, i) => (
              <div key={i}>
                <div
                  className={`text-[#383737] 
						${
              show === o._id
                ? 'border-r px-2 border-l-4 border-l-[#3b82f6] text-blue-500 bg-gray-100'
                : 'border px-2 hover:text-blue-500 bg-white'
            }`}
                >
                  <div className="flex justify-center items-start font-medium">
                    <div className="py-3 w-[25%] whitespace-nowrap">#{o._id}</div>
                    <div className="py-3 w-[13%]">${o.price}</div>
                    <div className="py-3 w-[18%]">{o.payment_status}</div>
                    <div className="py-3 w-[18%]">{o.delivery_status}</div>
                    <div className="py-3 w-[18%]">
                      <Link to={`/admin/order/details/${o._id}`}>View</Link>
                    </div>
                    <div
                      onClick={(e) => setShow((prev) => (prev === o._id ? false : o._id))}
                      className="py-3 w-[8%] active:scale-95 active:translate-y-[2px] transform transition duration-150 ease-in-out"
                    >
                      <LuArrowDownSquare size={20} />
                    </div>
                  </div>
                </div>
                <div className={show === o._id ? 'block border bg-white' : 'hidden'}>
                  {o.suborders.map((so, j) => (
                    <div
                      key={j}
                      className="flex justify-center items-start font-medium hover:bg-slate-100 px-2"
                    >
                      <div className="py-3 w-[25%] whitespace-nowrap pl-2">#{so._id}</div>
                      <div className="py-3 w-[13%] pl-0.5">${so.price}</div>
                      <div className="py-3 w-[18%] pl-0.5">{so.payment_status}</div>
                      <div className="py-3 w-[18%] pl-0.5">{so.delivery_status}</div>
                      <div className="py-3 w-[18%]"></div>
                      <div className="py-3 w-[8%]"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
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

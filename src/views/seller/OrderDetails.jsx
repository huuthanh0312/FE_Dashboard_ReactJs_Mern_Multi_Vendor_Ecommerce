import React, { useEffect, useState } from 'react'
import { FaHome } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {
  getSellerOrderById,
  messageClear,
  updateSellerStatusOrder
} from '../../store/Reducers/orderReducer'
import toast from 'react-hot-toast'
import { LuCalendarDays } from 'react-icons/lu'

const OrderDetails = () => {
  const dispatch = useDispatch()
  const { order, loader, successMessage, errorMessage } = useSelector((state) => state.order)
  const orderId = useParams()
  const [status, setStatus] = useState('')
  useEffect(() => {
    dispatch(getSellerOrderById(orderId))
  }, [orderId])

  //
  useEffect(() => {
    setStatus(order?.delivery_status)
  }, [order])
  // handleStatusOrder
  // Kiểm tra và chuẩn hóa orderId
  const normalizedOrderId = typeof orderId === 'object' ? orderId.orderId : orderId
  const handleStatusOrder = (e) => {
    dispatch(
      updateSellerStatusOrder({ orderId: normalizedOrderId, info: { status: e.target.value } })
    )
    setStatus(e.target.value)
  }

  // use Effect check toast message error
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear()) //message clear function reudx
      //remove data old create success
    }
    if (successMessage) {
      toast.success(successMessage)
      dispatch(messageClear()) //message clear function reudx
    }
  }, [errorMessage, successMessage, dispatch])
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
          <div className="flex justify-between items-center font-semibold border-b pb-2 shadow-b-md">
            <h2 className="text-xl text-[#383737]">Order Details</h2>
            <select
              value={status}
              onChange={handleStatusOrder}
              name=""
              id=""
              className="px-4 py-1.5 outline-none rounded-md text-[#383737] border-2 border-blue-500 "
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="warehouse">Warehouse</option>
              <option value="placed">Placed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          {/* end */}
          <div className="p-4">
            <div className="flex flex-col md:flex-row justify-between items-start text-lg">
              <span className="text-md text-blue-500 font-semibold">#{order._id}</span>
              <span className="inline-flex gap-2 justify-center items-center font-medium">
                <LuCalendarDays /> {order.date}
              </span>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full">
                <div className="flex flex-col gap-1">
                  <h2>
                    Deliver To : <span className="font-medium">{order.shippingInfo?.name}</span>
                  </h2>
                  <span>
                    {order.shippingInfo?.address} {order.shippingInfo?.province}{' '}
                    {order.shippingInfo?.city} {order.shippingInfo?.area}
                  </span>
                </div>
                {/*  */}
                <div className="flex justify-start items-center gap-2">
                  <h2>Payment Status: </h2>
                  <span className="text-sm rounded-md text-white bg-blue-500 px-1.5 py-0.5">
                    {order.payment_status}
                  </span>
                </div>
                {/*  */}
                <div className="flex justify-start items-center gap-2">
                  <span>Price:</span>
                  <p className="text-orange-500 font-semibold">${order.price}</p>
                </div>
                {/*  */}
                <div className="w-full mt-4 p-2 flex flex-col justify-between items-start bg-[#eeeeee] rounded-md shadow">
                  {order.products &&
                    order.products.map((p, i) => (
                      <div
                        key={i}
                        className=" w-full flex gap-3 text-md items-center py-2 border-b"
                      >
                        <img className="w-[50px] h-[50px] rounded-md " src={p.images[0]} alt="" />
                        <div className="w-full">
                          <h2 className="font-semibold">{p.name}</h2>
                          <div className="flex justify-between items-start">
                            <p>
                              <span>Brand : </span>
                              <span>{p.brand}</span>
                            </p>
                            <p>
                              <span>Quantity : </span>
                              <span className="text-orange-500">{p.quantity}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/*  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails

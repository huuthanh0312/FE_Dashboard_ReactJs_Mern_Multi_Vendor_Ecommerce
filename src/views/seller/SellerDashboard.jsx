import React, { useEffect } from 'react'
import {
  MdCurrencyExchange,
  MdOutlineAddShoppingCart,
  MdOutlineProductionQuantityLimits,
  MdOutlineRemoveShoppingCart
} from 'react-icons/md'
import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSellerDashboardData } from '../../store/Reducers/dashboardReducer'
import { FaEye } from 'react-icons/fa'
import moment from 'moment'
import config from '../../utils/config'

const SellerDashboard = () => {
  const dispatch = useDispatch()
  const { totalSale, totalProduct, totalOrder, totalPendingOrder, recentMessages, recentOrders } =
    useSelector((state) => state.dashboard)
  const { userInfo } = useSelector((state) => state.auth)
  useEffect(() => {
    dispatch(getSellerDashboardData())
  }, [dispatch])
  const state = {
    series: [
      {
        name: 'Orders',
        data: [23, 27, 34, 45, 66, 78, 80, 47, 62, 55, 78, 40]
      },
      {
        name: 'Revenew',
        data: [67, 24, 45, 34, 38, 68, 88, 48, 23, 92, 34, 58]
      },
      {
        name: 'Seller',
        data: [40, 60, 21, 67, 23, 33, 42, 78, 41, 45, 23, 98]
      }
    ],
    options: {
      color: ['#181ee8', '#181ee8'],
      plotOptions: {
        radius: 30
      },
      chart: { background: 'transparent', foreColor: '#d0d2d6' },
      dataLabels: { enabled: false },
      strock: {
        show: true,
        curve: ['smooth', 'straight', 'stepline'],
        lineCap: 'butt',
        color: '#f0f0f0',
        width: '.5',
        dashArray: 0
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]
      },
      legend: {
        position: 'top'
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ]
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true
              }
            },
            chart: {
              height: '550px'
            }
          }
        }
      ]
    }
  }
  return (
    <div>
      <div className="px-2 pb-6 md:px-5">
        {/*  */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="flex justify-between items-center p-5 bg-white rounded-md gap-3 shadow-lg hover:shadow-indigo-200">
            <div className="flex flex-col justify-start items-start text-[#383737]">
              <h2 className="text-3xl font-bold">${totalSale}</h2>
              <span className="text-md font-medium">Total Sale</span>
            </div>
            <div className="w-[50px] h-[50px] justify-center items-center flex rounded-full border-2 border-yellow-500 shadow-lg">
              <MdCurrencyExchange size="26px" />
            </div>
          </div>
          <div className="flex justify-between items-center p-5 bg-white rounded-md gap-3 shadow-lg hover:shadow-indigo-200">
            <div className="flex flex-col justify-start items-start text-[#383737]">
              <h2 className="text-3xl font-bold">{totalProduct}</h2>
              <span className="text-md font-medium">Products</span>
            </div>
            <div className="w-[50px] h-[50px] justify-center items-center flex rounded-full border-2 border-blue-500 shadow-lg">
              <MdOutlineProductionQuantityLimits size="26px" />
            </div>
          </div>

          <div className="flex justify-between items-center p-5 bg-white rounded-md gap-3 shadow-lg hover:shadow-indigo-200">
            <div className="flex flex-col justify-start items-start text-[#383737]">
              <h2 className="text-3xl font-bold">{totalOrder}</h2>
              <span className="text-md font-medium">Orders</span>
            </div>
            <div className="w-[50px] h-[50px] justify-center items-center flex rounded-full border-2 border-green-500 shadow-lg">
              <MdOutlineAddShoppingCart size="26px" />
            </div>
          </div>

          <div className="flex justify-between items-center p-5 bg-white rounded-md gap-3 shadow-lg hover:shadow-indigo-200">
            <div className="flex flex-col justify-start items-start text-[#383737]">
              <h2 className="text-3xl font-bold">{totalPendingOrder}</h2>
              <span className="text-md font-medium">Pending Orders</span>
            </div>
            <div className="w-[50px] h-[50px] justify-center items-center flex rounded-full border-2 border-red-500 shadow-lg">
              <MdOutlineRemoveShoppingCart size="26px" />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="w-full flex flex-wrap py-5 ">
          <div className="w-full lg:w-7/12 lg:pr-5 ">
            <div className="w-full h-full bg-white p-4 shadow-lg rounded-md hover:shadow-indigo-200">
              <Chart options={state.options} series={state.series} type="bar" height={360} />
            </div>
          </div>
          <div className="w-full lg:w-5/12 py-6 lg:py-0 ">
            <div className="w-full bg-white p-4 shadow-lg rounded-md hover:shadow-indigo-200">
              <div className="flex justify-between items-center pb-3 text-lg font-semibold text-[#383737] ">
                <h2 className="">Recent Customer Message</h2>
                <Link to="/seller/chat-customer" className="hover:text-blue-500">
                  View All
                </Link>
              </div>
              <div className="flex flex-col gap-2 pt-6 text-[#383737] bg-[#E5E5E5] p-4 rounded-md overflow-y-auto max-h-[340px]">
                <ol className="relative border-1 border-slate-600 ml-4">
                  {recentMessages.map((m, i) => (
                    <li key={i} className="mb-3 ml-6">
                      <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[2px] bg-[#4c7fe2] rounded-full z-10">
                        <img
                          src={
                            m.senderId === userInfo._id
                              ? userInfo.image
                              : `${config.BASE_URL}/images/seller.png`
                          }
                          className="h-full w-full rounded-full shadow-lg"
                          alt=""
                        />
                      </div>
                      <div className="p-3 bg-gray-300 rounded-lg border border-slate-600 shadow-sm">
                        <div className="flex justify-between items-center mb-2 font-semibold">
                          <div className="text-md ">{m.senderName}</div>
                          <time className="mb-1 text-sm sm:order-last">
                            {moment(m.createdAt).startOf('hour').fromNow()}
                          </time>
                        </div>
                        <div className="p-2 text-xs font-normal bg-white rounded-lg border border-slate-800">
                          {m.message}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="w-full p-4 bg-white shadow-lg rounded-md text-[#383737] hover:shadow-indigo-200">
          <div className="flex justify-between items-center pb-3 text-lg font-semibold">
            <h2 className="pb-3 text-lg">Recent Orders</h2>
            <Link to="/seller/orders" className="hover:text-blue-500">
              View All
            </Link>
          </div>
          <div className="relative overflow-x-auto ">
            <table className="w-full text-sm text-left ">
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
                    Active
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr className="hover:bg-gray-100 border">
                    <td className="py-2 px-4 font-medium whitespace-nowrap">#{order._id}</td>
                    <td className="py-2 px-4 font-medium whitespace-nowrap">${order.price}</td>
                    <td className="py-2 px-4 font-medium whitespace-nowrap">
                      {order.payment_status}
                    </td>
                    <td className="py-2 px-4 font-medium whitespace-nowrap">
                      {order.delivery_status}
                    </td>
                    <td className="py-2 px-4 font-medium whitespace-nowrap">
                      <div className="flex justify-start items-center gap-4">
                        <Link
                          to={`/seller/order/details/${order._id}`}
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
        </div>
      </div>
    </div>
  )
}

export default SellerDashboard

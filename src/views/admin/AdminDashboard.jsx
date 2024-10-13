import React from 'react'
import { FaShoppingCart, FaUser, FaUsers } from 'react-icons/fa'
import { MdCurrencyExchange, MdOutlineProductionQuantityLimits } from 'react-icons/md'
import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
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
      <div className="px-2 md:px-5">
        {/*  */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
          <div className="flex justify-between items-center p-5 bg-white rounded-md gap-3 shadow-lg md:hover:scale-105 hover:shadow-indigo-200">
            <div className="flex flex-col justify-start items-start text-[#383737]">
              <h2 className="text-3xl font-bold">$3434</h2>
              <span className="text-md font-medium">Total Sale</span>
            </div>
            <div className="w-[50px] h-[50px] justify-center items-center flex rounded-full border-2 border-yellow-500 shadow-lg">
              <MdCurrencyExchange size="26px" />
            </div>
          </div>
          <div className="flex justify-between items-center p-5 bg-white rounded-md gap-3 shadow-lg md:hover:scale-105 hover:shadow-indigo-200">
            <div className="flex flex-col justify-start items-start text-[#383737]">
              <h2 className="text-3xl font-bold">50</h2>
              <span className="text-md font-medium">Product</span>
            </div>
            <div className="w-[50px] h-[50px] justify-center items-center flex rounded-full border-2 border-blue-500 shadow-lg">
              <MdOutlineProductionQuantityLimits size="26px" />
            </div>
          </div>

          <div className="flex justify-between items-center p-5 bg-white rounded-md gap-3 shadow-lg md:hover:scale-105 hover:shadow-indigo-200">
            <div className="flex flex-col justify-start items-start text-[#383737]">
              <h2 className="text-3xl font-bold">10</h2>
              <span className="text-md font-medium">Seller</span>
            </div>
            <div className="w-[50px] h-[50px] justify-center items-center flex rounded-full border-2 border-green-500 shadow-lg">
              <FaUsers size="26px" />
            </div>
          </div>

          <div className="flex justify-between items-center p-5 bg-white rounded-md gap-3 shadow-lg md:hover:scale-105 hover:shadow-indigo-200">
            <div className="flex flex-col justify-start items-start text-[#383737]">
              <h2 className="text-3xl font-bold">$3434</h2>
              <span className="text-md font-medium">Orders</span>
            </div>
            <div className="w-[50px] h-[50px] justify-center items-center flex rounded-full border-2 border-red-500 shadow-lg">
              <FaShoppingCart size="26px" />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="w-full flex flex-wrap py-6 ">
          <div className="w-full lg:w-7/12 lg:pr-5 ">
            <div className="w-full h-full bg-white p-4 shadow-lg rounded-md hover:shadow-indigo-200">
              <Chart options={state.options} series={state.series} type="bar" height={360} />
            </div>
          </div>
          <div className="w-full lg:w-5/12 py-6 lg:py-0 ">
            <div className="w-full bg-white p-4 shadow-lg rounded-md hover:shadow-indigo-200">
              <div className="flex justify-between items-center pb-3 text-lg font-semibold text-[#383737] border-b-2">
                <h2 className="">Recent Seller Message</h2>
                <Link className="">View All</Link>
              </div>
              <div className="flex flex-col gap-2 pt-6 text-[#383737] ">
                <ol className="relative border-1 border-slate-600 ml-4">
                  <li className="mb-3 ml-6">
                    <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[2px] bg-[#4c7fe2] rounded-full z-10">
                      <img
                        src="http://localhost:3000/images/admin.png"
                        className="h-full w-full rounded-full shadow-lg"
                        alt=""
                      />
                    </div>
                    <div className="p-3 bg-gray-300 rounded-lg border border-slate-600 shadow-sm">
                      <div className="flex justify-between items-center mb-2 font-semibold">
                        <Link className="text-md ">Admin</Link>
                        <time className="mb-1 text-sm sm:order-last">2 day ago</time>
                      </div>
                      <div className="p-2 text-xs font-normal bg-white rounded-lg border border-slate-800">
                        How Are You
                      </div>
                    </div>
                  </li>
                  <li className="mb-3 ml-6">
                    <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[2px] bg-[#4c7fe2] rounded-full z-10">
                      <img
                        src="http://localhost:3000/images/admin.png"
                        className="h-full w-full rounded-full shadow-lg"
                        alt=""
                      />
                    </div>
                    <div className="p-3 bg-gray-300 rounded-lg border border-slate-600 shadow-sm">
                      <div className="flex justify-between items-center mb-2 font-semibold">
                        <Link className="text-md ">Admin</Link>
                        <time className="mb-1 text-sm sm:order-last">2 day ago</time>
                      </div>
                      <div className="p-2 text-xs font-normal bg-white rounded-lg border border-slate-800">
                        How Are You
                      </div>
                    </div>
                  </li>
                  <li className="mb-3 ml-6">
                    <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[2px] bg-[#4c7fe2] rounded-full z-10">
                      <img
                        src="http://localhost:3000/images/admin.png"
                        className="h-full w-full rounded-full shadow-lg"
                        alt=""
                      />
                    </div>
                    <div className="p-3 bg-gray-300 rounded-lg border border-slate-600 shadow-sm">
                      <div className="flex justify-between items-center mb-2 font-semibold">
                        <Link className="text-md ">Admin</Link>
                        <time className="mb-1 text-sm sm:order-last">2 day ago</time>
                      </div>
                      <div className="p-2 text-xs font-normal bg-white rounded-lg border border-slate-800">
                        How Are You
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

import React, { forwardRef, useEffect, useState } from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import {
  MdCurrencyExchange,
  MdOutlineAddShoppingCart,
  MdOutlineProductionQuantityLimits,
  MdOutlineRemoveShoppingCart
} from 'react-icons/md'
import { FixedSizeList as List } from 'react-window'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSellerPaymentDetails,
  messageClear,
  sendWithdrawRequestForSeller
} from '../../store/Reducers/paymentReducer'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-hot-toast'
import moment from 'moment'

function handleOnWheel({ daltaY }) {
  console.log('handleOnWheel', daltaY)
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
))

const Payments = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const {
    pendingWithdraws,
    successWithdraws,
    totalAmount,
    pendingAmount,
    withdrawAmount,
    availableAmount,
    loader,
    errorMessage,
    successMessage
  } = useSelector((state) => state.payment)
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    //console.log(userInfo._id)
    dispatch(getSellerPaymentDetails(userInfo._id))
  }, [])

  // handle Submit Withdraw request
  const hanldeSendWithdrawRequest = (e) => {
    e.preventDefault()
    // min payment request 5$
    if (availableAmount - amount > 5) {
      dispatch(sendWithdrawRequestForSeller({ amount, sellerId: userInfo._id }))
      setAmount(0)
    } else {
      toast.error('Insufficient balance for withdrawal. Minimum amount is $5.')
    }
  }

  // use Effect check toast message error
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear()) //message clear function reudx
    }
    if (successMessage) {
      toast.success(successMessage)
      dispatch(messageClear()) //message clear function reudx
    }
  }, [errorMessage, successMessage, dispatch])
  const RowPendingWithdraw = ({ index, style }) => {
    return (
      <div
        style={style}
        className="flex justify-center items-center text-base font-medium text-black hover:bg-slate-100 border-b"
      >
        <div className="w-[10%] px-2 py-3 whitespace-nowrap items-center">{index + 1}</div>
        <div className="w-[25%] px-2 py-3 whitespace-nowrap">
          ${pendingWithdraws[index]?.amount}
        </div>
        <div className="w-[25%] px-2 py-3 whitespace-nowrap">
          <span className="py-[2px] px-[5px] bg-blue-500 rounded-md text-sm text-white shadow-sm">
            {pendingWithdraws[index]?.status}
          </span>
        </div>
        <div className="w-[40%] px-2 py-3 whitespace-nowrap ">
          {moment(pendingWithdraws[index]?.createdAt).format('LL')}
        </div>
      </div>
    )
  }

  const RowSuccessWithdraw = ({ index, style }) => {
    return (
      <div
        style={style}
        className="flex justify-center items-center text-base font-medium text-black hover:bg-slate-100 border-b"
      >
        <div className="w-[10%] px-2 py-3 whitespace-nowrap items-center">{index + 1}</div>
        <div className="w-[25%] px-2 py-3 whitespace-nowrap">
          ${successWithdraws[index]?.amount}
        </div>
        <div className="w-[25%] px-2 py-3 whitespace-nowrap">
          <span className="py-[2px] px-[5px] bg-green-500 rounded-md text-sm text-white shadow-sm">
            {successWithdraws[index]?.status}
          </span>
        </div>
        <div className="w-[40%] px-2 py-3 whitespace-nowrap ">
          {moment(successWithdraws[index]?.createdAt).format('LL')}
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className="px-2 pb-6 md:px-5">
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
                  Payments
                </Link>
              </div>
            </li>
          </ol>
        </div>
        {/* End Breadcrumbs  */}
        {/*  */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="flex justify-between items-center p-5 bg-white rounded-md shadow-lg hover:shadow-indigo-200">
            <div className="flex flex-col justify-start items-start text-[#383737]">
              <h2 className="text-2xl font-bold">${totalAmount}</h2>
              <span className="text-base font-semibold">Total Amount</span>
            </div>
            <div className="w-[42px] h-[42px] justify-center items-center flex rounded-full border-2 border-yellow-500 shadow-lg">
              <MdCurrencyExchange size="24px" />
            </div>
          </div>
          <div className="flex justify-between items-center p-5 bg-white rounded-md shadow-lg hover:shadow-indigo-200">
            <div className="flex flex-col justify-start items-start text-[#383737]">
              <h2 className="text-2xl font-bold">${availableAmount}</h2>
              <span className="text-base font-semibold">Available Amount</span>
            </div>
            <div className="w-[42px] h-[42px] justify-center items-center flex rounded-full border-2 border-blue-500 shadow-lg">
              <MdCurrencyExchange size="24px" />
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between items-center p-5 bg-white rounded-md shadow-lg hover:shadow-indigo-200">
            <div className="flex flex-col justify-start items-start text-[#383737]">
              <h2 className="text-2xl font-bold">${withdrawAmount}</h2>
              <span className="text-base font-semibold">Withdrawal Amount</span>
            </div>
            <div className="w-[42px] h-[42px] justify-center items-center flex rounded-full border-2 border-green-500 shadow-lg">
              <MdCurrencyExchange size="24px" />
            </div>
          </div>
          {/*  */}
          <div className="flex justify-between items-center p-5 bg-white rounded-md shadow-lg hover:shadow-indigo-200">
            <div className="flex flex-col justify-start items-start text-[#383737]">
              <h2 className="text-2xl font-bold">${pendingAmount}</h2>
              <span className="text-base font-semibold">Pending Amount</span>
            </div>
            <div className="w-[42px] h-[42px] justify-center items-center flex rounded-full border-2 border-red-500 shadow-lg">
              <MdCurrencyExchange size="24px" />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 py-5 gap-5 ">
          <div className="px-5 py-2 bg-white shadow-lg rounded-md text-[#383737] hover:shadow-indigo-200">
            <div className="py-2 border-b gap-3 ">
              <form
                onSubmit={hanldeSendWithdrawRequest}
                className="w-full flex flex-wrap gap-3 items-center"
              >
                <label className="text-lg font-semibold whitespace-nowrap">
                  Withdrawal Request:
                </label>
                <div className="flex gap-3 flex-grow flex-wrap relative">
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none">
                    <MdCurrencyExchange className=" text-blue-800" size={20} />
                  </div>
                  <input
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount || ''}
                    min={0}
                    max={availableAmount}
                    className="pl-7 py-1 flex-grow border-b-2 border-blue-900 hover:border-indigo-500 focus:border-indigo-500 outline-none text-[#383737] min-w-[60px]"
                    name="amount"
                    placeholder="Withdraw..."
                  />
                  <button
                    disabled={loader}
                    className="px-3 py-1 font-semibold rounded-md shadow-md border-blue-700 border items-center text-white bg-blue-500 active:scale-95 active:translate-y-[2px] transform transition duration-150 ease-in-out"
                  >
                    {loader ? (
                      <span className="px-4">
                        <ClipLoader color="#ffffff" size={16} />
                      </span>
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
              </form>
            </div>
            <div className="w-full">
              <div className="text-lg font-semibold pt-2">
                <h2>Pending Request</h2>
              </div>
              <div className="w-full overflow-x-auto py-4">
                <div className="flex bg-[#E5E5E5] uppercase text-sm font-bold min-w-[340px] border">
                  <div className="w-[10%] p-2">No</div>
                  <div className="w-[25%] p-2">Amount</div>
                  <div className="w-[25%] p-2">Status</div>
                  <div className="w-[40%] p-2">Date</div>
                </div>
                {
                  <List
                    style={{ minWidth: '350px' }}
                    className="List"
                    height={370}
                    itemCount={pendingWithdraws.length}
                    itemSize={35}
                    outerElementType={outerElementType}
                  >
                    {RowPendingWithdraw}
                  </List>
                }
              </div>
            </div>
          </div>
          {/*  */}
          <div className="px-5 py-2 bg-white shadow-lg rounded-md text-[#383737] hover:shadow-indigo-200">
            <div className="py-3 text-lg font-semibold border-b pb-2">
              <h2>Successful Withdrawals</h2>
            </div>
            <div className="w-full py-4">
              <div className="w-full overflow-x-auto">
                <div className="flex bg-[#E5E5E5] uppercase text-sm font-bold min-w-[340px] border">
                  <div className="w-[10%] p-2">No</div>
                  <div className="w-[25%] p-2">Amount</div>
                  <div className="w-[25%] p-2">Status</div>
                  <div className="w-[40%] p-2">Date</div>
                </div>
                {
                  <List
                    style={{ minWidth: '350px' }}
                    className="List"
                    height={370}
                    itemCount={successWithdraws?.length}
                    itemSize={35}
                    outerElementType={outerElementType}
                  >
                    {RowSuccessWithdraw}
                  </List>
                }
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  )
}

export default Payments

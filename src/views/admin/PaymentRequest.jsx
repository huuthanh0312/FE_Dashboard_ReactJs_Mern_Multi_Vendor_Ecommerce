import React, { forwardRef, useEffect, useState } from 'react'
import { FaHome } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FixedSizeList as List } from 'react-window'
import {
  adminConfirmRequestPayment,
  getAdminPaymentRequests,
  messageClear
} from '../../store/Reducers/paymentReducer'
import moment from 'moment'
import { ClipLoader, PulseLoader } from 'react-spinners'
import toast from 'react-hot-toast'

function handleOnWheel({ daltaY }) {
  console.log('handleOnWheel', daltaY)
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
))
const PaymentRequest = () => {
  const dispatch = useDispatch()
  const { pendingWithdraws, loader, errorMessage, successMessage } = useSelector(
    (state) => state.payment
  )
  const [paymentId, setPaymentId] = useState('')
  useEffect(() => {
    dispatch(getAdminPaymentRequests())
  }, [])

  // handle admin confirm request payment
  const handleComfirmRequest = (id) => {
    setPaymentId(id)
    dispatch(adminConfirmRequestPayment(id))
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

  const Row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm font-semibold">
        <div className="w-[10%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[20%] p-2  whitespace-nowrap">${pendingWithdraws[index]?.amount}</div>
        <div className="w-[20%] p-2  whitespace-nowrap">
          <span className="py-[2px] px-[5px] bg-blue-500 rounded-md text-sm text-white shadow-sm">
            {pendingWithdraws[index]?.status}
          </span>
        </div>
        <div className="w-[30%] p-2 whitespace-nowrap ">
          {' '}
          {moment(pendingWithdraws[index]?.createdAt).format('LL')}
        </div>

        <div className="w-[20%] p-2 whitespace-nowrap">
          <button
            disabled={loader}
            onClick={() => handleComfirmRequest(pendingWithdraws[index]?._id)}
            className="px-3 py-[2px] cursor-pointer bg-gray-100 border-2 border-blue-500 rounded-lg flex justify-center items-center shadow hover:text-blue-600 hover:shadow-blue-500/50 active:scale-95 
          active:translate-y-[2px] transform transition duration-150 ease-in-out"
          >
            {loader && paymentId === pendingWithdraws[index]?._id ? (
              <p className="inline-flex items-end whitespace-nowrap text-blue-500">
                Loading <PulseLoader size={3} color="#3b82f6" className="pb-1" />
              </p>
            ) : (
              'Confirm'
            )}
          </button>
        </div>
      </div>
    )
  }
  return (
    <div>
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
                  Payment Request
                </Link>
              </div>
            </li>
          </ol>
        </div>
        {/* End Breadcrumbs  */}
        <div className="w-full p-5 rounded-md shadow-md hover:shadow-indigo-200 bg-white ">
          <h2 className="text-xl font-bold rounded-md bg-[#E5E5E5] text-center uppercase p-2 shadow-sm">
            Withdrawal Request
          </h2>
          <br />
          <div className="w-full">
            <div className="w-full overflow-x-auto">
              <div className="flex bg-[#E5E5E5] uppercase text-sm font-bold min-w-[340px] border">
                <div className="w-[10%] p-2">No</div>
                <div className="w-[20%] p-2">Amount</div>
                <div className="w-[20%] p-2">Status</div>
                <div className="w-[30%] p-2">Date</div>
                <div className="w-[20%] p-2">Action</div>
              </div>
              {
                <List
                  style={{ minWidth: '340px' }}
                  className="List"
                  height={370}
                  itemCount={pendingWithdraws.length}
                  itemSize={37}
                  outerElementType={outerElementType}
                >
                  {Row}
                </List>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentRequest

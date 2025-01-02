import React, { useEffect } from 'react'
import config from '../utils/config'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { activeSellerStripeConnectAccount, messageClear } from '../store/Reducers/sellerReducer'
import { HashLoader } from 'react-spinners'
import { get_user_info } from '../store/Reducers/authReducer'

const Success = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loader, successMessage, errorMessage } = useSelector((state) => state.seller)
  const queryParams = new URLSearchParams(window.location.search)
  const activeCode = queryParams.get('activeCode')

  useEffect(() => {
    dispatch(activeSellerStripeConnectAccount(activeCode))
  }, [activeCode])

  const redirect = () => {
    dispatch(messageClear())
    navigate('/')
    dispatch(get_user_info())
  }
  return (
    <div>
      {/* component */}
      <div className="w-full h-full bg-gray-100 flex justify-center items-center ">
        {/* Left: Image */}
        <div className="w-1/2 h-screen hidden lg:block">
          <img
            src={`${config.BASE_URL}/images/image_bg.jpg`}
            alt=""
            className="w-full h-full object-cover "
          />
        </div>
        {/* Right: */}
        <div className="w-full flex lg:w-1/2 h-screen">
          <div className="w-full flex flex-col justify-center items-center bg-white p-6 rounded-md shadow md:mx-auto h-screen">
            <img src={`${config.BASE_URL}/images/logo.png`} alt="" className=" object-contain " />
            {loader ? (
              <>
                <HashLoader size={40} color="#f77001" className=" items-center justify-center" />
                <div className="text-center pt-2">
                  <p className="inline-flex justify-center items-end text-green-600 font-semibold text-center">
                    Proccessing Payment Connect ...
                  </p>
                </div>
              </>
            ) : successMessage ? (
              <>
                <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                  <path
                    fill="currentColor"
                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                  ></path>
                </svg>
                <div className="text-center">
                  <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                    Connect Stripe Payment Done!
                  </h3>
                  <p className="text-gray-600 my-2 font-semibold">
                    Thank you for completing your secure online payment.
                  </p>
                  <p className="font-semibold"> Have a great day!</p>
                  <div className="py-10 text-center">
                    <button
                      onClick={redirect}
                      className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                    >
                      BACK TO DASHBOARD
                    </button>
                  </div>
                </div>
              </>
            ) : errorMessage ? (
              <>
                <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                  <img
                    src={`${config.BASE_URL}/images/error.png`}
                    alt=""
                    className=" object-contain "
                  />
                </svg>
                <div className="text-center">
                  <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                    Connect Stripe Payment Error!
                  </h3>
                  <p className="text-gray-600 my-2 font-semibold">You can try again !</p>

                  <div className="py-10 text-center">
                    <button
                      onClick={redirect}
                      className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                    >
                      BACK TO DASHBOARD
                    </button>
                  </div>
                </div>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Success

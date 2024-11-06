import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { admin_login, messageClear } from '../../store/Reducers/authReducer'
import { ClipLoader, PropagateLoader } from 'react-spinners'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { overrideStyle } from '../../utils/utils'

const AdminLogin = () => {
  const navigate = useNavigate() // điều hướng trang
  const dispatch = useDispatch() //kết nối component với Redux store để có thể gửi action và thay đổi state toàn cục của ứng dụng.
  const { loader, errorMessage, successMessage } = useSelector((state) => state.auth) //state loader
  const [showPassword, setShowPassword] = useState(false) // state show password
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  //submit form login
  const submit = (e) => {
    e.preventDefault()
    dispatch(admin_login(state))
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
      navigate('/')
    }
  }, [errorMessage, successMessage])

  // show hide password
  const showPasswordClick = () => {
    if (showPassword === true) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }
  return (
    <div className="min-w-screen min-h-screen bg-[url('http://localhost:3000/images/bgedit.png')] bg-gray-700 flex justify-center items-center bg-cover">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto ">
        <div className="w-[320px] sm:w-[360px] relative text-black p-1 border-slate-500">
          <div className="bg-[#f4f4f5] p-4 rounded-3xl shadow-lg hover:shadow-blue-400 mx-auto">
            <div className="h-[70px] flex justify-center items-center">
              <div className="w-[200px] h-[60px]">
                <img src="/images/logo-admin.png" className="w-full h-full" alt="" />
              </div>
            </div>
            <h3 className="font-semibold text-lg text-center">Admin 👋</h3>
            <form onSubmit={submit}>
              <div className="flex flex-col w-full gap-1 mb-3 relative">
                <label htmlFor="email">Email</label>
                <input
                  disabled={loader ? true : false}
                  onChange={inputHandle}
                  value={state.email}
                  className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
                  type="email"
                  name="email"
                  placeholder="Email"
                  id="email"
                  required
                />
                {loader ? (
                  <ClipLoader
                    size={20}
                    color="#f77001"
                    className="absolute top-10 right-3 end-0 items-center justify-center"
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="flex flex-col w-full gap-1 mb-3 relative">
                <label htmlFor="password">Password</label>
                <input
                  disabled={loader ? true : false}
                  onChange={inputHandle}
                  value={state.password}
                  type={showPassword ? 'text' : 'password'}
                  className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
                  name="password"
                  placeholder={showPassword ? 'Password' : '••••••••'}
                  id="password"
                  required
                />
                <button
                  type="button"
                  disabled={loader ? true : false}
                  className="absolute top-7 end-0 p-3.5 rounded-e-md"
                  onClick={() => showPasswordClick()}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              <button
                disabled={loader ? true : false}
                className="bg-slate-700 w-full hover:shadow-blue-300/hover:shadow-lg text-white rounded-md px-7 py-2 mt-3 mb-3 hover:bg-sky-700"
              >
                {loader ? (
                  <PropagateLoader size={10} color="#f77001" cssOverride={overrideStyle} />
                ) : (
                  'Login'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin

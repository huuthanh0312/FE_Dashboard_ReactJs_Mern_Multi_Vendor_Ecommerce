import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from 'react-icons/fa'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false) // state show password
  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  })

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const submit = (e) => {
    e.preventDefault()
    console.log(state)
  }

  // show hide password
  const showPasswordClick = () => {
    if (showPassword === true) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }
  return (
    <div className="min-w-screen min-h-screen bg-[url('http://localhost:3000/images/bgedit.png')] bg-cover bg-gray-700 flex justify-center items-center ">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto ">
        <div className="w-[320px] sm:w-[360px] relative text-black p-1 border-slate-500">
          <div className="bg-[#ffffff] p-4 rounded-3xl shadow-md hover:shadow-blue-400 mx-auto">
            <h2 className="text-2xl font-bold text-center mb-2 uppercase">
              Thanh Shop Sign Up! 👋
            </h2>
            <div className="text-center">
              <span className="mb-2 font-mono">Welcome to Ecommerce</span>
            </div>

            <form onSubmit={submit}>
              <div className="flex flex-col w-full gap-1 mb-2">
                <label htmlFor="name">Name</label>
                <input
                  onChange={inputHandle}
                  value={state.name}
                  className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
                  type="text"
                  name="name"
                  placeholder="Name"
                  id="name"
                  required
                />
              </div>
              <div className="flex flex-col w-full gap-1 mb-2">
                <label htmlFor="email">Email</label>
                <input
                  onChange={inputHandle}
                  value={state.email}
                  className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
                  type="email"
                  name="email"
                  placeholder="Email"
                  id="email"
                  required
                />
              </div>
              <div className="flex flex-col w-full gap-1 mb-3 relative">
                <label htmlFor="password">Password</label>
                <input
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
                  className="absolute top-7 end-0 p-3.5 rounded-e-md"
                  onClick={() => showPasswordClick()}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              <div className="flex items-center w-full gap-3 mb-3">
                <input
                  className="w-4 h-4 text-blue-600 overflow-hidden bg-gray-200 rounded border-gray-300 focus:ring-blue-500"
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                />
                <label htmlFor="checkbox"> I agree to privacy policy & treams</label>
              </div>
              <button className="bg-slate-700 hover:bg-sky-700 w-full hover:shadow-blue-300/hover:shadow-lg text-white rounded-md px-7 py-2 mb-2">
                Sign Up
              </button>
              <div className="flex items-center mb-2 gap-3 justify-center">
                <p>
                  Already Have an acount ?{' '}
                  <Link className="font-bold text-sky-700" to="/login">
                    {' '}
                    Sign In
                  </Link>
                </p>
              </div>
              {/*Dave*/}
              <div className="w-full flex justify-center items-center mb-2">
                <div className="w-[45%] bg-slate-700 h-[1px]"></div>
                <div className="w-[10%] flex justify-center items-center">
                  <span className="pb-1">Or</span>
                </div>
                <div className="w-[45%] bg-slate-700 h-[1px]"></div>
              </div>

              <div className="flex justify-center items-center gap-3">
                <div
                  className="w-[135px] h-[35px] flex rounded-md bg-orange-600 shadow-lg hover:shadow-orange-700/50
                  justify-center cursor-pointer items-center overflow-hidden "
                >
                  <span>
                    <FaGoogle className="text-white" size={20} />
                  </span>
                </div>
                <div
                  className="w-[135px] h-[35px] flex rounded-md bg-blue-700 shadow-lg hover:shadow-sky-700/50
                  justify-center cursor-pointer items-center overflow-hidden "
                >
                  <span>
                    <FaFacebook className="text-white" size={20} />
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register

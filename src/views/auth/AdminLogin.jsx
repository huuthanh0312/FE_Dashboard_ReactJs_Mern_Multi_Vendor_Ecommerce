import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { admin_login } from '../../store/Reducers/authReducer';


const AdminLogin = () => {
  const dispatch = useDispatch() //kết nối component với Redux store để có thể gửi action và thay đổi state toàn cục của ứng dụng.

  const [state, setState] = useState({
    email: "",
    password: "",
  })

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const submit = (e) => {
    e.preventDefault()
    dispatch(admin_login(state))

  }

  return (
    <div className='min-w-screen min-h-screen bg-[#f4f4f5] flex justify-center items-center'>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div
          className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-sky-500 shadow-lg transform skew-y-0 -rotate-6 rounded-2xl">
        </div>
        <div className='w-[360px] relative text-black p-1 '>
          <div className='bg-[#f4f4f5] p-4 border-2 border-blue-500 rounded-2xl shadow-lg shadow-blue-400 mx-auto'>
            <div className='h-[70px] flex justify-center items-center'>
              <div className='w-[180px] h-[50px]'>
                <img src="/images/logo.png" className='w-full h-full' alt="" />
              </div>
            </div>
            <h3 className="font-semibold text-lg text-center">👋</h3>
            <form onSubmit={ submit }>
              <div className='flex flex-col w-full gap-1 mb-3'>
                <label htmlFor='email'>Email</label>
                <input onChange={ inputHandle } value={ state.email }
                  className='px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md'
                  type='email' name='email' placeholder='Email' id='email' required />
              </div>
              <div className='flex flex-col w-full gap-1 mb-3'>
                <label htmlFor='password'>Password</label>
                <input onChange={ inputHandle } value={ state.password }
                  className='px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md'
                  type='password' name='password' placeholder='Password' id='password' required />
              </div>
              <button className='bg-slate-700 w-full hover:shadow-blue-300/hover:shadow-lg text-white rounded-md px-7 py-2 mt-3 mb-3 hover:bg-sky-700'>
                Sign In</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import {Link} from 'react-router'
import axios from '../api/axiosConfig.js'
import {toast, Toaster} from 'react-hot-toast'
// import { Navigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {loginSuccess, logout} from '../store/authSlice.js'



function LoginPage() {
  const dispatch = useDispatch()
  const {isAuthenticate} = useSelector(state=>state.auth)
  const [showPassword, setShowPassword] = useState('false')
  const {register, reset, handleSubmit, formState:{errors}} = useForm()
  const [isLoginInProcess, setIsLoginInProcess] = useState(false)

  if(isAuthenticate){
    return <Navigate to={'/'} />
  }

  const onLogin = async(data)=>{
    setIsLoginInProcess((true))
    try {
      const user = await axios.post('/auth/Login', data)
      if(user.data){
        toast.success('Login successful')
        dispatch(loginSuccess(user.data))
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.message || 'Request failed'}`)
      dispatch(logout())
    } finally{
      setIsLoginInProcess(false)
      reset()
    }
    
  }


  return (
  
    <div className='w-full h-screen flex items-center justify-center'>
      <Toaster />
      <div className='bg-white shadow-md py-8 px-12 w-full sm:max-w-sm rounded-lg'>
        <h2 className='font-semibold font-poppins text-gray-800 mb-4'>LOGIN</h2>
        <form onSubmit={handleSubmit(onLogin)}>
          <div className="form-group mb-4">
            <label htmlFor="email" className='text-sm mb-1 inline-block text-gray-800 font-poppins font-medium'>Email</label>
            <input 
              {...register('email', {required:{value:true, message:'Email is required'}})}
              type="email" className='w-full border-2 rounded-sm text-gray-600 font-medium   border-gray-300 py-1 px-2 focus:outline-none'/>
            <span className='text-sm text-red-700'>{errors.email && errors.email.message}</span>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="password" className='text-sm mb-1 inline-block text-gray-800 font-poppins font-medium'>Password</label>
            <div className='relative'>
              <input 
              // pattern:{value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message:'Invalid Password'}
                {...register('password', {required:{value:true, message:'Password is required'}, })}
                type={showPassword?'text':'password'} className='w-full border-2 rounded-sm text-gray-600 font-medium   border-gray-300 py-1 px-2 focus:outline-none'/>
              <button type="button" onClick={()=>setShowPassword(!showPassword)} className='cursor-pointer absolute right-2 top-1/2 -translate-y-1/2'>{showPassword?<IoMdEyeOff />:<IoEye />}</button>
            </div>
            <span className='text-sm text-red-700'>{errors.password && errors.password.message}</span>
          </div>
          <button type='submit'   disabled={isLoginInProcess}  className='w-full  bg-primary py-2 rounded-md text-white font-medium cursor-pointer shadow-lg disabled:opacity-50 disabled:cursor-auto flex items-center justify-center'>
             
            {isLoginInProcess?<span className='animate-spin animate aspect-square h-6 rounded-full border-4 border-white border-r-primary inline-block'></span>:'LOGIN'}
            
          </button>
        </form>
        <hr className='w-full border-0.5 my-4 text-gray-400'/>
        <p className='text-center font-medium'>Don't have an account? <Link to={'/signup'} className='cursor-pointer underline'>SIGN UP</Link></p>
      </div>
    </div>
  )
}

export default LoginPage
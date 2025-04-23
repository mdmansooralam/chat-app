import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function AuthLayout({children}) {
  const {isAuthenticate} =   useSelector(state => state.auth)
  
  return isAuthenticate ? (
    <div className='w-full'>{children}</div>
  ):
  <Navigate to={'/login'} />
}

export default AuthLayout
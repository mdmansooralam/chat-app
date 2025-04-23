import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import axios from './api/axiosConfig.js'
import {loginSuccess, logout} from './store/authSlice.js'
import Navbar from './componentes/Navbar.jsx'


function App() {
  const dispatch = useDispatch()
  

  useEffect(()=>{
    const checkAuth = async()=>{
      try {
        const user = await axios.get('/auth/check')
        if(user?.data){
          dispatch(loginSuccess(user.data))
        }
      } catch (error) {
        dispatch(logout())
      }

    }
    checkAuth()
  },[dispatch])

  return (
    <> 
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
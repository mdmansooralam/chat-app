import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import axios from './api/axiosConfig.js'
import {loginSuccess, logout} from './store/authSlice.js'
import {setOnlineUser} from './store/chatSlice.js'
import Navbar from './componentes/Navbar.jsx'
import socket from './utils/socket.js'

function App() {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)

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

  useEffect(()=>{
    socket.emit('join', user)

    socket.on('getOnlineUsers', (users)=>{
      dispatch(setOnlineUser(users))
    })
    
    return ()=>{
      socket.off('join')
      // socket.off('getOnlineUsers')
    }
  },[user])

  return (
    <> 
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
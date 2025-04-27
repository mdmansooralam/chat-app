import React, { useEffect } from 'react'
import axios from '../api/axiosConfig.js'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {addMessage} from '../store/chatSlice.js'
import socket from '../utils/socket.js'

function MessageInput() {
    const {handleSubmit, register, formState:{errors}, reset} = useForm()
    const {selectedUser, onlineUsers} = useSelector(state => state.chat)
    const dispatch = useDispatch()

    const onSendMsg = async (data) =>{
      try {
        const response = await axios.post(`/message/send/${selectedUser._id}`, data)
        if(response){
          console.log('msg send successfully')

          if(onlineUsers?.includes(selectedUser._id)){
            console.log('online users found')
            socket.emit('sendMessage', {receiverId:selectedUser._id, message:response.data})

          }

          dispatch(addMessage(response.data))
        }
      } catch (error) {
        console.log('something errors')
      }

      reset()
    } 
  return (
    <div>
        <form onSubmit={handleSubmit(onSendMsg)} className='flex w-full gap-4 p-4'>
            <input {...register('text')} type="text" className='grow border border-gray-400 bg-base-200 py-2 px-4 focus:outline-none rounded-full'/>
            <button type='submit' className='cursor-pointer bg-primary py-2 px-4 rounded-lg text-white font-semibold '>Send</button>

        </form>
    </div>
  )
}

export default MessageInput
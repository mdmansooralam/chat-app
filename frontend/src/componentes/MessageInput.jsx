import React, { useEffect, useState } from 'react'
import axios from '../api/axiosConfig.js'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {addMessage} from '../store/chatSlice.js'
import socket from '../utils/socket.js'
import { RiAttachmentLine } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";




function MessageInput() {
    const {handleSubmit, register, formState:{errors}, reset} = useForm()
    const {selectedUser, onlineUsers} = useSelector(state => state.chat)
    const dispatch = useDispatch()
    const [messageSending, setMessageSending] = useState(false)

    const onSendMsg = async (data) =>{
      if(!data.text || messageSending){
        return
      }
      try {
        setMessageSending(true)
        const response = await axios.post(`/message/send/${selectedUser._id}`, data)
        if(response){
          if(onlineUsers?.includes(selectedUser._id)){
            console.log('online users found')
            socket.emit('sendMessage', {receiverId:selectedUser._id, message:response.data})

          }

          dispatch(addMessage(response.data))
        }
      } catch (error) {
        console.log('something errors')
      }
      setMessageSending(false)
      reset()
    } 
  return (
    <div>
        <form onSubmit={handleSubmit(onSendMsg)} className='flex w-full gap-2 p-4 items-center'>
            <label htmlFor="file" className='cursor-pointer'><RiAttachmentLine />
</label>
            <input type="file" id='file' className='hidden'/>
            <input {...register('text')} type="text" placeholder='Type a message...' className='grow border border-gray-400 bg-base-200 py-2 px-4 focus:outline-none rounded-full'/>
            <button type='submit' className='cursor-pointer bg-primary p-2 flex justify-center items-center w-10 rounded-full aspect-square text-white font-semibold '><FaArrowRightLong />
 
</button>


        </form>
    </div>
  )
}

export default MessageInput
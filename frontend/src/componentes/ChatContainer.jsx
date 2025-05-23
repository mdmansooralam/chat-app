import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MessageInput from './MessageInput'
import socket from '../utils/socket'
import { addMessage, clearSelectedUser } from '../store/chatSlice'
import { GoArrowLeft } from "react-icons/go";
import { MdCall } from "react-icons/md";
import { FaVideo } from "react-icons/fa";



function ChatContainer() {
    const {selectedUser, messages, onlineUsers} = useSelector(state => state.chat)
    const dispatch = useDispatch()
    const bottomRef = useRef(null)
    const containerRef = useRef(null)

    useEffect(()=>{
      socket.on('receiveMessage', (msg)=>{
        dispatch(addMessage(msg))
      })
      return ()=>{socket.off('receiveMessage')}
    },[dispatch])


    useEffect(()=>{
      const container = containerRef.current
      const isNearToBottom = container?.scrollHeight - container?.scrollTop - container?.clientHeight < 100
      if(isNearToBottom){  
        bottomRef.current?.scrollIntoView({behavior:'smooth'})
      }
    },[messages])


  return selectedUser ? (
    <div className='flex flex-col h-full'>
      <div className='bg-base-300 py-2 px-4'>
        <div className='flex gap-4 items-center'>
          <button onClick={()=>dispatch(clearSelectedUser())} className=' sm:hidden text-lg font-bold cursor-pointer'><GoArrowLeft />
</button>
          <div className={`avatar ${onlineUsers?.includes(selectedUser._id) ? 'avatar-online':''} `}>
                      <div className='w-12 rounded-full'>
                          <img src={selectedUser.profilePic ? selectedUser.profilePic : `https://ui-avatars.com/api/?name=${selectedUser.name}`} alt="Pic" />
                      </div>
          </div>
          <div className='flex flex-col'>
            <span>{selectedUser.name}</span>
          <div className='text-xs'>{onlineUsers?.includes(selectedUser._id)? 'online' : 'offline'}</div>
          </div>
          

          <div className='ml-auto flex gap-4'>
            <MdCall />
            <FaVideo />

          </div>
        </div>

      </div>
        {messages.length > 0 ? 
        <div className='grow p-4 overflow-y-auto scrollbar-none' ref={containerRef}>
            {messages.map(msg => (
                <div key={msg._id} className={`chat ${selectedUser._id == msg.senderId ? 'chat-start' : 'chat-end'}`}>
                    <div className='chat-bubble'>{msg.text}</div>
                </div>
                ))}
        <div ref={bottomRef}></div>
        </div> : 
        <div className='justify-center w-full h-full'>No message history available</div>}

        <div className='mt-auto'>
          <MessageInput />
        </div>
    </div>
  ) : (
    // <div className='flex justify-center items-center h-full'>Select the user to chat </div>
    null
  )
}

export default ChatContainer
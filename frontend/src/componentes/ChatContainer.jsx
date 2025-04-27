import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MessageInput from './MessageInput'
import socket from '../utils/socket'
import { addMessage } from '../store/chatSlice'

function ChatContainer() {
    const {selectedUser, messages} = useSelector(state => state.chat)
    const dispatch = useDispatch()
    const bottomRef = useRef(null)

    useEffect(()=>{
      socket.on('receiveMessage', (msg)=>{
        dispatch(addMessage(msg))
      })
      return ()=>{socket.off('receiveMessage')}
    },[dispatch])


    useEffect(()=>{
      bottomRef.current?.scrollIntoView({behavior:'smooth'})
    },[messages])


  return selectedUser ? (
    <div className='flex flex-col h-full'>
      <div className='bg-base-300 py-2 px-4'>
        <div className='flex gap-4 items-center'>
        <div className='avatar'>
                    <div className='w-12 rounded-full'>
                        <img src={selectedUser.profilePic ? selectedUser.profilePic : `https://ui-avatars.com/api/?name=${selectedUser.name}`} alt="Pic" />
                    </div>
                </div>
          <span>{selectedUser.name}</span>
        </div>

      </div>
        {messages.length > 0 ? 
        <div className='grow p-4 overflow-y-auto'>
            {messages.map(msg => (
                <div key={msg._id} className={`chat ${selectedUser._id == msg.senderId ? 'chat-start' : 'chat-end'}`}>
                    <div className='chat-bubble'>{msg.text}</div>
                </div>
                ))}
        <div ref={bottomRef}></div>
        </div> : 
        <div>No message history available</div>}

        <div className=''>
          <MessageInput />
        </div>
    </div>
  ) : (
    <div className='flex justify-center items-center h-full'>Select the user to chat </div>
  )
}

export default ChatContainer
import React from 'react'
import UserChatList from '../componentes/UserChatList'
import ChatContainer from '../componentes/ChatContainer'
import MessageInput from '../componentes/MessageInput'

function HomePage() {
  return (
    <div className='flex h-dvh'>
      <UserChatList />
      <div className='grow'>
        <ChatContainer />
      </div>
    </div>
  )
}

export default HomePage
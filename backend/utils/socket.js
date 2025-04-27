import express from 'express'
import {createServer} from 'http'
import {Server} from 'socket.io'

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'https://mansoor-chat-app.vercel.app', // Replace with your frontend origin
        methods: ['GET', 'POST'],
        credentials: true
      }
})


//socket connection

const onlineUsers = new Map()



io.on('connection', (socket)=>{
  // console.log('user connected', socket.id)
  socket.on('join', (user)=>{
    const userId = user?._id
    if(userId){
      // console.log('user joined', user)
      onlineUsers.set(userId, socket.id)
      // console.log(Array.from(onlineUsers.keys()))
      io.emit('getOnlineUsers', Array.from(onlineUsers.keys()))
    }
    socket.on('disconnect', ()=>{
      onlineUsers.delete(userId)
      io.emit('getOnlineUsers', Array.from(onlineUsers.keys()))
      // console.log(Array.from(onlineUsers.keys()))
    })
  })
  socket.on('sendMessage', ({receiverId, message})=>{
    const socketId = onlineUsers.get(receiverId)
    // console.log('online users ', onlineUsers)
    // console.log(socketId)
    if(socketId){
      io.to(socketId).emit('receiveMessage', message)
      // console.log('msg send ')
    }
  })

  
})




export {app, server, io}
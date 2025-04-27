import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import connection from './utils/db.js'
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'

import {app, server} from './utils/socket.js'


configDotenv()
const PORT = process.env.PORT || 8080

app.use(cors({
    credentials:true,
    origin:'https://mansoor-chat-app.vercel.app'
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoute)
app.use('/api/message', messageRoute)





server.listen(PORT, ()=>{
    console.log(`server is running on port : ${PORT}`)
    connection()
})




import { createSlice } from "@reduxjs/toolkit";
import io from 'socket.io-client'


const initialState = {
    selectedUser : null,
    users:null,
    messages : null,
    onlineUsers:null,
    socket:null,
    
}

const chatSlice = createSlice({
    initialState,
    name:'chat',
    reducers:{
        setSelectedUser: (state, action)=>{
            state.selectedUser = action.payload
            state.messages = []
        },

        clearSelectedUser:(state)=>{
            state.selectedUser = null
            state.messages = []
        },

        setUsers:(state, action)=>{
            state.users = action.payload
        },

        setMessage:(state, action)=>{
            state.messages = [...action.payload]
        },
        
        addMessage:(state, action)=>{
            state.messages.push(action.payload)
        },
        clearMessage:(state)=>{
            state.messages = []
        },

        setOnlineUser:(state, action)=>{
            state.onlineUsers = action.payload
        }

    }
})


export default chatSlice.reducer
export const {
    setSelectedUser,
    clearSelectedUser,
    setUsers,
    addMessage,
    clearMessage,
    setMessage,
    setOnlineUser,
    
} = chatSlice.actions

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    selectedUser : null,
    users:null,
    messages : null,
    
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

    }
})


export default chatSlice.reducer
export const {
    setSelectedUser,
    clearSelectedUser,
    setUsers,
    addMessage,
    clearMessage,
    setMessage
} = chatSlice.actions

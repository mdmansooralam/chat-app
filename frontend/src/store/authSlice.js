import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isAuthenticate:false,
    user:null
}

const authSlice = createSlice({
    initialState,
    name:'auth',
    reducers:{
        loginSuccess:(state, action)=>{
            state.isAuthenticate = true;
            state.user = action.payload;
        },
        logout:(state)=>{
            state.isAuthenticate = false;
            state.user = null 
        },
        
        
    }
})

export const {loginSuccess, logout} = authSlice.actions
export default authSlice.reducer
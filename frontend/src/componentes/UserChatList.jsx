import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setUsers, setSelectedUser, setMessage, clearMessage, } from '../store/chatSlice.js'
import axios from '../api/axiosConfig.js'


function UserChatList() {

    const {users, selectedUser, messages} = useSelector(state => state.chat)
    const dispatch = useDispatch()

    const handleClick = async(user) =>{
        dispatch(setSelectedUser(user))
        try {
             const message = await axios.get(`/message/${user._id}`)
             if(message.data){
                dispatch(setMessage(message.data))
             }

        } catch (error) {
            dispatch(clearMessage())
        }

    }

    useEffect(()=>{
        const fetchUsers = async()=>{
            try {
                const userList = await axios.get('/message/users')
                if(userList.data){
                    dispatch(setUsers(userList.data))
                }
            } catch (error) {
                console.log('something went wrong during fetching users', error)
            }

        }
        fetchUsers()
    }, [dispatch])

  return (
    <div className='max-w-xs overflow-y-auto h-full bg-red-500'>
        {users?.map((user)=> (
            <div role='button' onClick={()=>handleClick(user)} key={user._id} className='flex p-4 hover:bg-base-100 transition-all bg-base-300 gap-2 cursor-pointer border-b border-base-100'>
                <div className='avatar'>
                    <div className='ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2'>
                        <img src={user.profilePic ? user.profilePic : `https://ui-avatars.com/api/?name=${user.name}`} alt="Pic" />
                    </div>
                </div>
                <div>
                    <p>{user?.name}</p>
                    <p>{user?.email}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default UserChatList
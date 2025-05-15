import React from 'react'
import {NavLink, Link} from 'react-router'
// import { Link } from 'react-router'
import {useSelector} from 'react-redux'

function Navbar() {
    const {isAuthenticate, user} = useSelector(state => state.auth)
  return (
    // <div className='flex justify-between h-20 items-center px-4'>
    //     <NavLink to={'/'} className='text-2xl font-semibold cursor-pointer'>
    //         Logo
    //     </NavLink>
    //     <div>
    //         <NavLink to={'/login'} 
    //         className={({isActive})=>`${isActive ? 'text-primary bg-white':' bg-primary text-white'}
    //             ${user ? 'hidden':'inline-block'}
    //             py-2
    //             px-4
    //             font-medium
    //             text-lg
    //             transition-all
    //             duration-500
    //             hover:text-primary
    //             hover:bg-white

    //         `}>Login</NavLink>

    //         <NavLink to={'/signup'} 
    //         className={({isActive})=>`${isActive ? 'text-primary bg-white':' bg-primary text-white'}
    //             ${user ? 'hidden':'inline-block'}
    //             py-2
    //             px-4
    //             font-medium
    //             text-lg
    //             transition-all
    //             duration-500
    //             hover:text-primary
    //             hover:bg-white

    //         `}>Signup</NavLink>

    //         <Link className={`${user ? 'block' : 'hidden'}`}>
    //             <div className='avatar'>
    //                 <div className=' w-12 rounded-full '>
    //                     <img src={user?.profilePic ? user.profilePic : `https://ui-avatars.com/api/?name=${user?.name}`} alt="Pic" />
    //                 </div>
    //             </div>
    //         </Link>
    //     </div>
    // </div>
    <></>
  )
}

export default Navbar
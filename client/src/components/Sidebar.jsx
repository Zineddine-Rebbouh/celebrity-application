import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AiOutlineHome, AiOutlineHeart } from 'react-icons/ai'
import { BiCategoryAlt } from 'react-icons/bi'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
// import { IoIosArrowForward } from 'react-icons/io'
import logo from '../assets/logo.png'
import { useState } from 'react'

const Sidebar = ( { user, closeToggle } ) => {


    const isNotActiveStyle = 'flex align-middle	items-center text-xl font-normal px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
    const isActiveStyle = 'flex align-middle items-center px-5 gap-3 text-xl text-black font-bold border-black  transition-all duration-200 ease-in-out capitalize'
    const handleClosesidebar = () => {
        if ( !closeToggle ) closeToggle( false )
    }

    // active style for the link


    return (
        <div className='flex flex-col justift-between bg-white h-ful overflow-y-scrikk min-w-210 hide-scrollbar'>
            <div className="flex flex-col gap-5 sidebar">
                <Link to='/' className='flex px-5 gap-2 my-6 pt-1 w-190 items-center' onClick={ handleClosesidebar }>
                    <img src={ logo } alt="logo " />
                </Link>
                {/* isActive we are giving bcz we are using navlink */ }
                <div className='flex flex-col gap-5'>
                    <NavLink to='/'
                        className={ ( { isActive } ) => isActive ? isActiveStyle : isNotActiveStyle }
                    >
                        <AiOutlineHome size={ 26 } />Home
                    </NavLink>

                </div>
                {
                    user && (
                        <>
                            <div className='flex flex-col gap-5'>

                                <NavLink to='/create-pin'
                                    className={ ( { isActive } ) => isActive ? isActiveStyle : isNotActiveStyle }
                                >
                                    <AiOutlineAppstoreAdd size={ 26 } />Create
                                </NavLink>

                            </div>
                            <div className='flex flex-col gap-5'>
                                <NavLink to='/favorites'
                                    className={ ( { isActive } ) => isActive ? isActiveStyle : isNotActiveStyle }
                                >
                                    <AiOutlineHeart size={ 26 } />favorites
                                </NavLink>

                            </div>
                        </>
                    )
                }
            </div >
        </div >
    )
}

export default Sidebar

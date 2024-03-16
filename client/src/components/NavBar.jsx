import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdAdd, IoMdSearch } from 'react-icons/io'
import { AiOutlineUser } from 'react-icons/ai';
// import { googleLogout } from '@react-oauth/google';
import { HiOutlineLogout } from 'react-icons/hi'
import { LuSettings } from 'react-icons/lu'
import { useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai'
// import Button from './Button';

const NavBar = ( { searchTerm, setSearchTerm, user } ) => {
    const navigate = useNavigate()
    const [ HideDropList, setHideDropList ] = useState( false )

    const logout = () => {
        localStorage.removeItem( 'logindata' );
        user = null
        window.location.reload()
    };

    return (
        <div className='flex justify-between items-center gap-2 md:gap-8 w-full mt-8 pb-7'>
            <div
                className='flex justify-start items-center lg:w-2/3 w-4/5 px-2 ml-4 rounded-full bg-white focus-within:shadow-sm focus-within:border-2 focus-within:border-black'>
                <IoMdSearch fontSize={ 25 } className="ml-1" />
                <input type="text" className="p-3 w-full lg:w-32 md:w-24 sm:w-20 text-lg bg-white outline-none"
                    placeholder='Search' onChange={ ( e ) => setSearchTerm( e.target.value ) } value={ searchTerm } onFocus={ () => navigate( '/search-pin' ) } />
            </div>

            {
                user ? (
                    <div id='navbar-profile' className='md:flex items-center sm:hidden 640:hidden gap-3'>
                        {/* <Link to={ `/user-profile/${ user?._id }` } className='hidden md:block rounded-lg '> */ }
                        {/* <h2 className='align-baseline'>{ user.username }</h2> */ }
                        <Link to={ `/user-profile/${ user?._id }` } className="block">
                            <img src={ user?.image } className="w-14 h-14 rounded-full border-2 border-gray-500" alt="user" />
                        </Link>

                        <AiOutlineDown size={ 24 } className='text-black transition-transform transform ease-in duration-200' onClick={ () => setHideDropList( !HideDropList ) } />
                        {
                            HideDropList &&
                            <div style={
                                {
                                    position: 'absolute',
                                    top: '5.1rem',
                                    right: '2.25rem'
                                }
                            } className={ `transition-opacity ${ HideDropList ? 'animate-fade-in'
                                : 'animate-fade-out'
                                } duration-300 ease-in-out z-10 mt-2 w-56 rounded-lg bg-white border-2 border-gray-100` }
                            >
                                <div className='rounded-lg hover:bg-gray-200 hover:rounded-lg py-1'>
                                    <Link to={ `/user-profile/${ user?._id }` } className="flex items-center text-center text-gray-700 block px-4 py-2 text-lg">
                                        <AiOutlineUser size={ 27 } color='black' className='mx-2' />Profile
                                    </Link>
                                </div>
                                <div className='rounded-lg hover:bg-gray-200 hover:rounded-lg py-1'>
                                    <Link to="/create-pin" className="flex items-center text-center text-gray-700 block px-4 py-2 text-lg">
                                        <LuSettings size={ 27 } color='black' className='mx-2' />Settings
                                    </Link>
                                </div>
                                <div className='rounded-lg hover:bg-gray-200 rounded-lg py-1'  >
                                    <button type='button' className="flex items-center text-center text-gray-700 block px-4 py-2 text-lg" onClick={ logout }>
                                        <HiOutlineLogout size={ 27 } color='black' className='mx-2' />Logout
                                    </button>
                                </div>

                            </div>
                        }
                    </div>
                )
                    :
                    (
                        <div className='flex gap-3'>
                            <div>
                                <Link
                                    id='signup-button'
                                    className='bg-white xl:inline lg:inline md:hidden sm:hidden text-lg text-black border-2 border-black rounded-full font-semibold px-5 py-4 '
                                    to='Auth'
                                >
                                    Sign up
                                </Link>
                            </div>

                            <div>
                                <Link
                                    id='login-button'
                                    className='bg-black px-6 py-5 xl:inline lg:inline md:inline md:py-4 sm:hidden text-lg text-white rounded-full font-semibold  '
                                    to='Auth/login'
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    )
            }

        </div >
    )
}

export default NavBar

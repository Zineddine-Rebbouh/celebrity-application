import React, { Fragment } from 'react'
import { useState, useEffect, useRef } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiMenu } from 'react-icons/hi';
import { Routes, Route, Link } from 'react-router-dom'

import Sidebar from '../components/Sidebar'
import UserProfile from '../components/UserProfile'
import Pins from './Pins'
import logo from '../assets/logo.png'
import { fetchUser } from '../utils/fetchUser';
import { IoMdAdd } from 'react-icons/io';




const Home = () => {
    const [ Toggelbar, setToggelbar ] = useState( false )
    const user = fetchUser()

    const scrolRef = useRef( null )
    useEffect( () => {
        scrolRef.current.scrollTo( 0, 0 )
    }, [] )


    return (
        <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
            <div className="hidden md:flex h-screen flex-initial">
                <Sidebar user={ user && user } />
            </div>
            <div className="flex h-80 md:hidden flex-row">
                <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
                    <HiMenu fontSize={ 40 } className="cursor-pointer" onClick={ () => setToggelbar( true ) } />
                    <Link to="/">
                        <img src={ logo } alt="logo" className="w-28" />
                    </Link>
                    { user ?
                        (
                            <div className='flex items-center gap-2'>
                                <Link to={ `user-profile/${ user._id }` }>
                                    <img src={ user.image } alt="user-pic" className="w-12 h-12 rounded-full" />
                                </Link>
                                <Link to="/create-pin" className="bg-black text-white rounded-full w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
                                    <IoMdAdd />
                                </Link>
                            </div>

                        ) : (
                            <div>
                                <div>
                                    <Link
                                        className='bg-black text-lg text-white rounded-full font-semibold px-6 py-4 '
                                        to='Auth/login'
                                    >
                                        Login
                                    </Link>
                                </div>
                            </div>
                        ) }
                </div>
                { Toggelbar && (
                    <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
                        <div className="absolute w-full flex justify-end items-center p-2">
                            <AiFillCloseCircle fontSize={ 30 } className="cursor-pointer" onClick={ () => setToggelbar( false ) } />
                        </div>
                        <Sidebar closeToggle={ setToggelbar } user={ user && user } />
                    </div>
                ) }
            </div>
            <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={ scrolRef }>
                <Routes>
                    <Route path="/user-profile/:userId" element={ <UserProfile /> } />
                    <Route path="/*" element={ <Pins user={ user } /> } />
                </Routes>
            </div>
        </div>
    )
}

export default Home
{/* //  mobile side-ba */ }
{/* //if user existed then send user otherwise set false */ }
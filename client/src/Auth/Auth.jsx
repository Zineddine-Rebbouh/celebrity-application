import React, { useState, useEffect } from 'react'
import AuthVideo from '../assets/Video.mp4'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { FaFacebook } from "react-icons/fa"
import { BsTwitter } from "react-icons/bs"
import { FcGoogle } from 'react-icons/fc'
import { useForm } from 'react-hook-form'
import { NavLink, Link } from 'react-router-dom'


const Auth = () => {

    const facebook = async () => {
        window.open( "http://localhost:8000/auth/facebook" )
    }

    const google = () => {
        window.open( "http://localhost:8000/auth/google" )
    }

    const twitter = () => {
        window.open( "http://localhost:8000/auth/twitter" )
    }

    const getUser = () => {
        fetch( "http://localhost:8000/auth/login", {
            method: "post",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
        } )
            .then( response => {
                if ( response.status === 200 ) return response.json()
                throw new Error( "Authentication has been failed!" )
            } )
            .then( resObject => {
                console.log( resObject )
                const data = JSON.stringify( resObject.user )
                localStorage.setItem( 'logindata', data )
            } )
            .catch( err => {
                console.log( err )
            } )
    }

    getUser()



    return (
        <div className='relative flex md:justify-start sm:items-center sm:justify-center w-full h-screen'>
            {/* // video here  */ }
            <div className="xl:flex lg:flex md:hidden sm:hidden flex-col w-1/3 ">
                {/* Video */ }
                <div className="relative w-full h-screen ">
                    <video
                        src={ AuthVideo }
                        type="video/mp4"
                        loop
                        controls={ false }
                        muted
                        autoPlay
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className='relative flex justify-center mt-3 flex-col w-2/3 h-screen px-4 py-6'>
                <div className="absolute top-10 left-10 z-50 bg-white border-2 border-gray-500 mr-3  px-3 py-3 rounded-lg">
                    <a href="/" className="text-black">
                        <AiOutlineArrowLeft size={ 27 } />
                    </a>
                </div>
                <h2 className='font-bold text-black text-3xl px-4 mt-4 mb-8'>Sign up to Celebrity</h2>

                <div className='relative ml-4 my-4 w-full'>
                    <div className="flex flex-col justify-center gap-5">
                        <button onClick={ google } class="flex justify-center gap-4 items-center w-3/5 text-white bg-black text-xl font-semibold py-5 px-6 rounded-full transition-opacity ease-in duration-100 hover:opacity-50">
                            <FcGoogle size={ 26 } />
                            Sign in with Google
                        </button>
                        <button onClick={ facebook } class="flex justify-center gap-4 w-3/5 items-center bg-blue-600 text-white font-semibold text-xl py-5 px-6 rounded-full transition-opacity ease-in duration-100 hover:bg-blue-700">
                            <FaFacebook size={ 26 } />
                            Sign in with Facebook
                        </button>

                        <button onClick={ twitter }
                            class="flex justify-center items-center gap-4 w-3/5 bg-blue-500  text-white font-semibold text-xl py-5 px-6 rounded-full transition-opacity ease-in duration-100 hover:bg-blue-400">
                            <BsTwitter size={ 26 } />
                            Sign in with Twitter
                        </button>
                        <div className='ml-3'>
                            <Link to={ '/Auth/Signup' }
                                class="flex justify-center items-center gap-4 w-3/5 bg-white text-black font-semibold text-xl py-5 px-6 border-2 rounded-full  transition-transform transform ease-in duration-100  hover:outline-1">
                                Creating an Account with Celebrity
                            </Link>
                        </div>
                    </div>

                    <div className='absolute left-24 mt-8 text-gray-500 text-lg'>Already have an account ?
                        <Link to={ '/Auth/login' } className='underline'>
                            Sign In
                        </Link>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Auth

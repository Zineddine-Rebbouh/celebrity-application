import React from "react"
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google"
import { GoogleOAuthProvider } from '@react-oauth/google';
import sharedVideo from "../assets/share.mp4"
import logo from '../assets/logo.png'
import jwt_decode from 'jwt-decode'
import { googleLogout } from '@react-oauth/google';



const Login = () => {


    // localStorage.clear()

    const [ logindata, setLogindata ] = useState(
        localStorage.getItem( 'logindata' ) ? JSON.parse( localStorage.getItem( "logindata" ) ) : null
    );

    const responseGoogle = async ( response ) => {
        if ( !logindata )
        {
            const decoded = jwt_decode( response.credential )

            // console.log( user );
            const res = await fetch( `http://localhost:8000/auth/signup`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify( {
                    decoded: decoded
                } )
            } )

            const { message, user } = await res.json()
            setLogindata( user )
            console.log( user );
            // When storing in localStorage
            localStorage.setItem( "logindata", JSON.stringify( user ) );

            // When retrieving from localStorage
            const parsedData = localStorage.getItem( "logindata" ) ? JSON.parse( localStorage.getItem( "logindata" ) ) : null;
            setLogindata( parsedData );
        }
    }

    const logout = () => {
        localStorage.removeItem( 'logindata' )
        setLogindata( null )
    }

    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <video
                    src={ sharedVideo }
                    type="video/mp4"
                    loop
                    controls={ false }
                    muted
                    autoPlay
                    className="w-full h-full object-cover"
                />
                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                    <div className="p-5">
                        <img src={ logo } type="image.png" width="130px" alt="logo" />
                    </div>
                    <div className="shadow-2xl ">
                        <GoogleOAuthProvider clientId="1003233310493-fhb5r00bv2n9u5dsema5h9avlslpd58k.apps.googleusercontent.com">
                            { localStorage.getItem( 'logindata' ) ? (
                                <div>
                                    <div>
                                        <img src={ logindata.image } width="130px" className=" py-2 px-4 rounded" alt="profile" />
                                        <div className="text-white text-lg fond-bold px-2  "> Hello { logindata.username }</div>
                                        <button onClick={ logout } className="bg-white text-black font-bold py-2 px-4 rounded w-full">
                                            Logout
                                        </button>
                                    </div>
                                </div>

                            ) : ( <GoogleLogin
                                onSuccess={ credentialResponse => {
                                    responseGoogle( credentialResponse )
                                } }
                                onError={ () => {
                                    console.log( 'Login Failed' );
                                } }
                            />
                            )
                            }
                        </GoogleOAuthProvider>
                    </div>
                    <div className="flex flex-col justify-center items-center p-4">
                        <a href="/" className="bg-white text-black font-bold py-2 px-4 rounded">Home</a>
                    </div>
                </div>
            </div>
            {/* Your login interface components here */ }
        </div >
    )
}

export default Login

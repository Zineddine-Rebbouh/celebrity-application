import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineLogout } from 'react-icons/hi'
import Spinner from '../components/Spinner'
import { RiArrowGoBackFill } from 'react-icons/ri'
import MasonryLayout from './MasonryLayout'
import { fetchUser } from '../utils/fetchUser';

const UserProfile = () => {
    const [ user, setUser ] = useState( null );
    const [ pins, setPins ] = useState( null );
    const [ text, setText ] = useState( 'Created' );
    const [ activeBtn, setActiveBtn ] = useState( 'created' );
    const navigate = useNavigate();
    const { userId } = useParams();

    const random = 'https://source.unsplash.com/1600x900/?anime';
    const activebtnstyle = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
    const notactivebtnstyle = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

    const FetchUserPins = async () => {
        const result = await fetch( 'http://localhost:8000/auth/user-info/' + userId, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        } );
        const info = await result.json();
        const userInfo = info.data

        console.log( userInfo )

        if ( text === 'Created' )
        {
            setPins( userInfo.pins );
        } else
        {
            setPins( userInfo.saves );
        }
    };

    console.log( user );

    const logout = () => {
        localStorage.removeItem( 'logindata' );
        setUser( null );
        navigate( '/' )
    };

    useEffect( () => {
        setUser( fetchUser() ); // Assuming fetchUser() returns user data
        FetchUserPins();
    }, [ userId, text ] );

    if ( !user ) return (
        navigate( '/Auth' )
    )


    return (
        <div className='relative pb-2 h-full justify-center items-center'>
            <div className='flex flex-col pb-5 '>
                <div className='relative flex flex-col mb-7'>
                    <div className='flex flex-col justify-center items-center'>
                        <img src={ random }
                            className='w-full h-370 2xl:h-510 shadow-lg object-cover' alt="banner-profile" />
                        <img src={ user.image } className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover' alt="" />
                        <h1 className='font-bold text-2xl text-center mt-3'>{ user.username }</h1>
                        <div className='absolute top-0 z-1 left-0 p-2'>
                            <a href='/' type='button'
                                className='bg-white p-2 rounded-full cursor-pointer shadow-md outline-none '
                            >
                                <RiArrowGoBackFill fontSize={ 25 } />
                            </a>
                        </div>
                        <div className='absolute top-0 z-1 right-0 p-2'>
                            { userId === user._id && (
                                <div>
                                    <button type='button'
                                        className='bg-white p-2 rounded-full cursor-pointer shadow-md outline-none '
                                        onClick={ logout }
                                    >
                                        <HiOutlineLogout color='red' fontSize={ 25 }></HiOutlineLogout>
                                    </button>
                                </div>
                            )
                            }
                        </div>
                    </div>
                    <div className='text-center mb-'>
                        <button type='button'
                            onClick={ ( e ) => {
                                setText( 'Created' )
                                setActiveBtn( 'created' )
                            } }
                            className={ `${ activeBtn === 'created' ? activebtnstyle : notactivebtnstyle }` }
                        >
                            Created
                        </button>
                        <button type='button'
                            onClick={ ( e ) => {
                                setText( 'Saved' )
                                setActiveBtn( 'saved' )
                            } }
                            className={ `${ activeBtn === 'saved' ? activebtnstyle : notactivebtnstyle }` }
                        >
                            Saved
                        </button>
                    </div>
                    { pins ? (
                        <div className='px-2 '>
                            <MasonryLayout pins={ pins } />
                        </div>
                    ) : (
                        <div className='flex justify-center w-full font-bold items-center text-xl mt-2 '>
                            No Pins found
                        </div>
                    )

                    }


                </div>
            </div>
        </div >
    )
}

export default UserProfile

import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { v4 as uuidv4 } from 'uuid'
// import { MdDownloadForOffline } from 'react-icon/md'
import { AiOutlineDelete, AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { MdDownloadForOffline } from 'react-icons/md';
import { fetchUser } from '../utils/fetchUser';


const Pin = ( { pin } ) => {
    const [ postHovred, setpostHovred ] = useState( false )
    const [ savedPin, setsavedPin ] = useState( null )
    const [ isDeleted, setIsDeleted ] = useState( false );


    const navigate = useNavigate()
    const user = fetchUser()
    console.log( pin );
    console.log( user );

    let imageUrl = pin?.image?.replace( /\\/g, "/" )
    imageUrl = "http://localhost:8000/" + imageUrl

    console.log( user );

    const saved = ( pin?.saves?.filter( ( item ) =>
        item?._id === user?._id
    ).length !== 0 )

    const favorite = ( pin?.favorites?.filter( ( item ) =>
        item?._id === user?._id
    ).length !== 0 )

    const savePin = async ( id ) => {

        if ( user )
        {
            await fetch( 'http://localhost:8000/save-pin', {
                method: 'PUT',
                body: JSON.stringify( {
                    pinId: id,
                    userId: user._id
                } )
                ,
                headers: {
                    'Content-type': 'application/json'
                }

            } )

            window.location.reload()
        } else
        {
            alert( "Please login to save this pin" )
        }
        // we want to insert the userId in saves array inside the pin model

    }

    const addfavorite = async ( id ) => {

        if ( user )
        {
            await fetch( 'http://localhost:8000/favorite-pin', {
                method: 'PUT',
                body: JSON.stringify( {
                    pinId: id,
                    userId: user._id
                } )
                ,
                headers: {
                    'Content-type': 'application/json'
                }

            } )

            window.location.reload()
        } else
        {
            alert( "Please login to save this pin" )
        }
        // we want to insert the userId in saves array inside the pin model

    }

    const deleteFavoritePin = async ( id ) => {
        await fetch( 'http://localhost:8000/delete-favorite-pin', {
            method: 'PUT',
            body: JSON.stringify( {
                pinId: id,
                userId: user._id
            } )
            ,
            headers: {
                'Content-type': 'application/json'
            }

        } )
        setIsDeleted( true );
    }

    const deleteSavePin = async ( id ) => {
        await fetch( 'http://localhost:8000/delete-save-pin', {
            method: 'PUT',
            body: JSON.stringify( {
                pinId: id,
                userId: user._id
            } )
            ,
            headers: {
                'Content-type': 'application/json'
            }

        } )

        window.location.reload()
    }

    const deletePin = async ( id ) => {
        await fetch( 'http://localhost:8000/pin-delete/' + id, {
            method: 'DELETE',
        } )
        window.location.reload()
    }


    return (
        <div className='m-2'>
            <div
                className='cursor-zoom-in w-auto hover:shadow-lg overflow-hiddem transition-all duration-500 ease-in-out relative'
                onMouseEnter={ () => {
                    setpostHovred( true )
                } }
                onMouseLeave={ () => {
                    setpostHovred( false )
                } }
                onClick={ () => {
                    navigate( `/pin-detail/${ pin?._id }` )
                } }
            >
                <img className='rounded-lg w-full ' src={ imageUrl } width={ 250 } alt="user-post" />
                { postHovred && (
                    <div
                        className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
                        style={ { height: '100%' } }
                    >
                        <div className='flex items-center justify-between '>
                            {
                                favorite && postHovred ?
                                    ( <div className='flex gap-2 '>
                                        <button
                                            href={ `${ pin?.image }?dl=` }
                                            onClick={ ( e ) => {
                                                e.stopPropagation()
                                                deleteFavoritePin( pin?._id )
                                            }
                                            }
                                            className='text-black bg-gray-100 w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'>
                                            <AiTwotoneHeart size={ 30 } />
                                        </button>
                                    </div> )
                                    :
                                    ( <div className='flex gap-2 '>
                                        <button
                                            href={ `${ pin?.image }?dl=` }
                                            onClick={ ( e ) => {
                                                e.stopPropagation()
                                                addfavorite( pin?._id )
                                            } }
                                            className='text-black bg-gray-100 w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'>
                                            <AiOutlineHeart size={ 30 } />
                                        </button>
                                    </div> )
                            }
                            {
                                saved && postHovred ?
                                    ( <button
                                        onClick={ ( e ) => {
                                            e.stopPropagation()
                                            deleteSavePin( pin?._id )
                                        } }
                                        type='button'
                                        className='bg-black text-white font-bold px-3 py-2 text-base rounded-full hover:shadow-md outlined-none' >
                                        Saved
                                    </button> )
                                    :
                                    ( <button
                                        onClick={ ( e ) => {
                                            e.stopPropagation()
                                            savePin( pin?._id )
                                        } }
                                        type='button' className='bg-red-500 text-white font-bold px-3 py-2 text-base rounded-full hover:shadow-md outlined-none' >
                                        Save
                                    </button> )

                            }
                        </div>
                        <div className='flex justify-between items-center gap-2 w-full '>
                            { pin?.image && (
                                <a href={ pin?.destination } target='_blank'
                                    className='bg-white flex items-center gap-2 text-black font-bold p-2 rounded-full opacity-70 hover:100 font-bold hover:shadow-md'
                                    rel='noreferrer'
                                    onClick={ ( e ) => {
                                        e.stopPropagation()
                                    } }>
                                    <BsFillArrowUpRightCircleFill></BsFillArrowUpRightCircleFill>
                                    `${ pin?.destination.length > 15 ? `${ pin?.destination.slice( 0, 15 ) }...` : pin?.destination }`
                                </a>
                            ) }
                            {
                                pin?.userId?._id === user?._id && (
                                    <button
                                        type='button'
                                        onClick={ ( e ) => {
                                            e.stopPropagation()
                                            deletePin( pin?._id )
                                        } }
                                        className='bg-white  gap-2 text-black font-bold p-2 px-2  rounded-full opacity-70 hover:100 font-bold hover:shadow-md'
                                    >
                                        <AiOutlineDelete />
                                    </button>
                                )
                            }
                        </div>

                    </div>
                ) }
            </div>
            <Link className='flex items-center gap-2 mt-2'
                to={ `/user-profile/${ pin?.userId?._id }` }>
                <img className='w-8 h-8 rounded-full object-cover' src={ pin?.userId?.image } alt="user-profile" />
                <p className='font-semibold capitalize'>{ pin?.userId?.username }</p>
            </Link>
        </div >
    )
}

export default Pin

// urlfor( image ).width( 250 ).url()

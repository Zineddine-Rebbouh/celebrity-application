import React, { useState, useEffect } from 'react'
import { MdDownloadForOffline, MdDownloadFprOflline } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import MasonryLayout from './MasonryLayout'
import { FiArrowUpRight } from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs'
import { IoMdShareAlt } from 'react-icons/io'
import Spinner from './Spinner'

import openSocket from 'socket.io-client'

const socket = openSocket.connect( "http://localhost:8000" )



const PinDeatils = ( { user } ) => {
    const [ pins, setpins ] = useState( null )
    const [ hideOption, sethideOption ] = useState( false )
    const [ PinCreator, setPinCreator ] = useState( null )
    const [ pinDetails, setpinDetails ] = useState( null )
    const [ categoryId, setcategoryId ] = useState( '' )
    const [ comment, setcomment ] = useState( null )
    const [ addingComment, setaddingComment ] = useState( false )
    const [ postHovred, setpostHovred ] = useState( false )
    const [ saved, setSaved ] = useState( false )
    //ID
    //FETCHING USER PARAMS FRON THE URL 

    const { pinId } = useParams()

    const fetchPin = async () => {

        if ( !pinId ) return

        const response = await fetch( 'http://localhost:8000/pin/pin-detail/' + pinId );
        const pinData = await response.json(); // Parse the JSON data from the response body

        pinData.pin.image = "http://localhost:8000/" + pinData.pin.image.replace( /\\/g, "/" )
        console.log( pinData.pin );



        setcategoryId( pinData.pin.category._id )
        setpinDetails( pinData.pin );
        socket.emit()

        socket.on( "comments", data => {
            console.log( "Received comment data:", data );
            if ( data.action === "adding comment" )
            {
                setpinDetails( prevPinDetails => {
                    const updatedComments = [ ...prevPinDetails.comments, data.comment ];
                    return { ...prevPinDetails, comments: updatedComments };
                } );
            }


        } )

    }

    const fetchMorePins = async () => {
        const response = await fetch( 'http://localhost:8000/pin/' + categoryId, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        } );

        const Pinsdata = await response.json()
        console.log( Pinsdata );
        setpins( Pinsdata )
    }

    useEffect( () => {
        fetchPin()
        fetchMorePins()
    }, [ pinId ] )

    // save our comment in the database
    const addComment = async () => {
        setaddingComment( true );
        await fetch( 'http://localhost:8000/pin/add-comment', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            }

            ,
            body: JSON.stringify( {
                text: comment,
                userId: user._id,
                pinId: pinId
            } )
        } )
        setaddingComment( false );
        // socket.emit( "newComment", {
        //     text: comment,
        //     userId: user,
        //     pinId: pinDetails
        // } );
    }

    const savePin = () => {


    }

    const hideOptions = () => {
        sethideOption( !hideOption )
    }



    if ( !pinDetails ) return <Spinner message='Loading pin ...' />
    return (
        <>
            <div className='flex xl:flex-row md:flex-col m-auto bg-white' style={ { maxWidth: '1500px', borderRadius: '32px' } }>
                <div className='relative flex justify-center items-center flex-initial '
                    onMouseEnter={ () => {
                        setpostHovred( true )
                    } }
                    onMouseLeave={ () => {
                        setpostHovred( false )
                    } }
                >
                    <img src={ pinDetails.image } className='rounded-t-3xl rounded-b-lg ' alt="user-oin-image" />
                    { postHovred && (
                        <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'>
                            <a
                                download='downloaded_image'
                                href={ `${ pinDetails.image }?dl=` }
                                onClick={ ( e ) => e.stopPropagation() }
                                className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none z-500'>
                                <MdDownloadForOffline />
                            </a>
                            <a
                                className='bg-white flex justify-center items-center align-middle w-40 h-10 rounded-full text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none z-500'
                                href={ pinDetails.destination }
                                rel='noreferrer'
                                target='_blank'>
                                <FiArrowUpRight />View image
                            </a>
                        </div>
                    ) }
                </div>
                <div className='w-full p-8 relative flex-1 xl:min-w-620'>
                    <div className='w-full flex flex-row justify-between p-3'>
                        <div className='flex flex-row'>
                            <div className='relative bg-gray-100 p-3 rounded-full mr-4 flex items-center justify-center text-dark text-xl opacity-75 transition duration-150 ease-out hover:ease-in hover:opacity-100 hover:bg-gray-200 hover:shadow-md outline-none'>
                                <BsThreeDots size={ 29 } onClick={ hideOptions } />
                                {
                                    hideOption && (
                                        <div class="absolute top-12 left-2 z-10 mt-2 w-56 rounded-lg bg-white border-2 border-gray-100 transition ease-in-out duration-700">
                                            <div className='rounded-lg hover:bg-gray-200 hover:rounded-lg py-1'>
                                                <a href="#" class="text-gray-700 block px-4 py-2 text-lg">Edit Pin</a>
                                            </div>
                                            <div className='rounded-lg hover:bg-gray-200 hover:rounded-lg py-1'>
                                                <a href="#" class="text-gray-700 block px-4 py-2 text-lg" >delete Pin</a>
                                            </div>
                                            <div className='rounded-lg hover:bg-gray-200 rounded-lg py-1'  >
                                                <a href="#" class="text-gray-700 block px-4 py-2 text-lg" >Report Pin</a>
                                            </div>

                                        </div>
                                    )
                                }

                            </div>
                            <div className='bg-gray-100 p-3 rounded-full flex items-center justify-center text-dark text-xl opacity-75 transition duration-150 ease-out hover:ease-in hover:opacity-100 hover:bg-gray-200 hover:shadow-md outline-none'>
                                <IoMdShareAlt size={ 29 } />
                            </div>
                        </div>
                        <div>
                            {
                                saved && postHovred ?
                                    ( <button
                                        onClick={ ( e ) => {
                                            e.stopPropagation()
                                            savePin( pinDetails._id )
                                        } }
                                        type='button'
                                        className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold outline-none' >
                                        Saved
                                    </button> )
                                    :
                                    ( <button type='button' className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold outline-none' >
                                        Save
                                    </button> )
                            }
                        </div>
                    </div>
                    <div className='text-base px-5 py-2'>
                        <h1 className='text-4xl font-bold break-words mt-3'>{ pinDetails.title }</h1>
                        <p className='text-xl mt-3'>{ pinDetails.description }</p>
                    </div>
                    <Link className='flex items-center gap-2 mt-5 bg-white rounded-lg'
                        to={ `/user-profile/${ pinDetails.userId._id }` }>
                        <img className=' rounded-full object-cover' width={ 67 } height={ 67 } src={ pinDetails.userId.image } alt="user-profile" />
                        <p className='font-bold text-xl capitalize'>{ pinDetails.userId.username }</p>
                    </Link>
                    {
                        user &&

                        <div className='flex flex-wrap mt-6 gap-3'>
                            <Link
                                to={ `/user-profile/${ user._id }` }>
                                <img className='w-10 h-10 rounded-full object-cover cursor-pointer' src={ user.image } alt="user-profile" />
                            </Link>
                            <input className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-200' type="text" placeholder='add comment' value={ comment ? comment : '' } onChange={ ( e ) => setcomment( e.target.value ) } />
                            <button
                                onClick={ addComment } // Remove parentheses here
                                className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold outline-none'
                                type='button'
                            >
                                { addingComment ? 'Posting the comment...' : 'Post' }
                            </button>
                        </div>

                    }


                    <h2 className='mt-5 text-2xl'>Comments</h2>
                    <div className='max-h-370 overfloww-y-auto'>
                        { pinDetails?.comments?.map( ( comment, index ) => (
                            <div key={ index } className='flex gap-2 mt-5 items-center bg-white rounded-lg'>
                                <img src={ comment.userId.image } alt="" className='w-10 h-10 rounded-full cursor-pointer' />
                                <div className='flex flex-col '>
                                    <p className='font-bold '> { comment.userId.username }</p>
                                    <p className='font-base'>{ comment.text }</p>
                                </div>
                            </div>
                        ) ) }
                    </div>

                </div>
            </div>
            {
                pins?.length > 0 ? (
                    <>
                        <h2 className='text-center font-bold text-2x '>More like this </h2>
                        <MasonryLayout pins={ pins } />
                    </>
                ) : (
                    <Spinner message={ 'Loading more ping ... !' } />
                ) }
        </>
    )
}

export default PinDeatils

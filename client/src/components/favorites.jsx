import React, { useEffect, useState } from 'react'
import { fetchUser } from '../utils/fetchUser'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'



const Favorites = () => {

    const [ loading, setLoading ] = useState( true )
    const [ pins, setPins ] = useState()
    const user = fetchUser()

    useEffect( () => {

        setLoading( true );

        const fetchData = async () => {
            try
            {
                const response = await fetch( 'http://localhost:8000/auth/user-info/' + user._id, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                } );
                const data = await response.json(); // Parse the response data
                console.log( 'pins here : ' );
                console.log( data );
                setPins( data.data.favorites );
                setLoading( false );
            } catch ( error )
            {
                console.error( "Error fetching data:", error );
                setLoading( false );
            }
        };

        fetchData();
    }, [ user?._id ] );

    if ( loading ) return <Spinner message='we are loading your photos'></Spinner>
    if ( pins?.length === 0 ) return <h1 className='my-10 text-center font-bold text-2xl'>No pins availables</h1>
    return (
        <div>
            { pins && <MasonryLayout pins={ pins }></MasonryLayout> }
        </div>
    )
}

export default Favorites

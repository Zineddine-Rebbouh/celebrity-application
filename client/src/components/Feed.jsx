import React from 'react'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Feed = () => {
    const [ loading, setLoading ] = useState( true )
    const [ pins, setPins ] = useState()
    const { categoryId } = useParams()

    useEffect( () => {
        setLoading( true );

        const fetchData = async () => {
            try
            {
                const response = await fetch( 'http://localhost:8000/pins', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                } );
                const data = await response.json(); // Parse the response data
                setPins( data );
                setLoading( false );
                console.log( data );
            } catch ( error )
            {
                console.error( "Error fetching data:", error );
                setLoading( false );
            }
        };

        fetchData();
    }, [] );


    if ( loading ) return <Spinner message='we are loading your photos'></Spinner>
    if ( pins?.length == 0 ) return <h1 className='my-10 text-center font-bold text-2xl'>No pins availables</h1>
    return (
        <div>
            { pins && <MasonryLayout pins={ pins }></MasonryLayout> }
        </div>
    )
}

export default Feed


import React, { useState, useEffect } from 'react'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Search = ( { searchTerm } ) => {
    const [ pins, setPins ] = useState( null )
    const [ loading, setLoading ] = useState( null )

    const fetchPins = async () => {
        try
        {
            setLoading( true );

            // Construct the URL with the search query as a query parameter
            const url = searchTerm ? `http://localhost:8000/pins?search=${ searchTerm }` : 'http://localhost:8000/pins';

            const response = await fetch( url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            } );

            const data = await response.json();
            setPins( data );
            setLoading( false );
        } catch ( error )
        {
            console.error( "Error fetching pins:", error );
            setLoading( false );
        }
    };

    useEffect( () => {
        fetchPins()
    }, [ searchTerm ] )


    return (
        <div>

            { loading && <Spinner message="Searching pins" /> }
            { pins?.length !== 0 && <MasonryLayout pins={ pins } /> }
            { pins?.length === 0 && searchTerm !== '' && !loading && (
                <div className="mt-10 text-center text-xl ">No Pins Found!</div>
            ) }
        </div>
    )
}

export default Search

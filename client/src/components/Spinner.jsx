import React from 'react'
import { Puff } from 'react-loader-spinner';
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ( { message } ) => {

    return (
        <div className='flex flex-col justify-center items-center w-full h-full'>
            {/* <Puff
                type="Circles"
                color="#00BFFF"
                heighth={ 50 }
                width={ 150 }
                className='m-5' />
                 */}

            <ClipLoader
                color={ '#36d7b7' }
                loading={ true }
                size={ 60 }
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <p className=' text-lg text-center px-2 '>{ message }</p>
        </div>
    )
}

export default Spinner

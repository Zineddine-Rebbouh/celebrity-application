import React from 'react'
import Masonary from 'react-masonry-css'
import Pin from './Pin'

const breakpoint = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,  // 1798px is the
    1000: 2,  // 1798px is the
    500: 1,  // 1798px is the

}


const MasonryLayout = ( { pins } ) => {

    console.log( pins );
    return (
        <Masonary className="flex animate-slide-fwd" breakpointCols={ breakpoint }>
            { pins?.map( ( item ) => (
                < Pin key={ item?._id } pin={ item } className="w-max" />
            ) ) }
        </Masonary>
    )
}

export default MasonryLayout

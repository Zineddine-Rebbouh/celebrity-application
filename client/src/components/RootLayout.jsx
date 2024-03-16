import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './NavBar';

const RootLayout = ( searchTerm, setSearchTerm, user ) => {
    return (
        <div className="px-2 md:px-5">
            <div className="bg-gray-50">
                <Navbar searchTerm={ searchTerm } setSearchTerm={ setSearchTerm } user={ user && user } />
            </div>
            <div className="h-full">
                <Outlet />
            </div>
        </div>
    )
}

export default RootLayout




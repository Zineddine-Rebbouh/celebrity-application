import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../Auth/ProtectedRoutes';
import Navbar from '../components/NavBar';
import PinDetail from '../components/PinDetails'
import CreatePin from '../components/CreatePin'
import Search from '../components/Search'
import Feed from '../components/Feed'
import Favorites from '../components/favorites';
const Pins = ( { user } ) => {
    const [ searchTerm, setSearchTerm ] = useState( '' );

    console.log( user );

    return (
        <div className="px-2 md:px-5">
            <div className="bg-gray-50">
                <Navbar searchTerm={ searchTerm } setSearchTerm={ setSearchTerm } user={ user } />
            </div>
            <div className="h-full">
                <Routes>
                    <Route path="/" element={ <Feed /> } />
                    <Route path="/pin-detail/:pinId" element={ <PinDetail user={ user && user } /> } />
                    {
                        user && (
                            <Route>
                                <Route path="/create-pin" element={ <CreatePin user={ user && user } /> } />
                                <Route path="/favorites" element={ <Favorites user={ user && user } /> } />
                            </Route>
                        )
                    }
                    <Route path="/search-pin" element={ <Search searchTerm={ searchTerm } setSearchTerm={ setSearchTerm } /> } />
                </Routes>
            </div>
        </div>
    );
};

export default Pins;
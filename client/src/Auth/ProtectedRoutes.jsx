import { Route, Navigate } from "react-router-dom"
import React from 'react'

const ProtectedRoute = ( { element, ...rest } ) => {
  const isUserLoggedIn = !!localStorage.getItem( "logindata" )

  return isUserLoggedIn ? (
    <Route { ...rest } element={ element } />
  ) : (
    <Navigate to="/login" replace={ true } />
  )
}
export default ProtectedRoute

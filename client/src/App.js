import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./container/Home"
import Auth from "./Auth/Auth"
import Login from "./Auth/login"
import Signup from "./Auth/Signup"
import Father from "./Auth/father"

const App = () => {
  return (
    <Routes>
      <Route path="/Auth/login" element={<Login />} />
      <Route path="/Auth/signup" element={<Signup />} />
      <Route path="/Auth" element={<Auth />} />
      <Route path="/logoutt" element={<Father />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  )
}

export default App

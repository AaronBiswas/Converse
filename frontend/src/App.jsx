import React from 'react'
import Login from "../src/Pages/Login/Login.jsx";
import Signup from './Pages/Signup/Signup.jsx';
import Home from './Pages/Home/Home.jsx';
import {Routes,Route, Navigate} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import { useAuthContext } from './Context/AuthContext.jsx';


const App = () => {
  const {AuthUser}=useAuthContext();
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={AuthUser? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={AuthUser? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={AuthUser? <Navigate to="/" /> : <Signup />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
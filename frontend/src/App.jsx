import React from 'react'
import Login from "../src/Pages/Login/Login.jsx";
import Signup from './Pages/Signup/Signup.jsx';
import Home from './Pages/Home/Home.jsx';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from './Context/AuthContext.jsx';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './Components/PageTransition';


const App = () => {
  const { AuthUser } = useAuthContext();
  const location = useLocation();
  
  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition>
              {AuthUser ? <Home /> : <Navigate to="/login" />}
            </PageTransition>
          } />
          <Route path="/login" element={
            <PageTransition>
              {AuthUser ? <Navigate to="/" /> : <Login />}
            </PageTransition>
          } />
          <Route path="/signup" element={
            <PageTransition>
              {AuthUser ? <Navigate to="/" /> : <Signup />}
            </PageTransition>
          } />
        </Routes>
      </AnimatePresence>
      <Toaster/>
    </div>
  )
}

export default App
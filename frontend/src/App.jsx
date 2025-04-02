import React from 'react'
import Login from "../src/Pages/Login/Login.jsx";
import Signup from './Pages/Signup/Signup.jsx';
import Home from './Pages/Home/Home.jsx';
import {Routes,Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";


const App = () => {
  return (
    <div className="min-h-screen">
      {/* Uncomment the component you want to display */}
      {/* <Login /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
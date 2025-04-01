import React from 'react'
import Login from "../src/Pages/Login/Login.jsx";
import Signup from './Pages/Signup/Signup.jsx';
import Home from './Pages/Home/Home.jsx';

const App = () => {
  return (
    <div className="min-h-screen">
      {/* Uncomment the component you want to display */}
      
      {/* <Login /> */}
      <Home />
    </div>
  )
}

export default App
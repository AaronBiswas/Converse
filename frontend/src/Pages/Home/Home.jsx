import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar.jsx';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl p-6 rounded-lg shadow-lg 
      bg-gradient-to-br from-black to-gray-900 border border-blue-500 
      backdrop-filter backdrop-blur-lg bg-opacity-30 shadow-blue-400/60">
        
        <div className="text-white/80 text-center">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default Home
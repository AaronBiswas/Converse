import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar.jsx';
import MessageContainer from '../../Components/message/MessageContainer.jsx';
import { IoMdMenu } from "react-icons/io";

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-2 sm:p-4">
      {/* Mobile menu button - only visible on small screens */}
      <button 
        className="md:hidden self-start mb-2 p-2 rounded-lg bg-gray-800 text-blue-400 border border-blue-500" 
        onClick={toggleSidebar}
      >
        <IoMdMenu size={24} />
      </button>
      
      <div 
        className="w-full max-w-4xl h-full rounded-lg shadow-lg 
        bg-gradient-to-br from-black to-gray-900 border border-blue-500 
        backdrop-filter backdrop-blur-lg bg-opacity-30 shadow-blue-400/60 flex flex-col md:flex-row overflow-hidden"
      >
        {/* Sidebar - conditionally shown on mobile, always visible on larger screens */}
        <div className={`${showSidebar ? 'block' : 'hidden'} md:block md:w-1/3 lg:w-1/4`}>
          <Sidebar />
        </div>
        
        {/* Message container - full width when sidebar is hidden */}
        <div className={`flex-1 ${showSidebar ? 'hidden md:block' : 'block'}`}>
          <MessageContainer />
        </div>
      </div>
    </div>
  );
};

export default Home;

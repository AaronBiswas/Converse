import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar.jsx';
import MessageContainer from '../../Components/message/MessageContainer.jsx';
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useAuthContext } from '../../Context/AuthContext.jsx';
import useConversation from '../../Zustand/useConversation.js';

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const { selectedConversation } = useConversation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // On mobile, automatically switch to messages when a conversation is selected
  useEffect(() => {
    if (isMobile && selectedConversation) {
      setShowSidebar(false);
    }
  }, [selectedConversation, isMobile]);
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* App header */}
      <div className="bg-gray-900 border-b border-gray-700 text-white px-4 py-3 flex items-center shadow-md">
        <div className="flex-1 font-semibold text-lg">Converse</div>
        {isMobile && (
          <button 
            className="text-gray-200 hover:text-white" 
            onClick={toggleSidebar}
            aria-label={showSidebar ? "Close sidebar" : "Open sidebar"}
          >
            {showSidebar ? <IoClose size={24} /> : <IoMdMenu size={24} />}
          </button>
        )}
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Conversations list (sidebar) */}
        <div 
          className={`${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
          transition-transform duration-300 ease-in-out
          absolute md:relative h-full z-20 md:w-1/3 lg:w-96`}
        >
          <Sidebar 
            showSidebar={showSidebar} 
            onConversationSelect={() => isMobile && setShowSidebar(false)} 
          />
        </div>
        
        {/* Message area */}
        <div className="w-full md:w-2/3 lg:flex-1 h-full flex flex-col">
          <MessageContainer 
            toggleBack={() => setShowSidebar(true)} 
            isMobileView={isMobile}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

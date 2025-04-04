import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar.jsx';
import MessageContainer from '../../Components/message/MessageContainer.jsx';
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useAuthContext } from '../../Context/AuthContext.jsx';
import useConversation from '../../Zustand/useConversation.js';

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const { selectedConversation } = useConversation();
  const { AuthUser } = useAuthContext();
  
  // WhatsApp-style: On mobile, show conversations list first, then switch to messages when selected
  // On desktop, show both side by side
  const isMobile = window.innerWidth < 768;
  const showMessages = isMobile ? selectedConversation && !showSidebar : true;
  const showConversations = isMobile ? showSidebar : true;
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-950">
      {/* WhatsApp-style header */}
      <div className="bg-blue-700 text-white px-4 py-3 flex items-center shadow-md z-10">
        <div className="flex-1 font-bold text-lg">Converse</div>
        {isMobile && selectedConversation && (
          <button className="text-white" onClick={toggleSidebar}>
            {showSidebar ? <IoClose size={24} /> : <IoMdMenu size={24} />}
          </button>
        )}
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Conversations list (sidebar) */}
        <div 
          className={`${showConversations ? 'flex' : 'hidden'} md:flex 
          absolute md:relative inset-0 md:w-1/3 lg:w-96 flex-col bg-gray-900 
          transition-all duration-300 ease-in-out z-20`}
        >
          <Sidebar />
        </div>
        
        {/* Message area */}
        <div 
          className={`${showMessages ? 'flex' : 'hidden'} md:flex 
          absolute md:relative inset-0 md:w-2/3 lg:flex-1 flex-col 
          bg-gradient-to-b from-gray-900 to-gray-950 
          transition-all duration-300 ease-in-out`}
        >
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

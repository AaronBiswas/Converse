import React from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar.jsx';
import MessageContainer from '../../Components/message/MessageContainer.jsx';

const Home = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div 
        className="w-full max-w-4xl h-full p-6 rounded-lg shadow-lg 
        bg-gradient-to-br from-black to-gray-900 border border-blue-500 
        backdrop-filter backdrop-blur-lg bg-opacity-30 shadow-blue-400/60 flex"
      >
        {/* Sidebar and MessageContainer are now inside a flex container */}
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;

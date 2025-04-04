import React, { useEffect } from 'react'
import Messages from './Messages.jsx'
import MessageInput from './MessageInput.jsx'
import {TiMessages} from "react-icons/ti"
import useConversation from '../../Zustand/useConversation.js'
import { useAuthContext } from '../../Context/AuthContext.jsx'
import { IoMdArrowBack } from "react-icons/io";
import { useSocketContext } from '../../Context/SocketContext.jsx'

const MessageContainer = ({ toggleBack, isMobileView }) => {
  const {selectedConversation, setselectedConversation} = useConversation();
  const { onlineUsers } = useSocketContext();
  const { AuthUser } = useAuthContext();

/*Reloads the conversation status meaning prev. selected chats won't stay selected after login */
  useEffect(() => {
    return () => setselectedConversation(null)
  }, [setselectedConversation]);

  // Check if the user is online via socket
  const isUserOnline = () => {
    if (!selectedConversation || !onlineUsers) return false;
    // Get the other user's ID
    const otherUserId = selectedConversation._id;
    return onlineUsers.includes(otherUserId);
  };

  return (
    <div className='flex flex-col h-full w-full'>
      {!selectedConversation ? <Nochatselected /> : (
        <>
        {/* Chat header */}
        <div className="bg-gradient-to-r from-black to-gray-900 border-b border-blue-500 px-3 sm:px-4 py-2 backdrop-filter backdrop-blur-lg bg-opacity-30 shadow-blue-400/20 flex items-center">
            {isMobileView && (
              <button 
                className="mr-3 text-blue-400" 
                onClick={toggleBack}
                aria-label="Back to conversations"
              >
                <IoMdArrowBack size={20} />
              </button>
            )}
            
            <div className={`avatar ${isUserOnline() ? 'online' : ''}`}>
              <div className="w-8 rounded-full border border-blue-500/50">
                <img src={selectedConversation.profilePic} alt="Profile" />
              </div>
            </div>
            
            <div className="ml-3 flex-1">
              <div className="font-medium text-white">{selectedConversation.fullname}</div>
              <div className="text-xs text-blue-300 opacity-80">
                {isUserOnline() ? "online" : selectedConversation.status || "offline"}
              </div>
            </div>
        </div>
        
        {/* Chat content */}
        <div className="flex-1 overflow-hidden flex flex-col bg-gradient-to-br from-black to-gray-900 backdrop-filter backdrop-blur-lg bg-opacity-30">
          <Messages />
        </div>
        
        <MessageInput />
        </>
      )}
    </div>
  )
}

export default MessageContainer


const Nochatselected = () => {
  const {AuthUser} = useAuthContext();
  return(
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-black to-gray-900 backdrop-filter backdrop-blur-lg bg-opacity-30">
      <div className="px-4 text-center flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-400/20">
          <TiMessages className="text-3xl text-white" />
        </div>
        <h3 className="text-xl font-medium text-white">Welcome, {AuthUser.fullname}</h3>
        <p className="text-gray-300 max-w-xs">
          Select a chat to start messaging
        </p>
      </div>
    </div>
  )
}
import React, { useEffect } from 'react'
import Messages from './Messages.jsx'
import MessageInput from './MessageInput.jsx'
import {TiMessages} from "react-icons/ti"
import useConversation from '../../Zustand/useConversation.js'
import { useAuthContext } from '../../Context/AuthContext.jsx'
import { IoMdArrowBack } from "react-icons/io";

const MessageContainer = ({ toggleBack, isMobileView }) => {
  const {selectedConversation, setselectedConversation} = useConversation();

/*Reloads the conversation status meaning prev. selected chats won't stay selected after login */
  useEffect(() => {
    return () => setselectedConversation(null)
  }, [setselectedConversation]);

  return (
    <div className='flex flex-col h-full'>
      {!selectedConversation ? <Nochatselected /> : (
        <>
        {/* WhatsApp-style chat header */}
        <div className="bg-blue-800 text-white px-3 py-2 flex items-center shadow-md">
            {isMobileView && (
              <button 
                className="mr-3 text-white" 
                onClick={toggleBack}
              >
                <IoMdArrowBack size={20} />
              </button>
            )}
            
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src={selectedConversation.profilePic} alt="Profile" />
              </div>
            </div>
            
            <div className="ml-3 flex-1">
              <div className="font-medium">{selectedConversation.fullname}</div>
              <div className="text-xs text-blue-100 opacity-80">
                {selectedConversation.status || "online"}
              </div>
            </div>
        </div>
        
        {/* WhatsApp-style chat background */}
        <div className="flex-1 bg-blue-950/30 overflow-hidden flex flex-col relative">
          {/* Chat wallpaper effect */}
          <div className="absolute inset-0 opacity-5 pattern-whatsapp"></div>
          
          {/* Actual messages */}
          <div className="relative z-10 flex-1 overflow-hidden flex flex-col">
            <Messages />
          </div>
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
    <div className="flex items-center justify-center w-full h-full bg-gray-900">
      <div className="px-4 text-center flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full bg-blue-700 flex items-center justify-center">
          <TiMessages className="text-3xl text-white" />
        </div>
        <h3 className="text-xl font-medium text-white">Welcome, {AuthUser.fullname}</h3>
        <p className="text-gray-400 max-w-xs">
          Select a chat to start messaging or search for users to start a new conversation
        </p>
      </div>
    </div>
  )
}
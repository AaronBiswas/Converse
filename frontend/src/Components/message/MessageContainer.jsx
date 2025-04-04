import React, { useEffect } from 'react'
import Messages from './Messages.jsx'
import MessageInput from './MessageInput.jsx'
import {TiMessages} from "react-icons/ti"
import useConversation from '../../Zustand/useConversation.js'
import { useAuthContext } from '../../Context/AuthContext.jsx'

const MessageContainer = () => {
  const {selectedConversation,setselectedConversation}= useConversation();

/*Reloads the conversation status meaning prev. selected chats won't stay selected after login */
  useEffect(()=>{
    return ()=>setselectedConversation(null)
  },[setselectedConversation]);

  return (
    <div className='flex-1 h-full flex flex-col'>
      {!selectedConversation ? <Nochatselected /> : (
        <>
        <div className="bg-gradient-to-r from-black to-gray-900 border-b border-blue-500 px-3 sm:px-4 py-2 backdrop-filter backdrop-blur-lg bg-opacity-30 shadow-blue-400/20">
            <span className="label-text text-gray-200">To:</span>{" "}
            <span className="text-white font-bold text-sm sm:text-base">{selectedConversation.fullname}</span>
        </div>
        <div className="flex-1 overflow-hidden flex flex-col">
          <Messages />
        </div>
        <MessageInput />
        </>
      )}
    </div>
  )
}

export default MessageContainer


const Nochatselected =()=>{
  const {AuthUser} = useAuthContext();
  return(
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-black to-gray-900 backdrop-filter backdrop-blur-lg bg-opacity-30">
      <div className="px-3 sm:px-4 text-center text-base sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome! {AuthUser.fullname}</p>
        <TiMessages className="text-2xl sm:text-3xl md:text-6xl text-center text-blue-400" />
        <p className="text-sm sm:text-base text-gray-300">Select a chat to start messaging</p>
      </div>
    </div>
  )
}
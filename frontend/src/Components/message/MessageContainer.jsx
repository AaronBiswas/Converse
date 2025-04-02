import React from 'react'
import Messages from './Messages.jsx'
import MessageInput from './MessageInput.jsx'
import {TiMessages} from "react-icons/ti"

const MessageContainer = () => {
  const nochatselected =true;
  return (
    <div className='flex-1 md:min-w-[450px] flex flex-col h-full'>
      {nochatselected? <Nochatselected /> :(  <>
        <div className="bg-gradient-to-r from-black to-gray-900 border-b border-blue-500 px-4 py-2 backdrop-filter backdrop-blur-lg bg-opacity-30 shadow-blue-400/20">
            <span className="label-text text-gray-200">To:</span>{" "}
            <span className="text-white font-bold">Test 2</span>
        </div>
        <div className="flex-1 overflow-hidden flex flex-col">
          <Messages />
        </div>
        <MessageInput />
        </>)}
    </div>
  )
}

export default MessageContainer


const Nochatselected =()=>{
  return(
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-black to-gray-900 backdrop-filter backdrop-blur-lg bg-opacity-30">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome!</p>
        <TiMessages className="text-3xl md:text-6xl text-center text-blue-400" />
      </div>
    </div>
  )
}
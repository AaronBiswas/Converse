import React from 'react'
import {BsSend} from "react-icons/bs";

const MessageInput = () => {
  return (
    <form className="px-4 py-3 border-t border-blue-500 bg-gradient-to-b from-gray-900 to-black backdrop-filter backdrop-blur-lg bg-opacity-30">
        <div className='w-full relative'>
            <input type="text" placeholder='Send a messsage' className="border text-sm rounded-lg block w-full p-2.5 bg-gray-800/50 border-blue-500/50 text-white focus:ring-blue-500 focus:border-blue-500" />
        <button type='submit' className="absolute inset-y-0 end-0 flex items-center pe-3 text-blue-400 hover:text-blue-300">
            <BsSend />
        </button>
        </div>
    </form>
  )
}

export default MessageInput
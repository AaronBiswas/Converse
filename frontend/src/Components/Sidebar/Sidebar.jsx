import React from 'react'
import SearchInput from './SearchInput.jsx'
import Conversation from './Conversation.jsx'
import LogoutButton from './LogoutButton.jsx'

const Sidebar = () => {
  return (
    <div className="border-r border-blue-500 p-2 sm:p-4 flex flex-col h-full w-full 
    bg-gradient-to-b from-black to-gray-900 backdrop-filter backdrop-blur-lg bg-opacity-30 overflow-hidden">
      <div className="mb-2">
        <SearchInput />
      </div>
      <div className="divider px-2 sm:px-3 my-1 sm:my-2 before:bg-blue-500/30 after:bg-blue-500/30"></div>
      
      <div className="flex-1 overflow-y-auto">
        <Conversation />
      </div>
      
      <div className="mt-auto pt-2">
        <LogoutButton />
      </div>
    </div>
  )
}

export default Sidebar
import React from 'react'
import SearchInput from './SearchInput.jsx'
import Conversation from './Conversation.jsx'
import LogoutButton from './LogoutButton.jsx'

const Sidebar = () => {
  return (
    <div className="border-r border-blue-500 p-4 flex flex-col bg-gradient-to-b from-black to-gray-900 backdrop-filter backdrop-blur-lg bg-opacity-30">
      <SearchInput />
      <div className="divider px-3 before:bg-blue-500/30 after:bg-blue-500/30"></div>
        
        <Conversation />
        <LogoutButton />
    </div>
  )
}

export default Sidebar
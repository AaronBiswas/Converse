import React from 'react'
import SearchInput from './SearchInput.jsx'
import Conversation from './Conversation.jsx'
import LogoutButton from './LogoutButton.jsx'
import { useAuthContext } from '../../Context/AuthContext.jsx'

const Sidebar = ({ onSelectConversation }) => {
  const { AuthUser } = useAuthContext();

  return (
    <div className="sidebar-container h-full flex flex-col bg-gradient-to-b from-black to-gray-900 backdrop-filter backdrop-blur-lg bg-opacity-30">
      {/* User profile section */}
      <div className="border-b border-blue-500/30 py-2 px-3">
        <div className="flex items-center">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full border border-blue-500/50 shadow-sm shadow-blue-400/20">
              <img src={AuthUser?.profilePic || "/default-avatar.png"} alt="Your profile" />
            </div>
          </div>
          <div className="ml-3 flex-1">
            <div className="font-medium text-white">{AuthUser?.fullname}</div>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="p-3">
        <SearchInput />
      </div>

      <div className="divider px-2 my-0 before:bg-blue-500/30 after:bg-blue-500/30"></div>
      
      {/* Conversations list */}
      <div className="flex-1 overflow-y-auto">
        <Conversation onSelectConversation={onSelectConversation} />
      </div>

      {/* Logout button */}
      <div className="mt-auto p-3 border-t border-blue-500/30">
        <LogoutButton />
      </div>
    </div>
  )
}

export default Sidebar
import React from 'react'
import SearchInput from './SearchInput.jsx'
import Conversation from './Conversation.jsx'
import LogoutButton from './LogoutButton.jsx'
import { useAuthContext } from '../../Context/AuthContext.jsx'

const Sidebar = () => {
  const { AuthUser } = useAuthContext();
  
  return (
    <div className="sidebar-container h-full flex flex-col bg-gray-900">
      {/* User profile section */}
      <div className="bg-blue-700 py-2 px-3">
        <div className="flex items-center">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full">
              <img src={AuthUser?.profilePic || "/default-avatar.png"} alt="Your profile" />
            </div>
          </div>
          <div className="ml-3 flex-1">
            <div className="font-medium text-white">{AuthUser?.fullname}</div>
          </div>
        </div>
      </div>
      
      {/* Search bar */}
      <div className="p-2 bg-gray-900">
        <SearchInput />
      </div>
      
      {/* Conversations list */}
      <div className="flex-1 overflow-y-auto bg-gray-900">
        <Conversation />
      </div>
      
      {/* Logout button */}
      <div className="mt-auto p-3 border-t border-gray-800">
        <LogoutButton />
      </div>
    </div>
  )
}

export default Sidebar
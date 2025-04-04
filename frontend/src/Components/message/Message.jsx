import React from 'react'
import useConversation from '../../Zustand/useConversation.js';
import { useAuthContext } from '../../Context/AuthContext.jsx';
import { formatDistanceToNow } from "date-fns";

const Message = ({ message, isOwnMessage }) => {
  const { AuthUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  
  // Check if the message is from the current user
  const fromMe = message.senderId === AuthUser._id;
  
  // Set chat class based on sender
  const chatClassname = fromMe ? "chat-end" : "chat-start";
  
  // Set profile picture based on sender
  const profilePic = fromMe ? AuthUser.profilePic : selectedConversation?.profilePic;
  
  // Different background color based on sender
  const bubbleBgColor = fromMe 
    ? "bg-gradient-to-r from-blue-600 to-blue-700" 
    : "bg-gradient-to-r from-gray-700 to-gray-800";
  
  // Format timestamp
  const formattedTime = message.createdAt
    ? formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })
    : "";

  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassname} mb-2`}>
      {/* Avatar only shows for received messages */}
      {!fromMe && (
        <div className="chat-image avatar">
          <div className="w-8 h-8 rounded-full">
            <img 
              src={profilePic || "/default-avatar.png"} 
              alt="User avatar" 
            />
          </div>
        </div>
      )}

      <div className="chat-bubble-container">
        <div className={`chat-bubble ${bubbleBgColor} text-white text-sm shadow-md shadow-blue-900/10 ${shakeClass}`}>
          {message.message}
        </div>
        
        <div 
          className={`text-xs mt-1 ${
            fromMe ? "text-right" : "text-left"
          } text-gray-400`}
        >
          {formattedTime}
        </div>
      </div>
    </div>
  )
}

export default Message
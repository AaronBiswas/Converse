import React from 'react'
import useConversation from '../../Zustand/useConversation.js';
import { useAuthContext } from '../../Context/AuthContext.jsx';
import { useSocketContext } from '../../Context/SocketContext.jsx';

const Conversations = ({ conversation, lastIdx, isSelected, onSelectConversation }) => {
  const { setselectedConversation } = useConversation();
  const { AuthUser } = useAuthContext();
  const { onlineUsers } = useSocketContext();
  
  // Check if this user is online using socket context
  const isOnline = onlineUsers?.includes(conversation._id);

  const handleClick = () => {
    setselectedConversation(conversation);
    // Call the callback to notify parent components (for mobile navigation)
    if (onSelectConversation) {
      onSelectConversation();
    }
  };
  
  // Check if there's an actual message (not just the placeholder)
  const hasMessage = conversation.lastMessage && conversation.lastMessage.trim().length > 0;

  return (
    <div
      className={`flex gap-2 items-center p-2 py-3 cursor-pointer 
      ${isSelected ? 'bg-gradient-to-r from-blue-800/30 to-blue-700/20 border-r-4 border-blue-500' : 'hover:bg-black/30'} 
      ${lastIdx ? "" : "border-b border-blue-500/20"}`}
      onClick={handleClick}
    >
      <div className={`avatar ${isOnline ? 'online' : ''}`}>
        <div className="w-12 rounded-full border border-blue-500/50 shadow-sm shadow-blue-400/20">
          <img src={conversation.profilePic} alt={conversation.fullname} />
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <p className={`font-medium text-white truncate ${!conversation.seen && hasMessage && !isSelected ? 'text-blue-400' : ''}`}>
            {conversation.fullname}
          </p>
        </div>
        
        <div className="flex items-center">
          <p className="text-sm text-gray-400 truncate">
            {/* Only show "Click to start" if we haven't exchanged messages yet */}
            {hasMessage 
              ? conversation.lastMessage 
              : (conversation.messageCount === 0 ? "Click to start a conversation" : "")}
          </p>
          
          {/* Only show unread indicator if there's an actual message that's unread */}
          {!conversation.seen && hasMessage && !isSelected && (
            <div className="ml-2 w-2 h-2 rounded-full bg-blue-500"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversations;

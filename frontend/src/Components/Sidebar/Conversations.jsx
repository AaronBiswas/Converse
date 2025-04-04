import React from 'react'
import useConversation from '../../Zustand/useConversation.js';
import { useAuthContext } from '../../Context/AuthContext.jsx';
import { formatDistanceToNow } from 'date-fns';

const Conversations = ({ conversation, lastIdx, isSelected }) => {
  const { setselectedConversation } = useConversation();
  const { AuthUser } = useAuthContext();
  
  const handleClick = () => {
    setselectedConversation(conversation);
  };
  
  // Format last message time in WhatsApp style
  const formattedTime = conversation.lastMessageTime 
    ? formatDistanceToNow(new Date(conversation.lastMessageTime), { addSuffix: false })
    : '';
    
  // Truncate last message if too long
  const lastMessage = (conversation.lastMessage || "").length > 40 
    ? (conversation.lastMessage || "").substring(0, 40) + "..." 
    : conversation.lastMessage || "";

  return (
    <div
      className={`flex items-center px-3 py-2 cursor-pointer border-b border-gray-800
      ${isSelected ? 'bg-blue-800/20' : 'hover:bg-gray-800'}`}
      onClick={handleClick}
    >
      <div className="avatar">
        <div className={`w-12 h-12 rounded-full relative ${conversation.online ? 'online' : ''}`}>
          <img src={conversation.profilePic} alt={conversation.fullname} />
        </div>
      </div>
      
      <div className="ml-3 flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <p className="font-medium text-white truncate">{conversation.fullname}</p>
          <span className="text-xs text-gray-400">{formattedTime}</span>
        </div>
        
        <div className="flex items-center">
          <p className="text-sm text-gray-400 truncate">
            {lastMessage || "Click to start a conversation"}
          </p>
          
          {!conversation.seen && (
            <div className="ml-2 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-xs text-white">1</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversations;

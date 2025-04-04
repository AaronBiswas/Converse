import React, { useEffect } from 'react'
import Conversations from './Conversations.jsx'
import useGetConversation from '../../Hooks/useGetConversation.js';
import useConversation from '../../Zustand/useConversation.js';

const Conversation = ({ onSelectConversation }) => {
  const { loading, conversations } = useGetConversation();
  const { selectedConversation, setselectedConversation } = useConversation();
  
  useEffect(() => {
    // Log conversations for debugging
    if (conversations && !Array.isArray(conversations)) {
      console.log("Conversations is not an array:", typeof conversations, conversations);
    }
    
    // Debug selected conversation
    if (selectedConversation) {
      console.log("Selected conversation:", selectedConversation);
    }
  }, [conversations, selectedConversation]);
  
  // Handle different data formats
  const conversationsArray = Array.isArray(conversations) ? conversations : 
    (conversations && typeof conversations === 'object' ? [conversations] : []);
  
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {loading && <div className="flex justify-center"><span className="loading loading-spinner"></span></div>}
      
      {!loading && conversationsArray.length === 0 && (
        <div className="text-center text-gray-200 py-4">
          <p>No conversations available</p>
        </div>
      )}
      
      {conversationsArray.length > 0 && conversationsArray.map((conv, idx) => (
        <Conversations
          key={conv._id || idx}
          conversation={conv}
          lastIdx={idx === conversationsArray.length - 1}
          isSelected={selectedConversation?._id === conv._id}
          onSelectConversation={onSelectConversation}
        />
      ))}
    </div>
  )
}

export default Conversation
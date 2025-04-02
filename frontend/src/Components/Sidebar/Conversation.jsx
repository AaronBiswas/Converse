import React, { useEffect } from 'react'
import Conversations from './Conversations.jsx'
import useGetConversation from '../../Hooks/useGetConversation.js';

const Conversation = () => {
  const { loading, conversation, selectedConversation, setSelectedConversation } = useGetConversation();
  
  useEffect(() => {
    console.log("Conversations:", conversation);
    // Check if conversation is an array or object
    if (conversation && !Array.isArray(conversation)) {
      console.log("Conversation is not an array:", typeof conversation, conversation);
    }
  }, [conversation]);
  
  // Handle different data formats
  const conversationsArray = Array.isArray(conversation) ? conversation : 
    (conversation && typeof conversation === 'object' ? [conversation] : []);
  
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
          setSelectedConversation={setSelectedConversation}
        />
      ))}
    </div>
  )
}

export default Conversation
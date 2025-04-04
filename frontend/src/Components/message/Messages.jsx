import React, { useEffect, useRef } from "react";
import Message from "./Message.jsx";
import useGetMessage from "../../Hooks/useGetMessage.js";
import MessageSkeleton from "../Skeletons/MessageSkeleton.jsx";
import useListenMessages from "../../Hooks/useListenMessages.js";
import { useAuthContext } from "../../Context/AuthContext.jsx";

const Messages = () => {
  const { messages, loading } = useGetMessage();
  const { AuthUser } = useAuthContext();
  const messageEndRef = useRef(null);
  const messageList = messages || [];
  useListenMessages();
  
  // Scroll to bottom when new messages are received
  useEffect(() => {
    // Short timeout to ensure DOM is updated
    const timeoutId = setTimeout(() => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [messageList.length]);

  // If no messages, render nothing
  if (!messageList.length) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 gap-4">
      {loading ? (
        // Show skeletons while loading
        <div className="py-2">
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
        </div>
      ) : (
        // Show actual messages when they exist
        messageList.map((message, index) => (
          <Message 
            key={message._id || index}
            message={message}
            isOwnMessage={message.sender === AuthUser?._id}
          />
        ))
      )}
      
      {/* Invisible element to scroll to */}
      <div ref={messageEndRef} />
    </div>
  );
};

export default Messages;

import React, { useEffect, useRef } from "react";
import Message from "./Message.jsx";
import useGetMessage from "../../Hooks/useGetMessage.js";
import MessageSkeleton from "../Skeletons/MessageSkeleton.jsx";
import useListenMessages from "../../Hooks/useListenMessages.js";

const Messages = () => {
  const { messages, loading } = useGetMessage();
  useListenMessages();
  const lastMessageRef = useRef(null);
  const messagesContainerRef = useRef(null);
  
  useEffect(() => {
    // Ensure the container scrolls to the bottom when messages change
    const scrollToBottom = () => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    };
    
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <div 
      ref={messagesContainerRef}
      className="p-2 flex-1 overflow-auto"
    >
      {loading ? (
        // Show skeletons while loading
        <div className="py-2">
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
        </div>
      ) : (
        // Show actual messages when they exist
        <div className="py-1">
          {messages && messages.length > 0 ? 
            messages.map((message, index) => (
              <div 
                key={message._id || index} 
                ref={index === messages.length - 1 ? lastMessageRef : null}
              >
                <Message message={message} />
              </div>
            )) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-sm p-4 text-gray-400 bg-gray-800/50 rounded-lg">
                  Send a message to start the conversation
                </div>
              </div>
            )
          }
        </div>
      )}
    </div>
  );
};

export default Messages;

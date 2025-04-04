import React, { useEffect, useRef } from "react";
import Message from "./Message.jsx";
import useGetMessage from "../../Hooks/useGetMessage.js";
import MessageSkeleton from "../Skeletons/MessageSkeleton.jsx";
import useListenMessages from "../../Hooks/useListenMessages.js";

const Messages = () => {
  const { messages, loading } = useGetMessage();
  useListenMessages();
  const lastMessageRef = useRef(null);
  
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior:"smooth"});
    }, 100);
  }, [messages]);

  return (
    <div className="px-2 sm:px-4 py-1 sm:py-2 flex-1 overflow-auto">
      {loading ? (
        // Show skeletons while loading
        <>
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
        </>
      ) : (
        // Show actual messages when they exist
        messages && messages.length > 0 && 
        messages.map((message, index) => (
          <div 
            key={message._id || index} 
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))
      )}
      {!loading && messages.length === 0 && (
        <p className="text-center text-sm sm:text-base p-2 sm:p-4">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;

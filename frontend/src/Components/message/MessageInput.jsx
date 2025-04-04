import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import { FaPaperclip, FaMicrophone } from "react-icons/fa";
import useSendMessage from "../../Hooks/useSendMessage.js";

const MessageInput = () => {
  const [messages, setMessages] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messages) return;
    await sendMessage(messages);
    setMessages("");
  };

  return (
    <div className="bg-gray-800 px-2 py-3">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        {/* WhatsApp-style message input with attachment button */}
        <button 
          type="button"
          className="text-gray-300 p-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          <FaPaperclip size={20} />
        </button>
        
        <div className="flex-1 bg-gray-700 rounded-full">
          <input
            type="text"
            placeholder="Type a message"
            className="w-full bg-transparent border-none text-white px-4 py-2 focus:outline-none focus:ring-0"
            value={messages}
            onChange={(e) => setMessages(e.target.value)}
          />
        </div>
        
        {/* Show microphone icon when no text, send button when text exists */}
        {messages ? (
          <button
            type="submit"
            className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white"
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            ) : (
              <BsSend size={18} />
            )}
          </button>
        ) : (
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white"
          >
            <FaMicrophone size={18} />
          </button>
        )}
      </form>
    </div>
  );
};

export default MessageInput;

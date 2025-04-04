import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
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
    <form
      className="px-3 sm:px-4 py-3 border-t border-blue-500 bg-gradient-to-b from-gray-900 to-black backdrop-filter backdrop-blur-lg bg-opacity-30"
      onSubmit={handleSubmit}
    >
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Send a message"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-800/50 text-white border-blue-500/50 focus:ring-blue-500 focus:border-blue-500"
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3 text-blue-400 hover:text-blue-300"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <BsSend size={18} />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;

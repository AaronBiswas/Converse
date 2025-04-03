import React from "react";
import { getRandomEmoji } from "../../utils/emojiGenerator.js";

const Conversations = ({ conversation, lastIdx, isSelected, setSelectedConversation }) => {
  const emoji = getRandomEmoji();
  
  // Handle case where conversation might be undefined or missing properties
  if (!conversation) {
    return null;
  }
  
  return (
    <>
      <div className={`flex gap-2 items-center hover:bg-blue-500/20 rounded p-2 py-1 cursor-pointer transition-all duration-500 backdrop-blur-sm
        ${isSelected ? "bg-blue-500/20" : ""}
        `} onClick={() => setSelectedConversation(conversation)}>
        <div className="avatar online">
          <div className="w-12 rounded-full border border-blue-500/50 shadow-sm shadow-blue-400/30">
            <img 
              src={conversation.profilePic || "https://via.placeholder.com/50"} 
              alt="user avatar" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/50";
              }}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullname || conversation.username || "User"}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1 before:bg-blue-500/30 after:bg-blue-500/30" />}
    </>
  );
};

export default Conversations;

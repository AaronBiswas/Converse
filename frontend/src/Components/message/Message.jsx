import React from 'react'
import useConversation from '../../Zustand/useConversation.js';
import { useAuthContext } from '../../Context/AuthContext.jsx';
import {extractTime} from "../../utils/extractTime.js";

const Message = ({ message }) => {
  const { AuthUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === AuthUser._id;
  const chatClassname = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? AuthUser.profilePic : selectedConversation?.profilePic;
  const bubblebgColor = fromMe ? "shadow-lg shadow-blue-400/20" : "";
  const formattedTime=extractTime(message.createdAt);

  return (
    <>
     <div className={`chat ${chatClassname}`}>
        <div className="chat-image avatar">
            <div className="w-10 rounded-full border border-blue-500/50">
            <img
        alt="Tailwind CSS chat bubble component"
        src={profilePic} />
            </div>
        </div>
        <div>
        <div className={`chat-bubble bg-gradient-to-r to-blue-700 text-white ${bubblebgColor} pb-2`}>
          {message.message}
        </div>
        <div className="chat-footer opacity-50 text-gray-200">{formattedTime}</div>
        </div>
    </div>
    </>
  )
}

export default Message
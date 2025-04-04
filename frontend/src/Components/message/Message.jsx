import React from 'react'
import useConversation from '../../Zustand/useConversation.js';
import { useAuthContext } from '../../Context/AuthContext.jsx';
import {extractTime} from "../../utils/extractTime.js";

const Message = ({ message }) => {
  const { AuthUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === AuthUser._id;
  const formattedTime = extractTime(message.createdAt);
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`my-1 px-3 ${fromMe ? 'text-right' : 'text-left'}`}>
      <div 
        className={`inline-block rounded-lg px-3 py-2 max-w-[75%] ${shakeClass}
          ${fromMe 
            ? 'bg-blue-600 text-white rounded-tr-none' 
            : 'bg-gray-700 text-white rounded-tl-none'
          }`}
      >
        <div className="text-sm">{message.message}</div>
        <div className="text-right mt-1">
          <span className="text-[10px] opacity-70">
            {formattedTime}
            {fromMe && (
              <span className="ml-1">
                ✓✓
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Message
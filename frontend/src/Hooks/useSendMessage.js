import React, { useState } from 'react'
import useConversation from '../Zustand/useConversation.js';
import toast from 'react-hot-toast';

const useSendMessage = () => {
  const [loading, setloading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (messageText) => {
    if (!selectedConversation?._id) {
      return toast.error("No conversation selected");
    }
    
    setloading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/message/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ message: messageText }),
        credentials: "include"
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  }

  return { sendMessage, loading };
}

export default useSendMessage;
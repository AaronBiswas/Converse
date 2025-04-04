import { useEffect, useState } from "react";
import useConversation from "../Zustand/useConversation";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { AuthUser } = useAuthContext();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id) {
        console.log("No selected conversation ID available");
        return;
      }
      
      if (!AuthUser?._id) {
        console.log("No authenticated user ID available");
        return;
      }
      
      setLoading(true);
      try {
        const API_URL = import.meta.env.VITE_API_URL || "https://converse-7i2n.onrender.com";
        
        console.log(`Fetching messages for conversation with user: ${selectedConversation._id}`);
        
        const res = await fetch(`${API_URL}/api/message/${selectedConversation._id}`, {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
          },
          credentials: "include"
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || `Request failed with status ${res.status}`);
        }

        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error(error.message || "Failed to load messages");
        // Don't clear messages on error to avoid flashing UI
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation?._id, setMessages, AuthUser?._id]);

  return { loading, messages };
};

export default useGetMessages; 
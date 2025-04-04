import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";
import useConversation from "../Zustand/useConversation";

const useGetConversation = () => {
  const [loading, setloading] = useState(false);
  const [conversation, setconversation] = useState([]);
  const [error, setError] = useState(null);
  const { selectedConversation, setselectedConversation } = useConversation();
  const { AuthUser, setAuthUser } = useAuthContext();

  useEffect(() => {
    const getConversation = async () => {
      if (!AuthUser) {
        // Skip API call if user is not authenticated
        return;
      }
      
      setloading(true);
      setError(null);
      
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const res = await fetch(`${API_URL}/api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include" // This will include cookies in the request
        });
        
        if (!res.ok) {
          const data = await res.json();
          if (res.status === 401) {
            // Handle authentication issues
            localStorage.removeItem("chat-user");
            setAuthUser(null);
            throw new Error("Your session has expired. Please login again.");
          }
          throw new Error(data.error || "Failed to fetch conversations");
        }
        
        const data = await res.json();
        setconversation(data);
        console.log("Fetched conversations:", data.length);
      } catch (error) {
        setError(error.message);
        toast.error(error.message || "Failed to fetch conversations");
        console.error("Error fetching conversations:", error);
      } finally {
        setloading(false);
      }
    };
    
    getConversation();
  }, [AuthUser, setAuthUser]);
  
  return { loading, conversation, error, selectedConversation, setSelectedConversation: setselectedConversation };
};

export default useGetConversation;

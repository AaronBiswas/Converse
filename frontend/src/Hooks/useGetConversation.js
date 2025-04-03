import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";
import useConversation from "../Zustand/useConversation";

const useGetConversation = () => {
  const [loading, setloading] = useState(false);
  const [conversation, setconversation] = useState([]);
  const { selectedConversation, setselectedConversation } = useConversation();
  const { AuthUser } = useAuthContext();

  useEffect(() => {
    const getConversation = async () => {
      if (!AuthUser) {
        // Skip API call if user is not authenticated
        return;
      }
      
      setloading(true);
      try {
        const res = await fetch("https://converse-7i2n.onrender.com/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include" // This will include cookies in the request
        });
        
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setconversation(data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch conversations");
      } finally {
        setloading(false);
      }
    };
    getConversation();
  }, [AuthUser]);
  
  return { loading, conversation, selectedConversation, setSelectedConversation: setselectedConversation };
};

export default useGetConversation;

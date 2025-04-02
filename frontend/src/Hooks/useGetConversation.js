import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const useGetConversation = () => {
  const [loading, setloading] = useState(false);
  const [conversation, setconversation] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const { AuthUser } = useAuthContext();

  useEffect(() => {
    const getConversation = async () => {
      setloading(true);
      try {
        const res = await fetch("http://localhost:8000/api/users", {
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
        toast.error(error.message);
      } finally {
        setloading(false);
      }
    };
    getConversation();
  }, []);
  
  return { loading, conversation, selectedConversation, setSelectedConversation };
};

export default useGetConversation;

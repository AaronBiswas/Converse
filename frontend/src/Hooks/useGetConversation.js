import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";
import useConversation from "../Zustand/useConversation";

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { AuthUser, setAuthUser } = useAuthContext();
  const { selectedConversation, setselectedConversation } = useConversation();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const API_URL = import.meta.env.VITE_API_URL || "https://converse-7i2n.onrender.com";
        
        const res = await fetch(`${API_URL}/api/users`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (AuthUser) {
      getConversations();
    }
  }, [AuthUser]);

  return { loading, conversations, selectedConversation, setSelectedConversation: setselectedConversation };
};

export default useGetConversation;

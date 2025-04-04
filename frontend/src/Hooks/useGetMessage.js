import { useEffect, useState } from "react";
import useConversation from "../Zustand/useConversation";
import { toast } from "react-hot-toast";

const useGetMessage = () => {
    const [loading, setloading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(()=>{
        const getMessage = async () => {
            setloading(true);
            try {
              const API_URL = import.meta.env.VITE_API_URL || "https://converse-7i2n.onrender.com";
              const res = await fetch(`${API_URL}/api/message/${selectedConversation._id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
              });
              const data = await res.json();
              if(data.error) throw new Error(data.error);
              setMessages(data);
            } catch (error) {
              toast.error(error.message);
            } finally {
              setloading(false);
            }
          }
          if(selectedConversation?._id) getMessage();
    },[selectedConversation?._id,setMessages])

    return { messages, loading };
};

export default useGetMessage;
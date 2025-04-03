import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import useConversation from '../Zustand/useConversation.js';

const useGetMessage = () => {
    const [loading, setloading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(()=>{
        const getMessage = async () => {
            setloading(true);
            try {
              const res = await fetch(`https://converse-7i2n.onrender.com/api/message/${selectedConversation._id}`, {
                method: "GET",
                credentials: "include" // Add credentials to include cookies
              });
              const data = await res.json();
              if (data.error) {
                throw new Error(data.error);
              }
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
}

export default useGetMessage
import React, { useEffect } from 'react'
import { useSocketContext } from "../Context/SocketContext.jsx";
import useConversation from '../Zustand/useConversation.js';
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const {socket}=useSocketContext();
  const{messages,setMessages} = useConversation();

  useEffect(()=>{
    socket?.on("newMessage",(newMessage)=>{
        newMessage.shouldShake=true;
        const sound = new Audio(notificationSound);
        sound.play();
        setMessages([...messages,newMessage])
    })

    return () => {
      socket?.off("newMessage");
    }
  },[socket,messages,setMessages])
}

export default useListenMessages
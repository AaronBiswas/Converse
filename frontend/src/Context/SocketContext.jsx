import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";

const SocketContext = createContext();

export const useSocketContext =()=>{
    return useContext(SocketContext);
}


export const SocketContextProvider = ({ children }) => {
  const [socket, setsocket] = useState(null);
  const [onlineUsers, setonlineUsers] = useState([]);
  const { AuthUser } = useAuthContext();

  useEffect(() => {
    if (AuthUser) {
      const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
      const socket = io(SOCKET_URL, {
        query:{
          userId: AuthUser._id
        }
      });

      setsocket(socket);

      socket.on("getOnlineUsers",(users)=>{
        setonlineUsers(users);
      });

      return () => socket.close();
    } else {
        if(socket){
            socket.close();
            setsocket(null);
        }
    }
  }, [AuthUser]);

  return <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>;
};

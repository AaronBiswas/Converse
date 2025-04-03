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
      const socket = io("https://converse-7i2n.onrender.com",{
        query:{
          userId:AuthUser._id
        }
      }
      
    );

      setsocket(socket);

      socket.on("getOnlineUsers",(users)=>{
        setonlineUsers(users);
      })



      return ()=>socket.close();
    } else {
        if(socket){
            socket.close();
            setsocket(null);
        }
    }
  }, [AuthUser]);

  return <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>;
};

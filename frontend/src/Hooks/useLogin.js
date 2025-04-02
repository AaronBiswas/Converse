import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const useLogin = () => {
  const [loading, setloading] = useState();
  const {setAuthUser}=useAuthContext();
  const login = async (username, password) => {
    setloading(true);
    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: "include"
      });

      const data = await res.json();
      if(data.error){
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user",JSON.stringify(data));
      setAuthUser(data);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  return {loading,login}
};

export default useLogin;

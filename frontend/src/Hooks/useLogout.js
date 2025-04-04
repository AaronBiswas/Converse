import React, { useState } from 'react'
import { useAuthContext } from '../Context/AuthContext';
import toast from 'react-hot-toast';

const useLogout = () => {
  const [loading,setloading]=useState(false);
  const {setAuthUser}= useAuthContext();

  const logout = async () => {
    setloading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res= await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include"});

        const data =await res.json();
        if(data.error){
            throw new Error(data.error);
        }

        localStorage.removeItem("chat-user");
        setAuthUser(null);
    } catch (error) {
        toast.error(error.message);
        // Still remove localStorage and reset auth state even if the server request fails
        localStorage.removeItem("chat-user");
        setAuthUser(null);
    }finally{
        setloading(false);
    }
  }

  return {loading,logout}
}

export default useLogout
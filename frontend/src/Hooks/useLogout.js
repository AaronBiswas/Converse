import React, { useState } from 'react'
import { useAuthContext } from '../Context/AuthContext';
import toast from 'react-hot-toast';

const useLogout = () => {
  const [loading,setloading]=useState(false);
  const {setAuthUser}= useAuthContext();

  const Logout=async () => {
    setloading(true);
    try {
        const res= await fetch("http://localhost:8000/api/auth/logout", {
        method: "POST",
        headers: {"Content-Type": "application/json"}});

        const data =await res.json();
        if(data.error){
            throw new Error(data.error);
        }

        localStorage.removeItem("char-user");
        setAuthUser(null);
    } catch (error) {
        toast.error(error.message);
        // Still remove localStorage and reset auth state even if the server request fails
        localStorage.removeItem("char-user");
        setAuthUser(null);
    }finally{
        setloading(false);
    }
  }

  return {loading,Logout}
}

export default useLogout
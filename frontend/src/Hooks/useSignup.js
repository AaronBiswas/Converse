import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext.jsx";

const useSignup = () => {
  const [loading, setloading] = useState(false);
  const {setAuthUser}=useAuthContext();
  const signup = async ({
    fullname,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullname,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return false;

    setloading(true)
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          fullname,
          username,
          password,
          confirmpassword: confirmPassword,
          gender,
        }),
        credentials: "include"
      });
     const data = await res.json();
     if(data.error){
      throw new Error(data.error)
     }

     localStorage.setItem("chat-user",JSON.stringify(data));
     setAuthUser(data);
     return data;
    } catch (error) {
      toast.error(error.message);
    } finally{
      setloading(false);
    }
  };
  return {loading, signup}
};

export default useSignup;

function handleInputErrors({
  fullname,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullname || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill all the details");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Passwords should be atleast 6 characters long");
    return false;
  }

  return true;
}

import React, { useState } from "react";
import { toast } from "react-hot-toast";

const useSignup = () => {
  const [loading, setloading] = useState(false);
  const signup = async ({
    fullname,
    username,
    password,
    confirmpassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullname,
      username,
      password,
      confirmpassword,
      gender,
    });
    if (!success) return false;

    setloading(true)
    try {
      const res = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          fullname,
          username,
          password,
          confirmpassword,
          gender,
        }),
      });
     const data = await res.json();
     if(data.error){
      throw new Error(data.error)
     }
     console.log(data);
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
  confirmpassword,
  gender,
}) {
  if (!fullname || !username || !password || !confirmpassword || !gender) {
    toast.error("Please fill all the details");
    return false;
  }

  if (password !== confirmpassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Passwords should be atleast 6 characters long");
    return false;
  }

  return true;
}

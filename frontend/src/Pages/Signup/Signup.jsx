import React, { useState } from "react";
import GenderCheckbox from "./GenderCheckbox.jsx";
import { Link } from "react-router-dom";
import useSignup from "../../Hooks/useSignup.js";

const Signup = () => {
  const [Input,setInput]=useState({
    fullname:"",
    username:"",
    password:"",
    confirmpassword:"",
    gender:""
  })

const {loading,signup}=useSignup();

  const handleCheckboxInput =(gender)=>{
    setInput({...Input,gender});
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    await signup(Input)
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
      <div
        className="w-full max-w-md p-8 rounded-lg shadow-lg 
      bg-gradient-to-br from-black to-gray-900 border border-blue-500 
      backdrop-filter backdrop-blur-lg bg-opacity-30 shadow-blue-400/60"
      >
        <h1 className="text-3xl font-semibold text-center mb-6">
          <span className="text-blue-400">Signup</span>{" "}
          <span className="text-white/90">Converse</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white/80">
                Full Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="w-full input input-bordered h-10 bg-gray-800/50 text-white border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
              value={Input.fullname}
              onChange={(e) => setInput({...Input, fullname: e.target.value})}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white/80">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Choose Username"
              className="w-full input input-bordered h-10 bg-gray-800/50 text-white border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
              value={Input.username}
              onChange={(e) => setInput({...Input, username: e.target.value})}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white/80">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Create Password"
              className="w-full input input-bordered h-10 bg-gray-800/50 text-white border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
              value={Input.password}
              onChange={(e) => setInput({...Input, password: e.target.value})}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white/80">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10 bg-gray-800/50 text-white border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
              value={Input.confirmpassword}
              onChange={(e) => setInput({...Input, confirmpassword: e.target.value})}
            />
          </div>
          <div className="mt-2">
            <GenderCheckbox onCheckboxChange={handleCheckboxInput} selectedGender={Input.gender}  />
          </div>
          <div className="mt-2 mb-4">
            <Link
              to="/login"
              className="text-sm hover:underline hover:text-blue-400 inline-block text-white/80"
            >
              Already have an account?
            </Link>
          </div>
          <div>
            <button disabled={loading} className="btn btn-block btn-md bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-400/20">
              {loading? <span className="loading loading-spinner"></span>:"Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

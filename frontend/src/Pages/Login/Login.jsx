import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../Hooks/useLogin.js";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const{loading,login}=useLogin();


  const handleSubmit = async(e)=>{
    e.preventDefault();
    await login(username,password);
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-3 sm:p-4">
      <div
        className="w-full max-w-md p-4 sm:p-8 rounded-lg shadow-lg 
      bg-gradient-to-br from-black to-gray-900 border border-blue-500 
      backdrop-filter backdrop-blur-lg bg-opacity-30 shadow-blue-400/60"
      >
        <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-4 sm:mb-6">
          <span className="text-blue-400">Login</span>{" "}
          <span className="text-blue-400">to</span>{" "}
          <span className="text-white/90">Converse</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="label p-1 sm:p-2">
              <span className="text-sm sm:text-base label-text text-white/80">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-9 sm:h-10 bg-gray-800/50 text-white text-sm sm:text-base border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
              value={username}
              onChange={(e) => {
                setusername(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="label p-1 sm:p-2">
              <span className="text-sm sm:text-base label-text text-white/80">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-9 sm:h-10 bg-gray-800/50 text-white text-sm sm:text-base border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
          </div>
          <div className="mt-2 mb-3 sm:mb-4">
            <Link
              to="/signup"
              className="text-xs sm:text-sm hover:underline hover:text-blue-400 inline-block text-white/80"
            >
              {"Don't"} have an account?
            </Link>
          </div>
          <div>
            <button disabled={loading} className="btn btn-block btn-sm sm:btn-md bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-400/20">
            {loading? <span className="loading loading-spinner loading-xs sm:loading-sm"></span>:"Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

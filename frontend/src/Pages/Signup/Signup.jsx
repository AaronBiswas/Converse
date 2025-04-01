import React from "react";
import GenderCheckbox from "./GenderCheckbox.jsx";

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div
        className="w-full max-w-md p-6 rounded-lg shadow-lg 
      bg-gradient-to-br from-black to-gray-900 border border-blue-500 
      backdrop-filter backdrop-blur-lg bg-opacity-30 shadow-blue-400/60"
      >
        <h1 className="text-3xl font-semibold text-center">
          <span className="text-blue-400">Signup</span>{" "}
          <span className="text-white/90">Converse</span>
        </h1>
        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white/80">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Choose Username"
              className="w-full input input-bordered h-10 bg-gray-800/50 text-white border-blue-500/50"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white/80">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full input input-bordered h-10 bg-gray-800/50 text-white border-blue-500/50"
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
              className="w-full input input-bordered h-10 bg-gray-800/50 text-white border-blue-500/50"
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
              className="w-full input input-bordered h-10 bg-gray-800/50 text-white border-blue-500/50"
            />
          </div>
          <GenderCheckbox />
          <a
            href="#"
            className="text-sm hover:underline hover:text-blue-400 mt-2 inline-block text-white/80"
          >
            Already have an account?
          </a>
          <div>
            <button className="btn btn-block btn-sm mt-2 bg-[#00a8ff] hover:bg-blue-600 text-white">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

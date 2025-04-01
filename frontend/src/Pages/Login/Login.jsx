import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div
        className="w-full max-w-md p-6 rounded-lg shadow-lg 
      bg-gradient-to-br from-black to-gray-900 border border-blue-500 
      backdrop-filter backdrop-blur-lg bg-opacity-30 shadow-blue-400/60"
      >
        <h1 className="text-3xl font-semibold text-center">
          <span className="text-blue-400">Login</span>{" "}
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
              placeholder="Enter Username"
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
              placeholder="Enter Password"
              className="w-full input input-bordered h-10 bg-gray-800/50 text-white border-blue-500/50"
            />
          </div>
          <a
            href="#"
            className="text-sm hover:underline hover:text-blue-400 mt-2 inline-block text-white/80"
          >
            {"Don't"} have an account?
          </a>
          <div>
            <button className="btn btn-block btn-sm mt-2 bg-[#00a8ff] hover:bg-blue-600 text-white">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

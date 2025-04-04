import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../Hooks/useSignup";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-3 sm:p-4">
      <div className="w-full max-w-md p-4 sm:p-8 rounded-lg shadow-lg bg-gradient-to-br from-black to-gray-900 border border-blue-500 backdrop-filter backdrop-blur-lg bg-opacity-30 shadow-blue-400/60">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-4 sm:mb-6">
          <span className="text-blue-400">Sign Up</span>{" "}
          <span className="text-blue-400">to</span>{" "}
          <span className="text-white/90">Converse</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="label p-1 sm:p-2">
              <span className="text-sm sm:text-base label-text text-white/80">
                Full Name
              </span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full input input-bordered h-9 sm:h-10 bg-gray-800/50 text-white text-sm sm:text-base border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
              value={inputs.fullname}
              onChange={(e) =>
                setInputs({ ...inputs, fullname: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-1 sm:p-2">
              <span className="text-sm sm:text-base label-text text-white/80">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
              className="w-full input input-bordered h-9 sm:h-10 bg-gray-800/50 text-white text-sm sm:text-base border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
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
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-1 sm:p-2">
              <span className="text-sm sm:text-base label-text text-white/80">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-9 sm:h-10 bg-gray-800/50 text-white text-sm sm:text-base border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <div className="flex gap-2 justify-center">
            <label className="flex items-center gap-1 sm:gap-2 cursor-pointer">
              <span className="text-xs sm:text-sm text-white/80">Male</span>
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-primary"
                checked={inputs.gender === "male"}
                onChange={() => handleCheckboxChange("male")}
              />
            </label>
            <label className="flex items-center gap-1 sm:gap-2 cursor-pointer">
              <span className="text-xs sm:text-sm text-white/80">Female</span>
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-primary"
                checked={inputs.gender === "female"}
                onChange={() => handleCheckboxChange("female")}
              />
            </label>
          </div>

          <div className="mt-2 mb-3 sm:mb-4">
            <Link
              to="/login"
              className="text-xs sm:text-sm hover:underline hover:text-blue-400 inline-block text-white/80"
            >
              Already have an account?
            </Link>
          </div>

          <div>
            <button
              disabled={loading}
              className="btn btn-block btn-sm sm:btn-md bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-400/20"
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs sm:loading-sm"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

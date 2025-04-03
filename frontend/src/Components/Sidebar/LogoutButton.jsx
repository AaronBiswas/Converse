import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../Hooks/useLogout.js";
const LogoutButton = () => {
  const { loading, Logout } = useLogout();
  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOut
        onClick={Logout}
        className="w-6 h-6 text-blue-400 hover:text-blue-300 cursor-pointer transition-colors duration-500"
      />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;

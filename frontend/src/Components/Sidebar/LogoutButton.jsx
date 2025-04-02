import React from 'react'
import {BiLogOut} from "react-icons/bi";
const LogoutButton = () => {
  return (
    <div className="mt-auto">
        <BiLogOut className="w-6 h-6 text-blue-400 hover:text-blue-300 cursor-pointer transition-colors duration-300" />
    </div>
  )
}

export default LogoutButton
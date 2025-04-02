import React from "react";

const Conversations = () => {
  return (
    <>
      <div className="flex gap-2 items-center hover:bg-blue-500/20 rounded p-2 py-1 cursor-pointer transition-all duration-300">
        <div className="avatar online">
          <div className="w-12 rounded-full border border-blue-500/50 shadow-sm shadow-blue-400/30">
            <img src="https://via.placeholder.com/50" alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">Test 1</p>
            <span className="text-xl">😎</span>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1 before:bg-blue-500/30 after:bg-blue-500/30" />
    </>
  );
};

export default Conversations;

import React from 'react'

const MessageSkeleton = () => {
  return (
    <div className="flex gap-3 my-4">
      {/* Avatar skeleton */}
      <div className="w-10 h-10 rounded-full skeleton bg-gray-800 border border-blue-500/30"></div>
      
      <div className="flex flex-col gap-2 max-w-[80%]">
        {/* Message bubble skeleton */}
        <div className="skeleton h-16 w-64 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 shadow-lg shadow-blue-400/10"></div>
        
        {/* Timestamp skeleton */}
        <div className="skeleton h-3 w-20 bg-gray-800/50 ml-2"></div>
      </div>
    </div>
  )
}

export default MessageSkeleton
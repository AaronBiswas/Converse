import React from 'react'

const Message = () => {
  return (
    <div className="chat chat-end">
        <div className="chat-image avatar">
            <div className="w-10 rounded-full border border-blue-500/50">
            <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
        </div>
        <div>
        <div className="chat-bubble bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-400/20">
          I hate you!
        </div>
        <div className="chat-footer opacity-50 text-gray-200">Seen at 12:46</div>
        </div>
    </div>
  )
}

export default Message
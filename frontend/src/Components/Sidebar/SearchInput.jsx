import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import useConversation from '../../Zustand/useConversation.js';
import useGetConversation from '../../Hooks/useGetConversation.js';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [Search, setSearch] = useState("");
  const { setselectedConversation } = useConversation();
  const { conversation } = useGetConversation();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Search) return;
    if (Search.length < 3) {
      toast.error("Search term must be at least 3 characters");
      return;
    }

    const conversations = conversation.find((c) => c.fullname.toLowerCase().includes(Search.toLowerCase()));

    if (conversations) {
      setselectedConversation(conversations);
      setSearch("");
    }
    else {
      toast.error("No users found");
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className='flex items-center'>
      <div className="w-full bg-gray-800 rounded-lg flex items-center px-2 py-1">
        <FaSearch className="text-gray-400 mr-2" size={14} />
        <input
          type="text"
          placeholder="Search or start new chat"
          className="w-full bg-transparent border-none text-sm text-white py-1 px-1 focus:outline-none focus:ring-0"
          value={Search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </form>
  )
}

export default SearchInput
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import useConversation from '../../Zustand/useConversation.js';
import useGetConversation from '../../Hooks/useGetConversation.js';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [Search,setSearch]=useState("");
  const {setselectedConversation}= useConversation();
  const{conversation}= useGetConversation();
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!Search) return;
    if(Search.length < 3){
      toast.error("Search term must be at least 3 characters");
      return;
    }

    const conversations = conversation.find((c) => c.fullname.toLowerCase().includes(Search.toLowerCase()));

    if(conversations){
      setselectedConversation(conversations);
      setSearch("");
    }
    else{
      toast.error("No users found");
    }
  }
  return (
    <form onSubmit={handleSubmit} className='flex item-center gap-2'>
        <input
              type="text"
              placeholder="Search"
              className="w-full input input-bordered h-10 bg-gray-800/50 text-white border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
            value={Search}
            onChange={(e)=>setSearch(e.target.value)}
            />
            <button className="btn btn-circle bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-blue-600 border-blue-500 shadow-lg shadow-blue-400/20">
              <FaSearch className="text-white size-[1.2em]" />
            </button>
    </form>
  )
}

export default SearchInput
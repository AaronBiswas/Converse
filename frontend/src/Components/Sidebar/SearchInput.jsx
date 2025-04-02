import React from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchInput = () => {
  return (
    <form className='flex item-center gap-2'>
        <input
              type="text"
              placeholder="Search"
              className="w-full input input-bordered h-10 bg-gray-800/50 text-white border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
            />
            <button className="btn btn-circle bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-blue-600 border-blue-500 shadow-lg shadow-blue-400/20">
              <FaSearch className="text-white size-[1.2em]" />
            </button>
    </form>
  )
}

export default SearchInput
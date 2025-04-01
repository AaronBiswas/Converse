import React from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchInput = () => {
  return (
    <form className='flex item-center gap-2'>
        <input
              type="text"
              placeholder="Search"
              className="w-full input input-bordered h-10 bg-gray-800/50 text-white border-blue-500/50"
            />
            <button className="btn btn-circle bg-blue-500/50 hover:bg-blue-500/80 border-blue-500/50">
              <FaSearch className="text-white size-[1.2em]" />
            </button>
    </form>
  )
}

export default SearchInput
import React from 'react'
import Conversations from './Conversations.jsx'

const Conversation = () => {
  return (
    <div className='py-2 flex flex-col overflow-auto'>
        <Conversations />
        <Conversations />
        <Conversations />
        <Conversations />
        <Conversations />
    </div>
  )
}

export default Conversation
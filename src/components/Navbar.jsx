import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between bg-gray-800 text-white text-2xl font-bold p-4'>
        <div className='flex gap-5'>
          <Link className='hover:text-yellow-400' to='/home'>HOME</Link>
          <Link className='hover:text-yellow-400' to='/contact'>CONTACT</Link>
          <Link className='hover:text-yellow-400' to='/profiles'>PROFILES</Link>
        </div>
        <div>
          <Link className='hover:bg-gray-500 p-2' to='/'>⚔</Link>
        </div>
        
    </div>
  )
}

export default Navbar
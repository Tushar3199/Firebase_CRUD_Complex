import React from 'react'
import { Link } from 'react-router-dom'

const Initializer = () => {
  return (
    <div className='h-screen w-screen bg-cyan-700 text-white text-6xl font-extrabold flex justify-center items-center'>
        <div className='hover:text-yellow-400'>
            <Link to='/home'>
            👉🏻 Click to Begin 👈🏻
            </Link>
        </div>
    </div>
  )
}

export default Initializer
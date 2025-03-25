import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Moodvies icon-02.svg'
const NavBar = () => {
  return (
      <nav className="bg-primary shadow-lg text-accent p-4 font-sans">
        <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
                <img src={logo} alt="MovieMood Logo" className="w-16 h-16" />
                <h1 className="text-2xl font-semibold">MoodVies</h1>
            </div>  
            <div>
                <Link to="/" className="mr-4 hover:bg-green-300 transition hover:text-black rounded-lg p-2">Home</Link>
                <Link to="/dashboard" className="mr-4 hover:bg-green-300 transition hover:text-black rounded-lg p-2">Dashboard</Link>
                <Link to="/login" className='hover:bg-green-300 transition hover:text-black rounded-lg p-2'>Login</Link>
            </div>
        </div>
    </nav>
  )
}

export default NavBar

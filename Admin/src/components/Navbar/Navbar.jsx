import React from 'react'
import { useNavigate } from 'react-router-dom'
import {assets} from '../../assets/admin_assets/assets'

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  return (
    <div className='flex justify-between items-center px-[20px] py-[10px]'>
      <img src={assets.logo} alt="Logo" />
      <button 
        onClick={handleLogout}
        className='bg-red-500 text-white px-[20px] py-[10px] rounded cursor-pointer hover:bg-red-600'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar

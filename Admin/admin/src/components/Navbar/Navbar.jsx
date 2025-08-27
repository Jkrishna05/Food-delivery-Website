import React from 'react'
import {assets} from '../../assets/admin_assets/assets'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center px-[20px]'>
      <img src={assets.logo} alt="" />
      <img src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar

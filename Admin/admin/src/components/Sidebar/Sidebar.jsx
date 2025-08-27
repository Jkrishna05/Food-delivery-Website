import React from 'react'
import { assets } from '../../assets/admin_assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='Sidebar w-[25%] md:w-[18%] border-2 border-[#a9a9a9] h-[100vh]'>
      <div className="options flex flex-col gap-[30px] pt-[40px] pl-[50px] ">
        <NavLink to='/add' className="option h-[60px] cursor-pointer flex gap-[20px] items-center border-[#a9a9a9] rounded-tl-2xl rounded-bl-2xl border-2 border-r-0 px-[10px] py-[10px]">
            <img src={assets.add_icon} alt="" />
            <p className='hidden md:flex'>Add Items</p>
        </NavLink>
          <NavLink to='/list' className="option cursor-pointer h-[60px] flex  gap-[20px] items-center border-[#a9a9a9] rounded-tl-2xl rounded-bl-2xl border-2 border-r-0 px-[10px] py-[10px]">
            <img src={assets.order_icon} alt="" />
            <p className='hidden md:flex' >list Item</p>
        </NavLink>
          <NavLink to='/order' className="option h-[60px]  cursor-pointer flex  gap-[20px] items-center border-[#a9a9a9] rounded-tl-2xl rounded-bl-2xl border-2 border-r-0 px-[10px] py-[10px]">
            <img src={assets.order_icon} alt="" />
            <p className='hidden md:flex'>order</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar

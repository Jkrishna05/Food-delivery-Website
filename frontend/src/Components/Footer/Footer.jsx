import React from 'react'
import { assets } from '../../assets/food-del-assets/assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div id='footerpage' className='Footer mt-[50px] bg-[#393939] flex flex-col items-center text-[#d9d9d9] gap-[30px] px-[10vw] py-[2vw]'>
      <div className="content ">
        <div className="content-left  flex flex-col gap-[10px] p-[10px] ">
            <img className='w-[150px]' src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quae quis, odio voluptatibus eligendi voluptates fugit ut dolor laborum, eaque quia porro at quidem iusto hic ipsa! Asperiores, dolore autem!</p>
            <div className="img flex gap-[10px]">

            <img className='w-[30px]' src={assets.facebook_icon} alt="" />
            <img className='w-[30px]' src={assets.linkedin_icon} alt="" />
            <img className='w-[30px]' src={assets.twitter_icon} alt="" />
            </div>
        </div>
        <div className="content-center  p-[10px] flex flex-col items-baseline ">
            <h2 className='text-[25px]'>COMPANY</h2>
            <ul>
                <li className='cursor-pointer'>Home</li>
                <li className='cursor-pointer'>About us </li>
                <li className='cursor-pointer'>Delivery</li>
                <li className='cursor-pointer'>Privacy Policy</li>
            </ul>
        </div>
        <div className="content-right  p-[10px] flex flex-col items-baseline">
            <h2  className='text-[25px]'>GET IN TOUCH</h2>
            <ul>
                <li className='cursor-pointer'>+1 6352497411</li>
                <li className='cursor-pointer'>tomato@contact.com</li>
            </ul>
        </div>
      </div>
      <hr  className='mt-[20px] w-[100%]'/>
      <p>Copyright 2025 Tomato.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer

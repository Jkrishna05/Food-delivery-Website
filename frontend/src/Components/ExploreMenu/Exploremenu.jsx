import React from 'react'
import { menu_list } from '../../assets/food-del-assets/assets/frontend_assets/assets'

const Exploremenu = ({ catagory, setCatagory }) => {

  return (
    <div id='menupage' className=' flex flex-col gap-[2vw] px-[2vw] mt-[1vw]'>
      <h1 className='text-[8vw] md:text-[2vw]'>Explore our menu</h1>
      <p className='w-[60%] text-[10px] md:text-[1.2vw] text-[#696969] '>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission  is to satisfy your cravings and elevate your dining experiance , one  delicious meal at a time.</p>
      
      <div className="container flex w-full  text-center overflow-auto  scrollbar-hide  gap-4 py-2">
        {menu_list.map((e, index) => {
          return (
            <div key={index} className=' flex flex-col items-center justify-center min-w-[15vw] h-[15vw]  flex-shrink-0' onClick={() => setCatagory(prev => prev === e.menu_name ? 'all' : e.menu_name)} >
              <img className={`w-[12vw] md:w-[7.5vw] rounded-full ${catagory === e.menu_name ? "active1" : ""}`} src={e.menu_image} alt="" />
              <p className='text-[#747474] mt-[1vw] text-[1.4vw]'>{e.menu_name}</p>
            </div>
          )
        })}
      </div>

      <hr className='h-[2px] mt-[1vw] mb-[1vw] text-[#ae9c9c]' />
    </div>
  )
}

export default Exploremenu

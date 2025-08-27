import React from 'react'
import { assets } from '../../assets/food-del-assets/assets/frontend_assets/assets'

const AppDownload = () => {
    return (
        <div id='AppDownload' className='mt-[100px]  '>
            <div className=' flex flex-col gap-[20px] items-center text-[30px] font-bold'>
                <p className='text-center md:text-left'>For Better Experiance Download  <br /> Tomato App</p>
                <div className="img flex flex-col md:flex-row gap-[30px]">
                    <img  className='w-[200px] cursor-pointer' src={assets.play_store} alt="" />
                    <img className='w-[200px] cursor-pointer' src={assets.app_store} alt="" />
                </div>
            </div>
        </div>
    )
}

export default AppDownload

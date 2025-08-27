import React, { useState,useContext} from 'react'
import { assets } from '../../../assets/food-del-assets/assets/frontend_assets/assets'
import { datacontext } from '../../context/Storecontext'



const FoodBox = ({id, name, price, description, image }) => {
  
  let {contextValue}=useContext(datacontext);
  let {cartItem,addtoCart,removeCart,url}=contextValue;

  return (
    <div className='m-auto rounded-2xl shadow-2xl h-[100%]'>
      <div className="foodimg relative">
        <img className='rounded-tl-2xl rounded-tr-2xl ' src={url+"/image/"+image} alt="" />
        {!cartItem[id]?<img className='absolute bottom-[10px] right-[10px] w-[50px]' onClick={()=>{addtoCart(id)}} src={assets.add_icon_white} alt="" />:
          <div className='p-[2px]  w-[100px] flex justify-around gap-[8px] items-center bg-amber-50 rounded-3xl absolute  bottom-[10px] right-[10px]'>
            <img onClick={()=>{removeCart(id)}}  src={assets.remove_icon_red} alt="" />
            <p>{cartItem[id]}</p>
            <img onClick={()=>{(addtoCart(id))}}  src={assets.add_icon_green} alt="" />
          </div>
        }
      </div>
      <div className="foodinfo p-[20px]">
        <div className='flex justify-between'>
          <p className='text-[20px] font-bold' >{name}</p>
          <img className='h-[1vw]' src={assets.rating_starts} alt="" />
        </div>
        <p className="text-[12px] text-[#676767]">{description}</p>
        <p className='font-bold text-[tomato] mt-[10px]'>${price}</p>
      </div>
    </div>
  )
}

export default FoodBox

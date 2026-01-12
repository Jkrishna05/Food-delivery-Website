import React, { useContext, useState } from 'react'
import { datacontext } from '../../Components/context/Storecontext'
import { assets } from '../../assets/food-del-assets/assets/frontend_assets/assets';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  let { contextValue } = useContext(datacontext);
  let {food_list,cartItem,removeCart,sum,DF,totalPrice,url} = contextValue;

 let navigate=useNavigate();

  return (
    <div className='Cart'>
      <div className="cart-item text-[10px] md:text-2xl md:font-bold mt-[2vw] py-[20px] px-[10px]">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {
        food_list.map((e, i) => {
          if (cartItem[e._id] > 0) {
            return (
              <div key={e._id} >
              <div key={e._id} className=' cart-item text-[10px] md:text-[20px] py-[20px] px-[10px] flex items-center' >
                <img src={ (e.image && e.image.startsWith('http')) ? e.image : (url + "/image/" + e.image) } className='h-[30px] md:h-[80px]' alt="" />
                <p>{e.name}</p>
                <p>${e.price}</p>
                <p>{cartItem[e._id]}</p>
                <p>{e.price*cartItem[e._id]}</p>
                <img onClick={()=>{removeCart(e._id)}} src={assets.cross_icon} alt="" />
              </div>
                <hr className='text-gray-400' />
              </div>
            )
          }
          return null;
        })    
      }
      <div className="cart-bottom flex flex-col-reverse md:flex md:flex-row justify-between mt-[5vw] md:mt-[1vw] gap-[20px] md:gap-[0px]">
        <div className="cart-info flex flex-col  w-[100%] md:w-[50%] px-[30px] py-[30px] gap-[20px]">
          <h2 className='font-bold text-[25px]'>Cart Total</h2>
          <div className="cart-details flex justify-between text-gray-500">
            <p>Subtotal</p>
            <p>${sum}</p>
          </div>
          <div className="cart-details flex justify-between  text-gray-500">
            <p>Delivery Fee</p>
            <p>${DF}</p>
          </div>
          <div className="cart-details flex justify-between text-gray-600">
            <b>Total</b>
            <b>${totalPrice}</b>
          </div>
        <button onClick={()=>{
          navigate('/Order');
        }} className='bg-[tomato] text-white px-[30px] py-[10px] rounded w-[250px]'>Proceed To Checkout</button>
        </div>
        <div className="promo-code  w-[100%] md:w-[50%] flex flex-col gap-[10px] items-baseline py-[30px] px-[20px]">
          <p className=' text-gray-500   '>If you have a promo code, enter here</p>
          <div className='flex flex-col gap-[10px] md:flex-row md:gap-[0px]'>
            <input type="text" placeholder='promo code' className='bg-gray-200 md:w-[25vw] px-[20px] py-[8px] rounded-bl rounded-tl'  />
            <button className='bg-black text-white w-[100px] px-[20px] py-[8px] rounded'>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
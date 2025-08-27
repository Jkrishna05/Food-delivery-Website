import React, { useContext, useEffect, useState } from 'react'
import { datacontext } from '../../Components/context/Storecontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { food_list } from '../../assets/food-del-assets/assets/frontend_assets/assets';

const Order = () => {
  
   let { contextValue } = useContext(datacontext);
    let {sum,DF,totalPrice,food_list,cartItem,url,token} = contextValue;
 let nav=useNavigate();
    let [data,setData]=useState({
      first_name:'',
      last_name:'',
      email:'',
      street:'',
      city:'',
      state:'',
      Pin:'',
      country:'',
      phone:'',
    })
      let Change = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData(prev => ({ ...prev, [name]: value }))
    }
        let placeOrder=async(e)=>{
            e.preventDefault();
            let orderItem=[];
            food_list.map((item)=>{
                  if(cartItem[item._id]>0){
                    let iteminfo=item ;
                    iteminfo.quantity=cartItem[item._id];
                    orderItem.push(iteminfo);
                  }
            })
            let orderData={ 
              address:data,
              Items:orderItem,
              amount:totalPrice
            }
            try {
              let res=await axios.post(`${url}/api/order/placeorder`,orderData,{ headers: { Authorization: `Bearer ${token}` } });
             if(res.data.success){
               let {session_url}=res.data;
               window.location.replace(session_url);
             }
            } catch (error) {
              alert('error')
            }
            
        }
    useEffect(()=>{
      console.log(data);
      if(!token){
        nav('/cart')
      }else if(sum==0){
        nav('/cart')
      }
    },[data])
  
  return (
<form className=' md:flex ' action="" onSubmit={placeOrder} >
  <div className="Detail text-gray-800 bg-amber-30 w-[100%] md:w-[50%] flex flex-col gap-[20px] px-[20px] py-[20px]">
    <h2 className='text-black  text-3xl mb-[20px]'>Delivery Information</h2>
    <div className="detail flex gap-[20px]  ">
      <input required  className='border-b-1 p-[5px] focus:outline-[tomato] w-[140px] ' onChange={Change}  type="text" name="first_name" id="first_name" placeholder='First name' />
      <input required className='border-b-1 p-[5px] focus:outline-[tomato] w-[140px] ' onChange={Change}  type="text" name="last_name" id="last_name" placeholder='Last name' />
    </div>
    <input required className='border-b-1 p-[5px] focus:outline-[tomato] md:w-[30vw]' onChange={Change} type="email" name="email" id="email" placeholder='Email address' />
    <input required className='border-b-1 p-[5px] focus:outline-[tomato] md:w-[30vw]' onChange={Change} type="text" name='street' id='street' placeholder='Street' />

      <div className="detail flex gap-[20px]">
        <input required className='border-b-1 p-[5px] focus:outline-[tomato]  w-[140px]'onChange={Change} type="text"  name='city' id='city' placeholder='City' />
        <input required className='border-b-1 p-[5px] focus:outline-[tomato  w-[140px]' onChange={Change} type="text" name="state" id="state" placeholder='State' />
      </div>
        <div className="detail flex gap-[20px]">
          <input required className='border-b-1 p-[5px] focus:outline-[tomato]  w-[140px]' onChange={Change} type="text" name="Pin" id="pin"  placeholder='Pin Code '/>
          <input required className='border-b-1 p-[5px] focus:outline-[tomato]  w-[140px]'onChange={Change} type="text" name='country' id='country' placeholder='Country' />
        </div>
        <input required className='border-b-1 p-[5px] focus:outline-[tomato] md:w-[30vw]' onChange={Change} type="text" name="phone" id="phone" placeholder='phone' />
  </div>
  <div className="cart-info w-[100%] md:w-[50%] flex justify-center items-center">
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
        <button type='submit' className='bg-[tomato] text-white px-[30px] py-[10px] rounded w-[250px]'>Proceed To Checkout</button>
        </div>
  </div>
</form>
  )
}

export default Order

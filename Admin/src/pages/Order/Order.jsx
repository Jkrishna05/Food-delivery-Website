import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { assets } from '../../assets/admin_assets/assets'
const Order = () => {
  let [orders,setorder]=useState([]);
  let url = 'http://localhost:3000';
  let fetchOrder=async()=>{
    try {
      let res=await axios.get(`${url}/api/order/allorders`);
      if(res.data.success){
        setorder(res.data.order);
        console.log(res.data.order);
      }
      else{
        alert("error in fetching order is")
      }
    } catch (error) {
      console.log(error)
      alert("error in fetching order are")
    }
  }
  let updatestatus=async(event,orderId)=>{
    try {
      let res=await axios.post(`${url}/api/order/status`,{orderId,status:event.target.value})
      if(res.data.success){
        console.log(res.data.message);  
        fetchOrder();
      }
    } catch (error) {
      alert('not updated')
    }
  }
  useEffect(()=>{
    fetchOrder()
  },[])
  return (
    <div className='p-[20px]'>
         <h1 className='text-[25px] font-bold'>Orders page</h1>
            <div>
            {
              orders.map((order, i) => {
                return <div key={i} className='grid grid-cols-[0.5fr_2fr_1fr] items-baseline   gap-y-5 md:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] md:items-center text-[#454545] gap-[20px] border-1 border-[#454545] p-[10px] mb-[20px] mt-[20px]'>
                         <img src={assets.parcel_icon} alt="" />
                           <div className='flex flex-col'>
                            <h1 className='font-bold text-[20px]'>Food:</h1>
                              {
                                order.Items.map((item, i) => {
                                return <div key={i} className='flex gap-[10px]'>
                                          <p>{item.name}x{item.quantity}</p>
                                           {/* <p>${item.price * item.quantity}</p> */}
                                        </div>
                                        })
                              }
                           </div>
                           <div className='flex flex-col'>
                            <h1 className='font-bold text-[20px] '>Address:</h1>
                           <p>{order.address.first_name+' '+order.address.last_name}</p>
                              <p>{order.address.street+' '+order.address.city+' '+order.address.state}</p>
                              <p>{order.address.pin+' '+order.address.country}</p>
                              <p>{order.address.phone}</p>
                           </div>
                              <p>${order.amount}.00 </p>
                              <p>Items:{order.Items.length}</p>
                              <select onChange={(e)=>{updatestatus(e,order._id)}} value={order.status} className='border-1 px-[15px]  py-[5px]' name="Status" id="Status">
                                <option value="FoodProcessing">FoodProcessing</option>
                                <option value="Out for delivery">Out for delivery</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                             
                       </div>
              })
            }
            </div>
    </div>
  )
}

export default Order

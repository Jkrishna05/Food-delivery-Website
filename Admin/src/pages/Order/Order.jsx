import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { assets } from '../../assets/admin_assets/assets'
const Order = ({ url }) => {
  let [orders,setorder]=useState([]);
  let [token, setToken] = useState('');
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState('');

  let fetchOrder=async()=>{
    try {
      setLoading(true);
      setError('');
      
      if (!token) {
        setError('No authorization token found. Please login first.');
        setLoading(false);
        return;
      }
      
      let res=await axios.get(`${url}/api/order/allorders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if(res.data.success){
        setorder(res.data.orders);
        console.log('Orders fetched successfully:', res.data.orders);
      }
      else{
        setError("Error in fetching orders");
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      if (error.response?.status === 401) {
        setError('Unauthorized: Your token may have expired. Please login again.');
      } else if (error.response?.status === 403) {
        setError('Forbidden: You do not have admin privileges.');
      } else {
        setError(error.response?.data?.message || 'Error fetching orders');
      }
    } finally {
      setLoading(false);
    }
  }
  
  let updatestatus=async(event,orderId)=>{
    try {
      let res=await axios.post(`${url}/api/order/status`,{orderId,status:event.target.value}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if(res.data.success){
        console.log(res.data.message);  
        fetchOrder();
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert(error.response?.data?.message || 'Error updating order status');
    }
  }
  
  useEffect(()=>{
    const adminToken = localStorage.getItem('adminToken') || localStorage.getItem('token');
    console.log('Token from localStorage:', adminToken ? 'Found' : 'Not found');
    if (adminToken) {
      setToken(adminToken);
    } else {
      setError('No token found. Please login first.');
      setLoading(false);
    }
  }, [])

  useEffect(()=>{
    if(token) {
      fetchOrder();
    }
  },[token])
  return (
    <div className='p-[20px]'>
         <h1 className='text-[25px] font-bold'>Orders page</h1>
         
         {error && (
           <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
             {error}
           </div>
         )}
         
         {loading && (
           <div className='text-center py-8'>
             <p>Loading orders...</p>
           </div>
         )}
         
         {!loading && orders.length === 0 && !error && (
           <div className='text-center py-8'>
             <p>No orders found</p>
           </div>
         )}
         
         {!loading && orders.length > 0 && (
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
         )}
    </div>
  )
}

export default Order

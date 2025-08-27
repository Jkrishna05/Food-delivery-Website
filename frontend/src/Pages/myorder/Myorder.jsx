import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { assets } from '../../assets/food-del-assets/assets/frontend_assets/assets';
import { datacontext } from '../../Components/context/Storecontext';


const Myorder = () => {
  let { contextValue } = useContext(datacontext);
  let { url, token, totalPrice } = contextValue;
  let [data, setdata] = useState([]);


  let fetch = async () => {
    try {
      let res = await axios.post(`${url}/api/order/userorder`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setdata(res.data.order);
      console.log(res.data.order);
    } catch (error) {
      console.error('Order fetch error:', error);
    }

  }
  useEffect(() => {
    if (token) {
      fetch();
    }
  }, [token])


  return (
    <div className='myorder flex flex-col gap-[30px] mt-[50px] mb-[50px]'>
      <h1 className='text-[25px] font-bold'>My Orders</h1>
      <div>
      {
        data.map((order, i) => {
          return <div key={i} className='grid grid-cols-[1fr_2fr_1fr] gap-y-1 md:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] items-center text-[#454545] gap-[20px] border-1 border-[#454545] p-[20px] mb-[20px]'>
                   <img src={assets.parcel_icon} alt="" />
                     <div>
                        {
                          order.Items.map((item, i) => {
                          return <div key={i} className='flex gap-[10px]'>
                                    <p>{item.name}x{item.quantity}</p>
                                     {/* <p>${item.price * item.quantity}</p> */}
                                  </div>
                                  })
                        }
                     </div>
                        <p>Total : ${order.amount}.00 </p>
                        <p>Items:{order.Items.length}</p>
                        <p><span className='text-[tomato]'>&#x25cf;</span><b>{order.status}</b></p>
                        <button onClick={()=>{fetch()}} className=' bg-[tomato] text-white px-[10px] py-[5px] cursor-pointer'>Track order</button>
                 </div>
        })
      }
      </div>
    </div>
  )
}

export default Myorder

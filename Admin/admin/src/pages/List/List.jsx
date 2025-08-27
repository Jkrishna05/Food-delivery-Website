import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const List = ({url}) => {
  let [list, setlist] = useState([]);
  // let url = 'http://localhost:3000';
  let fetchData = async () => {
    try {
      let res = await axios.get(`${url}/api/food/list`);
      console.log(res.data);
      toast.success('Data fetched successfully');
      setlist(res.data.message);
    } catch (error) {
      toast.error('Error fetching data');
      console.error("Error fetching data:", error);
    }
  }
  let remove=async(id)=>{
    // console.log(id);
    try {
      let res=await axios.post(`${url}/api/food/remove`,{id});
      toast.success('food removed')
      await fetchData();
      console.log(res.data)
    } catch (error) {
      toast.error('error')
    }
    
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div className='  w-[100%]'>
      <ToastContainer />
      <div className="main-list  w-[100%] px-[20px] py-[30px] flex flex-col gap-[30px]">
        <h2 className='text-2xl'>All Foodlist</h2>
        <div className="foodlist">
          <div className="heading border-2 py-[10px]">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          <div className="flex flex-col ">
            {list.map((item, index) => {
              return (
                <div className="food-item heading border-2 py-[10px] border-t-0 border-[#cacaca]" key={index}>
                  <img className='w-[50px]' src={`${url}/image/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>{item.price}</p>
                  <button className='remove-btn' onClick={()=>{remove(item._id)}}>X</button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List

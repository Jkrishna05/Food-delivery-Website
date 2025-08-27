import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/admin_assets/assets'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = ({url}) => {
    
    let [image,setImage]=useState(null);
    let [data,setData]=useState({
        name:'',
        description:'',
        price:'',
        category:'Salad'
    })
   let Change=(e)=>{
     let name=e.target.name;
     let value=e.target.value;
    setData(prev=>({...prev,[name]:value}))
     
   }

 let submit=async(e)=>{
    e.preventDefault();
    let formData=new FormData();
    formData.append('image',image);
    formData.append('name',data.name);
    formData.append('description',data.description);
    formData.append('price',data.price);
    formData.append('category',data.category);

    try {
      let res=await axios.post(`${url}/api/food/add`,formData);
      console.log(res.data);
    //   alert("Item added successfully");
      toast.success("Item added successfully")
        setData({
            name:'',
            description:'',
            price:'',
            category:'salad'
        });
        setImage(null);
  } catch (error) {
    console.error("Error adding item:", error);
    // alert("Failed to add item");
    toast.error('error ocuured')
  }
}

 useEffect(()=>{
   console.log(data);
 },[data])

return (
    <div className=' w-[80%] flex text-gray-500 '>
        <ToastContainer />
       <form className=' w-[100%] h-[100%] px-[50px] py-[50px]  flex flex-col gap-[10px]' onSubmit={submit} action="">
        <div className="file flex flex-col  gap-[10px]">
            <p className='text-xl'>Upload file </p>
            <label htmlFor="image">
                <img className='w-[150px]' src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input type="file" onChange={(e)=>{setImage(e.target.files[0])
                console.log(e.target.files[0])
            }} name="image" id="image" hidden required />
        </div>
        <div className="name ">
            <p className='text-xl'>Food Name</p>
            <input type="text" onChange={Change} value={data.name} className='border-2 px-[5px] py-[10px] ' placeholder='enter food name' name='name'/>
        </div>
        <div className="description">
            <p className='text-xl'>Description</p>
            <textarea name="description" onChange={Change} value={data.description} className='border-2 px-[5px] py-[5px] w-[30%]' placeholder='enter the food description' rows={6}  id="description"></textarea>
        </div>
        <div className="price-category flex gap-[30px]">
            <div className="category">
                <p>Product Category</p>
                <select className='px-[10px] py-[5px] border-2' onChange={Change} value={data.category} name="category" id="category">
                     <option value="Salad">Salad</option>
                     <option value="Cake">Cake</option>
                     <option value="Pasta">Pasta</option>
                     <option value="Pure veg">Pure veg</option>
                     <option value="Rolls">Rolls</option>
                     <option value="Noodles">Noodles</option>
                     <option value="Sandwich">Sandwich</option>
                     <option value="Deserts">Deserts</option>
                </select>
            </div>
            <div className="price">
                <p>Product Price</p>
                <input type="number" onChange={Change} value={data.price} className='px-[5px] py-[5px] border-2 w-[100px]' name="price" id="price" placeholder='$20' />
            </div>
        </div>
        <button type='submit' className='bg-black text-white px-[20px] py-[10px] w-[120px] '>ADD</button>
       </form>
    </div>
  )
}

export default Add

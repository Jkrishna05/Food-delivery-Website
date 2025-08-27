import React, { useState } from 'react'
import { assets } from '../../assets/food-del-assets/assets/frontend_assets/assets'
import { use } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import { useContext } from 'react';
import { datacontext } from '../context/Storecontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signpopup = ({ SetSignpopup }) => {
    let { contextValue } = useContext(datacontext);
    let { url, token, setToken } = contextValue;
    let [currState, setCurrState] = useState('Sign up');
    let [data, setData] = useState({
        name:'',
        email:'',
        password:'',
    })
    let Change = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData(prev => ({ ...prev, [name]: value }))
    }
    let submit = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if (currState === 'Log In') {
            newUrl += '/api/user/login'
        } 
        else {
            newUrl += '/api/user/signup'
        }
        console.log(currState);
        
        console.log(newUrl);
        try {
            let res = await axios.post(newUrl, data);
            console.log(res.data);
            setToken(res.data.token);
            localStorage.setItem('token', res.data.token);
            SetSignpopup(false);
            setData({
                name:'',
                email:'',
                password:'',
            });
        //    toast.success(res.data.message || "Success!");
            alert(res.data.message);
        } catch (error) {
            // console.error("Error adding item:", error);
            alert("Failed");
            // toast.error('error ocuured')
        }
    }
    useEffect(() => {
        console.log(data);
    });
    return (
        <div className='bg-[#00000090] absolute h-[100%] w-[100%] z-[2] grid'>
            <form className='relative text-gray-500 dark:bg-gray-400 dark:text-amber-50 bg-amber-50 text-[] place-self-center-safe flex flex-col gap-[25px] rounded-2xl w-[90vw] h-[100vw] md:w-[22vw] md:h-[25vw] px-[30px] py-[10px]' onSubmit={submit} action="">
                <div className="tittle text-center">
                    <h2 className='text-[25px] font-bold text-black'>{currState}</h2>
                    <img className='absolute right-[20px] top-[20px] cursor-pointer ' onClick={() => SetSignpopup(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="inputs flex flex-col gap-[10px] ">
                    {currState === 'Log In' ? <></> : <input onChange={Change} value={data.name} className='border-b-1 p-[2px] focus:outline-none ' type="text" name='name' placeholder='Your name' required />}
                    <input onChange={Change} value={data.email} className='border-b-1 p-[2px] focus:outline-none ' type="email" name="email" id="email" placeholder='enter email' required />
                    <input onChange={Change} value={data.password} className='border-b-1 p-[2px] focus:outline-none ' type="password" name="password" id="password" placeholder='enter password' required />
                </div>
                <button className='bg-[tomato] px-[10px] py-[5px] cursor-pointer text-amber-50 '>
                    {currState === 'Log In' ? 'Login' : 'Create Account'}
                </button>
                <div className='flex gap-[5px] items-baseline'>
                    <input type="checkbox" name="checkbox" id="" />
                    <p>By,continuing i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === 'Log In'
                    ? <p> Create a new account? <span className='cursor-pointer text-blue-500' onClick={() => setCurrState("Sign up")}>Click here</span></p>
                    : <p> Already have an account? <span className='cursor-pointer text-blue-500' onClick={() => setCurrState("Log In")}>Click here</span></p>
                }
            </form>
        </div>
    )
}

export default Signpopup

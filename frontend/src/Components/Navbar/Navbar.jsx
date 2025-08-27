import React, { useContext, useState } from 'react'
import { assets } from '../../assets/food-del-assets/assets/frontend_assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { datacontext } from '../context/Storecontext'

const Navbar = ({ SetSignpopup }) => {
  let [menu, setMenu] = useState("home")
  let { contextValue } = useContext(datacontext);
  let { sum, token ,setToken } = contextValue;
  let [active, setactive] = useState(false)
  let nav=useNavigate()
  let logout=()=>{
    localStorage.removeItem('token');
    setToken('')
    nav('/')
  }

  return (
    <div className='nav w-[100%]  mt-[2vw] md:mt-[0vw] text-[#49557E] px-[1vw] py-[1vw] flex justify-between items-center  '>
      <Link to='/'> <img className='logo w-[120px] mr-[20px] md:mr-[0px]' src={assets.logo} alt="" /></Link>
      <ol className='menu hidden text-[18px] md:flex gap-[1.5vw]'>
        <Link to='/' onClick={() => { setMenu("home") }} className={menu === "home" ? "active" : ""}  >home</Link>
        <a href='#menupage' onClick={() => { setMenu("menu") }} className={menu === "menu" ? "active" : ""} >menu</a>
        <a href='#AppDownload' onClick={() => { setMenu("mobile-app") }} className={menu === "mobile-app" ? "active" : ""} >mobile-app</a>
        <a href='#footerpage' onClick={() => { setMenu("contact-us") }} className={menu === "contact-us" ? "active" : ""} >contact us</a>
      </ol>
      <div className='right-side-nav  flex  items-center py-[0.5vw] px-[1vw] gap-[3vw]'>
        <img className='h-[5vw] w-[5vw] md:h-[2vw] md:w-[2vw] cursor-pointer' src={assets.search_icon} alt="" />
        <div className="basket-icon relative">
          <Link to='/Cart'> <img className='h-[5vw] w-[5vw] md:h-[2vw] md:w-[2vw] cursor-pointer' src={assets.basket_icon} alt="" /></Link>
          {
            sum > 0 ?
              <div className="dot h-[10px] w-[10px] absolute bg-orange-600 rounded-3xl top-[-8px] right-[-5px]"></div> : <></>
          }
        </div>
        {!token ?
          <button onClick={() => { SetSignpopup(true) }} className='border-2 cursor-pointer border-gray-500 rounded-3xl px-[1.2vw] py-[1vw] md:py-[0.5vw]'>sign in</button> : <div className='cursor-pointer'>
            <img onClick={() => {
              setactive(prev => prev === true ? false : true)
              // console.log('hii') 
            }} className='profile relative' src={assets.profile_icon} alt="" />
            <ul className={`${active === true ? "option" : "hidden"}`}>
              <li className='flex   items-center hover:text-[tomato]' onClick={()=>{nav('/myorder')}}><img className='w-[30px]' src={assets.bag_icon} alt="" />Orders</li>
              <hr />
              <li onClick={logout} className='flex  items-center hover:text-[tomato]'><img  className='w-[30px]' src={assets.logout_icon} alt="" />Log out</li>
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar


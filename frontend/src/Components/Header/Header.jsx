import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

const Header = () => {
    let content = useRef();
    useGSAP(()=>{
        gsap.from(content.current,{
            opacity:0,
            x:50,
            y:50,
            duration:1
        })
    })
  return (
    <div className='h-[38vw] w-[100%] mt-[5vw] md:mt-[0.5vw] md:h-[36vw] mx-[30px] my-auto relative right-[30px] bg-[url(./header_img.png)]  rounded-2xl bg-cover'>

      <div ref={content} className="content  w-[50%] flex flex-col items-start gap-[1.5vw] absolute left-[6vw] bottom-[10%]">
        <h1 className='text-[4.5vw] text-amber-50 font-[500]'>Order your favorite food here</h1>
        <p className='text-[1vw] hidden md:flex  text-amber-50 '>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission  is to satisfy your cravings and elevate your dining experiance , one  delicious meal at a time.</p>
        <button className='text-[#49557E] cursor-pointer  bg-amber-50 rounded-3xl px-[1.2vw] py-[0.5vw]'>View menu</button>
      </div>
    </div>
  )
}

export default Header

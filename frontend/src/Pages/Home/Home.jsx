import React, { useState } from 'react'
import Header from '../../Components/Header/Header'
import Exploremenu from '../../Components/ExploreMenu/Exploremenu'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay'
import AppDownload from '../../Components/AppDownload/AppDownload'

const Home = () => {
     let [catagory, setCatagory]= useState('all')
     return (
         <div>
            <Header />
            <Exploremenu catagory={catagory} setCatagory={setCatagory} />
           <FoodDisplay catagory={catagory} />
             <AppDownload/>
            
        </div>
    )
}

export default Home

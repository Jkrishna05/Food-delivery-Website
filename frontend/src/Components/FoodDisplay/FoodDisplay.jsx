import React, { useContext } from 'react'
import { datacontext } from '../context/Storecontext'
import FoodBox from './Food-box/FoodBox'


const FoodDisplay = ({ catagory }) => {
    let { contextValue } = useContext(datacontext);
    let { food_list } = contextValue;
    return (
        <div className='px-[2vw]'>
            <h1 className='text-[2.5vw]'>Top dishes near you</h1>
            <div className='food-box'>
                {food_list.map((e, i) => {
                    if (catagory === 'all'){
                        return <FoodBox key={i} id={e._id} name={e.name} description={e.description} image={e.image} price={e.price} />
                    }
                   else if(e.category === catagory){
                          return <FoodBox key={i} id={e._id} name={e.name} description={e.description} image={e.image} price={e.price} />
                   }
                })}
            </div>
        </div>
    )
}

export default FoodDisplay

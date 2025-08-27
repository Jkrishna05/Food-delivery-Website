import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
// import { food_list } from '../../assets/food-del-assets/assets/frontend_assets/assets';

export const datacontext = createContext();

const Storecontext = (props) => {
  let [cartItem, setCartItem] = useState({});
  let url = 'http://localhost:3000';
  let [token, setToken] = useState('');
  let [food_list, setFood_list] = useState([]);

  let foodlist = async () => {
    let res = await axios.get(`${url}/api/food/list`)
    setFood_list(res.data.message)
  }

  let loadcartdata = async (token) => {
    let res= await axios.post(`${url}/api/cart/get`, {}, { headers: { Authorization: `Bearer ${token}` } }) 
    // console.log(res.data.message);
    setCartItem(res.data.cartdata);

  }
  let addtoCart = async (Itemid) => {
    if (!cartItem[Itemid]) {
      setCartItem(prev => ({ ...prev, [Itemid]: 1 }))
    }
    else {
      setCartItem(prev => ({ ...prev, [Itemid]: prev[Itemid] + 1 }))
    }
    if (token) {
      await axios.post(`${url}/api/cart/add`, { Itemid }, { headers: { Authorization: `Bearer ${token}` } })
    }
  }
  let removeCart = async (Itemid) => {
    setCartItem(prev => ({ ...prev, [Itemid]: prev[Itemid] - 1 }))
    if (token) {
      await axios.post(`${url}/api/cart/remove`, { Itemid }, { headers: { Authorization: `Bearer ${token}` } })
    }
  }

  let sum = 0;

  food_list.map((e) => {
    if (cartItem[e._id] > 0) {
      sum += e.price * cartItem[e._id];
    }
  });
  let DF = sum == 0 ? 0 : 2;
  let totalPrice = sum + DF;

  useEffect(() => {
    console.log(cartItem);
    console.log(sum);
    async function loadData() {
      await foodlist()
      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'))
        await loadcartdata(localStorage.getItem('token'));
      }
    }
    loadData();
  }, [])




  let contextValue = {
    food_list, cartItem, addtoCart, removeCart, sum, DF, totalPrice, url, token, setToken
  }
  return (
    <datacontext.Provider value={{ contextValue }}>
      {props.children}
    </datacontext.Provider>
  )
}

export default Storecontext
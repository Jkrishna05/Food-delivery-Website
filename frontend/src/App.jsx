import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Footer from './Components/Footer/Footer'
import Signpopup from './Components/Signpopup/Signpopup'
import Cart from './Pages/Cart/Cart'
import Order from './Pages/OrderPlace/Order'
import Myorder from './Pages/myorder/Myorder'
import OrderSuccess from './Pages/order-success/orderSuccess'

const App = () => {
  let [showSignpopup, setShowSignpopup] = useState(false)
 
  return (
    <>
      {showSignpopup ? <Signpopup SetSignpopup={setShowSignpopup} /> : <></>}
      <div className='app'>

        <Navbar SetSignpopup={setShowSignpopup} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Order' element={<Order />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path='/myorder' element={<Myorder />} />
        </Routes>

      </div>
      <Footer />
    </>
  )
}

export default App

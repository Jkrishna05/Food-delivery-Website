import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Order/Order'
import Login from './pages/Login/Login'

const App = () => {
  let url = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin token exists
    const token = localStorage.getItem('adminToken');
    setIsLoggedIn(!!token);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminId');
    setIsLoggedIn(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // If not logged in, show only login page
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path='/login' element={<Login url={url} />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    );
  }

  // If logged in, show dashboard
  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <hr />
      <div className='flex'>
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
          <Route path='/order' element={<Order url={url} />} />
          <Route path='*' element={<Navigate to='/add' />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

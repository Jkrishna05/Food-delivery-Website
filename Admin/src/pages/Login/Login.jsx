import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = ({ url }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await axios.post(`${url}/api/user/login`, {
        email,
        password
      })

      if (res.data.success) {
        // Check if user is admin
        if (res.data.isAdmin) {
          localStorage.setItem('adminToken', res.data.token)
          localStorage.setItem('adminId', res.data.id)
          navigate('/add')
        } else {
          setError('This account is not an admin account')
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminId')
    setEmail('')
    setPassword('')
    navigate('/login')
  }

  // Check if already logged in
  const token = localStorage.getItem('adminToken')

  if (token) {
    return (
      <div className='login-container'>
        <div className='login-box'>
          <h2>You are already logged in</h2>
          <button 
            onClick={handleLogout}
            className='logout-btn'
          >
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h2>Admin Login</h2>
        {error && <div className='error-message'>{error}</div>}
        <form onSubmit={handleLogin}>
          <div className='form-group'>
            <label>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter admin email'
              required
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter password'
              required
            />
          </div>
          <button 
            type='submit' 
            disabled={loading}
            className='login-btn'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className='info-text'>
          Note: Only admin accounts can access this dashboard
        </p>
      </div>
    </div>
  )
}

export default Login

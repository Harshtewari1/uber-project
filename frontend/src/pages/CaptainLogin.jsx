import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {captain, setCaptain} = React.useContext(CaptainDataContext)
  const navigate = useNavigate()
  
  const SubmitHandler = async (e) => {
    e.preventDefault();
    const caption = {
      email: email,
      password: password
    }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, caption)
      if (response.status === 200) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }

    setEmail('')
    setPassword('')
  }
  return (
    <div className='flex flex-col justify-between px-5 py-5 h-screen'>
      <div>
        <img className='mb-3 w-20' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />        <form onSubmit={(e) => SubmitHandler(e)}>
          <h3 className='mb-2 text-lg font-medium'>What is your email</h3>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' required type='email' placeholder='email@example.com' />
          <h3 className='mb-2 text-lg font-medium'>Enter password</h3>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' required type='password' placeholder='password' />
          <button className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
          <p className='text-center'>Join a fleet?  <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
        </form>
      </div>
      <div>
        <Link to='/login' className='bg-[#d5622d] text-white flex items-center justify-center font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin
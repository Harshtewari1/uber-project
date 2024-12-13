import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'



const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [userData, setuserData] = useState('')

  const {user, setUser} = useContext(UserDataContext)
  const navigate = useNavigate()


  
  const SubmitHandler = async (e) => {
    e.preventDefault();
    
    const userData = {
      email:email,
      password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData)  
    if (response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token',data.token)
      navigate('/home')
    }

    setEmail('')
    setpassword('')
  }
  return (
    <div className='flex flex-col justify-between p-7 h-screen'>
      <div>
        <img className='mb-10 w-16' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />
        <form onSubmit={(e) => SubmitHandler(e)}>
          <h3 className='mb-2 text-lg font-medium'>What is your email</h3>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' required type='email' placeholder='email@example.com' />
          <h3 className='mb-2 text-lg font-medium'>Enter password</h3>
          <input value={password} onChange={(e) => setpassword(e.target.value)} className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' required type='password' placeholder='password' />
          <button className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
          <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
        </form>
      </div>
      <div>
        <Link to='/captain-login' className='bg-[#10b461] text-white flex items-center justify-center font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>
          Sign in as Captain !
        </Link>
      </div>
    </div>
  )
}
export default UserLogin

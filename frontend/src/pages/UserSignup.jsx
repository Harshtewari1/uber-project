import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'


const UserSignup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})
  

  const navigate = useNavigate()
  
  const { user, setUser } = useContext(UserDataContext)
  
    const SubmitHandler =  async (e) => {
      e.preventDefault()
  
      const newUser = {
        fullname: {
          firstname: firstName,
          lastname: lastName
        },
        email: email,
        password: password
      }


      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUser)  


      if (response.status === 201) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token',data.token)
        navigate('/home')
      }
      

      setEmail('')
      setFirstName('')
      setLastName('')
      setPassword('')
    }

  
  return (
    <div className='flex flex-col justify-between p-7 h-screen'>
          <div>
            <img className='mb-10 w-16' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />
            <form onSubmit={(e) => SubmitHandler(e)}>
              <h3 className='mb-2 w-full text-lg font-medium'>What's Your name</h3>
              <div className='flex gap-4 mb-7'>
                <input
                  required
                  className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                  type="text"
                  placeholder='First name'
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value)
                  }}
                />
                <input
                  required
                  className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                  type="text"
                  placeholder='Last name'
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value)
                  }}
                />
              </div>
              <h3 className='mb-2 text-lg font-medium'>What is your email</h3>
              <input value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }} className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' required type='email' placeholder='email@example.com' />
              <h3 className='mb-2 text-lg font-medium'>Enter password</h3>
              <input value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' required type='password' placeholder='password' />
              <button className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>Create Account</button>
              <p className='text-center'>Already have a account? <Link to='/login' className='text-blue-600'>Login Here</Link></p>
            </form>
          </div>
          <div>
            <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
              Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
          </div>
        </div>
  )
}

export default UserSignup
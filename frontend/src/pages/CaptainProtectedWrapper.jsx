import React, {useContext, useEffect,  useState} from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'

const CaptainProtectedWrapper = ({ children }) => {
    const navigate = useNavigate()
    const { captain , setCaptain } = useContext(CaptainDataContext)
    const token = localStorage.getItem('token')
    const {isLoading, setIsLoading} = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }).then(response => {
          if (response.status === 200) {
              setCaptain(response.data.captain)
              setIsLoading(false)
          }
      })
          .catch(err => {

              localStorage.removeItem('token')
              navigate('/captain-login')
          })
    }, [token])


    if (isLoading) {
      return (
          <div>Loading...</div>
      )
  }

  

  return (
    <>
        {children}
    </>
  )
}

export default CaptainProtectedWrapper
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import  { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const Usersignup = () => {
  const{user,setUser}= useContext(UserDataContext)
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  // console.log(setEmail)
  const [password, setPassword] = useState('');
  // const [userData, setUserData] = useState({})
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname:{
      firstname:firstName,
      lastname:lastName
      },
      email: email,
      password:password
    }
    try {
      const response = await axios.post(`http://localhost:4000/api/user/register`,newUser)
      
      // console.log(response.data)
      if(response.data.success){
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token',data.token)
        navigate('/home')
      }
      
    } catch (error) {
      console.log(error)
      
    }

    // setUserData({
    //   fullname:{
    //     firstName:firstName,
    //     lastName:lastName

    //   },
    //   email: email,
    //   password: password
    // })
    // console.log(userData)

    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')

  }
  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <form onSubmit={(e) => onSubmitHandler(e)}>
            <img onClick={() => navigate('/')} className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" srcset="" />
            <h3 className='text-lg mt-4 mb-1  font-bold'>What's your Fullname</h3>
            <div className='flex gap-4 mb-5'>


              <input value={firstName} onChange={(e) => { setFirstName(e.target.value) }} className='bg-[#eeeeee] outline-none   rounded px-4 py-2   w-1/2 text-lg placeholder:text-base' type="text" required placeholder='FirstName' />
              <input value={lastName} onChange={(e) => { setLastName(e.target.value) }} className='bg-[#eeeeee] outline-none   rounded px-4 py-2   w-1/2 text-lg placeholder:text-base' type="text" required placeholder='LastName' />
            </div>
            <h3 className='text-lg mt-4 mb-1  font-bold'>What's your email</h3>
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} className='bg-[#eeeeee] outline-none  mb-5 rounded px-4 py-2   w-full text-lg placeholder:text-base' type="email" required placeholder='email@example.com' />
            <h3 className='font-bold text-base mb-2'>Enter Password</h3>
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} className='bg-[#eeeeee] outline-none  mb-5 rounded px-4 py-2   w-full text-lg placeholder:text-base' type="Password" required placeholder='Password' />
            <button type='submit' className='bg-[#111] hover:cursor-pointer text-white text-semibold outline-none  mb-7 rounded px-4 py-2   w-full text-lg placeholder:text-base'>Create Account</button>
            <p className='text-start mb-2 '> Already have an  Account? <Link to={'/login'} className='text-blue-600'>login here</Link></p>

          </form>
        </div>
        <div className='align-bottom'>
          <p className='text-xs leading-tight'>
          By proceeding ,you consent to get call  ,WhatsApps or SMS
          message ,including by automated means , from Uber
          </p>
          {/* <Link to={'/captainlogin'} className='bg-[#10b461] text-white text-center  text-semibold mb-4 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain </Link> */}
        </div>

      </div>
    </div>
  )
}

export default Usersignup

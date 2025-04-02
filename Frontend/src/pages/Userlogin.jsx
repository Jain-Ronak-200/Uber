import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const Userlogin = () => {
  const {user,setUser}=useContext(UserDataContext)
  const navigate = useNavigate();
  const[email,setEmail]= useState('');
  // console.log(setEmail)
  const[password,setPassword]= useState('');
  const[userData,setUserData]=useState({})
  const onSubmitHandler= async(e)=>{
    e.preventDefault()
    setUserData({
      email:email,
      password:password
    })
    // console.log(userData)

  


    const response = await axios.post("http://localhost:4000/api/user/login",userData)
    // console.log(response)
    if(response.data.success===true){
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token',data.token)
      // console.log(setUser)
      navigate('/home')
      setEmail('')
      setPassword('')
    }
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
      <form onSubmit={(e)=>onSubmitHandler(e)}>
      <img onClick={()=>navigate('/')} className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" srcset="" />
        <h3 className='text-lg mt-4 mb-1  font-bold'>What's your email</h3>
        <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className='bg-[#eeeeee] outline-none  mb-7 rounded px-4 py-2   w-full text-lg placeholder:text-base' type="email" required placeholder='email@example.com' />
        <h3 className='font-bold text-lg mb-2'>Enter Password</h3>
        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className='bg-[#eeeeee] outline-none  mb-7 rounded px-4 py-2   w-full text-lg placeholder:text-base' type="Password" required placeholder='Password' />
        <button type='submit' className='bg-[#111] hover:cursor-pointer text-white text-semibold outline-none  mb-7 rounded px-4 py-2   w-full text-lg placeholder:text-base'>Login</button>
        <p className='text-center mb-2 '>New here? <Link to={'/signup'} className='text-blue-600'>Create new Account</Link></p>

      </form>
      </div>
      <div className='flex'>
        <Link to={'/captainlogin'} className='bg-[#10b461] text-white text-center  text-semibold mb-4 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain </Link>
      </div>
      
    </div>
  )
}

export default Userlogin

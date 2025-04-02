import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/Captiaoncontext';

const Captainlogin =  () => {
  const {setCaptain}= useContext(CaptainDataContext);
  const navigate = useNavigate();
  const[email,setEmail]= useState('');
  // console.log(setEmail)
  const[password,setPassword]= useState('');
  const[CaptainData,setCaptainData]=useState({})
  const onSubmitHandler=async(e)=>{
    e.preventDefault()
    setCaptainData({
      email:email,
      password:password
    })
    // console.log(CaptainData)

    try {
      const response = await axios.post('http://localhost:4000/captain/login',CaptainData)
      // console.log(email)
      // console.log(password)
      // console.log(response)
      if(response.data.success){
        setCaptain(response.data.user)
        localStorage.setItem('token',response.data.token)
        navigate('/captainhome')
      }
    } catch (error) {
      console.log(error)
    }

    // setEmail('')
    // setPassword('')

  }
  return (
    <div>
          <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
      <form onSubmit={(e)=>onSubmitHandler(e)}>
      <img onClick={()=>navigate('/')} className='w-20 mb-2' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="Uber Logo" srcset="" />
        <h3 className='text-lg mt-4 mb-1  font-bold'>What's your email</h3>
        <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className='bg-[#eeeeee] outline-none  mb-7 rounded px-4 py-2   w-full text-lg placeholder:text-base' type="email" required placeholder='email@example.com' />
        <h3 className='font-bold text-lg mb-2'>Enter Password</h3>
        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className='bg-[#eeeeee] outline-none  mb-7 rounded px-4 py-2   w-full text-lg placeholder:text-base' type="Password" required placeholder='Password' />
        <button type='submit' className='bg-[#111] hover:cursor-pointer text-white text-semibold outline-none  mb-7 rounded px-4 py-2   w-full text-lg placeholder:text-base'>Login</button>
        <p className='text-center mb-2 '>Join a fleet? <Link to={'/captainsignup'} className='text-blue-600'>Register as a Captain</Link></p>

      </form>
      </div>
      <div className='flex'>
        <Link to={'/login'} className='bg-[#d5622d] text-white text-center  text-semibold mb-4 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as User </Link>
      </div>
      
    </div>
    </div>
  )
}

export default Captainlogin

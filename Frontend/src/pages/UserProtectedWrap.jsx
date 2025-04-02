import React, { useContext, useEffect,useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const UserProtectedWrap = ({children}) => {
  const{user,setUser}=useContext(UserDataContext)
    const token = localStorage.getItem('token')
    // console.log(token)
    const navigate = useNavigate();
     const[isLoadeing,setIsLoading]= useState(true)

    useEffect(()=>{
      if(!token){
        navigate('/login')
    }

    },[token])
    useEffect(()=>{
      const get=async()=>{
        await axios.post('http://localhost:4000/api/user/profile',{},{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        .then((response)=>{
          if(response){
            setUser(response.data)  
            // here the change is that responce .data.user
            setIsLoading(false)
          }
        })
        .catch(error=>{
          localStorage.removeItem('token')
          navigate('/login')
        })
      }
      get();
    },[token])
    if(isLoadeing){
      return <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
    }
  


  return (
    <>
    {children}
    </>

  )
}

export default UserProtectedWrap

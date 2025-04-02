import React, { useContext, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/Captiaoncontext';
import axios from 'axios';

const Captainprotectedwraper = ({children}) => {
    const{captain,setCaptain}= useContext(CaptainDataContext);
    const token = localStorage.getItem('token')
    // console.log(token)
    const navigate = useNavigate();
    const[isLoadeing,setIsLoading]= useState(true)

    useEffect(()=>{

      if(!token){
        navigate('/captainlogin')
    }

    },[token])
    useEffect(() => {
        axios.get('http://localhost:4000/captain/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if(response) {
                // console.log(response)
                setCaptain(response.data)
                // console.log(response.data)
                setIsLoading(false)
            }
        })
        .catch(error => {

            localStorage.removeItem('token')
            navigate('/captainlogin')
        })
    }, [token])
    if(isLoadeing){
    return (
        <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
    )
    }


  return (
    <>
    {children}
    </>

  )
}

export default Captainprotectedwraper

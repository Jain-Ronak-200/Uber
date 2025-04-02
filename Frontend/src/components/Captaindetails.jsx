import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/Captiaoncontext'
import axios from 'axios'

const Captaindetails = () => {
  const{captain,setCaptian}=useContext(CaptainDataContext)

  
  return (

    <>
    <div className='flex items-center justify-between w-full '>
          <div className='flex items-center justify-start gap-3'>
            <img className='h-10 w-10 rounded-full object-corver' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIUJa8mZErcXq1enCRgWZbE2T0VIk5fYw2HQ&s" alt="" />
            <h4 className='text-lg  capitalize font-semibold'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
          </div>
          <div>
            <h4 className='text-xl font-semibold'>$283.3</h4>
            <p className='text-sm text-gray-600'>Earn</p>
          </div>
        </div>
        <div className='flex mt-4  bg-gray-100 p-5 rounded-xl justify-center gap-7 items-start'>
          <div className='text-center'>
            <i className=" text-3xl mb-2 font-thin ri-timer-2-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600 '>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className=" text-3xl mb-2 font-thin ri-speed-up-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600 '>Hours Online</p>

          </div>
          <div className='text-center'>
            <i class=" text-3xl mb-2 font-thin ri-booklet-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600 '>Hours Online</p>
          </div>

        </div>
    </>

  )
}

export default Captaindetails

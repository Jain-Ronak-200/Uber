import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className=' bg-cover bg-centre bg-[url(https://images.unsplash.com/photo-1624724126923-e2c021df1311?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen w-full pt-8  flex justify-between flex-col'>
            
            <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" srcset="" />
            <div className='bg-white py-4 px-4 pb-11 rounded-t-3xl'>
                <h2 className='text-3xl font-bold'>Get Started With Uber</h2>
                <Link to={'/login'} className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5 text-xl '>Continue</Link>
            </div>

        </div>
      
    </div>
  )
}

export default Start

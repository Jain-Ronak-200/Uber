import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/Captiaoncontext'

const ConfirmRidePopup = ({setConfirmRidePopupPanel,ride}) => {
    const[otp,setOtp] = useState('')
    const navigate = useNavigate()
    const{captain}=useContext(CaptainDataContext)
    


    const submitHandler = async(e)=>{

        e.preventDefault()
        console.log(otp)
        try {
            console.log(ride._id)
            
            const response = await axios.get('http://localhost:4000/rides/start-ride', {

                params: { rideId: ride._id, otp: otp,captain },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response,otp); 
            if (response.status===200) {
                navigate('/captainRaiding')
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <h2 className='text-xl font-semibold mb-5'>Confirm This Ride to Start </h2>
            <div className='flex items-center justify-between bg-gray-300 rounded-lg p-3 mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 w-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIUJa8mZErcXq1enCRgWZbE2T0VIk5fYw2HQ&s" alt="" srcset="" />
                    <h2 className='text-lg font-medium'></h2>
                </div>
                <h5 className='texr-lg font-semibold'>2.2km</h5>
            </div>
            <div className='flex gap-2 justify-between item-center flex-col'>
                {/* <img className='h-30 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" /> */}


                <div className='w-full mt-5'>
                    <div className='flex item-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm  -mt-1 text-gray-600'>{ride?.pickup}</p>
                        </div>
                    </div>

                    <div className='flex item-center gap-5 p-3 border-b-2'>

                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-sm  -mt-1 text-gray-600'>{ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex item-center gap-5 p-3 ' >
                        <i className=" text-lg ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{ride?.fare}</h3>
                            <p className='text-sm  -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>

                </div>
             
                <div className='mt-4 w-full'>
                <form onSubmit={(e)=>{
                    submitHandler(e)
                }} >
                    <input onChange={(e)=>setOtp(e.target.value)} value={otp} type="text" placeholder='Enter OTP' required className='bg-[#eee] mb-6 px-6 py-4 text-lg font-mono outline-none rounded-lg w-full mt-3' />
                    <button type='submit' onClick={() => {

                    }} className='w-full mt-1 flex justify-center bg-green-600 text-white font-semibold p-2 rounded-lg'>
                        Confirm
                    </button>
                    <button onClick={() => {
                        setConfirmRidePopupPanel(false)

                    }} className='w-full mt-1 bg-red-500 text-white font-semibold p-2 rounded-lg'>
                        Cencel
                    </button>
                    </form>


                </div>

            </div>
        </div>
    )
}

export default ConfirmRidePopup

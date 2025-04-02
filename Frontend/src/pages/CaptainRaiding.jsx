import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import FineshRide from '../components/FineshRide';
import { CaptainDataContext } from '../context/Captiaoncontext';
import axios from "axios";
import LiveLocation from '../components/LiveTracking';

const CaptainRaiding = () => {
    const[finishRidePanel,setFinishRidePanel] = useState(false)
    const FinishRideRef = useRef(null)
    const{raiddetail}=useContext(CaptainDataContext)
    const{captain}=useContext(CaptainDataContext)
    const navigate = useNavigate()




    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(FinishRideRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(FinishRideRef.current, {
                transform: 'translateY(100%)'

            })
        }

    }, [finishRidePanel])
    
  const endride = async () => {
    console.log("🚀 Ride ID before request:", raiddetail._id,raiddetail.user); // Debugging

    try {
        const response = await axios.post('http://localhost:4000/rides/end-ride', {
            rideId: raiddetail._id,  // Ensure ride._id is valid
            captainId: captain?._id,
            ridedetails:raiddetail
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        console.log("✅ Server response:", response.data);
        
        if (response.data) {
            navigate('/captainhome')
        } else {
            console.error("🚨 Ride confirmation failed:", response.data.message);
        }
    } catch (error) {
        console.error("❌ Error confirming ride:", error.response?.data || error.message);
    }
};

    return (
        <div className='h-screen'>

            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />


                <Link to={'/captain/logout'} className=' h-10 w-10 bg-white flex items-center justify-center rounded-full  '>
                    <i class="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            <div className='h-4/5'>
            <div className="h-full w-full relative live-location-container">
      <LiveLocation/>
        {/* <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
      </div>
                {/* <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
            </div>

            <div onClick={()=>
                setFinishRidePanel(true)
            } className='h-1/5 p-6 bg-yellow-400 relative rounded-t-xl flex  gap-1 items-center justify-between'>
                <h5 onClick={() => {

                }} className='p-1 text-center w-[95%] absolute top-0' ><i onClick={() => {
                }} className="text-3xl text-gray-800  ri-arrow-up-wide-line"></i></h5>
                <div className='flex items-center p-2 gap-2 bg-yellow-300 rounded-xl  justify-between'>

                    <i className="text-3xl ri-roadster-fill"></i>
                    <h4 className='text-xl font-semibold items-center justify-between'>4 km away</h4>
                </div>
                <button className='items-center justify-between w-full   bg-green-500 text-white font-semibold p-2 rounded-lg'> Complete Ride</button>

            </div>
            <div onClick={()=>{
                setFinishRidePanel(false)

            }} ref={FinishRideRef} className='fixed w-full rounded-t-3xl z-10 bg-white bottom-0 pt-1 py-6 px-8  translate-0-y-full '>
                <h5 onClick={() => {

                }} className='flex items-center justify-center text-2xl text-gray-400' ><i onClick={() => {
                    setFinishRidePanel(false)
                }} className="ri-arrow-down-wide-line"></i></h5>
                <FineshRide endride={endride} raiddetail={raiddetail}/>
            </div>


        </div>
    )
}

export default CaptainRaiding

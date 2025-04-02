import React from 'react'
import { Link } from 'react-router-dom'

const FineshRide = ({raiddetail,endride}) => {
  return (
    <div>
         <div>
            <h2 className='text-xl font-semibold mb-5'>Finish This Ride  </h2>
            <div className='flex items-center justify-between bg-gray-300 rounded-lg p-3 mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 w-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIUJa8mZErcXq1enCRgWZbE2T0VIk5fYw2HQ&s" alt="" srcset="" />
                    <h2 className='text-lg font-medium'>{raiddetail?.user.fullname.firstname}</h2>
                </div>
                <h5 className='texr-lg font-semibold'>2.2km</h5>
            </div>
            <div className='flex gap-2 justify-between item-center flex-col'>
                {/* <img className='h-30 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" /> */}


                <div className='w-full mt-5'>
                    <div className='flex item-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Pickup</h3>
                            <p className='text-sm  -mt-1 text-gray-600'>{raiddetail?.pickup}</p>
                        </div>
                    </div>

                    <div className='flex item-center gap-5 p-3 border-b-2'>

                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-sm  -mt-1 text-gray-600'>{raiddetail?.destination}</p>
                        </div>
                    </div>
                    <div className='flex item-center gap-5 p-3 ' >
                        <i className=" text-lg ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{raiddetail?.fare}</h3>
                            <p className='text-sm  -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>

                </div>
             
                <div className='mt-4 w-full'>

                  
                    <button  onClick={() => { endride()

                    }} className='w-full mt-1 flex justify-center bg-green-600 text-white font-semibold p-2 rounded-lg'>
                        Finish Ride
                    </button>
                    <p className='text-xs mt-3  mb-1' > <i className=" text-red-500 ri-error-warning-line"></i> Click on finish ride button if you have completed the payment process</p>




                </div>

            </div>
        </div>
    </div>
  )
}

export default FineshRide

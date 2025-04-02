import React, { useEffect } from 'react'

const LookingforDriver = ({setWaittingforDriver,createARide,destination, pickup,vehivlefare,vehicleType}) => {

    return (
        <div>

            <h2 className='text-2xl font-semibold mb-5'>Looking for a Driver </h2>
            <div className='flex gap-2 justify-between item-center flex-col'>
                <img className='h-30 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />

                <div className='w-full mt-5'>
                    <div className='flex item-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm  -mt-1 text-gray-600'>{pickup}</p>
                        </div>
                    </div>

                    <div className='flex item-center gap-5 p-3 border-b-2'>

                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-sm  -mt-1 text-gray-600'>{destination}</p>
                        </div>
                    </div>
                    <div className='flex item-center gap-5 p-3 ' >
                        <i className=" text-lg ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{vehivlefare[vehicleType]}</h3>
                            <p className='text-sm  -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>

                </div>
                {/* <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>
    Confirm
  </button> */}

            </div>
        </div>
    )
}

export default LookingforDriver

import React from 'react'

const Displayvehicle = ({ vehiclePanelRef, setConfirmedRidePanel,setVehiclePanel,vehivlefare ,createride,setVehicleType}) => {
    return (
        <div>
            
            <h2 className='text-2xl font-semibold mb-5'>Choose The Vehicle</h2>
            <div onClick={() => {
                setConfirmedRidePanel(true)
                setVehiclePanel(false)
                // createride('car')
                setVehicleType('car')

            }} className='flex w-full bg-gray-200  active:border-black  rounded-xl p-3 mb-2 items-center justify-between'>
                <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base '>UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h5 className='font-medium text-sm'>{vehivlefare.minaway}min away</h5>
                    <p className='font-normal text-xs text-gray=500'>Affordable campact ride</p>
                </div>
                <h2 className='text-lg font-semibold'>₹{vehivlefare.car}</h2>
            </div>

            <div onClick={() => { setConfirmedRidePanel(true)
                setVehiclePanel(false)
                // createride('motorcycle')
                setVehicleType('motorcycle')
             }} className='flex w-full bg-gray-200  active:border-black  rounded-xl p-3 mb-2 items-center justify-between'>
                <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base '>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
                    <h5 className='font-medium text-sm'>{vehivlefare.minaway}min away</h5>
                    <p className='font-normal text-xs text-gray=500'>Affordable Motercycle ride</p>
                </div>
                <h2 className='text-lg font-semibold'>₹{vehivlefare.motorcycle}</h2>
            </div>
            <div onClick={() => { setConfirmedRidePanel(true)
                setVehiclePanel(false)
                // createride('auto')
                setVehicleType('auto')
             }} className='flex w-full bg-gray-200  active:border-black  rounded-xl p-3 mb-2 items-center justify-between'>
                <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base '>UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
                    <h5 className='font-medium text-sm'>{vehivlefare.minaway}min away</h5>
                    <p className='font-normal text-xs text-gray=500'>Affordable auto ride</p>
                </div>
                <h2 className='text-lg font-semibold'>₹{vehivlefare.auto}</h2>
            </div>


        </div>

    )
}

export default Displayvehicle

import React from 'react'

const RidePoPup = ({ setRidePopupPanel, setConfirmRidePopupPanel, ride, confirmaride }) => {
  return (
    <div>
      <h2 className='text-2xl font-semibold mb-5'>New Ride Available ! </h2>
      <div className='flex items-center justify-between bg-gray-300 rounded-lg p-3 mt-4'>
        <div className='flex items-center gap-3 '>
          <img className='h-12 w-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIUJa8mZErcXq1enCRgWZbE2T0VIk5fYw2HQ&s" alt="" srcset="" />
          <h2 className='text-lg font-medium'>{ride?.user?.fullname?.firstname}</h2>
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
              <p className='text-sm  -mt-1 text-gray-600'>{ride.pickup}</p>
            </div>
          </div>

          <div className='flex item-center gap-5 p-3 border-b-2'>

            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm  -mt-1 text-gray-600'>{ride.destination}</p>
            </div>
          </div>
          <div className='flex item-center gap-5 p-3 ' >
            <i className=" text-lg ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'>{ride.fare}</h3>
              <p className='text-sm  -mt-1 text-gray-600'>Cash</p>
            </div>
          </div>

        </div>
        <div className='flex justify-between gap-5 '>


          <button onClick={() => {
            //setConfirmRidePopupPanel(true)
            confirmaride()
          }} className='w-full mt-1 bg-green-600 text-white font-semibold p-2 rounded-lg'>
            Accept
          </button>
          <button onClick={() => {

            setRidePopupPanel(false)

          }} className='w-full mt-1 bg-gray-300 text-gray-700 font-semibold p-2 rounded-lg'>
            Ignore
          </button>
        </div>

      </div>
    </div>
  )
}

export default RidePoPup

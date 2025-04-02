import React from 'react'

const Waitfordriver = (props) => {
  return (
    <div>
    <div className='flex items-center justify-between'>

        <img className='h-12 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
        <div className='text-right'>
            <h2 className='text-lg font-medium capitalize'>{props.ride?.captain.fullname.firstname}</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
            <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
            <h1 className='text-xl font-semibold -mt-1 -mb-1' >otp {props.ride?.otp}</h1>
        </div>
    </div>

    {/* <h2 className='text-2xl font-semibold mb-5'>Looking for a Driver </h2> */}
    <div className='flex gap-2 justify-between item-center flex-col'>

        <div className='w-full mt-5'>
            <div className='flex item-center gap-5 p-3 border-b-2'>
                <i className="text-lg ri-map-pin-2-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm  -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                </div>
            </div>

            <div className='flex item-center gap-5 p-3 border-b-2'>

                <i className="text-lg ri-map-pin-user-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm  -mt-1 text-gray-600'>{props.ride?.destination}</p>
                </div>
            </div>
            <div className='flex item-center gap-5 p-3 ' >
                <i className=" text-lg ri-currency-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>{props.ride?.fare}</h3>
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

export default Waitfordriver

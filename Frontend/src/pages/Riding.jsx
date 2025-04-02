// import React, { useContext,useEffect } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { UserDataContext } from '../context/UserContext'
// import { SocketContext } from '../context/SocketContext'
// import LiveLocation from '../components/LiveTracking'

// const Riding = () => {
//     const { startridding } = useContext(UserDataContext)
//     const { socket } = useContext(SocketContext)
//     const navigate = useNavigate()

//     socket.on('ride-ended',data=>{

//         console.log(data)
//         navigate('/home')
        
//       })
//     return (
//         <div className='h-screen overflow-hidden'>
//             <Link to={'/home'} className='fixed h-10 w-10 bg-white flex items-center justify-center rounded-full right-2 top-2 '>
//                 <i className="text-lg font-medium ri-home-4-line">{ }</i>
//             </Link>

//             <div>
//                 {/* <LiveLocation/> i want the this component instead of this image down side image ok dear chatgpt */ }  
//                 <img className='h-1/2 w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
//             </div>
//             <div className='h-1/2 p-4 overflow-y-auto'>
//                 <div>
//                     <div className='flex items-center justify-between'>
//                         <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
//                         <div className='text-right'>
//                             <h2 className='text-lg font-medium'>{startridding?.captain.fullname.firstname}</h2>
//                             <h4 className='text-xl font-semibold -mt-1 -mb-1'>{startridding?.captain.vehicle.plate}</h4>
//                             <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
//                         </div>
//                     </div>

//                     <div className='flex gap-1 justify-between item-center flex-col'>
//                         <div className='w-full mt-2'>
//                             <div className='flex item-center gap-2 p-3 border-b-2'>
//                                 <i className="text-lg ri-map-pin-user-fill"></i>
//                                 <div>
//                                     <h3 className='text-lg font-medium'>Destination</h3>
//                                     <p className='text-sm -mt-1 text-gray-600'>{startridding?.destination}</p>
//                                 </div>
//                             </div>
//                             <div className='flex item-center gap-2 p-3'>
//                                 <i className="text-lg ri-currency-line"></i>
//                                 <div>
//                                     <h3 className='text-lg font-medium'>{startridding?.fare}</h3>
//                                     <p className='text-sm -mt-1 text-gray-600'>Cash</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <button className='w-full mt-0.2 mb-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
//             </div>
//         </div>
//     )
// }

// export default Riding


import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { SocketContext } from '../context/SocketContext'
import LiveLocation from '../components/LiveTracking'

const Riding = () => {
    const { startridding } = useContext(UserDataContext)
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    socket.on('ride-ended', data => {
        console.log(data)
        navigate('/home')
    })

    return (
        <div className='h-screen overflow-hidden '>
            <Link to={'/home'} className='fixed h-10 w-10 bg-white flex items-center justify-center rounded-full right-2 top-2 '>
                <i className="text-lg font-medium ri-home-4-line">{ }</i>
            </Link>

            <div className="h-1/2 w-full relative lllive-location-container ">
                <LiveLocation />
            </div>

            <div className='h-1/2 p-4 overflow-y-auto '>
                <div>
                    <div className='flex items-center justify-between'>
                        <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
                        <div className='text-right'>
                            <h2 className='text-lg font-medium'>{startridding?.captain.fullname.firstname}</h2>
                            <h4 className='text-xl font-semibold -mt-1 -mb-1'>{startridding?.captain.vehicle.plate}</h4>
                            <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                        </div>
                    </div>

                    <div className='flex gap-1 justify-between item-center flex-col'>
                        <div className='w-full mt-2'>
                            <div className='flex item-center gap-2 p-3 border-b-2'>
                                <i className="text-lg ri-map-pin-user-fill"></i>
                                <div>
                                    <h3 className='text-lg font-medium'>Destination</h3>
                                    <p className='text-sm -mt-1 text-gray-600'>{startridding?.destination}</p>
                                </div>
                            </div>
                            <div className='flex item-center gap-2 p-3 mb-5'>
                                <i className="text-lg ri-currency-line"></i>
                                <div>
                                    <h3 className='text-lg font-medium'>{startridding?.fare}</h3>
                                    <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-full mt-0.2 mb-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding;

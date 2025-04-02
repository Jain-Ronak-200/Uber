import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import Captaindetails from '../components/Captaindetails'
import RidePoPup from '../components/RidePoPup'
import 'remixicon/fonts/remixicon.css'
import gsap from 'gsap';
import ConfirmRidePopup from '../components/ConfirmRidePopup'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/Captiaoncontext'
import axios from 'axios'
import LiveLocation from '../components/LiveTracking'

const CaptainHome = () => {
  const[ridePopupPanel,setRidePopupPanel] = useState(false)
  const[confirmRidePopupPanel,setConfirmRidePopupPanel] = useState(false)
  const ridePopupPanelRef=useRef(null)
  const ConfirmridePopupPanelRef=useRef(null)
  const[ride,setRide]=useState([])

  const{sendMessage,receiveMessage,socket} =useContext(SocketContext)
  const{captain,setRideDetail}=useContext(CaptainDataContext)
  
    useEffect(() => {
      sendMessage("join", { userType: "captain", userId: captain._id });

      const intervalId = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        sendMessage("update-location-captain", {
          userId: captain._id,
          location:{
            ltd:latitude,
            lng:longitude,
          }
        });
        });
      }
      }, 10000);

      return () => clearInterval(intervalId);
    }, [captain]);

    socket.on('new-ride',(data)=>{
      // console.log(data.id)
      setRide(data)
      setRideDetail(data)
      setRidePopupPanel(true)
    })




  useGSAP(function () {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [ridePopupPanel])
  useGSAP(function () {
    if (confirmRidePopupPanel) {
      gsap.to(ConfirmridePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ConfirmridePopupPanelRef.current, {
        transform: 'translateY(100%)'
        
      })
    }

  }, [confirmRidePopupPanel])

  const confirmaride = async () => {
    console.log(" Ride ID before request:", ride?._id); // Debugging

    try {
        const response = await axios.post('http://localhost:4000/rides/confirm', {
            rideId: ride._id,  // Ensure ride._id is valid
            captainId: captain?._id
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        console.log("Server response:", response.data);
        
        if (response.data.success) {
            setRidePopupPanel(false);
            setConfirmRidePopupPanel(true);
        } else {
            console.error(" Ride confirmation failed:", response.data.message);
        }
    } catch (error) {
        console.error(" Error confirming ride:", error.response?.data || error.message);
    }
};



  
  return (
    <div className='h-screen'>
      <div className={confirmRidePopupPanel?'fixed p-6 top-0 flex items-center justify-between w-screen':'fixed p-6 top-0 flex items-center justify-between w-screen z-50'}>
        <img className='w-16' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />


        <Link to={'/captain/logout'} className=' h-10 w-10 bg-white flex items-center justify-center rounded-full  '>
          <i class="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-full w-full relative llive-location-container">
      <LiveLocation/> i want this component instead of this down side img 
        {/* <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
      </div>
      <div className='h-2/5 p-6 '>
        <Captaindetails />
      </div>
      <div ref={ridePopupPanelRef} className='fixed w-full z-10 bg-white bottom-0 pt-7 py-6 px-8 rounded-t-3xl translate-0-y-full '>
      <h5 onClick={() => {
           
          }} className='absolute top-6 right-6 text-2xl' ><i onClick={() => {
            setRidePopupPanel(false)
  
          }} className="ri-arrow-down-wide-line"></i></h5>
        <RidePoPup ride={ride} confirmaride={confirmaride}  setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel}/>
        
      </div>
      <div ref={ConfirmridePopupPanelRef} className='fixed w-full h-screen z-10 bg-white bottom-0 pt-1 py-6 px-8  translate-0-y-full '>
      <h5 onClick={() => {
           
          }} className='flex items-center justify-center text-2xl text-gray-400' ><i onClick={() => {
            setConfirmRidePopupPanel(false)
            setRidePopupPanel(true)
            
            
  
          }} className="ri-arrow-down-wide-line"></i></h5>
        <ConfirmRidePopup ride={ride} setConfirmRidePopupPanel={setConfirmRidePopupPanel}/>
      </div>
    </div>
  )
}

export default CaptainHome





// import React, { useContext, useEffect, useRef, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useGSAP } from '@gsap/react'
// import Captaindetails from '../components/Captaindetails'
// import RidePoPup from '../components/RidePoPup'
// import 'remixicon/fonts/remixicon.css'
// import gsap from 'gsap';
// import ConfirmRidePopup from '../components/ConfirmRidePopup'
// import { SocketContext } from '../context/SocketContext'
// import { CaptainDataContext } from '../context/Captiaoncontext'
// import axios from 'axios'
// import LiveLocation from '../components/LiveTracking'

// const CaptainHome = () => {
//   const [ridePopupPanel, setRidePopupPanel] = useState(false)
//   const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
//   const ridePopupPanelRef = useRef(null)
//   const ConfirmridePopupPanelRef = useRef(null)
//   const [ride, setRide] = useState([])

//   const { sendMessage, receiveMessage, socket } = useContext(SocketContext)
//   const { captain, setRideDetail } = useContext(CaptainDataContext)

//   useEffect(() => {
//     sendMessage("join", { userType: "captain", userId: captain._id });

//     const intervalId = setInterval(() => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//           const { latitude, longitude } = position.coords;
//           sendMessage("update-location-captain", {
//             userId: captain._id,
//             location: {
//               ltd: latitude,
//               lng: longitude,
//             }
//           });
//         });
//       }
//     }, 10000);

//     return () => clearInterval(intervalId);
//   }, [captain]);

//   socket.on('new-ride', (data) => {
//     setRide(data)
//     setRideDetail(data)
//     setRidePopupPanel(true)
//   })

//   useGSAP(() => {
//     gsap.to(ridePopupPanelRef.current, {
//       transform: ridePopupPanel ? 'translateY(0)' : 'translateY(100%)'
//     })
//   }, [ridePopupPanel])

//   useGSAP(() => {
//     gsap.to(ConfirmridePopupPanelRef.current, {
//       transform: confirmRidePopupPanel ? 'translateY(0)' : 'translateY(100%)'
//     })
//   }, [confirmRidePopupPanel])

//   const confirmaride = async () => {
//     try {
//       const response = await axios.post('http://localhost:4000/rides/confirm', {
//         rideId: ride._id,
//         captainId: captain?._id
//       }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });

//       if (response.data.success) {
//         setRidePopupPanel(false);
//         setConfirmRidePopupPanel(true);
//       }
//     } catch (error) {
//       console.error("❌ Error confirming ride:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className='h-screen'>
//       <div className='fixed p-6 top-0 flex items-center justify-between w-screen z-50'>
//         <img className='w-16 ' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

//         <Link to={'/captain/logout'} className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
//           <i className="text-lg font-medium ri-logout-box-r-line"></i>
//         </Link>
//       </div>

//       <div className='h-3/5'>
//         <div className="h-full w-full relative live-location-container">
//           <LiveLocation />
//         </div>
//       </div>

//       <div className='h-2/5 p-6'>
//         <Captaindetails />
//       </div>

//       <div ref={ridePopupPanelRef} className='fixed w-full z-10 bg-white bottom-0 pt-7 py-6 px-8 rounded-t-3xl translate-0-y-full'>
//         <h5 className='absolute top-6 right-6 text-2xl'>
//           <i onClick={() => setRidePopupPanel(false)} className="ri-arrow-down-wide-line"></i>
//         </h5>
//         <RidePoPup ride={ride} confirmaride={confirmaride} setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
//       </div>

//       <div ref={ConfirmridePopupPanelRef} className='fixed w-full h-screen z-10 bg-white bottom-0 pt-1 py-6 px-8 translate-0-y-full'>
//         <h5 className='flex items-center justify-center text-2xl text-gray-400'>
//           <i onClick={() => {
//             setConfirmRidePopupPanel(false)
//             setRidePopupPanel(true)
//           }} className="ri-arrow-down-wide-line"></i>
//         </h5>
//         <ConfirmRidePopup ride={ride} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
//       </div>
//     </div>
//   )
// }

// export default CaptainHome;


import React, { useEffect, useRef, useState,useContext } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import Displayvehicle from '../components/Displayvehicle';
import ConfirmedRide from '../components/ConfirmedRide';
import Waitfordriver from '../components/Waitfordriver';
import LookingforDriver from '../components/LookingforDriver';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import LiveLocation from '../components/LiveTracking';


const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPenelOpen] = useState(false)
  const panelRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const vehiclePanelRef = useRef(null)
  const confirmedRideRef = useRef(null)
  const lookingForDriverRef = useRef(null)
  const WaitingDriverRef = useRef(null)
  const [confirmedRidePanel, setConfirmedRidePanel] = useState(false)
  const [lookingForDriverPanel, setLookingForDriverPanel] = useState(false)
  const [waittingforDriver, setWaittingforDriver] = useState(false)
  const[suggestion,setSuggestion]=useState([])
  const[destinationsuggestion,setDestinationSuggestion]=useState([])
  const[pickuplat,setPickuplat]=useState('')
  const[pickuplng,setPickuplng]=useState('')
  const[destinationlat,setDestinationlat]=useState('')
  const[destinationlng,setDestinationlng]=useState('')
  const [vehivlefare,setVehiclefare]=useState([])
  const [createARide,setCreateRide]=useState([])
  const[vehicleType,setVehicleType]=useState(null)
  const[ride,setRide]=useState(null)
 
  

  const{sendMessage,receiveMessage,socket} = useContext(SocketContext)
  const{user,setStartRidding,startridding}= useContext(UserDataContext)

  useEffect(()=>{
    // console.log(user)
    sendMessage("join",{userType:"user",userId:user._id})
  },[user])
  socket.on('ride-confirmed',ride=>{
    setWaittingforDriver(true)
    setLookingForDriverPanel(false)
    setRide(ride)
    // console.log(ride)
    
  })

  const submithandler = (e) => {
    e.preventDefault();


  }
  const navigate = useNavigate()
  socket.on('ride-started',ride=>{
    setWaittingforDriver(false)
    navigate('/riding')
    setStartRidding(ride)

    
  })
  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        opacity: 1,
        padding: 24
      })
      if (panelOpen)
        {
          setConfirmedRidePanel(false)
        }
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        opacity: 0,
        padding: 0



      })
    }
  }, [panelOpen])
  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
        
      })
      if (vehiclePanel) {
        {
          setPenelOpen(false)
          setConfirmedRidePanel(false)
        }
        
      }
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [vehiclePanel])
  useGSAP(function () {
    if (confirmedRidePanel) {
      gsap.to(confirmedRideRef.current, {
        transform: 'translateY(0)',
        display:"block"
      })
    } else {
      gsap.to(confirmedRideRef.current, {
        transform: 'translateY(100%)',
        display:'none'
      })
    }

  }, [confirmedRidePanel])
  useGSAP(function () {
    if (lookingForDriverPanel) {
      gsap.to(lookingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(lookingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [lookingForDriverPanel])
  useGSAP(function () {
    if (waittingforDriver) {
      gsap.to(WaitingDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(WaitingDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [waittingforDriver])


  const fetchLocation = async () => {
    try {
      if (!pickup || pickup.length < 2) {
        console.error("Pickup location must be at least 2 characters.");
        return;
      }
  
      console.log("Fetching location for pickup:", pickup);
  
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found!");
        return;
      }
  
      const response = await axios.get('http://localhost:4000/maps/autocomplete', {
        headers: { Authorization: `Bearer ${token}` },
        params: { query: pickup }, 
      });
  
      // console.log( response.data);
      setSuggestion(response.data.suggestions);
      // console.log("Suggestions array:", suggestion);
      // console.log("Suggestions type:", Array.isArray(suggestion) ? "Array" : typeof suggestion);
      
      
    } catch (error) {
      console.error("Error:", error.message);
      if (error.response) {
        console.error("Server Response:", error.response.data);
      }
    }
  };
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (pickup.length > 1 &&!vehiclePanel) {
        fetchLocation();
      }
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [pickup]);

  const fetchDestinationLocation = async () => {
    try {
      if (!destination || destination.length < 2) {
        console.error("Pickup location must be at least 2 characters.");
        return;
      }
  
      console.log("Fetching location for pickup:", destination);
  
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found!");
        return;
      }
  
      const response = await axios.get('http://localhost:4000/maps/autocomplete', {
        headers: { Authorization: `Bearer ${token}` },
        params: { query: destination },
      });
  
      // console.log(response.data);
      setDestinationSuggestion(response.data.suggestions);
      // console.log("Suggestions array:", suggestion);
      // console.log("Suggestions type:", Array.isArray(suggestion) ? "Array" : typeof suggestion);
      
      
    } catch (error) {
      console.error("Error:", error.message);
      if (error.response) {
        console.error("Server Response:", error.response.data);
      }
    }
  };
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (destination.length > 1 && !vehiclePanel) {
        fetchDestinationLocation();
      }
    }, 3000);
    return () => clearTimeout(delayDebounceFn);
  }, [destination]);


  const getfare = async()=>{
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.get('http://localhost:4000/rides/getfare',{
        params:{
          pickup:pickup,
          destination:destination,
      },headers: { Authorization: `Bearer ${token}` }
      
    })
    setVehiclefare(response.data)
    // console.log(response.data)
    // console.log(vehivlefare)
    } catch (error) {
      console.log(error)
      
    }
  }

  const createride = async()=>{
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:4000/rides/create',{
        pickup:pickup,
        destination:destination,
        vehicleType:vehicleType

      },
     { headers:{ Authorization: `Bearer ${token}` }})
     console.log(response.data)
     setCreateRide(response.data.ride)
    } catch (error) {
      console.error("Error creating ride:", error.message);
      if (error.response) {
        console.error("Server Response:", error.response.data);
      }
    }
  }


  return (
    <div className='h-screen relative overflow-hidden'>
      <img className={ panelOpen? "w-16 absolute left-5 top-5":"w-16 absolute left-5 top-5 z-50"}  src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div className='h-screen w-screen'>
        {/* temproray image use */}
          {
            LiveLocation?<div className='h-full w-full object-cover'>

            <LiveLocation/>
            </div>:
      <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" srcset="" /> 
          }

      </div>
      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full  '>
        {/* <Displayvehicle ref={vehiclePanelRef}/> */}

        <div ref={vehiclePanelRef} className='fixed w-full z-10 bg-white bottom-0 pt-12 py-6 px-8 translate-y-full rounded-t-3xl '>
          <h5 onClick={() => setPenelOpen(false)} className='absolute top-6 right-6 text-2xl' ><i onClick={() => {
            setVehiclePanel(false)
            setPenelOpen(true)
          }} className="ri-arrow-down-wide-line"></i></h5>

          <Displayvehicle setVehicleType={setVehicleType}  createride={createride} vehivlefare={vehivlefare} setConfirmedRidePanel={setConfirmedRidePanel} setVehiclePanel={setVehiclePanel} />

        </div>

        <div ref={confirmedRideRef} className='fixed w-full z-10 bg-white bottom-0 pt-12 py-6 px-8 translate-y-full '>
          <h5 onClick={() => {
            setPenelOpen(false)
          }} className='absolute top-6 right-6 text-2xl' ><i onClick={() => {
            setConfirmedRidePanel(false)
            setVehiclePanel(true)
            setPenelOpen(true)
          }} className="ri-arrow-down-wide-line"></i></h5>
          <ConfirmedRide createride={createride} destination={destination} pickup={pickup}  vehivlefare={vehivlefare} vehicleType={vehicleType} createARide={createARide} setConfirmedRidePanel={setConfirmedRidePanel} setLookingForDriverPanel={setLookingForDriverPanel} />

        </div>
        <div ref={lookingForDriverRef} className='fixed w-full z-10 bg-white bottom-0 pt-12 py-6 px-8 translate-y-full '>
          <h5 onClick={() => {
            setPenelOpen(false)
          }} className='absolute top-6 right-6 text-2xl' ><i onClick={() => {
            setLookingForDriverPanel(false)
            setConfirmedRidePanel(true)
            setPenelOpen(true)
          }} className="ri-arrow-down-wide-line"></i></h5>
          <LookingforDriver createARide={createARide} setWaittingforDriver={setWaittingforDriver} vehivlefare={vehivlefare} vehicleType={vehicleType} />

        </div>
        <div ref={WaitingDriverRef} className='fixed w-full z-10 bg-white bottom-0 pt-12 py-6 px-8 translate-y-full '>
          <h5 onClick={() => {
            setPenelOpen(false)
          }} className='absolute top-6 right-6 text-2xl' ><i onClick={() => {
            setWaittingforDriver(false)
            setLookingForDriverPanel(true)
            // setConfirmedRidePanel(true)
            setPenelOpen(true)
          }} className="ri-arrow-down-wide-line"></i></h5>
          <Waitfordriver ride={ride} />

        </div>

        <div className={panelOpen?' h-[30%] p-6 bg-white relative ':' h-[30%] p-6 bg-white relative rounded-t-3xl'}>
          <h5 onClick={() => setPenelOpen(false)} className={panelOpen ? 'absolute top-6 right-6 text-2xl' : 'hidden'}><i className="ri-arrow-down-wide-line"></i></h5>

          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => submithandler(e)}>
            <div className='line absolute h-16 w-1 top-[45%] left-10 m-auto p-auto bg-gray-900 rounded-full'></div>
            <input
              onClick={() => setPenelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)} className='bg-[#eeee] px-12 py-2 text-lg rounded-lg w-full outline-none mt-5' type="text" placeholder='Add a pick-up location' />
            <input
              onClick={() => setPenelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)} className='bg-[#eeee] px-12 py-2 text-lg rounded-lg w-full outline-none mt-3' type="text" placeholder='Enter your destination' />
          </form>
          {panelOpen&&destination?<button className='w-full mt-5 bg-black text-white font-semibold p-2 rounded-lg'
          onClick={()=>pickuplat && pickuplng && destinationlat && destinationlng ? (setVehiclePanel(true), getfare()) : setVehiclePanel(false)}>
            Find trip
          </button>:null}
          
        </div>
        <div ref={panelRef} className='h-0 bg-white '>
          <LocationSearchPanel setPickuplat={setPickuplat} setPickuplng={setPickuplng} setDestinationlat={setDestinationlat} setDestinationlng={setDestinationlng}  pickup={pickup} destination={destination} destinationsuggestion={destinationsuggestion} suggestions={suggestion} setPickup={setPickup} setDestination={setDestination} panelOpen={panelOpen} setPenelOpen={setPenelOpen} vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} />
        
        </div>

      </div>
    </div>
  )
}

export default Home
 
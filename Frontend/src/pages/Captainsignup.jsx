import React, { useContext, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/Captiaoncontext';
import axios from 'axios';

const Captainsignup = () => {

  const{setCaptain}= useContext(CaptainDataContext);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({})
  const onSubmitHandler = async(e) => {
    e.preventDefault()
    const CaptainData={
      fullname:{
        firstname:firstName,
        lastname:lastName

      },
      email: email,
      password: password,
      vehicle:{
        color:vehicleColor,
        plate:vehiclePlate,
        capacity:vehicleCapacity,
        type:vehicleType
      }
    }
    // console.log(CaptainData)

    try {
      
      const response = await axios.post('http://localhost:4000/captain/register',CaptainData)
      // console.log(response)
      if(response.data.success){
        setCaptain(response.data.captain)
        localStorage.setItem('token', response.data.token)
        navigate('/captainhome')
      }
    } catch (error) {
      console.log(error)
      
    }

    // setEmail('')
    // setPassword('')
    // setFirstName('')
    // setLastName('')

  }
  return (
    <div>
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <img onClick={() => navigate('/')} className='w-16 mb-10' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="Uber Logo" srcset="" />
          <h3 className='text-lg mt-4 mb-1  font-bold'>What's Our Captain name</h3>
          <div className='flex gap-4 mb-5'>


            <input value={firstName} onChange={(e) => { setFirstName(e.target.value) }} className='bg-[#eeeeee] outline-none   rounded px-4 py-2   w-1/2 text-lg placeholder:text-base' type="text" required placeholder='FirstName' />
            <input value={lastName} onChange={(e) => { setLastName(e.target.value) }} className='bg-[#eeeeee] outline-none   rounded px-4 py-2   w-1/2 text-lg placeholder:text-base' type="text" required placeholder='LastName' />
          </div>
          <h3 className='text-lg mt-4 mb-1 font-bold'>Vehicle Details</h3>
          <div className='flex gap-4 mb-5'>
            <input value={vehicleColor} onChange={(e) => { setVehicleColor(e.target.value) }} className='bg-[#eeeeee] outline-none rounded px-4 py-2 w-1/2 text-lg placeholder:text-base' type="text" required placeholder='Vehicle Color' />
            <input value={vehiclePlate} onChange={(e) => { setVehiclePlate(e.target.value) }} className='bg-[#eeeeee] outline-none rounded px-4 py-2 w-1/2 text-lg placeholder:text-base' type="text" required placeholder='Vehicle Plate Number' />
          </div>
          <div className='flex gap-4 mb-5'>
            <input value={vehicleCapacity} onChange={(e) => { setVehicleCapacity(e.target.value) }} className='bg-[#eeeeee] outline-none rounded px-4 py-2 w-1/2 text-lg placeholder:text-base' type="number" required placeholder='Vehicle Capacity' />
            <select value={vehicleType} onChange={(e) => { setVehicleType(e.target.value) }} className='bg-[#eeeeee] outline-none rounded px-4 py-2 w-1/2 text-lg placeholder:text-base' required>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>
          <h3 className='text-lg mt-4 mb-1  font-bold'>What's Our Captain email</h3>
          <input value={email} onChange={(e) => { setEmail(e.target.value) }} className='bg-[#eeeeee] outline-none  mb-5 rounded px-4 py-2   w-full text-lg placeholder:text-base' type="email" required placeholder='email@example.com' />
          <h3 className='font-bold text-base mb-2'>Enter Password</h3>
          <input value={password} onChange={(e) => { setPassword(e.target.value) }} className='bg-[#eeeeee] outline-none  mb-5 rounded px-4 py-2   w-full text-lg placeholder:text-base' type="Password" required placeholder='Password' />
          <button type='submit' className='bg-[#111] hover:cursor-pointer text-white text-semibold outline-none  mb-7 rounded px-4 py-2   w-full text-lg placeholder:text-base'>Create Captain Account</button>
          <p className='text-start mb-2 '> Already have an  Account? <Link to={'/captainlogin'} className='text-blue-600'>login here</Link></p>

        </form>
      </div>
      <div className='align-bottom'>
        <p className='text-xs leading-tight'>
        By proceeding ,you consent to get call  ,WhatsApps or SMS
        message ,including by automated means , from Uber
        </p>
        {/* <Link to={'/captainlogin'} className='bg-[#10b461] text-white text-center  text-semibold mb-4 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain </Link> */}
      </div>

    </div>
  </div>


  )
}

export default Captainsignup

import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Userlogout = () => {
    const navigate = useNavigate()
 
React.useEffect(() => {
    const token = localStorage.getItem('token')
    // console.log(token)
    axios.post('http://localhost:4000/api/user/logout',
        {},
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    ).then((response)=>{
        // console.log(response)
        if(response.data.success){
            localStorage.removeItem('token')
            navigate('/login')
        }
    })
}, [navigate])
 
  return (
   <div>userlogout</div>

  )
}

export default Userlogout

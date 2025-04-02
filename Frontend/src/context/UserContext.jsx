import React, { createContext, useState } from 'react'

export const UserDataContext = createContext();


const UserContext = ({children}) => {
    const[startridding,setStartRidding]=useState(null)
    const[user,setUser] = useState({
        email:'',
        fullname:{
            firstName:'',
            lastName:''
        }
    
    })

    const token = localStorage.getItem('token')
    const value = {
        user,setUser,token,startridding,setStartRidding
    }

  return (
    <div>
        <UserDataContext.Provider value={value}>
        {children}
        </UserDataContext.Provider>
      
    </div>
  )
}

export default UserContext

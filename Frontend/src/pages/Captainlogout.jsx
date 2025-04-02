import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Captainlogout = () => {
    const navigate = useNavigate()
    React.useEffect(() => {
        const logout = async () => {
            const token = localStorage.getItem('token')
            // console.log(token)
            try {
                const response = await axios.get('http://localhost:4000/captain/logout', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if(response.data.success){
                    localStorage.removeItem('token')
                    navigate('/')
                }
            } catch (error) {
                console.error('Logout failed:', error)
            }
        }
        logout()
    }, [navigate])

    return (
        <div>
            <h2>Logging out...</h2>
        </div>
    )
}

export default Captainlogout

import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import Userlogin from './pages/Userlogin'
import Usersignup from './pages/Usersignup'
import Captainlogin from './pages/Captainlogin'
import Captainsignup from './pages/Captainsignup'
import Home from './pages/Home'
import UserProtectedWrap from './pages/UserProtectedWrap'
import { UserDataContext } from './context/UserContext'
import Userlogout from './pages/Userlogout'
import CaptainHome from './pages/CaptainHome'
import Captainprotectedwraper from './pages/CaptainProtectedWraper'
import Captainlogout from './pages/Captainlogout'
import Riding from './pages/Riding'
import CaptainRaiding from './pages/CaptainRaiding'
import 'remixicon/fonts/remixicon.css'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react'
// import Userlogout from './pages/Userlogout'

const App = () => {
  const { token } = useContext(UserDataContext)
  // console.log(token)
  return (
    <div >
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<Userlogin />} />
        <Route path='/signup' element={<Usersignup />} />
        <Route path='/captainlogin' element={<Captainlogin />} />
        <Route path='/captainsignup' element={<Captainsignup />} />
        <Route path='/riding' element={<UserProtectedWrap>
            <Riding/> 
          </UserProtectedWrap>  } />

        {/* <Route path='/home' element={token? <Home /> : <Userlogin/>} /> */}
        <Route path='/home' element={<UserProtectedWrap>
          <Home />
        </UserProtectedWrap>} />
        <Route path='/api/user/logout' element={<UserProtectedWrap>
          <Userlogout />
        </UserProtectedWrap>} />
        <Route path='/captainhome' element={<Captainprotectedwraper>

          <CaptainHome />
        </Captainprotectedwraper>} />

        <Route path='/captain/logout' element={<Captainprotectedwraper>
          <Captainlogout />
        </Captainprotectedwraper>} />

        <Route path='/captainRaiding' element={<Captainprotectedwraper>
          <CaptainRaiding/>
        </Captainprotectedwraper>} />
      </Routes>
    </div>
  )
}

export default App

import React from 'react'
import './LoginPage.css'

import { TfiUser } from "react-icons/tfi";
import { TfiLock } from "react-icons/tfi";

export const LoginPage = () => {
  return (
    <div className="container">
        <div className="header">
            <div className="text">IT Ticket Help Desk</div>
                <div className="underline"></div>
        </div>
        <div className="inputs">
        {/* Username */}
        <div className="input">
            <TfiUser className='img'/>
            <input type="text" placeholder='Username'/>
        </div>
        {/* Password */} 
        <div className="input">
            <TfiLock className='img'/>
            <input type="password" placeholder = 'Password'/>
        </div>
        </div>
        <div className="submit-container">
          <div className="submit">Sign Up</div>
          <div className="submit">Login</div>
        </div>
    </div>
  )
  
}



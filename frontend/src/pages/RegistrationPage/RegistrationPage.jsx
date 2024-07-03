import React from "react";
import "./RegistrationPage.css";

import { TfiUser, TfiLock } from "react-icons/tfi";

/* Temp Display Copied from LoginPage (verify it works) */
export const RegistrationPage = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="text">Register Here</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {/* Username */}
        <div className="input">
          <TfiUser className="img" />
          <input type="text" placeholder="Username" />
        </div>
        {/* Password */}
        <div className="input">
          <TfiLock className="img" />
          <input type="password" placeholder="Password" />
        </div>
      </div>
      <div className="submit-container">
        <div className="submit">Sign Up</div>
        <div className="submit">Login</div>
      </div>
    </div>
  );
};

export default RegistrationPage;

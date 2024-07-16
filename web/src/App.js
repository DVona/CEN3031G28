import logo from './logo.svg';
import './App.css';
import { LoginPage } from './Components/LoginPage/LoginPage';
import React, {useState} from 'react';

function App() {
  const [token, setToken] = useState;
  return (
    <div className='wrapper'>
      <LoginPage/>
    </div>
  );
}

export default App;

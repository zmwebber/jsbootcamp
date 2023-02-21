import React from 'react';
import logo from './logo.svg';
import { HomePage } from './features/homePage/HomePage';
import { RegistrationPage } from './features/userManagement/RegistrationPage';
import './App.css';
import { RightNav } from './features/navigation/RightNav';
import {LeftNav} from './features/navigation/LeftNav';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to JS Bootcamp</h1>
      </header>
      <div className="App-body">
        <div className="App-left"><LeftNav /></div>
        <div className='App-center'>
          <div id="main-content">
            <Outlet />
          </div>
          </div>
        <div className='App-right'><RightNav/></div>
       
      </div>
  
    </div>
  );
}

export default App;

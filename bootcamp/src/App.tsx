import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { HomePage } from './features/homePage/HomePage';
import './App.css';
import { RightNav } from './features/navigation/RightNav';
import {LeftNav} from './features/navigation/LeftNav';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to JS Bootcamp</h1>
      </header>
      <body className="App-body">
        <div className="App-left"><LeftNav /></div>
        <div className='App-center'>
          <HomePage />
        </div>
        <div className='App-right'><RightNav/></div>
       
      </body>
  
    </div>
  );
}

export default App;

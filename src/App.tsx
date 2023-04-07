import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Main } from './components/Main';
import { LoginReg } from './components/authComponents/LoginReg';

function App() {
  return (
    <div>
      {/* <Main /> */}
      <LoginReg/>
    </div>
  );
}

export default App;

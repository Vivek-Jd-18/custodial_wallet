import React, { useEffect, useState, createContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { Main } from './components/Main';
import { LoginReg } from './components/authComponents/LoginReg';
import { ReactSession } from 'react-client-session';
import { Aggregator } from './components/Aggregator';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Aggregator />
    </div>
  );
}

export default App;

import React, { useEffect, useState, createContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { Main } from './components/Main';
import { LoginReg } from './components/authComponents/LoginReg';
import { ReactSession } from 'react-client-session';
import { Aggregator } from './components/Aggregator';
import { ToastContainer } from 'react-toastify';

export const MainContext = createContext("0000");

function App() {

  // const [activeUser, SetActiveUser] = useState<any>("");
  // const changeActiveUser = async (data: any) => {
  //   SetActiveUser(data)
  //   localStorage.setItem("username", data);
  //   console.log(localStorage.getItem("username"), "current user")
  // }

  // useEffect(() => {
  //   SetActiveUser(localStorage.getItem("username"))
  // }, [activeUser])

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

import React, { useEffect, useState, createContext } from 'react';
import { Main } from './Main';
import { LoginReg } from './authComponents/LoginReg';
import { ReactSession } from 'react-client-session';

export const MainContext = createContext("0000");


export const Aggregator = () => {
    const [activeUser, SetActiveUser] = useState<any>("");
    const changeActiveUser = async (data: any) => {
        SetActiveUser(data)
        localStorage.setItem("username", data);
        console.log(localStorage.getItem("username"), "current user")
    }

    useEffect(() => {
        SetActiveUser(localStorage.getItem("username"))
    }, [activeUser])

    return (
        <><div className='container'>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">_()_</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled">Disabled</a>
                            </li> */}
                        </ul>
                        <div className="d-flex" >
                            {activeUser.length > 0 ? <div className='d-flex justify-content-evenly'>
                                <div className='mt-3 me-2' style={{
                                    background: "green",
                                    borderRadius: "50%", width: "10px", height: " 10px"
                                }}></div>
                                <div className='mt-2 me-4 fw-bold'>{(activeUser)}</div>
                            </div> : null}
                            {activeUser.length > 0 ?
                                <button className='btn btn-warning' onClick={() => changeActiveUser("")}>Logout</button> : null
                            }
                        </div>
                    </div>
                </div>
            </nav>
            <MainContext.Provider value={activeUser}>
                {
                    activeUser.length > 0 ? <Main changeFun={changeActiveUser} /> :
                        <LoginReg changeFun={changeActiveUser} />
                }
            </MainContext.Provider>
        </div>
        </>
    )
}

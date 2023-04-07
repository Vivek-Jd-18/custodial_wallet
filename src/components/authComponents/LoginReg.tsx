import React, { useEffect, useState } from 'react'
import axios, { } from 'axios'
import { sha256 } from "js-sha256"
import { ReactSession } from 'react-client-session';

export const LoginReg = () => {

    const userApiUrl = "http://127.0.0.1:3001/user"

    const [toggle, setToggle] = useState<boolean>(true);
    const [allowLogin, setAllowLogin] = useState<boolean>(false);
    const [allowReg, setAllowReg] = useState<boolean>(false);

    const [username, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleUserName = async (e: any) => {
        var hash = sha256.create();
        hash.update('Message to hash');
        console.log(hash.hex(), "HASH")

        setUserName(e.target.value);
        checkForLogin();
        checkForReg();
    }
    const handleEmail = async (e: any) => {
        setEmail(e.target.value);
        checkForLogin();
        checkForReg();
    }
    const handlePassword = async (e: any) => {
        setPassword(e.target.value);
        checkForLogin();
        checkForReg();
    }

    const checkForLogin = () => {
        if (username.length > 2 && password.length > 2) {
            setAllowLogin(true);
            console.log("login", username.length, password.length)
        } else {
            setAllowLogin(false);
        }
    }

    const checkForReg = () => {
        if (username.length > 2 && password.length > 2 && email.length > 3) {
            setAllowReg(true);
        } else {
            setAllowReg(false);
        }
    }

    const getSingleUserData = async () => {
        axios.get(userApiUrl + `/${username}`).then(data => console.log(data.data["0"]))
            .catch(error => console.log(error));
    }

    const makeLogin = async () => {

        const passwordHash = sha256.hex(password);

        if (allowLogin
            // && 
            // passwordHash == 
        ) {
            axios
                .get(userApiUrl)
                .then(data => console.log(data.data["0"]))
                .catch(error => console.log(error));

            ReactSession.set("username", "Bob");
            ReactSession.get("username");
        }
    }

    const makeRegister = async () => {
        var passwordHash = sha256.create();
        passwordHash.update(password);
        console.log(passwordHash.hex(), "HASH")

        if (allowReg) {
            const article = {
                "username": username,
                "email": email,
                "password": passwordHash.hex(),
                "accounts": [
                    {
                        "name": null,
                        "account_address": null
                    }
                ],
                "tokens": [
                    null
                ]
            };

            axios.post(userApiUrl + "/adduser", article)
                .then(response => {
                    console.log("POST response", response);
                }
                )
                .catch(error => {
                    console.error('There was an error!', error);
                });
        } else {
            console.log("Invalid Register");
        }
    }

    return (
        <>
            <div className='m-auto mt-4 border border-rounded' style={{ width: "300px", padding: "20px", border: "2px solid black" }}>
                <div className='d-flex flex-col m-auto justify-content-evenly m-3'>
                    <div className='m-2'>
                        <a className="card-title " style={{ textDecoration: "none", cursor: "pointer" }}
                            onClick={() => setToggle(false)}>Login</a>
                        {!toggle ? <div style={{ borderBottom: "2px solid grey" }}></div> : null}
                    </div>
                    <div style={{ borderLeft: "solid grey", marginBottom: "12px", borderWidth: "medium" }}></div>
                    <div className='m-2'>
                        <a className="card-title" style={{ textDecoration: "none", cursor: "pointer" }}
                            onClick={() => setToggle(true)}>Register</a>
                        {toggle ? <div style={{ borderBottom: "2px solid grey" }}></div> : null}
                    </div>
                </div>


                {/* Register Form */}
                {toggle ? <div>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" id="exampleUserName" aria-describedby="username" autoComplete='off' onChange={handleUserName} />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete='off' onChange={handleEmail} />
                        <div id="emailHelp" className="form-text">We'll never sh    are your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" autoComplete='off' onChange={handlePassword} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" >I accept all the terms & Conditions</label>
                    </div>
                    {allowLogin ? <div className='text-center'>
                        <button type="submit" className="btn btn-primary" onClick={makeRegister}>Register</button>
                    </div> : <div className='text-center'>
                        <button type="submit" className="btn btn-primary" disabled>Register</button>
                    </div>}
                </div>
                    :
                    /* Login Form */
                    < div >
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete='off' onChange={handleEmail} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" onChange={handlePassword} autoComplete='off' />
                        </div>
                        {allowReg ? <div className='text-center'>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div> : <div className='text-center'>
                            <button type="submit" className="btn btn-primary" disabled>Login</button>
                        </div>}
                    </div>}


            </div >
        </>
    )
}

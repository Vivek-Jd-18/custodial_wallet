import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { sha256 } from "js-sha256";
import { ReactSession } from "react-client-session";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainContext } from "../Aggregator";

export const LoginReg = ({ changeFun }: any) => {
  const activeUser = useContext(MainContext);

  const userApiUrl = "http://127.0.0.1:3005/account";

  const [toggle, setToggle] = useState<boolean>(false);
  const [allowLogin, setAllowLogin] = useState<boolean>(false);
  const [allowReg, setAllowReg] = useState<boolean>(false);
  const [terms, setTerms] = useState<boolean>(false);

  const [username, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUserName = async (e: any) => {
    setUserName(e.target.value);
    checkForLogin();
    checkForReg();
  };
  const handleEmail = async (e: any) => {
    setEmail(e.target.value);
    checkForLogin();
    checkForReg();
  };
  const handlePassword = async (e: any) => {
    setPassword(e.target.value);
    checkForLogin();
    checkForReg();
  };

  const checkForLogin = () => {
    if (true) {
      setAllowLogin(true);
    } else {
      setAllowLogin(false);
    }
  };

  const checkForReg = () => {
    if (username.length > 2 && password.length > 2 && email.length > 3) {
      setAllowReg(true);
    } else {
      setAllowReg(false);
    }
  };

  const getSingleUserData = async () => {
    return await axios.get(`http://127.0.0.1:3001/user/${email.toLowerCase()}`);
  };

  const makeLogin = async () => {
    const userData = await getSingleUserData();
    try {
      if (allowLogin && userData.data) {
        const passwordHashFromUI = sha256.hex(password);
        console.log(passwordHashFromUI, "Cross2");
        const passwordHashFromDB = sha256.hex(userData.data.password);
        if (passwordHashFromUI == userData.data.password) {
          axios
            .get(userApiUrl + `/${email}`)
            .then((data) => {
              toast.success(
                `Hey ${data.data.username} you've logged in successfully!`,
                {
                  position: "bottom-center",
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                }
              );
              changeFun(data.data.username);
              ReactSession.setStoreType("localStorage");
              ReactSession.set("username", data.data.username);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          toast.error(`Wrong Password!`, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else {
        toast.error(`Sorry there's no such user`, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (e) {
      console.log(e, "error");
    }
  };

  const makeRegister = async () => {
    if (allowReg && terms) {
      var passwordHash = sha256.create();
      passwordHash.update(password);
      const userData = await getSingleUserData();
      let dbEmail = userData.data.email;

      if (dbEmail == undefined) {
        dbEmail = "user_null";
      }

      console.log(dbEmail);
      if (dbEmail.toLocaleLowerCase() == email.toLocaleLowerCase()) {
        toast.error(`User Already Exists Try some other ! `, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        const article = {
          username: username.toLowerCase(),
          email: email.toLowerCase(),
          password: passwordHash.hex(),
          accounts: [
            {
              name: null,
              account_address: null,
            },
          ],
          tokens: [null],
        };
        axios
          .post(userApiUrl + "/adduser/", article)
          .then((response: any) => {
            console.log("POST response", response);
            if (response.data.success) {
              toast.success(`${username}'s ${response.data.msg}`, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              setToggle(false);
            }
          })
          .catch((error) => {
            console.error("There was an error!", error);
            toast.error(error, {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          });
      }
    } else {
      console.log("Invalid Username, Email or Passowrd Length");
      toast.error(`Invalid Username, Email or Passowrd Length`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      {/* <ToastContainer
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
      /> */}
      <div
        className="m-auto mt-4 border rounded "
        style={{ width: "300px", padding: "20px" }}
      >
        <div className="d-flex flex-col m-auto justify-content-evenly m-3">
          <div className="m-2">
            <a
              className="card-title "
              style={{ textDecoration: "none", cursor: "pointer" }}
              onClick={() => setToggle(false)}
            >
              Login
            </a>
            {!toggle ? (
              <div style={{ borderBottom: "2px solid grey" }}></div>
            ) : null}
          </div>
          <div
            style={{
              borderLeft: "solid grey",
              marginBottom: "12px",
              borderWidth: "medium",
            }}
          ></div>
          <div className="m-2">
            <a
              className="card-title"
              style={{ textDecoration: "none", cursor: "pointer" }}
              onClick={() => setToggle(true)}
            >
              Register
            </a>
            {toggle ? (
              <div style={{ borderBottom: "2px solid grey" }}></div>
            ) : null}
          </div>
        </div>

        {/* Register Form */}
        {toggle ? (
          <div>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="exampleUserName"
                aria-describedby="username"
                autoComplete="false"
                onChange={handleUserName}
              />
              <div id="emailHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                autoComplete="false"
                onChange={handleEmail}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                autoComplete="false"
                onChange={handlePassword}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                onChange={(e) => setTerms(e.target.checked)}
              />
              <label className="form-check-label">
                I accept all the terms & Conditions
              </label>
            </div>
            {allowReg && terms ? (
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={makeRegister}
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="text-center">
                <button type="submit" className="btn btn-primary" disabled>
                  Register
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Login Form */
          <div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                autoComplete="false"
                onChange={handleEmail}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={handlePassword}
                autoComplete="false"
              />
            </div>
            {allowLogin ? (
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={makeLogin}
                >
                  Login
                </button>
              </div>
            ) : (
              <div className="text-center">
                <button type="submit" className="btn btn-primary" disabled>
                  Login
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

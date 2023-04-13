import React, { useEffect, useState, createContext } from 'react';
import { Main } from './Main';
import { LoginReg } from './authComponents/LoginReg';
import { ReactSession } from 'react-client-session';
import Napalogo from "../assets/napa_icon-1.webp"
import { createWallet } from "../web3Functions/walletFunctions/createWallet"
import { send_token } from "../web3Functions/tokenFunctions/sendToken";
import { ToastContainer, toast } from "react-toastify";
import { fetchTransactions } from '../web3Functions/MoralisApis/fetchTransactions';
import { fetchAccount } from "../web3Functions/walletFunctions/importAccount"
import { fetchNFT } from '../web3Functions/nftFunctions/fetchNfts';

export type NetworkInterface = {
    name: string
    chainId: string
    currencySymbol: string
    rpcURL: string
    explorerURL: string
}

export type GlobalContent = {
    network: NetworkInterface
    changeNetwork: (c: NetworkInterface) => void
}

export const MainContext = createContext<GlobalContent>({
    network: {
        name: "Ethereum Mainnet",
        chainId: "1",
        currencySymbol: "ETH",
        rpcURL: "https://mainnet.infura.io/v3/",
        explorerURL: "https://etherscan.io"
    },
    changeNetwork: () => { }
});


export const Aggregator = () => {
    const [activeUser, SetActiveUser] = useState<any>("");
    const [network, setNetwork] = useState<NetworkInterface>({
        name: "Ethereum Mainnet",
        chainId: "1",
        currencySymbol: "ETH",
        rpcURL: "https://mainnet.infura.io/v3/",
        explorerURL: "https://etherscan.io"
    })

    const changeActiveUser = async (data: any) => {
        SetActiveUser(data)
        localStorage.setItem("username", data);
        console.log(localStorage.getItem("username"), "current user")
        if (data.length == 0) {
            toast.info(`Logged Out!`, {
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
    }

    const changeNetwork = (_newNW: NetworkInterface) => {
        setNetwork(_newNW);
    }

    const customCheck = async () => {
        // const data = await createWallet();
        // const data = await send_token("", "0.000000001", "0xdE6bef9A3b87Ad38BC152c59a307854D033C9081", "0xE4F3fD84131dEedB822Bd2D457Bb7f406d971440", "ccad720f8ec9fcb57f054a3e38ecd64eca1e4d2891921b094687c92e0c31dd4d");
        // console.log(await data, "_____")

        // const data = await fetchTransactions();
        // console.log(data, "TRANSACTIONS");

        // const data = await fetchAccount();
        // console.log(data, "PUB key");
        // fetchNFT("0x7bBBa86B912C40a92eca40369B5813cf87153251",
        //     "63",
        //     "e9007163416008d7557de3f5a83f9e33c55a4215aac3303ca34d09d130575814", "https://eth-goerli.g.alchemy.com/v2/XWUI0fZ3Egz60cSzVS3bCb_QDbDnmYb3")

    }

    useEffect(() => {
        SetActiveUser(localStorage.getItem("username"))
    }, [activeUser])

    return (
        <><div className='container-fluid'>
            <nav className="navbar rounded navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#" ><img src={Napalogo} /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className='m-auto'>{network.name}</div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        </ul>
                        <div className="d-flex" >
                            {activeUser.length > 0 ? <div className='d-flex justify-content-evenly'>
                                <div className='mt-3 me-2' style={{
                                    background: "green",
                                    borderRadius: "50%", width: "10px", height: " 10px"
                                }}></div>
                                <div className='mt-2 me-4 fw-bold text-light'>{(activeUser)}</div>
                            </div> : null}
                            {activeUser.length > 0 ?
                                <button className='btn btn-info' onClick={() => changeActiveUser("")}>Logout</button> : null
                                // <button className='btn btn-info' onClick={() => customCheck()}>Logout</button> : null
                            }
                        </div>
                    </div>
                </div>
            </nav>
            <MainContext.Provider value={{ network, changeNetwork }}>
                {
                    activeUser.length > 0 ? <Main changeFun={changeActiveUser} /> :
                        <LoginReg changeFun={changeActiveUser} />
                }
            </MainContext.Provider>
        </div>
        </>
    )
}

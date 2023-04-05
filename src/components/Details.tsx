import React, { useState } from 'react'
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { CreateWallet } from './CreateWallet';
import { Footer1 } from './Footer1';
import user1 from "../assets/user1.jpeg"
import defaultUser from "../assets/defaultUser.png"
// import buyPng from "../assets/buy.png"
// import sendPng from "../assets/sendIcon.png"
// import swapPng from "../assets/swapIcon.png"
import { SendTo } from './SendTo';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import SendIcon from '@mui/icons-material/Send';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const Details = () => {
    const [address, setAddress] = useState<string>('');
    const [balance, setBalance] = useState<string>('');
    const [signer, setSigner] = useState<any>();
    const [chainId, setChainId] = useState<number>();


    const call = async () => {
        async function connect() {
            const externalProvider = await web3Modal.connect();
            return new ethers.providers.Web3Provider(externalProvider);
        }
        const web3Modal = new Web3Modal({
            network: 'mainnet',
            cacheProvider: true,
        });
        const provider = await connect();
        const { chainId } = await provider.getNetwork();
        // validateNetwork(chainId);
        await provider.getNetwork();
        const signer = provider.getSigner(0);
        const address = await signer.getAddress();
        const balance = provider.getBalance(address);
        setAddress(address);
        setBalance((await balance).toString());
        setSigner(signer);
        setChainId(chainId);
        console.log(address, balance, signer, chainId, 'all details');
        //need to make these variables avialable to all components
        return { address, balance, signer, chainId };
    };

    const createFun = async () => {
        const wallet = ethers.Wallet.createRandom();
        console.log('address:', wallet.address, "address");
        console.log('mnemonic:', wallet.mnemonic?.phrase, "phrase");
        console.log('privateKey:', wallet.privateKey, "privateKey");
    }

    return (
        <>

            {/* Modal Code starts */}
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header fs-4">
                            <div className="text-center" id="exampleModalLabel">Create Account</div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <CreateWallet />
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Code ends */}

            {/* Modal Code starts */}
            <div className="modal fade" id="exampleModal2" aria-labelledby="exampleModalLabel" aria-hidden="false">
                <div className="modal-dialog" >
                    <div className="modal-content" style={{ backgroundColor: "RGB(198 211 217)" }}>
                        <div className="modal-header fs-4" >
                            <div className="text-center" id="exampleModalLabel" style={{ fontSize: "18px" }}>Send To</div>
                            <a data-bs-dismiss="modal" style={{ cursor: "pointer", color: "blue", fontSize: "18px" }} aria-label="Close">Cancel</a>
                        </div>
                        <div className="modal-body">
                            <SendTo />
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Code ends */}



            <div className="container">
                <div className="row  d-flex flex-row">
                    <div className="col-2">
                    </div>
                    <div className="col" >
                        <div className="container text-center">
                            <div className="d-flex flex-row mb-3">
                                <div className="p-2"><div className="card" style={{ width: "800px" }}>
                                    <div className="card-body">
                                        <div className='d-flex flex-row justify-content-between'>
                                            {address ? <button className="btn btn-sm btn-primary" onClick={call}>Connected</button>
                                                : <button className="btn btn-sm btn-primary" onClick={call}>Connect</button>}
                                            <button type="button" className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                Create Account
                                            </button>
                                        </div>
                                        <div>{" : "}</div>
                                        {/* <div className="card-title text-center"><h6>NAPA Wallet</h6></div> */}
                                        {address ? <span className='d-flex flex-row justify-content-between'>
                                            <div><h6>{address}<div style={{
                                                background: "green",
                                                borderRadius: "50%", width: "10px", height: " 10px"
                                            }}></div></h6></div>
                                        </span> : <span><h5>Not Connected</h5> <div style={{
                                            background: "red",
                                            borderRadius: "50%", width: "10px", height: " 10px"
                                        }}></div></span>
                                        }
                                        <hr />
                                        <div className='container' style={{ minHeight: "150px" }}>
                                            {address ? <div><img src={user1} alt="Avatar" height={50} width={50} style={{ borderRadius: "50%" }} /></div> : <div><img src={defaultUser} alt="Avatar" height={50} width={50} style={{ borderRadius: "50%" }} /></div>}
                                            {balance ? <h5>{Number(balance) / (10 ** 18)} {" "} <span>Sepolia ETH</span></h5> : <h5>Connect wallet first</h5>}
                                            {balance ? <h5>{(Number(balance) / (10 ** 18)) * (156975)} {" "} <span>USD</span></h5> : null}
                                            <div className='d-flex flex-row justify-content-center gap-3'>
                                                <div className='d-flex flex-column'><ShoppingCartIcon fontSize='large' onClick={() => alert("This Feature will be added soon!")} />
                                                    <h6>Buy</h6>
                                                </div>
                                                <div className='d-flex flex-column'><SendIcon fontSize='large' data-bs-toggle="modal" data-bs-target="#exampleModal2" />
                                                    <h6 >Send</h6>
                                                </div>
                                                <div className='d-flex flex-column'><SwapHorizontalCircleIcon fontSize='large' onClick={() => alert("This Feature will be added soon!")} />
                                                    <h6 >Swap</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Footer1 />
                                    </div>
                                </div></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                    </div>
                </div>
            </div >
        </>
    )
}

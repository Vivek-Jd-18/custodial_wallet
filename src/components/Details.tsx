import React, { useState } from 'react'
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { CreateWallet } from './CreateWallet';
import { Footer1 } from './Footer1';
import user1 from "../assets/user1.jpeg"
import defaultUser from "../assets/defaultUser.png"
import { SendTo } from './SendTo';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import SendIcon from '@mui/icons-material/Send';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import mtmskIcon from "../assets/metamask-metamask-wallet.png"
import { ImportTokens } from './ImportTokens';

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
        setBalance((await (Number(balance)/10**18)).toString());
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
            <div className="modal fade " id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" >
                    <div className="modal-content ">
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
            <div className="modal fade rounded" id="exampleModal2" aria-labelledby="exampleModalLabel" aria-hidden="false">
                <div className="modal-dialog" >
                    <div className="modal-content" style={{ backgroundColor: "RGB(198 211 217)" }}>
                        <div className="modal-header fs-4" >
                            <div className="text-center" id="exampleModalLabel" style={{ fontSize: "18px" }}>Send To</div>
                            <a data-bs-dismiss="modal" style={{ cursor: "pointer", color: "blue", fontSize: "18px" }} aria-label="Close">Cancel</a>
                            <div className="modal-body">
                            </div>
                            <SendTo />
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Code ends */}

            {/* Modal Code starts */}
            <div className="modal fade " id="exampleModal3" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" >
                    <div className="modal-content ">
                        <div className="modal-header fs-4">
                            <div className="text-center" id="exampleModalLabel">Import Tokens</div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ImportTokens />
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Code ends */}


            <div className="container">
                <div className="row  d-flex flex-row ">
                    <div className="col-2">
                    </div>
                    <div className="col" >
                        <div className="container text-center">
                            <div className="d-flex flex-row mb-3">
                                <div className="p-2"><div className="card bg-dark" style={{ width: "800px" }}>
                                    <div className="card-body">
                                        <div className='d-flex  flex-row-reverse'>
                                            <div className="dropdown align-self-end">
                                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Settings
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li style={{ cursor: "pointer" }}>{address ? <a className="dropdown-item disabled" href="#">Metamask Connected!<img className='ms-2' src={mtmskIcon} width={20} height={20} /></a> : <a className="dropdown-item disabled" href="#" onClick={call}>Connect with Metamask<img className='ms-2' src={mtmskIcon} width={20} height={20} /></a>}</li>
                                                    <li style={{ cursor: "pointer" }}><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" >Create Account</a></li>
                                                    <li style={{ cursor: "pointer" }}><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal3"  >Import Tokens</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='container text-white' style={{ minHeight: "150px" }}>
                                            {address ? <div><img src={user1} alt="Avatar" height={50} width={50} style={{ borderRadius: "50%" }} /></div> : <div><img src={defaultUser} alt="Avatar" height={50} width={50} style={{ borderRadius: "50%" }} /></div>}
                                            {balance ? <h5>{Number(balance) / (10 ** 18)} {" "} <span>Sepolia ETH</span></h5> : <h5>Login first</h5>}
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

import React, { useContext, useEffect, useState } from 'react'
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
import { MainContext } from "./Aggregator"
import { AllChainId } from "../web3Functions/constants/chainIds"
import { NetworkInterface } from './Aggregator';

export const Details = () => {
    const [address, setAddress] = useState<string>('');
    const [balance, setBalance] = useState<string>('');
    const [signer, setSigner] = useState<any>();
    const [chainId, setChainId] = useState<number>();

    const { network, changeNetwork } = useContext(MainContext);


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
        setBalance((await (Number(balance) / 10 ** 18)).toString());
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

    const switchNetwork = (nw: number) => {
        if (nw == 0) {
            changeNetwork({
                name: AllChainId[0].name,
                chainId: AllChainId[0].chainId,
                currencySymbol: AllChainId[0].currencySymbol,
                rpcURL: AllChainId[0].rpcURL,
                explorerURL: AllChainId[0].explorerURL
            });
        } else if (nw == 1) {
            changeNetwork({
                name: AllChainId[1].name,
                chainId: AllChainId[1].chainId,
                currencySymbol: AllChainId[1].currencySymbol,
                rpcURL: AllChainId[1].rpcURL,
                explorerURL: AllChainId[1].explorerURL
            });
        } else if (nw == 2) {
            changeNetwork({
                name: AllChainId[2].name,
                chainId: AllChainId[2].chainId,
                currencySymbol: AllChainId[2].currencySymbol,
                rpcURL: AllChainId[2].rpcURL,
                explorerURL: AllChainId[2].explorerURL
            });
        } else if (nw == 3) {
            changeNetwork({
                name: AllChainId[3].name,
                chainId: AllChainId[3].chainId,
                currencySymbol: AllChainId[3].currencySymbol,
                rpcURL: AllChainId[3].rpcURL,
                explorerURL: AllChainId[3].explorerURL
            });
        } else if (nw == 4) {
            changeNetwork({
                name: AllChainId[4].name,
                chainId: AllChainId[4].chainId,
                currencySymbol: AllChainId[4].currencySymbol,
                rpcURL: AllChainId[4].rpcURL,
                explorerURL: AllChainId[4].explorerURL
            });
        } else if (nw == 5) {
            changeNetwork({
                name: AllChainId[5].name,
                chainId: AllChainId[5].chainId,
                currencySymbol: AllChainId[5].currencySymbol,
                rpcURL: AllChainId[5].rpcURL,
                explorerURL: AllChainId[5].explorerURL
            });
        } else if (nw == 6) {
            changeNetwork({
                name: AllChainId[6].name,
                chainId: AllChainId[6].chainId,
                currencySymbol: AllChainId[6].currencySymbol,
                rpcURL: AllChainId[6].rpcURL,
                explorerURL: AllChainId[6].explorerURL
            });
        }
        else {
            alert("Wrong Network choice");
        }
    }

    useEffect(() => {
        console.log(network, "N\"W");
    }, [network])


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
                                        <div className='d-flex  flex-row justify-content-between'>
                                            <div className="dropdown align-self-end">
                                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {network.name}
                                                </button>
                                                <ul className="dropdown-menu">
                                                    {AllChainId.map((i) => {
                                                        return <li style={{ cursor: "pointer" }}><a className="dropdown-item" onClick={() => { switchNetwork(i.id) }}>{i.name}</a></li>
                                                    })}
                                                    {/* return
                                                    <li><button onClick={() => { switchNetwork(0) }}>ETHEREUM MainNet</button></li> */}
                                                </ul>
                                            </div>
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

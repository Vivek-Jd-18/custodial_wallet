import React, { useState } from 'react'
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { CreateWallet } from './CreateWallet';

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
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-rounded" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary btn-rounded">Create</button>
                        </div> */}
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
                                    {/* <img src="" className="card-img-top" alt="..." /> */}
                                    <div className="card-body">
                                        <div className="card-title text-center"><h3>NAPA Wallet</h3></div>
                                        <p className="card-text">Custodial Wallet.</p>
                                        {address ? <h5>{address}</h5> : <h5>Not Connected</h5>}
                                        {balance ? <h5>{balance}</h5> : <h5>Connect wallet first</h5>}
                                        <button className="btn btn-sm btn-primary" onClick={call}>Connect</button>
                                        <br />
                                        <br />
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Create Account
                                        </button>
                                    </div>
                                </div></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                    </div>
                </div>
            </div>
        </>
    )
}

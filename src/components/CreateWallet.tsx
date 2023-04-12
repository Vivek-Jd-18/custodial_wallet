import React, { useState } from 'react'
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';


export const CreateWallet = () => {
    const [address, setAddress] = useState<string>('');
    const [balance, setBalance] = useState<string>('');
    const [signer, setSigner] = useState<any>();
    const [chainId, setChainId] = useState<number>();
    const [accName, setAccName] = useState<string>('');
    const [activeCreate, setActiveCreate] = useState<boolean>(false);

    const handleInput = (e: any) => {
        setAccName(e.target.value);
        if (accName.length > 0) {
            setActiveCreate(true);
        } else {
            setActiveCreate(false);
        }
    }


    // const call = async () => {
    //     async function connect() {
    //         const externalProvider = await web3Modal.connect();
    //         return new ethers.providers.Web3Provider(externalProvider);
    //     }
    //     const web3Modal = new Web3Modal({
    //         network: 'mainnet',
    //         cacheProvider: true,
    //     });
    //     const provider = await connect();
    //     const { chainId } = await provider.getNetwork();
    //     // validateNetwork(chainId);
    //     await provider.getNetwork();
    //     const signer = provider.getSigner(0);
    //     const address = await signer.getAddress();
    //     const balance = provider.getBalance(address);
    //     setAddress(address);
    //     setBalance((await balance).toString());
    //     setSigner(signer);
    //     setChainId(chainId);
    //     console.log(address, balance, signer, chainId, 'all details');
    //     //need to make these variables avialable to all components
    //     return { address, balance, signer, chainId };
    // };

    const createFun = async () => {
        const wallet = ethers.Wallet.createRandom();
        console.log('address:', wallet.address, "address");
        console.log('mnemonic:', wallet.mnemonic?.phrase, "phrase");
        console.log('privateKey:', wallet.privateKey, "privateKey");
    }

    return (
        <>
            <div className="container">
                <label>Account Name</label>
                <br />
                <br />
                <input className='form-control' type='text' placeholder='e.g. Account 1' onChange={handleInput} />
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary btn-rounded" data-bs-dismiss="modal">Cancel</button>
                    {
                        accName.length ? <button type="button" className="btn btn-primary btn-rounded" onClick={createFun} disabled>Create</button> :
                            <button type="button" className="btn btn-primary btn-rounded" onClick={createFun} disabled>Type some name</button>
                    }
                </div>
                <br />
            </div>
        </>
    )
}

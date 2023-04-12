import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import commonAbi from "../web3Functions/abis/commanToken.json";
import { MutatingDots } from 'react-loader-spinner'


export const ImportTokens = () => {

    const [tokenAddress, setTokenAddress] = useState<string>('');
    const [tokenDecimals, setTokenDecimals] = useState<number>();
    const [tknName, setTknName] = useState<string>('');
    const [tknSymbol, setTknSymbol] = useState<string>('');
    const [balance, setBalance] = useState<string>();
    const [wait, setWait] = useState<boolean>(false);

    const handleInput = (e: any) => {
        if (e.target.value.length >= 42) {
            setTokenAddress(e.target.value);
            setWait(true);
        } else {
        }
    }

    const fetchTokenData = async (contractAddress: string) => {
        // 0x245567d7CC4a7382FA5E69E73C647ce6a10bF8D4
        let private_key = "ad65ab3135b48e95301874bb1c041679a68e9584b8256991dba4142a1268cf4a";

        let wallet = new ethers.Wallet(private_key)
        let walletSigner = wallet.connect(window.ethersProvider)

        let contract = new ethers.Contract(
            contractAddress,
            commonAbi.abi,
            walletSigner
        )
        const decimals = await contract.decimals();
        setTokenDecimals(decimals);
        const balance = await contract.balanceOf("0xdE6bef9A3b87Ad38BC152c59a307854D033C9081");
        setBalance((Number(balance) / 10 ** 18).toString());
        const symbol = await contract.symbol();
        setTknSymbol(symbol);
        const name = await contract.name();
        setTknName(name)
        console.log(name, symbol, balance, "-=-=-")
        setWait(false);
    }

    useEffect(() => {
        fetchTokenData(tokenAddress);
    }, [tokenAddress])


    return (
        <>
            <div className="container" style={{ position: "relative" }}>
                {wait ? <div style={{ zIndex: 1, position: "absolute", top: "40%", left: "40%" }}><MutatingDots
                    height="100"
                    width="100"
                    color="#4fa94d"
                    secondaryColor='#4fa94d'
                    radius='12.5'
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                /> </div> : null}
                <br />
                <br />
                <label className="form-label">Token Contract Address</label>
                <input className='form-control m-2' type='text' value={tokenAddress} onChange={handleInput} autoComplete='off' />
                <label className="form-label">Decimals</label>
                <input className='form-control m-2' type='number' value={tokenDecimals} autoComplete='off' />
                <label className="form-label">Token Balance</label>
                <input className='form-control m-2' type='text' value={balance} autoComplete='off' />
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary btn-rounded" data-bs-dismiss="modal">Cancel</button>
                    {
                        tknSymbol.length > 0 ? <button type="button" className="btn btn-primary btn-rounded" onClick={() => fetchTokenData(tokenAddress)} >Import</button> :
                            <button type="button" className="btn btn-primary btn-rounded" onClick={() => fetchTokenData(tokenAddress)} disabled>Import</button>
                    }
                </div>
                <br />
            </div>
        </>
    )
}

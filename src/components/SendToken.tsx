import React from 'react'

export const SendToken = () => {
    // import ethers.js
    const ethers = require('ethers')
    // network: using the Rinkeby testnet
    let network = 'rinkeby'
    // provider: Infura or Etherscan will be automatically chosen
    let provider = ethers.getDefaultProvider(network)
    // Sender private key: 
    // correspondence address 0xb985d345c4bb8121cE2d18583b2a28e98D56d04b
    let privateKey = '0x49723865a8ab41e5e8081839e33dff15ab6b0125ba3acc82c25df64e8a8668f5'
    // Create a wallet instance
    let wallet = new ethers.Wallet(privateKey, provider)
    // Receiver Address which receives Ether
    let receiverAddress = '0xF02c1c8e6114b1Dbe8937a39260b5b0a374432bB'
    // Ether amount to send
    let amountInEther = '0.01'
    // Create a transaction object
    let tx = {
        to: receiverAddress,
        // Convert currency unit from ether to wei
        value: ethers.utils.parseEther(amountInEther)
    }
    // Send a transaction
    wallet.sendTransaction(tx)
        .then((txObj:any) => {
            console.log('txHash', txObj.hash)
            // => 0x9c172314a693b94853b49dc057cf1cb8e529f29ce0272f451eea8f5741aa9b58
            // A transaction result can be checked in a etherscan with a transaction hash which can be obtained here.
        })
    return (
        <div>SendToken</div>
    )
}

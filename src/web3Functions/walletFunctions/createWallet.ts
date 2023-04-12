import { ethers } from "ethers"

export const createWallet = async () => {
    const wallet1 = ethers.Wallet.createRandom();
    // console.log('address:', wallet1.address, "address");
    // console.log('mnemonic:', wallet1.mnemonic?.phrase, "phrase");
    // console.log('privateKey:', wallet1.privateKey, "privateKey");
    return wallet1
}


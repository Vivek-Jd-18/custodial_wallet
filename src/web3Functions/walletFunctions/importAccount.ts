import EthUtil from "ethereumjs-util";
import Wallet from 'ethereumjs-wallet';
import { ethers } from "ethers"

export const fetchAccount = async (privateKey: string) => {
    const wallet = new ethers.Wallet(privateKey);
    const publicKey = wallet.getAddress();
    return publicKey;
} 
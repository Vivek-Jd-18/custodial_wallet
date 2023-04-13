import { ethers } from "ethers"
import commonAbi from "../abis/commonNft.json"
import { MainContext } from "../../components/Aggregator";

// window.ethersProvider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/1v5h6i5Tpuc4-xvrPVnuFHn7xl6jX2qd");

export const fetchNFT = async (contract_address: string, tknId: string, private_key: string, networkRPC: string) => {
    window.ethersProvider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/XWUI0fZ3Egz60cSzVS3bCb_QDbDnmYb3");

    console.log(networkRPC, "network")
    let wallet = new ethers.Wallet(private_key)
    let walletSigner = wallet.connect(window.ethersProvider)
    let contract = new ethers.Contract(
        contract_address,
        commonAbi.abi,
        walletSigner
    )
    console.log(contract, "CTR")
    const nftData = contract.tokenURI(tknId);
    console.log(await nftData, "NFT data....!");

    return nftData;
}

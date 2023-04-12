import { ethers } from "ethers"
import commonAbi from "../abis/commanToken.json"

// https://eth-sepolia.g.alchemy.com/v2/1v5h6i5Tpuc4-xvrPVnuFHn7xl6jX2qd

window.ethersProvider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/1v5h6i5Tpuc4-xvrPVnuFHn7xl6jX2qd");

enum chains {
    sepolia = "https://sepolia.infura.io/v3/",
    goerli = "https://goerli.infura.io/v3/",
    ethereum = "https://mainnet.infura.io/v3/"
}

export const switchChain = async (id: number) => {
    if (id == 0) {
        window.ethersProvider = new ethers.providers.JsonRpcProvider(chains.sepolia);
    } else if (id == 1) {
        window.ethersProvider = new ethers.providers.JsonRpcProvider(chains.goerli);
    } else if (id == 2) {
        window.ethersProvider = new ethers.providers.JsonRpcProvider(chains.ethereum);
    } else {
        throw (() => {
            console.log("Error while changing Chains")
        })
    }
}

//both type of tokens can be sent using this function,
// (1) "" empty string for native token transfer i.e. "Goerli ETH"
// (2) paste conrtact address for any custom made token i.e. "NAPA token" 
export async function send_token(
    contract_address: string,
    send_token_amount: string,
    to_address: string,
    send_account: string,
    private_key: string
) {
    let response;
    let wallet = new ethers.Wallet(private_key)
    let walletSigner = wallet.connect(window.ethersProvider)

    window.ethersProvider.getGasPrice().then(async (currentGasPrice: any) => {
        let gas_price = ethers.utils.hexlify(parseInt(currentGasPrice))
        console.log(`gas_price: ${parseInt(gas_price)}`)

        if (contract_address) {
            // general token send
            let contract = new ethers.Contract(
                contract_address,
                commonAbi.abi,
                walletSigner
            )

            // How many tokens?
            let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
            console.log(`numberOfTokens: ${numberOfTokens}`)

            // Send tokens
            contract.transfer(to_address, numberOfTokens).then((transferResult: any) => {
                console.dir(transferResult)
                alert("sent token")
            })
        } // ether send
        else {
            let gas_limit = 100000
            const tx = {
                from: send_account,
                to: to_address,
                value: ethers.utils.parseEther(send_token_amount),
                nonce: window.ethersProvider.getTransactionCount(
                    send_account,
                    "latest"
                ),
                gasLimit: ethers.utils.hexlify(gas_limit), // 100000
                gasPrice: gas_price,
            }
            console.dir(tx)
            try {
                const _response: any = await walletSigner.sendTransaction(tx)
                response = _response;
                alert("Send finished!")
                return _response;
                // then((transaction) => {
                //     console.dir(transaction)
                //     return response;
                // })
            } catch (error) {
                alert("failed to send!!")
            }
        }
    })
    console.log(response, "-=-=-=-=-")
    return response;
}
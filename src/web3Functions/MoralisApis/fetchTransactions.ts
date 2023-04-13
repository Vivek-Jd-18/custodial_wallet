import Moralis from 'moralis';


export const fetchTransactions = async () => {
    try {
        await Moralis.start({
            apiKey: "D8Kfm2KtjFHVEpqvPmTVgaNLvY8TFEhrIBi8h71wjcTfFIdlmSKFlYJcEGATK8dr"
        });

        const response = await Moralis.EvmApi.transaction.getWalletTransactions({
            "chain": "0x13881",
            "address": "0xFBE446CcCfAfA2da17F327783C6AFf627f50445C"
        });

        console.log(response.raw);
    } catch (e) {
        console.error(e);
    }
}
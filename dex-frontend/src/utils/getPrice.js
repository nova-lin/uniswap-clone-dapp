import { ethers } from 'ethers';
import DEX_ABI from './DEX.json';

const DEX_ADDRESS = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";

export const getPrice = async (provider, baseIsToken1 = true) => {
    const dex = new ethers.Contract(DEX_ADDRESS,DEX_ABI.abi, provider);
    const [reserve1, reserve2] = await dex.getReserves();

    const r1 = Number(ethers.formatUnits(reserve1, 18));
    const r2 = Number(ethers.formatUnits(reserve2, 18));

    return baseIsToken1 ? r2 / r1 : r1 / r2;
}
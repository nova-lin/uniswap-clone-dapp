import { ethers } from "ethers";
import DEX from "./DEX.json";
import ERC20Token from "./ERC20Token.json";

// ✅ 配置你的 DEX 和 Token 地址
const CONTRACT_ADDRESS = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
export const TOKEN1_ADDRESS = "0x0165878A594ca255338adfa4d48449f69242Eb8F";
export const TOKEN2_ADDRESS = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";

// ✅ provider 和 signer
const getProvider = () => {
  if (!window.ethereum) {
    throw new Error("请安装 MetaMask");
  }
  return new ethers.BrowserProvider(window.ethereum);
};

const getSigner = async () => {
  const provider = getProvider();
  return provider.getSigner();
};

// ✅ 获取 DEX 合约实例
export const getDEXContract = async (useSigner = false) => {
  const provider = getProvider();
  const signer = await getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, DEX.abi, useSigner ? signer : provider);
};

// ✅ 获取 ERC20 Token 合约实例
export const getERC20Contract = async (tokenAddress, useSigner = false) => {
  const provider = getProvider();
  const signer = await getSigner();
  return new ethers.Contract(tokenAddress, ERC20Token.abi, useSigner ? signer : provider);
};

// ✅ 获取储备金
export const getReserves = async () => {
  try {
    const dex = await getDEXContract(false);
    const reserves = await dex.getReserves();
    return {
      token1: ethers.formatUnits(reserves[0], 18),
      token2: ethers.formatUnits(reserves[1], 18),
    };
  } catch (error) {
    console.error("Error fetching reserves:", error);
    return { token1: "0", token2: "0" };
  }
};

// ✅ 授权代币
export const approveToken = async (tokenAddress, amount) => {
  try {
    console.log(`🔹 请求授权 ${amount} 个 Token 给 DEX...`);
    const token = await getERC20Contract(tokenAddress, true);
    const tx = await token.approve(CONTRACT_ADDRESS, ethers.MaxUint256);
    await tx.wait();
    console.log("✅ Token 授权成功！");
  } catch (error) {
    console.error("❌ Token 授权失败:", error);
    throw error;
  }
};

// ✅ Swap 函数
export const swapTokens = async (tokenIn, amountIn, minAmountOut) => {
  try {
    const dex = await getDEXContract(true);
    const token = await getERC20Contract(tokenIn, false);
    const signer = await getSigner();
    const userAddress = await signer.getAddress();

    const parsedAmountIn = ethers.parseUnits(amountIn, 18);
    const parsedMinAmountOut = ethers.parseUnits(minAmountOut, 18);

    console.log("🔵 Swap 请求开始");
    console.log("🔵 TokenIn 地址:", tokenIn);
    console.log("🔵 输入数量 (amountIn):", amountIn, "解析后:", parsedAmountIn.toString());

    // 校验用户余额 & allowance
    const userBalance = await token.balanceOf(userAddress);
    const allowance = await token.allowance(userAddress, CONTRACT_ADDRESS);

    if (userBalance < parsedAmountIn) {
      throw new Error("🚨 用户余额不足！");
    }
    if (allowance < parsedAmountIn) {
      throw new Error("🚨 用户没有足够的授权额度！");
    }

    // swap 执行
    const tx = await dex.swap(tokenIn, parsedAmountIn, parsedMinAmountOut);
    await tx.wait();

    console.log("✅ Swap 成功！");
    return true;
  } catch (error) {
    console.error("🚨 Swap 失败:", error);
    throw error;
  }
};

// ✅ 让 swapTokens 支持全局调用
window.swapTokens = swapTokens;
window.getERC20Contract = getERC20Contract;

const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const FRONTEND_PATH = process.env.FRONTEND_PATH || "../dex-frontend/src/utils";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("👷 使用账户部署:", deployer.address);

  // 1️⃣ 部署 ERC20 Tokens (ETH 模拟 & USDC 模拟)
  const Token = await ethers.getContractFactory("ERC20Token");

  const totalSupply = ethers.parseUnits("1000000", 18);
  const ethToken = await Token.deploy("Ether", "ETH", totalSupply);
  await ethToken.waitForDeployment();
  const ethAddress = await ethToken.getAddress();
  console.log("✅ ETH Token 地址:", ethAddress);

  const usdcToken = await Token.deploy("USD Coin", "USDC", totalSupply);
  await usdcToken.waitForDeployment();
  const usdcAddress = await usdcToken.getAddress();
  console.log("✅ USDC Token 地址:", usdcAddress);

  // 2️⃣ 部署 DEX 合约
  const DEX = await ethers.getContractFactory("DEX");
  const dex = await DEX.deploy(ethAddress, usdcAddress);
  await dex.waitForDeployment();
  const dexAddress = await dex.getAddress();
  console.log("✅ DEX 合约地址:", dexAddress);

  // 3️⃣ 授权给 DEX 花费 token
  await ethToken.approve(dexAddress, ethers.MaxUint256);
  await usdcToken.approve(dexAddress, ethers.MaxUint256);

  console.log("🔐 已授权 DEX 合约处理 token");

  // 4️⃣ 初始化流动性（贴近真实价格）
  // 假设 1 ETH ≈ 1600 USDC
  const ethAmount = ethers.parseUnits("10", 18);       // 10 ETH
  const usdcAmount = ethers.parseUnits("16000", 18);    // 16000 USDC
  await dex.addLiquidity(ethAmount, usdcAmount);

  console.log("💧 初始流动性添加成功");

  // 5️⃣ 同步 ABI 到前端
  await syncABI([
    { path: "../artifacts/contracts/DEX.sol/DEX.json", name: "DEX.json" },
    { path: "../artifacts/contracts/DEX.sol/ERC20Token.json", name: "ERC20Token.json" }
  ]);
  console.log("📦 ABI 同步成功");

  console.log("🎉 合约部署完成!");
}

async function syncABI(list) {
  if (!fs.existsSync(FRONTEND_PATH)) {
    fs.mkdirSync(FRONTEND_PATH, { recursive: true });
  }

  list.forEach(({ path: p, name }) => {
    const json = require(path.resolve(__dirname, p));
    fs.writeFileSync(path.join(FRONTEND_PATH, name), JSON.stringify(json.abi, null, 2));
    console.log(`✅ ABI 写入: ${name}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});


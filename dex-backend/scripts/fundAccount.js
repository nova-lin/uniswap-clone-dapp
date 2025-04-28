const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // ✅ 这里填入你的前端钱包地址，比如 MetaMask 的地址
  const frontendAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; // 👈 记得替换！

  // ✅ 获取已部署的 Token1 和 Token2 合约地址
  const token1Address = "0x0165878A594ca255338adfa4d48449f69242Eb8F"; // 👈 记得替换！
  const token2Address = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853"; // 👈 记得替换！

  // ✅ 加载 ERC20 合约 ABI（用 OpenZeppelin 的标准 ABI）
  const ERC20_ABI = [
    "function transfer(address to, uint256 amount) public returns (bool)",
  ];

  const token1 = new ethers.Contract(token1Address, ERC20_ABI, deployer);
  const token2 = new ethers.Contract(token2Address, ERC20_ABI, deployer);

  // ✅ 发 Token1 和 Token2 到前端地址
  const amount = ethers.parseUnits("1000", 18); // 每个发 1000 个

  console.log(`🚀 正在给 ${frontendAddress} 发 Token1 和 Token2...`);

  const tx1 = await token1.transfer(frontendAddress, amount);
  await tx1.wait();
  console.log("✅ Token1 转账成功");

  const tx2 = await token2.transfer(frontendAddress, amount);
  await tx2.wait();
  console.log("✅ Token2 转账成功");

  console.log("🎉 前端账户已经有足够测试代币啦！");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

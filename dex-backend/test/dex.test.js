const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DEX Contract", function () {
  let token1, token2;
  let dex;
  let owner, addr1, addr2;

beforeEach(async function () {
  [owner, addr1, addr2] = await ethers.getSigners();

  const Token = await ethers.getContractFactory("ERC20Token");
  const initialSupply = ethers.parseUnits("1000000", 18);

  token1 = await Token.deploy("Token1", "TK1", initialSupply);
  token2 = await Token.deploy("Token2", "TK2", initialSupply);

  await token1.waitForDeployment();
  await token2.waitForDeployment();

  const DEX = await ethers.getContractFactory("DEX");
  dex = await DEX.deploy(await token1.getAddress(), await token2.getAddress());
  await dex.waitForDeployment();

  // ✅ 确保 addr1 有足够 Token
  await token1.transfer(addr1.address, ethers.parseUnits("5000", 18));
  await token2.transfer(addr1.address, ethers.parseUnits("5000", 18));

  // ✅ 确保 addr1 授权足够额度
  await token1.connect(addr1).approve(await dex.getAddress(), ethers.parseUnits("5000", 18));
  await token2.connect(addr1).approve(await dex.getAddress(), ethers.parseUnits("5000", 18));

});


it("Should remove liquidity successfully", async function () {
  // ✅ 先添加流动性
  await dex.connect(addr1).addLiquidity(
      ethers.parseUnits("100", 18), 
      ethers.parseUnits("100", 18)
  );

  // ✅ 确保 addr1 的流动性份额 > 0
  const sharesBefore = await dex.liquidityShares(addr1.address);

  // ✅ 现在移除流动性
  await dex.connect(addr1).removeLiquidity(ethers.parseUnits("50", 18));

  // ✅ 确保移除后份额减少
  const sharesAfter = await dex.liquidityShares(addr1.address);

  expect(sharesAfter).to.be.lt(sharesBefore);
});


  it("Should remove liquidity successfully", async function () {
    // ✅ 先添加流动性
    await token1.connect(addr1).approve(await dex.getAddress(), ethers.parseUnits("1000", 18));
    await token2.connect(addr1).approve(await dex.getAddress(), ethers.parseUnits("2000", 18));

    await dex.connect(addr1).addLiquidity(ethers.parseUnits("1000", 18), ethers.parseUnits("2000", 18));

    // ✅ 确保流动性池里有 token
    const reservesBefore = await dex.getReserves();

    // ✅ 计算用户的流动性份额
    const totalLiquidityBefore = await dex.totalLiquidity();

    // ✅ 先确保 addr1 账户里有流动性份额
    const liquidityBefore = await dex.liquidityShares(addr1.address);

    // ✅ 移除流动性
    await dex.connect(addr1).removeLiquidity(ethers.parseUnits("500", 18));

    // ✅ 获取新的储备量
    const reservesAfter = await dex.getReserves();

    // ✅ 断言储备量变化
    expect(reservesAfter[0]).to.be.lt(reservesBefore[0]); // Token1 储备减少
    expect(reservesAfter[1]).to.be.lt(reservesBefore[1]); // Token2 储备减少
});

it("Should revert swap if actual amountOut < minAmountOut", async function () {
    // ✅ 先添加流动性
    await token1.connect(addr1).approve(await dex.getAddress(), ethers.parseUnits("1000", 18));
    await token2.connect(addr1).approve(await dex.getAddress(), ethers.parseUnits("2000", 18));

    await dex.connect(addr1).addLiquidity(ethers.parseUnits("1000", 18), ethers.parseUnits("2000", 18));

    // ✅ 给 addr1 发送 Token
    await token1.transfer(addr1.address, ethers.parseUnits("1000", 18));

    await token1.connect(addr1).approve(await dex.getAddress(), ethers.parseUnits("500", 18));

    // ✅ 计算滑点超标的 `minAmountOut`
    const tooHighMinAmountOut = ethers.parseUnits("9999", 18);

    // ✅ 断言交易失败
    await expect(
        dex.connect(addr1).swap(await token1.getAddress(), ethers.parseUnits("500", 18), tooHighMinAmountOut)
    ).to.be.revertedWith("Slippage exceeded");
});


it("Should swap tokens successfully with slippage protection", async function () {
  // ✅ 先添加流动性
  await dex.connect(addr1).addLiquidity(
      ethers.parseUnits("1000", 18),
      ethers.parseUnits("2000", 18)
  );

  // ✅ addr1 授权
  await token1.connect(addr1).approve(await dex.getAddress(), ethers.parseUnits("100", 18));

  // ✅ 计算预期得到的 token
  const reserves = await dex.getReserves();
  const reserveIn = reserves[0];
  const reserveOut = reserves[1];

  const amountIn = ethers.parseUnits("10", 18);
  const amountInWithFee = amountIn * 997n; // 确保这里也是 `BigInt`
  const expectedAmountOut = (amountInWithFee * reserveOut) / (reserveIn * 1000n + amountInWithFee);

  // ✅ 设置合理的 minAmountOut（用整数运算）
  const minAmountOut = expectedAmountOut * 95n / 100n; // 95% 保护滑点

  await dex.connect(addr1).swap(await token1.getAddress(), amountIn, minAmountOut);
});


  it("Should revert swap if actual amountOut < minAmountOut", async function () {
    // ✅ 先添加流动性
    await token1.connect(addr1).approve(await dex.getAddress(), ethers.parseUnits("1000", 18));
    await token2.connect(addr1).approve(await dex.getAddress(), ethers.parseUnits("2000", 18));

    await dex.connect(addr1).addLiquidity(ethers.parseUnits("1000", 18), ethers.parseUnits("2000", 18));

    // ✅ 给 addr1 发送 Token
    await token1.transfer(addr1.address, ethers.parseUnits("1000", 18));

    await token1.connect(addr1).approve(await dex.getAddress(), ethers.parseUnits("500", 18));

    // ✅ 计算滑点超标的 `minAmountOut`
    const tooHighMinAmountOut = ethers.parseUnits("9999", 18);

    // ✅ 断言交易失败
    await expect(
        dex.connect(addr1).swap(await token1.getAddress(), ethers.parseUnits("500", 18), tooHighMinAmountOut)
    ).to.be.revertedWith("Slippage exceeded");
});
});

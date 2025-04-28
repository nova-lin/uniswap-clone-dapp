async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const Token1 = await ethers.getContractFactory("Token1");
    const token1 = await Token1.deploy();
    console.log("Token1 deployed to:", token1.address);

    const Token2 = await ethers.getContractFactory("Token2");
    const token2 = await Token2.deploy();
    console.log("Token2 deployed to:", token2.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// // require("@nomiclabs/hardhat-ethers"); 
// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.28",
// };

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const path = require("path");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  paths: {
    sources: "./contracts", // 你的 Solidity 文件目录
    cache: "./cache",
    artifacts: "./artifacts",
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  // **这部分是关键，允许 Hardhat 解析 `node_modules` 里的 `openzeppelin`**
  resolve: {
    alias: {
      "@openzeppelin": path.resolve(__dirname, "./node_modules/@openzeppelin"),
    },
  },
};





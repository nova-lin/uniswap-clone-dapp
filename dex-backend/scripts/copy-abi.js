const fs = require("fs");
const path = require("path");
require("dotenv").config();

// ABI 源目录
const sourceDir = path.resolve(__dirname, "../artifacts/contracts");

// 前端目标目录
const destDir = path.resolve(__dirname, "../../dex-frontend/src/utils");

// 需要同步的 ABI 文件
const filesToCopy = [
  { from: "DEX.sol/DEX.json", to: "DEX.json" },
  { from: "ERC20Token.sol/ERC20Token.json", to: "ERC20.json" },
];

filesToCopy.forEach(file => {
  const srcPath = path.join(sourceDir, file.from);
  const destPath = path.join(destDir, file.to);
  
  fs.copyFileSync(srcPath, destPath);
  console.log(`✅ Copied ${file.from} to ${file.to}`);
});

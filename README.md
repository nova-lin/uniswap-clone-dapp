<h1 align="center">🚀 Uniswap Clone DApp</h1>

<p align="center">
  <img src="https://img.shields.io/badge/built%20with-React-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/built%20with-Solidity-black?style=for-the-badge&logo=solidity" alt="Solidity" />
  <img src="https://img.shields.io/badge/built%20with-Hardhat-yellow?style=for-the-badge&logo=ethereum" alt="Hardhat" />
  <img src="https://img.shields.io/badge/Web3.js-Ethers.js-green?style=for-the-badge" alt="Ethers.js" />
</p>

<p align="center">
  A decentralized token swap platform inspired by Uniswap. 
  Built with Solidity smart contracts and a React frontend.
</p>

---


## 🚀 Tech Stack
- **Smart Contracts**: Solidity (ERC-20, Swap logic)
- **Backend**: Hardhat (development & deployment framework)
- **Frontend**: React.js + ethers.js
- **Blockchain**: Local Hardhat Network / Testnet

## 📄 Overview
- A decentralized token swap platform inspired by Uniswap.
- uilt with Solidity smart contracts and a React frontend.
- Supports token swaps between two ERC-20 tokens, liquidity pool management, and seamless smart contract interaction.

## 📦 Project Structure
```bash
UNISWAP-CLONE-DAPP/
├── dex-backend/        # Smart contracts and deployment scripts
│   ├── contracts/      # DEX.sol, Tokens.sol
│   └── scripts/        # Deploy and migration scripts
├── dex-frontend/       # dApp frontend built with React + Ethers.js
│   └── src/            # Frontend components and services
└── README.md
   # dApp frontend built with React

🛠 Features
Token Swap between two ERC-20 tokens

Liquidity Pool management (add/remove liquidity)

Real-time contract interaction via ethers.js

Deployment scripts for local & testnet environments

Clean modularized frontend structure

⚙️ Getting Started
1. Clone the repository

git clone https://github.com/nova-lin/uniswap-clone-dapp.git
cd uniswap-clone-dapp

2. Install dependencies

cd dex-backend
yarn install

cd ../dex-frontend
yarn install

3. Deploy smart contracts locally

cd dex-backend
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost

4. Start the frontend

cd dex-frontend
yarn dev

📫 Contact
Built by Nova Lin.
Feel free to connect and discuss Web3 development!

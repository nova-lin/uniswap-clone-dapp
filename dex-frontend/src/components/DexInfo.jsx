
import React from "react";
import "./styles/DexInfo.css";
import { useTheme } from "../context/ThemeContext";

export default function DexInfo() {
  const { theme } = useTheme();

  return (
    <div className={`dexinfo-container ${theme}`}>
      <h2 className="dexinfo-title">直接前往 DeFi</h2>
      <div className="dexinfo-grid">
        {/* 网络应用 */}
        <div className="dexinfo-card blue">
          <div className="badge blue">
            <div className="badge-content">
              <img
                className="badge-icon"
                src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f5a5.svg"
                alt="网络应用"
              />
              <span>网络应用</span>
              <svg
                className="arrow-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 12h14m0 0l-5-5m5 5l-5 5"
                  stroke="#1990ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <p className="card-title blue">
            兑换简单而轻松。访问超过 <span className="highlight">11 个区块链</span> 上的数千代币。
          </p>
          <div className="token-list">
            <div className="token-item">
              <div className="token-left">
                <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" alt="eth" />
                <div>
                  <div className="token-symbol">Ethereum</div>
                  <div className="token-name">ETH</div>
                </div>
              </div>
              <div className="token-price">$2,045.37</div>
            </div>
            <div className="token-item">
              <div className="token-left">
                <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" alt="usdc" />
                <div>
                  <div className="token-symbol">USD Coin</div>
                  <div className="token-name">USDC</div>
                </div>
              </div>
              <div className="token-price">$1.00</div>
            </div>
            <div className="token-item">
              <div className="token-left">
                <img src="https://cryptologos.cc/logos/uniswap-uni-logo.png" alt="uni" />
                <div>
                  <div className="token-symbol">Uniswap</div>
                  <div className="token-name">UNI</div>
                </div>
              </div>
              <div className="token-price">$6.96</div>
            </div>
            <div className="token-item">
              <div className="token-left">
                <img src="https://cryptologos.cc/logos/lido-dao-ldo-logo.png" alt="ldo" />
                <div>
                  <div className="token-symbol">Lido DAO Token</div>
                  <div className="token-name">LDO</div>
                </div>
              </div>
              <div className="token-price">$1.05</div>
            </div>
          </div>
        </div>

        {/* Uniswap 钱包 */}
        <div className="dexinfo-card pink">
          <div className="badge pink">
            <div className="badge-content">
              <img
                className="badge-icon"
                src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4b3.svg"
                alt="Uniswap 钱包"
              />
              <span>Uniswap 钱包</span>
              <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M5 12h14m0 0l-5-5m5 5l-5 5"
                  stroke="#ff007a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <p className="card-title pink">
            专为交换而设计的钱包。适用于 iOS 和 Android。
          </p>
          <div className="wallet-ui-mock">模拟 UI 区域，可替换为图片或其他布局</div>
        </div>

        {/* 开发者文档 */}
        <div className="dexinfo-card green">
          <div className="badge green">
            <div className="badge-content">
              <img
                className="badge-icon"
                src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4c4.svg"
                alt="开发者文档"
              />
              <span>开发者文档</span>
              <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M5 12h14m0 0l-5-5m5 5l-5 5"
                  stroke="#00b894"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <p className="card-title green">
            构建下一代开放应用程序和工具。
          </p>
        </div>

        {/* 流动性 */}
        <div className="dexinfo-card purple">
          <div className="badge purple">
            <div className="badge-content">
              <img
                className="badge-icon"
                src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4c8.svg"
                alt="流动性"
              />
              <span>流动性</span>
              <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M5 12h14m0 0l-5-5m5 5l-5 5"
                  stroke="#9b51e0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <p className="card-title purple">
            为 Uniswap 协议的资金池注入流动性，并从交换中赚取费用。
          </p>
        </div>
      </div>
    </div>
  );
}

import React from 'react'

export default function SwapPanel() {
    return (
      <div className="swap-card">
        <div className="swap-input">
          <label>出售</label>
          <div className="token-row">
            <div className="input-box">
              <input type="number" placeholder="0.0" />
              <span className="usd">≈ $0.00</span>
            </div>
            <button className="token-button">
              <img
                src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png"
                alt="ETH"
              />
              <span>ETH</span>
              <span className="arrow">⌄</span>
            </button>
          </div>
        </div>
  
        <div className="switch-btn">↓</div>
  
        <div className="swap-input">
          <label>购买</label>
          <div className="input-row">
            <input type="number" placeholder="0.0" />
            <button>选择代币 ⌄</button>
          </div>
          <span className="usd">≈ $0.00</span>
        </div>
  
        <button className="connect-btn">开始使用</button>
  
        <div className="bottom-info">
          1 USDT ≈ 0.0005 ETH <span>（$1.00）</span>
        </div>
      </div>
    );
  }

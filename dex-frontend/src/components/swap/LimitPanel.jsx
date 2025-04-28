import React, { useEffect, useState } from "react";
import SwapInput from "./SwapInput.jsx";
import "../styles/LimitPanel.css";
import { ethers } from "ethers";
import { getPrice } from "../../utils/getPrice.js";

export default function LimitPanel() {
  const [baseToken, setBaseToken] = useState({
    symbol: "ETH",
    icon: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
  });
  const [quoteToken, setQuoteToken] = useState({
    symbol: "USDC",
    icon: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png",
  });
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const baseIsToken1 = baseToken.symbol === "USDC";
  
      try {
        const p = await getPrice(provider, baseIsToken1);
        setPrice(p.toFixed(6));
      } catch (err) {
        console.error("获取价格失败", err);
      }
    };
  
    fetchPrice();
  }, [baseToken, quoteToken]);
  

  const swapTokens = () => {
    const temp = baseToken;
    setBaseToken(quoteToken);
    setQuoteToken(temp);
  };

  return (
    <div className="limit-panel">
      {/* 限价顶部说明 */}
      <div className="limit-header">
        <div className="limit-header-row">
          <span>当 1 个</span>
          <span className="limit-token">
            <img src={baseToken.icon} alt={baseToken.symbol} />
            <span>{baseToken.symbol}</span>
          </span>
          <span>的价值为</span>
          <div className="limit-header-right">
          <span className="limit-token">
            <img src={quoteToken.icon} alt={quoteToken.symbol} />
            <span>{quoteToken.symbol}</span>
          </span>
          </div>
          
        </div>
        <button className="switch-arrow" onClick={swapTokens}>
          ⇅
        </button>
        <div className="limit-price-row">
          <span className="limit-price">{price !== null ? price : "--"}</span>
        </div>
        <div className="quick-buttons">
          <button className="active">市场</button>
          <button>+1%</button>
          <button>+5%</button>
          <button>+10%</button>
        </div>
      </div>

      {/* 出售 / 购买 */}
      <SwapInput
        label="出售"
        token={{
          symbol: "ETH",
          icon: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
        }}
      />

      <SwapInput
        label="购买"
        token={{
          symbol: "USDC",
          icon: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png",
        }}
      />

      {/* 到期选择器区域 */}
      <div className="expiry-section">
        <label>到期</label>
        <div className="expiry-options">
          <button>1天</button>
          <button className="active">1周</button>
          <button>1个月</button>
          <button>1年</button>
        </div>
      </div>

      {/* 连接钱包按钮 */}
      <button className="connect-btn">连接钱包</button>

      {/* 警告说明栏 */}
      <div className="limit-warning">
        ⚠️ 当代币达到指定价格时，限额可能不会正确执行。
        <a href="#">了解详情</a>
      </div>
    </div>
  );
}

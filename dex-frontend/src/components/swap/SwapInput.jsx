import React from "react";
import "../styles/SwapInput.css"; // 记得引入上面的样式文件

const SwapInput = ({
  label = "输入",
  token = { symbol: "ETH", icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png" },
  value,
  onChange,
  usdValue = "$0.00",
  onTokenClick,
}) => {
  return (
    <div className="swap-input-wrapper">
      <label className="swap-input-label">{label}</label>
      <div className="swap-input-row">
        <input
          className="swap-input-field"
          type="number"
          placeholder="0.0"
          value={value}
          onChange={onChange}
        />
        <button className="swap-token-button" onClick={onTokenClick}>
          {token.icon && <img src={token.icon} alt={token.symbol} />}
          <span>{token.symbol}</span>
          <span className="arrow">⌄</span>
        </button>
      </div>
      <div className="swap-input-usd">≈ {usdValue}</div>
    </div>
  );
};

export default SwapInput;

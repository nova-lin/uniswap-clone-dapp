import React from "react";
import "../styles/SwapSettings.css";

const TradeOptions = ({ onBack }) => {
  return (
    <div className="swap-settings-popover">
      <div className="trade-options-header">
        <span className="back-arrow" onClick={onBack}>←</span>
        <span className="trade-title">交易选项</span>
      </div>

      <div className="trade-option">
        <div className="option-top">
          <span className="option-title">
            默认 <span className="info">i</span>
          </span>
          <span className="option-toggle">✔️</span>
        </div>
        <div className="option-desc">
          选择此选项可以为你的交换确定最经济高效的路径。
          <br />
          包括 <span className="highlight">⚡ UniswapX</span>
        </div>
      </div>
    </div>
  );
};

export default TradeOptions;

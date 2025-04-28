import React, { useState } from "react";
import TradeOptions from "./TradeOptions";
import "../styles/SwapSettings.css";

const SwapSettings = () => {
  const [showTradeOptions, setShowTradeOptions] = useState(false);

  if (showTradeOptions) return <TradeOptions onBack={() => setShowTradeOptions(false)} />
  return (
    <div className="swap-settings-popover">
      <div className="settings-section">
        <div className="settings-label">
          滑点上限 <span className="info">i</span>
        </div>
        <div className="settings-values">
          <span className="settings-badge">自动</span>
          <span className="settings-value">5.50%</span>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-label">
          交换截止时间 <span className="info">i</span>
        </div>
        <div className="settings-values">
          <span className="settings-value">30 minutes</span>
        </div>
      </div>

      <div className="settings-section" onClick={() => setShowTradeOptions(true)}>
        <div className="settings-label">交易选项</div>
        <div className="settings-values">
          <span className="settings-value">默认</span>
          <span className="settings-arrow">›</span>
        </div>
      </div>
    </div>
  );
};

export default SwapSettings;

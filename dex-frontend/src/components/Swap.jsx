import React, { useState, useEffect } from "react";
import "./styles/Swap.css";
import { useTheme } from "../context/ThemeContext.jsx";
import SwapPanel from "./swap/SwapPanel.jsx";
import LimitPanel from "./swap/LimitPanel.jsx";
import SendPanel from "./swap/SendPanel.jsx";
import BuyPanel from "./swap/BuyPanel.jsx";
import SwapSettings from "./swap/SwapSettings.jsx";

import { Settings } from "lucide-react";

const TAB_LABELS = {
  swap: "兑换",
  limit: "限额",
  send: "发送",
  buy: "购买",
};

export default function Swap() {
  const { theme } = useTheme();
  const [mode, setMode] = useState("swap");
  const [showSettings, setShowSettings] = useState(false);
  const toggleSettings = () => {
    setShowSettings((prev) => !prev);
  };

  return (
    <div className={`swap-container ${theme}`}>
      <div className="swap-tabs-wrapper">
        <div className="swap-tabs-left">
          {Object.entries(TAB_LABELS).map(([key, label]) => (
            <button
              key={key}
              className={`swap-tab ${mode === key ? "active" : ""}`}
              onClick={() => setMode(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="swap-settings-wrapper">
          <div className="swap-settings" onClick={toggleSettings}>
            <Settings size={20} />
          </div>
          {showSettings && <SwapSettings />}
        </div>
      </div>

      {/* 根据模式展示面板 */}
      {mode === "swap" && <SwapPanel />}
      {mode === "limit" && <LimitPanel />}
      {mode === "send" && <SendPanel />}
      {mode === "buy" && <BuyPanel />}
    </div>
  );
}

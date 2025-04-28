import { useEffect, useRef, useState } from "react";
import "./styles/Header.css";
import { useTheme } from "../context/ThemeContext.jsx";
import { Link } from "react-router-dom";

export default function Header({ onNavClick }) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const { theme, toggleTheme } = useTheme();
  const popupRef = useRef(null);
  const menuBtnRef = useRef(null);

  // 点击外部关闭弹窗
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !menuBtnRef.current.contains(event.target)
      ) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={`header ${theme}`}>
      <div className="header-left">
        <img
          src={
            theme === "dark"
              ? "https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png"
              : "https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png"
          }
          alt="logo"
          className="logo"
        />
        <nav className={`nav ${theme}`}>
          <Link to="/swap">交易</Link>
          <Link to="/explore">探索</Link>
          <Link to="/pool">资金池</Link>
        </nav>
      </div>

      <div className="header-right">
        <input
          type="text"
          placeholder="搜索代币"
          className={`search-input ${theme}`}
        />
        <div
          ref={menuBtnRef}
          className="more-menu"
          onClick={(e) => {
            e.stopPropagation(); // ✅ 阻止冒泡
            setShowPopup((prev) => !prev);
          }}
        >
          ⋯
        </div>
        <button className="wallet-button">连接</button>

        {/* 弹出设置菜单 */}
        {showPopup && (
          <div ref={popupRef} className={`popup-menu ${theme}`}>
            <div className="popup-item">
              <span className="theme-title">主题</span>
              <button className="theme-btn" onClick={toggleTheme}>
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </div>
            <div className="popup-item">
              <span className="currency-type">货币</span>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="CNY">CNY</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

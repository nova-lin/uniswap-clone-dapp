import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { getReserves } from "./utils/contract";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DexInfo from "./components/DexInfo";
import FloatingTokenList from "./components/FloatingTokenList";
import SwapPage from "./pages/SwapPage";
import ExplorePage from "./pages/ExplorePage";
import PoolPage from "./pages/PoolPage";
import { useTheme } from "./context/ThemeContext";
import "./App.css";

export default function App() {
  const location = useLocation();
  const { theme } = useTheme();
  const [reserves, setReserves] = useState({ token1: "0", token2: "0" });

  useEffect(() => {
    const fetchReserves = async () => {
      const data = await getReserves();
      setReserves(data);
    };
    fetchReserves();
  }, []);

  const isHome = location.pathname === "/";

  const handleScroll = () => {
    const target = document.getElementById("sections");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`app ${theme}`} data-theme={theme}>
      <Header />

      {/* ✅ 仅首页显示大字 + 浮动图标 */}
      {isHome && (
        <>
          <div className="floating-token-container">
            <FloatingTokenList />
            <div className="hero-section">
              <h1>
                随时随地
                <br />
                兑换。
              </h1>
            </div>
          </div>
        </>
      )}
      <Routes>
        <Route path="/" element={<SwapPage />} />
        <Route path="/swap" element={<SwapPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/pool" element={<PoolPage />} />
      </Routes>

      <div className="section-wrapper">
        <div className="intro-text">
          <span>
            最大的链上市场。在以太坊及其他超过11个区块链上购买和出售加密货币。
          </span>
        </div>
        <div className="scroll-wrapper">
          <div className="scroll-tip" onClick={handleScroll}>
            滚动查看更多 ↓
          </div>
        </div>
        <div id="sections">
          <DexInfo />
        </div>
        <Footer />
      </div>
    </div>
  );
}

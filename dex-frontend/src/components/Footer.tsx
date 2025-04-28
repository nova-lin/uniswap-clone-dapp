import React from "react";
import "./styles/Footer.css";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={`footer ${theme}`} data-theme={theme}>
      <div className="footer-container">
        <div className="footer-top">
          <div className="social-section">
            <div className="social-icons">
              <a href="#">
                <img
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg"
                  alt="GitHub"
                />
              </a>
              <a href="#">
                <img
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg"
                  alt="X"
                />
              </a>
              <a href="#">
                <img
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/discord.svg"
                  alt="Discord"
                />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div>
              <h4>应用</h4>
              <ul>
                <li>交易</li>
                <li>探索</li>
                <li>资金池</li>
              </ul>
            </div>
            <div>
              <h4>公司</h4>
              <ul>
                <li>职业</li>
                <li>博客</li>
                <li>品牌资产</li>
              </ul>
            </div>
            <div>
              <h4>协议</h4>
              <ul>
                <li>投票</li>
                <li>治理</li>
                <li>开发人员</li>
              </ul>
            </div>
            <div>
              <h4>需要帮助?</h4>
              <ul>
                <li>帮助中心</li>
                <li>联系我们</li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="footer-bottom">
          <span>© 2024 – DEX Labs</span>
          <div className="policy-links">
            <a href="#">商标政策</a>
            <a href="#">隐私政策</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

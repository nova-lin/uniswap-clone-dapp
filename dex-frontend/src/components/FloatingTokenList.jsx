import React, { useState } from "react";
import FloatingToken from "./FloatingToken";
import "./styles/FloatingToken.css";

export default function FloatingTokenList() {
  const [activeToken, setActiveToken] = useState(null);

  const tokens = [
    {
      src: "https://assets.coingecko.com/coins/images/325/thumb/Tether.png",
      name: "USDT",
      change: 0.23,
      left: "5vw",
      top: "15vh",
      color: "#26A17B",
    },
    {
      src: "https://assets.coingecko.com/coins/images/1364/thumb/mkr.png",
      name: "MKR",
      change: 0.36,
      left: "12vw",
      top: "10vh",
      color: "#1EC197",
    },
    {
      src: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png",
      name: "USDC",
      change: -0.12,
      left: "8vw",
      top: "35vh",
      color: "#FF007A",
    },
    {
      src: "https://assets.coingecko.com/coins/images/825/thumb/bnb.png",
      name: "BNB",
      change: 0.15,
      left: "10vw",
      top: "55vh",
      color: "#F3BA2F",
    },
    {
      src: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
      name: "BTC",
      change: 1.02,
      left: "18vw",
      top: "30vh",
      color: "#F7931A",
    },
    {
      src: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
      name: "ETH",
      change: -0.45,
      left: "15vw",
      top: "65vh",
      color: "#3C3C3D",
    },
  ];

  return (
    <div className="floating-token-list">
      {tokens.map((token, index) => (
        <FloatingToken
          key={index}
          icon={token.src}
          name={token.name}
          change={token.change}
          color={token.color}
          style={{
            position: "absolute",
            left: token.left,
            top: token.top,
            "--index": index,
            "--duration": `${3 + Math.random() * 2}s`,
            "--amplitude": `${5 + Math.random() * 10}px`,
            "--delay": `${Math.random() * 2}s`,
          }}
          onHover={() => setActiveToken(token)}
          onLeave={() => setActiveToken(null)}
        />
      ))}
    </div>
  );
}





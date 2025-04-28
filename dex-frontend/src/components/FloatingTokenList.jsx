// import React, { useState } from "react";
// import FloatingToken from "./FloatingToken.jsx";

// export default function FloatingTokenList() {
//   const [activeToken, setActiveToken] = useState(null);

//   const tokens = [
//     {
//       src: "https://assets.coingecko.com/coins/images/325/thumb/Tether.png?1696501661",
//       name: "USDT",
//       change: 0.23,
//       left: "40px",
//       top: "400px",
//       color: "#26A17B", // 深绿色
//     },
//     {
//       src: "https://assets.coingecko.com/coins/images/1364/thumb/mkr.png?1696501802",
//       name: "MKR",
//       change: 0.36,
//       right: "60px",
//       top: "60px",
//       color: "#1EC197", // 青绿色
//     },
//     {
//       src: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1696506694",
//       name: "USDC",
//       change: -0.12,
//       right: "80px",
//       bottom: "60px",
//       color: "#FF007A", // 粉红色
//     },
//     {
//       src: "https://assets.coingecko.com/coins/images/825/thumb/bnb.png?1696501629",
//       name: "BNB",
//       change: 0.15,
//       left: "60px",
//       bottom: "100px",
//       color: "#F3BA2F", // 金黄色
//     },
//     {
//       src: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1696501400",
//       name: "BTC",
//       change: 1.02,
//       left: "120px",
//       top: "100px",
//       color: "#F7931A", // 橘黄色
//     },
//     {
//       src: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1696501628",
//       name: "ETH",
//       change: -0.45,
//       right: "120px",
//       bottom: "140px",
//       color: "#3C3C3D", // 深灰色
//     },
//     {
//       src: "https://assets.coingecko.com/coins/images/877/thumb/chainlink-new-logo.png?1696502009",
//       name: "LINK",
//       change: 0.67,
//       left: "180px",
//       bottom: "160px",
//       color: "#2A5ADA", // 蓝色
//     },
//     {
//       src: "https://assets.coingecko.com/coins/images/4128/thumb/Solana.png?1696512341",
//       name: "SOL",
//       change: -1.12,
//       right: "180px",
//       top: "200px",
//       color: "#9945FF", // 紫色
//     },
//   ];
//   return (
//     <>
//       {tokens.map((token, index) => (
//         <FloatingToken
//           key={index}
//           icon={token.src}
//           name={token.name}
//           change={token.change}
//           color={token.color}
//           style={{
//             ...token,
//             position: "absolute",
//             left: `${10 + Math.random() * 35}%`,  // 横向范围在 10% - 45%
//             top: `${10 + Math.random() * 70}%`,   // 纵向范围在 10% - 80%
//             "--index": index,
//             "--duration": `${3 + Math.random() * 2}s`,
//             "--amplitude": `${5 + Math.random() * 10}px`,
//             "--delay": `${Math.random() * 2}s`,
//           }}
//           onHover={() => setActiveToken(token)}
//           onLeave={() => setActiveToken(null)}
//         />
//       ))}
//     </>
//   );
// }

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





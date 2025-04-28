
import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function WalletConnect() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    async function checkConnection() {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0].address);
          }
        } catch (error) {
          console.error("Error checking connection:", error);
        }
      }
    }
    checkConnection();
  }, []);

  const handleConnect = async () => {
    if (isConnecting) return; // ✅ 避免重复请求

    setIsConnecting(true);
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      // ✅ **检查 MetaMask 是否正在处理连接请求**
      if (window.ethereum._metamask && !(await window.ethereum._metamask.isUnlocked())) {
        alert("MetaMask is locked! Unlock it and try again.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []); // ✅ 只发送一次请求

      setAccount(accounts[0]);
    } catch (error) {
      if (error.code === -32002) {
        alert("Wallet connection request is already pending. Please check MetaMask.");
      }
      console.error("Error connecting wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div>
      {account ? (
        <>
          <p>Connected: {account}</p>
          <button onClick={() => setAccount(null)}>Disconnect</button>
        </>
      ) : (
        <button onClick={handleConnect} disabled={isConnecting}>
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </div>
  );
}



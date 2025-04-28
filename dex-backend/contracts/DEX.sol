// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract ERC20Token is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
    }
}

contract DEX {
    address public token1;
    address public token2;

    uint256 public reserve1;
    uint256 public reserve2;

    mapping(address => uint256) public liquidityShares;
    uint256 public totalLiquidity;

    constructor(address _token1, address _token2) {
        require(
            _token1 != address(0) && _token2 != address(0),
            "Invalid token address"
        );
        token1 = _token1;
        token2 = _token2;

        IERC20(token1).transferFrom(msg.sender, address(this), reserve1);
    IERC20(token2).transferFrom(msg.sender, address(this), reserve2);
    }

    // 添加流动性
    function addLiquidity(uint256 amount1, uint256 amount2) external {
        require(amount1 > 0 && amount2 > 0, "Amounts must be greater than 0");

        // 转移代币到合约
        IERC20(token1).transferFrom(msg.sender, address(this), amount1);
        IERC20(token2).transferFrom(msg.sender, address(this), amount2);

        // 计算流动性份额
        uint256 liquidity;
        if (totalLiquidity == 0) {
            liquidity = amount1 + amount2; // 初始流动性
        } else {
            liquidity = (amount1 * totalLiquidity) / reserve1;
        }

        liquidityShares[msg.sender] += liquidity;
        totalLiquidity += liquidity;

        //更新储备
        reserve1 += amount1;
        reserve2 += amount2;
    }

    // 移除流动性方法
    function removeLiquidity(uint256 shares) external {
        require(liquidityShares[msg.sender] >= shares, "Insufficient shares");

        // 计算应退还的代币数量
        uint256 amount1 = (reserve1 * shares) / totalLiquidity;
        uint256 amount2 = (reserve2 * shares) / totalLiquidity;

        // 更新储备和份额
        reserve1 -= amount1;
        reserve2 -= amount2;
        liquidityShares[msg.sender] -= shares;
        totalLiquidity -= shares;

        // 退还代币
        IERC20(token1).transfer(msg.sender, amount1);
        IERC20(token2).transfer(msg.sender, amount2);
    }

    // 代币交换
    function swap(
        address tokenIn,
        uint256 amountIn,
        uint256 minAmountOut
    ) external {
        require(amountIn > 0, "Amount must be greater than 0");

        bool isToken1 = tokenIn == address(token1);
        require(isToken1 || tokenIn == address(token2), "Invalid token");

        (uint256 reserveIn, uint256 reserveOut) = isToken1
            ? (reserve1, reserve2)
            : (reserve2, reserve1);

        uint256 amountInWithFee = amountIn * 997;
        uint256 amountOut = (amountInWithFee * reserveOut) /
            (reserveIn * 1000 + amountInWithFee);

        console.log("reserveIn:", reserveIn);
        console.log("reserveOut:", reserveOut);
        console.log("amountIn:", amountIn);
        console.log("amountInWithFee:", amountInWithFee);
        console.log("amountOut:", amountOut);
        console.log("minAmountOut:", minAmountOut);
        console.log("token1:", token1);
        console.log("token2:", token2);
        console.log("tokenIn:", tokenIn);

        // 新增滑点保护
        require(amountOut >= minAmountOut, "Slippage exceeded");
        require(amountOut > 0, "Insufficient output amount");

        if (isToken1) {
            reserve1 += amountIn;
            reserve2 -= amountOut;
        } else {
            reserve2 += amountIn;
            reserve1 -= amountOut;
        }
        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        IERC20(isToken1 ? address(token2) : address(token1)).transfer(
            msg.sender,
            amountOut
        );
    }

    // 获取储备量
    function getReserves()
        public
        view
        returns (uint256 _reserve1, uint256 _reserve2)
    {
        return (reserve1, reserve2);
    }
}

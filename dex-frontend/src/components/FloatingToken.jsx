
import React from "react";
import "./styles/FloatingToken.css";

export default function FloatingToken({
  icon,
  name,
  change,
  style,
  onHover,
  onLeave,
  color,
}) {
  return (
    <div
      className="floating-token"
      style={style}
      onMouseEnter={() => onHover?.()}
      onMouseLeave={() => onLeave?.()}
    >
      <img src={icon} alt={name} className="token-img" />
      <div className="token-info-box">
        <span className="token-name" style={{ color }}>{name}</span>
        <span className="token-change">
          {change > 0 ? `▲ ${change}%` : `▼ ${change}%`}
        </span>
      </div>
    </div>
  );
}


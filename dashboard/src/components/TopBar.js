import React from "react";
import Menu from "./Menu";
import { useMarket } from "../context/MarketContext";

const TopBar = () => {
  const { indices, isLiveMode, toggleLiveMode, source } = useMarket();

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">{indices?.nifty?.name || "NIFTY 50"}</p>
          <p className={`index-points ${indices?.nifty?.isDown ? "down" : "up"}`}>
            {indices?.nifty?.price ? indices.nifty.price.toLocaleString("en-IN") : "23,146.15"}
          </p>
          <p className={`percent ${indices?.nifty?.isDown ? "down" : "up"}`}>
            {indices?.nifty?.percent || "+0.64%"}
          </p>
        </div>
        <div className="sensex">
          <p className="index">{indices?.sensex?.name || "SENSEX"}</p>
          <p className={`index-points ${indices?.sensex?.isDown ? "down" : "up"}`}>
            {indices?.sensex?.price ? indices.sensex.price.toLocaleString("en-IN") : "74,729.27"}
          </p>
          <p className={`percent ${indices?.sensex?.isDown ? "down" : "up"}`}>
            {indices?.sensex?.percent || "+0.55%"}
          </p>
        </div>

        {/* Live / Dummy Mode Switcher */}
        <button
          onClick={toggleLiveMode}
          title={isLiveMode ? "Click to switch to Dummy Data" : "Click to switch to Upstox Live Data"}
          style={{
            marginLeft: "20px",
            background: isLiveMode && source === "upstox" ? "#e6f4ea" : "#f1f3f4",
            color: isLiveMode && source === "upstox" ? "#137333" : "#5f6368",
            border: isLiveMode && source === "upstox" ? "1px solid #ceead6" : "1px solid #dadce0",
            borderRadius: "16px",
            padding: "4px 12px",
            fontSize: "11px",
            fontWeight: "600",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.2s ease",
            outline: "none"
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: isLiveMode && source === "upstox" ? "#0f9d58" : "#9aa0a6",
              display: "inline-block",
              boxShadow: isLiveMode && source === "upstox" ? "0 0 6px #0f9d58" : "none"
            }}
          />
          {isLiveMode && source === "upstox" ? "● UPSTOX LIVE" : "○ DUMMY DATA"}
        </button>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;

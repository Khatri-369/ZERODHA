import React, { useState, useContext } from "react";

import { Tooltip, Grow } from "@mui/material";

import { useMarket } from "../context/MarketContext";
import GeneralContext from "./GeneralContext";
import { DoughnutChart } from "./DonutChart";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  BarChartOutlined,
  MoreHoriz,
} from "@mui/icons-material";

const WatchList = () => {
  const { watchlist } = useMarket();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWatchlist = (watchlist || []).filter((stock) =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const labels = filteredWatchlist.map((data) => data.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: filteredWatchlist.map((data) => data.price),
        backgroundColor: [
          "rgba(56, 126, 209, 0.75)", // Kite Blue
          "rgba(16, 185, 129, 0.75)", // Emerald Green
          "rgba(249, 115, 22, 0.75)", // Zerodha Orange
          "rgba(139, 92, 246, 0.75)", // Purple
          "rgba(245, 158, 11, 0.75)", // Amber Gold
          "rgba(6, 182, 212, 0.75)",  // Cyan
          "rgba(244, 63, 94, 0.75)",  // Rose Red
          "rgba(99, 102, 241, 0.75)", // Indigo
          "rgba(217, 70, 239, 0.75)", // Fuchsia
          "rgba(132, 204, 22, 0.75)", // Lime
        ],
        borderColor: [
          "rgba(56, 126, 209, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(6, 182, 212, 1)",
          "rgba(244, 63, 94, 1)",
          "rgba(99, 102, 241, 1)",
          "rgba(217, 70, 239, 1)",
          "rgba(132, 204, 22, 1)",
        ],
        borderWidth: 1.5,
        hoverOffset: 6,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="counts"> {filteredWatchlist.length} / 50</span>
      </div>

      <ul className="list">
        {filteredWatchlist.map((stock, index) => {
          return <WatchListItem stock={stock} key={stock.name || index} />;
        })}
      </ul>

      <DoughnutChart data={data} />
    </div>
  );
};

const WatchListItem = ({ stock }) => {
  const [showWatchlistAction, setShowWatchlistAction] = useState(false);

  const handleMouseEnter = (e) => {
    setShowWatchlistAction(true);
  };

  const handleMouseExit = (e) => {
    setShowWatchlistAction(false);
  };

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="item-info">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">
            {typeof stock.price === "number" ? stock.price.toFixed(2) : stock.price}
          </span>
        </div>
      </div>
      {showWatchlistAction && <WatchListAction uid={stock.name} />}
    </li>
  );
};

const WatchListAction = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid, "BUY");
  };

  const handleSellClick = () => {
    generalContext.openBuyWindow(uid, "SELL");
  };

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="buy" onClick={handleBuyClick}>
            Buy
          </button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="sell" onClick={handleSellClick}>
            Sell
          </button>
        </Tooltip>
        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip
          title="More"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};

export default WatchList;
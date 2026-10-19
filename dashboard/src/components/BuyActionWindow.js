import React, { useState, useContext } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { watchlist } from "../data/data";

import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode = "BUY" }) => {
  const { closeBuyWindow } = useContext(GeneralContext);

  const matchedStock = watchlist.find((s) => s.name === uid);
  const defaultPrice = matchedStock ? matchedStock.price : 100.0;

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(defaultPrice);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleOrderClick = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (loading) return;

    setLoading(true);
    setStatusMsg("");

    try {
      const finalPrice = Number(stockPrice) > 0 ? Number(stockPrice) : defaultPrice;
      const finalQty = Number(stockQuantity) > 0 ? Number(stockQuantity) : 1;

      const res = await axios.post(
        `${API_BASE_URL}/newOrder`,
        {
          name: uid,
          qty: finalQty,
          price: String(finalPrice),
          mode: mode,
        },
        { withCredentials: true }
      );

      if (res.data && res.data.success) {
        setStatusMsg("Order placed successfully!");
        window.dispatchEvent(new Event("orderPlaced"));
        setTimeout(() => {
          closeBuyWindow();
        }, 500);
      } else {
        setStatusMsg(res.data?.message || "Failed to place order");
      }
    } catch (err) {
      console.error("New order error:", err);
      setStatusMsg("Error placing order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    closeBuyWindow();
  };

  const calculatedMargin = (Number(stockQuantity) * (Number(stockPrice) || defaultPrice)).toFixed(2);

  return (
    <div className="container" id="buy-window" draggable="true">
      <div
        className="header"
        style={{ backgroundColor: mode === "SELL" ? "#ff5722" : "#4184f3" }}
      >
        <h3>
          {mode} {uid} <span>x {stockQuantity} Qty</span>
        </h3>
      </div>
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      {statusMsg && (
        <div style={{
          textAlign: "center",
          fontSize: "0.85rem",
          fontWeight: "600",
          color: statusMsg.includes("success") ? "#2e7d32" : "#c62828",
          margin: "8px 0"
        }}>
          {statusMsg}
        </div>
      )}

      <div className="buttons">
        <span>Margin required ₹{calculatedMargin}</span>
        <div>
          <button
            type="button"
            className={`btn ${mode === "SELL" ? "btn-orange" : "btn-blue"}`}
            onClick={handleOrderClick}
            disabled={loading}
            style={{
              cursor: loading ? "not-allowed" : "pointer",
              border: "none",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Placing..." : mode === "SELL" ? "Sell" : "Buy"}
          </button>
          <button
            type="button"
            className="btn btn-grey"
            onClick={handleCancelClick}
            style={{ cursor: "pointer", border: "none" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
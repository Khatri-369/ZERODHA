import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    axios
      .get(`${API_BASE_URL}/allorders`, { withCredentials: true })
      .then((res) => {
        setAllOrders(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Orders fetch error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();

    const handleOrderPlaced = () => {
      fetchOrders();
    };

    window.addEventListener("orderPlaced", handleOrderPlaced);
    return () => {
      window.removeEventListener("orderPlaced", handleOrderPlaced);
    };
  }, []);

  if (loading) {
    return (
      <div className="orders" style={{ textAlign: "center", padding: "40px" }}>
        <p style={{ color: "#777" }}>Loading your orders...</p>
      </div>
    );
  }

  if (allOrders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Orders ({allOrders.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order, index) => {
              const isBuy = (order.mode || "BUY").toUpperCase() === "BUY";
              return (
                <tr key={order._id || index}>
                  <td>
                    <strong>{order.name}</strong>
                  </td>
                  <td>{order.qty}</td>
                  <td>₹{Number(order.price || 0).toFixed(2)}</td>
                  <td>
                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "3px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        color: "#fff",
                        backgroundColor: isBuy ? "#4184f3" : "#ff5722",
                      }}
                    >
                      {order.mode || "BUY"}
                    </span>
                  </td>
                  <td style={{ color: "#2e7d32", fontWeight: "600", fontSize: "0.85rem" }}>
                    EXECUTED
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;

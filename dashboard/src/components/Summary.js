import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMarket } from "../context/MarketContext";

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const { quotes } = useMarket();

  useEffect(() => {
    axios
      .get("http://localhost:3002/allholdings")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setHoldings(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const totalInvestment = holdings.reduce((acc, s) => acc + (s.qty * s.avg), 0) || 29875.55;
  const totalCurValue = holdings.length > 0
    ? holdings.reduce((acc, s) => {
        const livePrice = quotes[s.name] ? quotes[s.name].price : s.price;
        return acc + (s.qty * livePrice);
      }, 0)
    : 31428.95;
  const totalPL = totalCurValue - totalInvestment;
  const plPct = totalInvestment > 0 ? ((totalPL / totalInvestment) * 100).toFixed(2) : "5.20";

  return (
    <>
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length || 13})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={totalPL >= 0 ? "profit" : "loss"}>
              {(totalPL / 1000).toFixed(2)}k <small>{totalPL >= 0 ? "+" : ""}{plPct}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{(totalCurValue / 1000).toFixed(2)}k</span>{" "}
            </p>
            <p>
              Investment <span>{(totalInvestment / 1000).toFixed(2)}k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;

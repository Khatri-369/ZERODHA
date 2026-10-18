import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { useMarket } from "../context/MarketContext";

const Holdings = () => {
  const [holdings, setholdings] = useState([]);
  const { quotes } = useMarket();

  useEffect(() => {
    axios.get("http://localhost:3002/allholdings").then((res) => {
      setholdings(res.data);
    });
  }, []);

  return <HoldingsDashboard holdings={holdings} quotes={quotes} />;
};

const HoldingsDashboard = ({ holdings, quotes = {} }) => {
  // Merge holdings with live quotes if available
  const liveHoldings = holdings.map((stock) => {
    const liveQuote = quotes[stock.name];
    const livePrice = liveQuote ? liveQuote.price : stock.price;
    const dayChange = liveQuote ? liveQuote.percent : stock.day;
    const isLoss = liveQuote ? liveQuote.isDown : stock.isLoss;

    return {
      ...stock,
      price: livePrice,
      day: dayChange,
      isLoss: isLoss,
    };
  });

  const labels = liveHoldings.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "LTP",
        data: liveHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(59, 245, 8, 0.5)",
      },
    ],
  };

  // Compute live portfolio totals
  const totalInvestment = liveHoldings.reduce((acc, s) => acc + (s.qty * s.avg), 0);
  const totalCurValue = liveHoldings.reduce((acc, s) => acc + (s.qty * s.price), 0);
  const totalPL = totalCurValue - totalInvestment;
  const totalPLPct = totalInvestment > 0 ? ((totalPL / totalInvestment) * 100).toFixed(2) : "0.00";
  const isOverallProfit = totalPL >= 0;

  return (
    <>
      <h3 className="title">Holdings ({liveHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {liveHoldings.map((stock, index) => {
              const curValue = stock.qty * stock.price;
              const isProfit = curValue - stock.qty * stock.avg >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.qty * stock.avg).toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            {totalInvestment.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {totalCurValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 style={{ color: isOverallProfit ? "rgb(72, 194, 55)" : "rgb(250, 118, 78)" }}>
            {totalPL >= 0 ? "+" : ""}{totalPL.toFixed(2)} ({totalPL >= 0 ? "+" : ""}{totalPLPct}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
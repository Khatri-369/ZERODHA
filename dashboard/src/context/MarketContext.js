import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { watchlist as defaultWatchlist } from "../data/data";

const MarketContext = createContext();

export const MarketProvider = ({ children }) => {
  // Toggle between Real-Time Upstox Data and Static Dummy Data
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [source, setSource] = useState("upstox");
  const [lastUpdated, setLastUpdated] = useState(null);

  // Indices (Nifty 50 and Sensex)
  const [indices, setIndices] = useState({
    nifty: { name: "NIFTY 50", price: 23146.15, change: 148.8, percent: "+0.64%", isDown: false },
    sensex: { name: "SENSEX", price: 74729.27, change: 413.66, percent: "+0.55%", isDown: false },
  });

  // Watchlist items
  const [watchlist, setWatchlist] = useState(defaultWatchlist);

  // Quick lookup dictionary: quotes["INFY"] = { price, percent, isDown, ... }
  const [quotes, setQuotes] = useState({});

  const fetchQuotes = useCallback(async () => {
    try {
      const url = `http://localhost:3002/live-quotes?dummy=${!isLiveMode}`;
      const response = await axios.get(url);
      const data = response.data;

      if (data && data.success) {
        setSource(data.source || (isLiveMode ? "upstox" : "dummy"));
        if (data.indices) setIndices(data.indices);
        if (data.watchlist && data.watchlist.length > 0) setWatchlist(data.watchlist);
        if (data.quotes) setQuotes(data.quotes);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.warn("Market fetch failed, falling back to dummy data:", err.message);
      setSource("dummy");
      setWatchlist(defaultWatchlist);
    }
  }, [isLiveMode]);

  // Periodic polling every 3 seconds
  useEffect(() => {
    fetchQuotes();
    const intervalId = setInterval(fetchQuotes, 3000);
    return () => clearInterval(intervalId);
  }, [fetchQuotes]);

  const toggleLiveMode = () => {
    setIsLiveMode((prev) => !prev);
  };

  return (
    <MarketContext.Provider
      value={{
        isLiveMode,
        toggleLiveMode,
        source,
        indices,
        watchlist,
        quotes,
        lastUpdated,
        refreshMarketData: fetchQuotes,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => useContext(MarketContext);
export default MarketContext;

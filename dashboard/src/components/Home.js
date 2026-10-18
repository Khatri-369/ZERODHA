import React from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { MarketProvider } from "../context/MarketContext";

const Home = () => {
  return (
    <MarketProvider>
      <TopBar />
      <Dashboard />
    </MarketProvider>
  );
};

export default Home;
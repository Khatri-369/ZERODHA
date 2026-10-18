// Simple Market Service for Live Upstox Data with Instant Fallback to Dummy Data

// 1. Stock Mapping: Symbol -> Upstox Instrument Key
const INSTRUMENT_MAP = {
  // Indices
  "NIFTY 50": "NSE_INDEX|Nifty 50",
  "SENSEX": "BSE_INDEX|SENSEX",

  // Watchlist & Holdings Stocks
  "INFY": "NSE_EQ|INE009A01021",
  "ONGC": "NSE_EQ|INE213A01029",
  "TCS": "NSE_EQ|INE467B01029",
  "KPITTECH": "NSE_EQ|INE04I401011",
  "QUICKHEAL": "NSE_EQ|INE306L01010",
  "WIPRO": "NSE_EQ|INE075A01022",
  "M&M": "NSE_EQ|INE101A01026",
  "RELIANCE": "NSE_EQ|INE002A01018",
  "HUL": "NSE_EQ|INE030A01027",
  "HINDUNILVR": "NSE_EQ|INE030A01027",
  "BHARTIARTL": "NSE_EQ|INE397D01024",
  "HDFCBANK": "NSE_EQ|INE040A01034",
  "ITC": "NSE_EQ|INE154A01025",
  "SBIN": "NSE_EQ|INE062A01020",
  "TATAPOWER": "NSE_EQ|INE245A01021",
};

// 2. Default Dummy Data (Exact original values for 100% reliable fallback)
const DUMMY_DATA = {
  indices: {
    nifty: { name: "NIFTY 50", price: 22450.40, change: 82.50, percent: "+0.37%", isDown: false },
    sensex: { name: "SENSEX", price: 73850.15, change: 210.30, percent: "+0.29%", isDown: false }
  },
  watchlist: [
    { name: "INFY", price: 1555.45, percent: "-1.60%", isDown: true },
    { name: "ONGC", price: 116.80, percent: "-0.09%", isDown: true },
    { name: "TCS", price: 3194.80, percent: "-0.25%", isDown: true },
    { name: "KPITTECH", price: 266.45, percent: "3.54%", isDown: false },
    { name: "QUICKHEAL", price: 308.55, percent: "-0.15%", isDown: true },
    { name: "WIPRO", price: 577.75, percent: "0.32%", isDown: false },
    { name: "M&M", price: 779.80, percent: "-0.01%", isDown: true },
    { name: "RELIANCE", price: 2112.40, percent: "1.44%", isDown: false },
    { name: "HUL", price: 512.40, percent: "1.04%", isDown: false },
  ]
};

// Cache to prevent hitting rate limits
let cachedData = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 2500; // 2.5 seconds cache

async function fetchLiveMarketData(forceDummy = false) {
  // If user requested dummy data or token is not provided
  const token = process.env.UPSTOX_ACCESS_TOKEN;
  if (forceDummy || !token) {
    return {
      success: true,
      source: "dummy",
      timestamp: new Date().toISOString(),
      ...DUMMY_DATA
    };
  }

  // Return cache if still fresh
  const now = Date.now();
  if (cachedData && (now - lastFetchTime) < CACHE_TTL_MS) {
    return cachedData;
  }

  try {
    const instrumentKeys = Object.values(INSTRUMENT_MAP).join(",");
    const url = `https://api.upstox.com/v2/market-quote/quotes?instrument_key=${encodeURIComponent(instrumentKeys)}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      console.warn(`[MarketService] Upstox API returned status ${response.status}. Using dummy data.`);
      return {
        success: true,
        source: "dummy",
        timestamp: new Date().toISOString(),
        ...DUMMY_DATA
      };
    }

    const json = await response.json();
    const upstoxData = json.data || {};

    // Helper to extract stock data from Upstox response
    const parseQuote = (symbol) => {
      // Upstox formats response keys like "NSE_EQ:INFY", "NSE_INDEX:Nifty 50", "BSE_INDEX:SENSEX"
      const candidateKeys = [
        `NSE_EQ:${symbol}`,
        `NSE_INDEX:${symbol}`,
        `BSE_INDEX:${symbol}`,
        (INSTRUMENT_MAP[symbol] || "").replace("|", ":")
      ];

      let raw = null;
      for (const k of candidateKeys) {
        if (upstoxData[k]) {
          raw = upstoxData[k];
          break;
        }
      }

      // If still not found, search through values for matching symbol or instrument_token
      if (!raw) {
        const expectedToken = INSTRUMENT_MAP[symbol];
        for (const item of Object.values(upstoxData)) {
          if (item && (item.symbol === symbol || (expectedToken && item.instrument_token === expectedToken))) {
            raw = item;
            break;
          }
        }
      }

      if (!raw || raw.last_price == null) return null;

      const ltp = Number(raw.last_price);
      const close = raw.ohlc && raw.ohlc.close ? Number(raw.ohlc.close) : ltp;
      const netChange = raw.net_change != null ? Number(raw.net_change) : (ltp - close);
      const pct = close > 0 ? ((netChange / close) * 100) : 0;
      const isDown = netChange < 0;

      return {
        price: Number(ltp.toFixed(2)),
        change: Number(netChange.toFixed(2)),
        percent: `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`,
        isDown: isDown,
        close: close
      };
    };

    // Format Indices
    const niftyQuote = parseQuote("NIFTY 50") || DUMMY_DATA.indices.nifty;
    const sensexQuote = parseQuote("SENSEX") || DUMMY_DATA.indices.sensex;

    const indices = {
      nifty: {
        name: "NIFTY 50",
        price: niftyQuote.price,
        change: niftyQuote.change,
        percent: niftyQuote.percent,
        isDown: niftyQuote.isDown
      },
      sensex: {
        name: "SENSEX",
        price: sensexQuote.price,
        change: sensexQuote.change,
        percent: sensexQuote.percent,
        isDown: sensexQuote.isDown
      }
    };

    // Format Watchlist
    const defaultWatchlistSymbols = ["INFY", "ONGC", "TCS", "KPITTECH", "QUICKHEAL", "WIPRO", "M&M", "RELIANCE", "HUL"];
    const watchlist = defaultWatchlistSymbols.map((sym) => {
      const q = parseQuote(sym);
      if (q) {
        return {
          name: sym,
          price: q.price,
          percent: q.percent,
          isDown: q.isDown
        };
      }
      // Fallback for single item if missing
      const dummyItem = DUMMY_DATA.watchlist.find(w => w.name === sym);
      return dummyItem || { name: sym, price: 100, percent: "0.00%", isDown: false };
    });

    // Format Quotes Map for easy lookup by any component (Holdings, Orders, etc.)
    const quotes = {};
    for (const sym of Object.keys(INSTRUMENT_MAP)) {
      const q = parseQuote(sym);
      if (q) {
        quotes[sym] = q;
      }
    }

    cachedData = {
      success: true,
      source: "upstox",
      timestamp: new Date().toISOString(),
      indices,
      watchlist,
      quotes
    };
    lastFetchTime = now;

    return cachedData;
  } catch (err) {
    console.error("[MarketService] Error fetching Upstox quotes:", err.message);
    // Graceful fallback: return dummy data so app NEVER breaks
    return {
      success: true,
      source: "dummy",
      timestamp: new Date().toISOString(),
      ...DUMMY_DATA
    };
  }
}

module.exports = {
  fetchLiveMarketData,
  INSTRUMENT_MAP,
  DUMMY_DATA
};
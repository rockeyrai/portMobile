 const StockListData = [
  // Top Gainer
  { id: 1, symbol: "HIT", ltp: 43563, volume: 4353, previousClose: 42344, percentagechange: 5, logo: require("../assets/logo/portfolio.png"), category: "Top Gainer" },
  { id: 2, symbol: "GNR1", ltp: 51234, volume: 3200, previousClose: 50000, percentagechange: 2.5, logo: require("../assets/logo/portfolio.png"), category: "Top Gainer" },
  { id: 3, symbol: "GNR2", ltp: 62340, volume: 4100, previousClose: 61000, percentagechange: 2.1, logo: require("../assets/logo/portfolio.png"), category: "Top Gainer" },
  { id: 4, symbol: "GNR3", ltp: 47890, volume: 2900, previousClose: 47000, percentagechange: 1.9, logo: require("../assets/logo/portfolio.png"), category: "Top Gainer" },
  // { id: 5, symbol: "GNR4", ltp: 38900, volume: 5300, previousClose: 38000, percentagechange: 2.4, logo: require("../assets/logo/portfolio.png"), category: "Top Gainer" },

  // Top Loser
  { id: 6, symbol: "ABC", ltp: 43563, volume: 1200, previousClose: 42344, percentagechange: -4.2, logo: require("../assets/logo/portfolio.png"), category: "Top Loser" },
  { id: 7, symbol: "LSR1", ltp: 39800, volume: 2300, previousClose: 41000, percentagechange: -3.0, logo: require("../assets/logo/portfolio.png"), category: "Top Loser" },
  { id: 8, symbol: "LSR2", ltp: 51000, volume: 1500, previousClose: 52000, percentagechange: -1.9, logo: require("../assets/logo/portfolio.png"), category: "Top Loser" },
  { id: 9, symbol: "LSR3", ltp: 46750, volume: 2800, previousClose: 48000, percentagechange: -2.6, logo: require("../assets/logo/portfolio.png"), category: "Top Loser" },
  // { id: 10, symbol: "LSR4", ltp: 39200, volume: 3200, previousClose: 40000, percentagechange: -2.0, logo: require("../assets/logo/portfolio.png"), category: "Top Loser" },

  // Balance
  { id: 11, symbol: "XYZ", ltp: 43563, volume: 950, previousClose: 42344, percentagechange: 1.5, logo: require("../assets/logo/portfolio.png"), category: "Balance" },
  { id: 12, symbol: "BAL1", ltp: 50200, volume: 1100, previousClose: 50000, percentagechange: 0.4, logo: require("../assets/logo/portfolio.png"), category: "Balance" },
  { id: 13, symbol: "BAL2", ltp: 47850, volume: 950, previousClose: 47500, percentagechange: 0.7, logo: require("../assets/logo/portfolio.png"), category: "Balance" },
  { id: 14, symbol: "BAL3", ltp: 49000, volume: 1200, previousClose: 48800, percentagechange: 0.4, logo: require("../assets/logo/portfolio.png"), category: "Balance" },
  // { id: 15, symbol: "BAL4", ltp: 50500, volume: 1000, previousClose: 50300, percentagechange: 0.4, logo: require("../assets/logo/portfolio.png"), category: "Balance" },

  // Top Turnover
  { id: 16, symbol: "NEPSE", ltp: 43563, volume: 7100, previousClose: 42344, percentagechange: 3.8, logo: require("../assets/logo/portfolio.png"), category: "Top Turnover" },
  { id: 17, symbol: "TOV1", ltp: 52000, volume: 8000, previousClose: 51000, percentagechange: 1.9, logo: require("../assets/logo/portfolio.png"), category: "Top Turnover" },
  { id: 18, symbol: "TOV2", ltp: 49000, volume: 9500, previousClose: 48000, percentagechange: 2.1, logo: require("../assets/logo/portfolio.png"), category: "Top Turnover" },
  { id: 19, symbol: "TOV3", ltp: 47000, volume: 7000, previousClose: 46000, percentagechange: 2.2, logo: require("../assets/logo/portfolio.png"), category: "Top Turnover" },
  // { id: 20, symbol: "TOV4", ltp: 50500, volume: 8800, previousClose: 49500, percentagechange: 2.0, logo: require("../assets/logo/portfolio.png"), category: "Top Turnover" },

  // Top Volume
  { id: 21, symbol: "MERO", ltp: 43563, volume: 5200, previousClose: 42344, percentagechange: 2.1, logo: require("../assets/logo/portfolio.png"), category: "Top Volume" },
  { id: 22, symbol: "VOL1", ltp: 48000, volume: 6000, previousClose: 47000, percentagechange: 2.1, logo: require("../assets/logo/portfolio.png"), category: "Top Volume" },
  { id: 23, symbol: "VOL2", ltp: 49500, volume: 7200, previousClose: 48500, percentagechange: 2.0, logo: require("../assets/logo/portfolio.png"), category: "Top Volume" },
  { id: 24, symbol: "VOL3", ltp: 51000, volume: 5000, previousClose: 50000, percentagechange: 2.0, logo: require("../assets/logo/portfolio.png"), category: "Top Volume" },
  // { id: 25, symbol: "VOL4", ltp: 47000, volume: 6500, previousClose: 46000, percentagechange: 2.2, logo: require("../assets/logo/portfolio.png"), category: "Top Volume" },
];

const StockFilterTabs = [
  // "All",
  "Top Gainer",
  "Top Loser",
  "Balance",
  "Top Turnover",
  "Top Volume",
];
export  {StockListData,StockFilterTabs};

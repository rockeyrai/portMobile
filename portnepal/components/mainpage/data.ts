import { SimulatedData, StockHolding } from "./stockList";

// --- Fake Holdings Data ---
export const fakeHoldings: StockHolding[] = [
  {
    id: "1",
    ticker: "AAPL",
    name: "Apple Inc.",
    units: 10,
    currentPrice: 175.25,
    purchasePrice: 150.0,
  },
  {
    id: "2",
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    units: 5,
    currentPrice: 2800.0,
    purchasePrice: 2500.0,
  },
  {
    id: "3",
    ticker: "TSLA",
    name: "Tesla Inc.",
    units: 8,
    currentPrice: 950.5,
    purchasePrice: 900.0,
  },
  {
    id: "4",
    ticker: "AMZN",
    name: "Amazon.com Inc.",
    units: 3,
    currentPrice: 3400.0,
    purchasePrice: 3200.0,
  },
];

// --- Fake Simulation Data ---
export const fakeSimulatedData: SimulatedData[] = [
  {
    stockName: "Apple Inc.",
    simulatedPriceChange: 5.5,
    simulatedPriceChangePercentage: 3.15,
  },
  {
    stockName: "Alphabet Inc.",
    simulatedPriceChange: -12.0,
    simulatedPriceChangePercentage: -0.43,
  },
  {
    stockName: "Tesla Inc.",
    simulatedPriceChange: 15.0,
    simulatedPriceChangePercentage: 1.57,
  },
  {
    stockName: "Amazon.com Inc.",
    simulatedPriceChange: -20.0,
    simulatedPriceChangePercentage: -0.59,
  },
];

// Utility to generate random walk data
function generateRandomData(points: number, start = 2000, volatility = 500) {
  const data: number[] = [];
  let current = start;
  for (let i = 0; i < points; i++) {
    // Random walk: current value ± small random change
    const change = Math.floor(Math.random() * volatility - volatility / 2);
    current = Math.max(0, current + change); // avoid negative
    data.push(current);
  }
  return data;
}

// Generate multiple datasets
export const chartDataExample = {
  labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`), // 30 labels
  datasets: [
    {
      name: "PV",
      data: generateRandomData(30, 4000, 800),
      color: "#8884d8",
    },
    {
      name: "UV",
      data: generateRandomData(30, 3000, 600),
      color: "#82ca9d",
    },
  ],
};

export const SinglechartDataExample = {
  labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`), // 30 labels
  datasets: [
    {
      name: "PHCL",
      data: generateRandomData(30, 4000, 800),
      color: "#98da98ff",
    },
  ],
};

// Data sets
export const holdings = [
  {
    id: "1",
    ticker: "AAPL",
    name: "Apple",
    units: 10,
    currentPrice: 175,
    purchasePrice: 150,
  },
  {
    id: "2",
    ticker: "TSLA",
    name: "Tesla",
    units: 5,
    currentPrice: 320,
    purchasePrice: 300,
  },
  {
    id: "3",
    ticker: "HCL",
    name: "Himal Clolor",
    units: 10,
    currentPrice: 120,
    purchasePrice: 100,
  },
];

export const Ecomers = [
  {
    id: "1",
    ticker: "AAPL",
    name: "Apple",
    units: 10,
    currentPrice: 175,
    purchasePrice: 150,
    heatdata: [-0.8, -0.3, 0.1, 0.5, 0.9, -0.6],
  },
  {
    id: "2",
    ticker: "TSLA",
    name: "Tesla",
    units: 5,
    currentPrice: 320,
    purchasePrice: 300,
    heatdata: [-0.5, 0.2, 0.6, -0.4, 0.8, 0.3],
  },
  {
    id: "3",
    ticker: "HCL",
    name: "Himal Clolor",
    units: 10,
    currentPrice: 120,
    purchasePrice: 100,
    heatdata: [0.1, 0.4, -0.7, 0.5, -0.2, 0.9],
  },
];

export const MicroFinance = [
  {
    id: "4",
    ticker: "MF1",
    name: "Sunrise Microfinance",
    units: 15,
    currentPrice: 80,
    purchasePrice: 70,
    heatdata: [0.3, -0.5, 0.7, -0.1, 0.8, -0.4],
  },
  {
    id: "5",
    ticker: "MF2",
    name: "Everest Micro",
    units: 12,
    currentPrice: 95,
    purchasePrice: 100,
    heatdata: [-0.2, -0.6, 0.4, 0.9, -0.8, 0.1],
  },
];

export const MutulFund = [
  {
    id: "6",
    ticker: "MFUND1",
    name: "Global Growth Fund",
    units: 20,
    currentPrice: 50,
    purchasePrice: 45,
    heatdata: [0.6, 0.3, -0.4, 0.8, -0.2, 0.5],
  },
  {
    id: "7",
    ticker: "MFUND2",
    name: "Nepal Value Fund",
    units: 18,
    currentPrice: 40,
    purchasePrice: 42,
    heatdata: [-0.3, 0.7, -0.5, 0.2, 0.9, -0.6],
  },
];

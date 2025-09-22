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
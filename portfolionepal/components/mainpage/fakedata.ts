// fakeData.ts

export const fakeNepseIndex = {
  id: 1,
  generatedTime: new Date().toISOString(),
  sindex: "NEPSE",
  sclose: 2145.32,
  high: 2160.75,
  low: 2130.20,
  previousClose: 2138.45,
  schange: 6.87,
  perChange: 0.32,
  fiftyTwoWeekHigh: 2450.00,
  fiftyTwoWeekLow: 1850.00,
  currentValue: 2145.32,
  lastUpdatedDate: new Date().toISOString(),
  open: 2140.00,
};

export const fakeNepseAdvanceData = {
  advance: 65,
  declined: 45,
  unchanged: 12,
};

// helper: generate timestamps
const now = Math.floor(Date.now() / 1000);
export const fakeChartData = Array.from({ length: 50 }, (_, i) => {
  const t = now - (50 - i) * 60; // fake minute interval
  const c = 2100 + Math.sin(i / 5) * 20 + Math.random() * 5; // smooth-ish variation
  return {
    id: i,
    t,
    c: parseFloat(c.toFixed(2)),
    h: parseFloat((c + Math.random() * 3).toFixed(2)),
    l: parseFloat((c - Math.random() * 3).toFixed(2)),
    o: parseFloat((c - Math.random() * 1.5).toFixed(2)),
    v: Math.floor(Math.random() * 5000 + 1000),
  };
});

import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { SinglechartDataExample } from "./data";
import { SmallLineChart } from "./subportfolioChart";

// --- Types ---
export type StockHolding = {
  id: string;
  ticker: string;
  name: string;
  units: number;
  currentPrice: number;
  purchasePrice: number;
};

export type SimulatedData = {
  stockName: string;
  simulatedPriceChange: number;
  simulatedPriceChangePercentage: number;
};

export type HoldingsListProps = {
  holdings: StockHolding[];
  simulatedData: SimulatedData[];
  isLoading: boolean;
};

// --- Helpers ---
const formatCurrency = (value: number) =>
  `Rs. ${value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

// --- Holding Item ---
function HoldingItem({
  holding,
  simulation,
}: {
  holding: StockHolding;
  simulation?: SimulatedData;
}) {
  const holdingValue = holding.units * holding.currentPrice;
  const profitLoss =
    (holding.currentPrice - holding.purchasePrice) / holding.units;
  const isProfit = profitLoss >= 0;

  const dailyChangePercent = simulation?.simulatedPriceChangePercentage ?? 0;
  const isPositiveChange = dailyChangePercent >= 0;

  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        {/* Left side */}
        <View style={styles.row}>
          <View style={styles.tickerCircle}>
            <Text style={styles.tickerText}>{holding.ticker}</Text>
          </View>
          <View>
            <Text style={styles.name}>{holding.name}</Text>
            <Text style={styles.units}>{holding.units} units</Text>
          </View>
        </View>
        <SmallLineChart chartData={SinglechartDataExample} />

        {/* Right side */}
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.value}>{formatCurrency(holdingValue)}</Text>
          <Text style={[styles.profitLoss, isProfit ? styles.green : styles.red]}>
            {isProfit ? "+" : ""}
           {profitLoss} %
          </Text>
        </View>
      </View>

      {/* Daily Change */}
      {/* <View style={styles.changeRow}>
        <View
          style={[
            styles.changeBadge,
            isPositiveChange ? styles.greenBadge : styles.redBadge,
          ]}
        >
          {isPositiveChange ? (
            <ArrowUp size={12} color={isPositiveChange ? "#22c55e" : "#ef4444"} />
          ) : (
            <ArrowDown size={12} color={isPositiveChange ? "#22c55e" : "#ef4444"} />
          )}
          <Text
            style={[
              styles.changeText,
              isPositiveChange ? styles.green : styles.red,
            ]}
          >
            {dailyChangePercent.toFixed(2)}%
          </Text>
        </View>
      </View> */}
    </View>
  );
}

// --- Skeleton Item ---
function HoldingItemSkeleton() {
  return (
    <View style={styles.card}>
      <ActivityIndicator size="small" color="#9ca3af" />
    </View>
  );
}

// --- Holdings List ---
export function HoldingsList({
  holdings,
  simulatedData,
  isLoading,
}: HoldingsListProps) {
  if (isLoading) {
    return (
      <View style={{ gap: 12 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <HoldingItemSkeleton key={i} />
        ))}
      </View>
    );
  }

  return (
    <View style={{ gap: 12 }}>
      {holdings.map((holding) => {
        const simulation = simulatedData.find(
          (s) => s.stockName === holding.name
        );
        return (
          <HoldingItem
            key={holding.id}
            holding={holding}
            simulation={simulation}
          />
        );
      })}
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#28292B",
    borderRadius: 12,
    padding: 8,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tickerCircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#49494D",
    alignItems: "center",
    justifyContent: "center",
  },
  tickerText: {
    fontWeight: "bold",
    fontSize: 11,
    color: "#ffffff",
  },
  name: {
    fontWeight: "600",
    fontSize: 11,
    color: "#ffffff",
    padding:4
  },
  units: {
    fontSize: 11,
    color: "#6b7280",
  },
  value: {
    fontWeight: "bold",
    fontSize: 11,
    color: "#ffffff",
  },
  profitLoss: {
    fontSize: 11,
    fontWeight: "500",
  },
  green: {
    color: "#22c55e",
  },
  red: {
    color: "#ef4444",
  },
  changeRow: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  changeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
  },
  greenBadge: {
    backgroundColor: "rgba(34, 197, 94, 0.2)",
  },
  redBadge: {
    backgroundColor: "rgba(239, 68, 68, 0.2)",
  },
  changeText: {
    fontSize: 11,
    fontWeight: "600",
  },
});

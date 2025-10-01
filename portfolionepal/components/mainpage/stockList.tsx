import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  Pressable,
} from "react-native";
import {
  Ecomers,
  holdings,
  MicroFinance,
  MutulFund,
  SinglechartDataExample,
} from "./data";
import { SmallLineChart } from "./subportfolioChart";
import CustomDropdown from "../ui/CustomDropdown";
import HeatmapRow from "../ui/HeatMap";
import { SwipableHoldingItem } from "../ui/swipCards";

const { width: screenWidth } = Dimensions.get("window");
const SWIPE_THRESHOLD = 100;

// --- Types ---
export type StockHolding = {
  id: string;
  ticker: string;
  name: string;
  units: number;
  currentPrice: number;
  purchasePrice: number;
  heatdata?: number[];
};

export type SimulatedData = {
  stockName: string;
  simulatedPriceChange: number;
  simulatedPriceChangePercentage: number;
};

export type HoldingsListProps = {
  // holdings: StockHolding[];
  simulatedData: SimulatedData[];
  isLoading: boolean;
  onSell?: (holding: StockHolding) => void;
  onBuy?: (holding: StockHolding) => void;
};

// --- Helpers ---
const formatCurrency = (value: number) =>
  `Rs. ${value
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

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
  simulatedData,
  isLoading,
  onSell,
  onBuy,
}: HoldingsListProps) {
  const [selectedOption, setSelectedOption] = useState("Portfolio");
  const [activeSwipeId, setActiveSwipeId] = useState<string | null>(null);
  const options = ["Portfolio", "Ecomers", "Mutul Fund", "Micro Finance"];

  // Get current data based on selected option
  const getCurrentData = () => {
    switch (selectedOption) {
      case "Portfolio":
        return holdings;
      case "Ecomers":
        return Ecomers;
      case "Mutul Fund":
        return MutulFund;
      case "Micro Finance":
        return MicroFinance;
      default:
        return holdings;
    }
  };

  const currentData = getCurrentData();
  const showHeatmap = selectedOption !== "Portfolio";

  const handleSwipeStart = (id: string) => {
    setActiveSwipeId(id);
  };

  const handleSwipeEnd = () => {
    setActiveSwipeId(null);
  };

  const handleSell = (holding: StockHolding) => {
    console.log(`Selling ${holding.name}`);
    onSell?.(holding);
  };

  const handleBuy = (holding: StockHolding) => {
    console.log(`Buying ${holding.name}`);
    onBuy?.(holding);
  };

  return (
    <View style={{ gap: 8 }}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <CustomDropdown
            options={options}
            value={selectedOption}
            onChange={(val) => setSelectedOption(val)}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      {isLoading
        ? Array.from({ length: 4 }).map((_, i) => (
            <HoldingItemSkeleton key={i} />
          ))
        : currentData.map((holding) => {
            const simulation = simulatedData.find(
              (s) => s.stockName === holding.name
            );
            return (
              <SwipableHoldingItem
                key={holding.id}
                holding={holding}
                simulation={simulation}
                onSell={handleSell}
                onBuy={handleBuy}
                isActive={activeSwipeId === holding.id}
                onSwipeStart={handleSwipeStart}
                onSwipeEnd={handleSwipeEnd}
                showHeatmap={showHeatmap}
              />
            );
          })}
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom:5
    // paddingHorizontal: 1,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#ffffff",
  },
  card: {
    // padding: 1,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

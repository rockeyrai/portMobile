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
import { SinglechartDataExample } from "./data";
import { SmallLineChart } from "./subportfolioChart";
import CustomDropdown from "../ui/CustomDropdown";

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
  onSell?: (holding: StockHolding) => void;
  onBuy?: (holding: StockHolding) => void;
};

// --- Helpers ---
const formatCurrency = (value: number) =>
  `Rs. ${value
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

// --- Swipable Holding Item ---
function SwipableHoldingItem({
  holding,
  simulation,
  onSell,
  onBuy,
  isActive,
  onSwipeStart,
  onSwipeEnd,
}: {
  holding: StockHolding;
  simulation?: SimulatedData;
  onSell?: (holding: StockHolding) => void;
  onBuy?: (holding: StockHolding) => void;
  isActive: boolean;
  onSwipeStart: (id: string) => void;
  onSwipeEnd: () => void;
}) {
  const translateX = useRef(new Animated.Value(0)).current;
  const [isGestureActive, setIsGestureActive] = useState(false);

  const holdingValue = holding.units * holding.currentPrice;
  const profitLoss =
    ((holding.currentPrice - holding.purchasePrice) / holding.purchasePrice) *
    100;
  const isProfit = profitLoss >= 0;

  // Reset position when not active
  useEffect(() => {
    if (!isActive && !isGestureActive) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isActive, translateX, isGestureActive]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Only respond to horizontal swipes
      return (
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
        Math.abs(gestureState.dx) > 5
      );
    },
    onPanResponderGrant: (evt, gestureState) => {
      setIsGestureActive(true);
      onSwipeStart(holding.id);
      translateX.setOffset(translateX._value);
      translateX.setValue(0);
    },
    onPanResponderMove: (evt, gestureState) => {
      if (!isActive) return;

      // Limit the swipe range
      const clampedDx = Math.max(
        -SWIPE_THRESHOLD * 1.5,
        Math.min(SWIPE_THRESHOLD * 1.5, gestureState.dx)
      );

      translateX.setValue(clampedDx);
    },
    onPanResponderTerminationRequest: () => false,
    onPanResponderRelease: (evt, gestureState) => {
      if (!isActive) {
        setIsGestureActive(false);
        return;
      }

      const { dx, vx } = gestureState;
      translateX.flattenOffset();

      // Determine action based on swipe distance and velocity
      if (dx > SWIPE_THRESHOLD || (dx > 50 && vx > 0.3)) {
        // Right swipe - Buy
        Animated.timing(translateX, {
          toValue: SWIPE_THRESHOLD,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          onBuy?.(holding);
          setTimeout(() => {
            setIsGestureActive(false);
            onSwipeEnd();
          }, 800);
        });
      } else if (dx < -SWIPE_THRESHOLD || (dx < -50 && vx < -0.3)) {
        // Left swipe - Sell
        Animated.timing(translateX, {
          toValue: -SWIPE_THRESHOLD,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          onSell?.(holding);
          setTimeout(() => {
            setIsGestureActive(false);
            onSwipeEnd();
          }, 800);
        });
      } else {
        // Return to center
        Animated.timing(translateX, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          setIsGestureActive(false);
          onSwipeEnd();
        });
      }
    },
    onPanResponderTerminate: () => {
      setIsGestureActive(false);
      translateX.flattenOffset();
      Animated.timing(translateX, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    },
  });

  const sellOpacity = translateX.interpolate({
    inputRange: [-SWIPE_THRESHOLD, -10, 0],
    outputRange: [1, 0.5, 0],
    extrapolate: "clamp",
  });

  const buyOpacity = translateX.interpolate({
    inputRange: [0, 10, SWIPE_THRESHOLD],
    outputRange: [0, 0.5, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.swipeContainer}>
      {/* Sell Background */}
      <Animated.View
        style={[
          styles.actionBackground,
          styles.sellBackground,
          {
            opacity: sellOpacity,
          },
        ]}
      >
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            {
              backgroundColor: pressed ? "#ffcccc" : "#ff4d4d",
            },
          ]}
          onPress={() => onSell?.(holding)}
        >
          <Text style={styles.actionLabel}>SELL</Text>
        </Pressable>
      </Animated.View>

      {/* Buy Background */}
      <Animated.View
        style={[
          styles.actionBackground,
          styles.buyBackground,
          {
            opacity: buyOpacity,
          },
        ]}
      >
        <Pressable
          onPress={() => onBuy?.(holding)}
          style={({ pressed }) => [
            styles.actionButton,
            {
              backgroundColor: pressed ? "#cce5ff" : "#4da6ff",
            },
          ]}
        >
          <Text style={styles.actionLabel}>BUY</Text>
        </Pressable>
      </Animated.View>

      {/* Card */}
      <Animated.View
        style={[
          styles.cardContainer,
          {
            transform: [{ translateX }],
          },
        ]}
        {...panResponder.panHandlers}
      >
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
              <Text
                style={[
                  styles.profitLoss,
                  isProfit ? styles.green : styles.red,
                ]}
              >
                {isProfit ? "+" : ""}
                {profitLoss.toFixed(2)} %
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
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
  onSell,
  onBuy,
}: HoldingsListProps) {
  const [selectedOption, setSelectedOption] = useState("Portfolio");
  const [activeSwipeId, setActiveSwipeId] = useState<string | null>(null);
  const options = ["Ecomers", "Mutul Fund", "Micro Finance"];

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
    <View style={{ gap: 12 }}>
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
        : holdings.map((holding) => {
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
    paddingHorizontal: 8,
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
  swipeContainer: {
    position: "relative",
    marginVertical: 2,
  },
  actionBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    zIndex: 0,
  },
  sellBackground: {
    backgroundColor: "#CFCFCF", // Light red (soft sell background)
    alignItems: "flex-end",
    paddingRight: 20,
      // zIndex: 2,

  },
  buyBackground: {
    backgroundColor: "#CFCFCF", // Light blue (soft buy background)
    alignItems: "flex-start",
    paddingLeft: 20,
      // zIndex: 2,

  },

  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderColor: "back",
    aspectRatio: 1,
    // backgroundColor:"#28292B",
    borderRadius: 10,
  },
  actionText: {
    fontSize: 24,
    marginBottom: 4,
  },
  actionLabel: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  cardContainer: {
    backgroundColor: "#28292B",
    borderRadius: 12,
    zIndex: 1,
  },
  card: {
    padding: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    flex: 1,
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
    padding: 4,
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

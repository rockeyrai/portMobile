import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import HeatmapRow from "../ui/HeatMap";
import { SmallLineChart } from "../../../../mainpage/subportfolioChart";
import { SinglechartDataExample } from "../../../../mainpage/data";

const SWIPE_THRESHOLD = 80;
const ANIMATION_DURATION = 200;

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

export type SwipableHoldingItemProps = {
  holding: StockHolding;
  simulation?: SimulatedData;
  onSell?: (holding: StockHolding) => void;
  onBuy?: (holding: StockHolding) => void;
  isActive: boolean;
  onSwipeStart: (id: string) => void;
  onSwipeEnd: () => void;
  showHeatmap?: boolean;
};

const formatCurrency = (value: number) =>
  `Rs. ${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

export function SwipableHoldingItem({
  holding,
  simulation,
  onSell,
  onBuy,
  isActive,
  onSwipeStart,
  onSwipeEnd,
  showHeatmap = true,
}: SwipableHoldingItemProps) {
  const translateX = useSharedValue(0);
  const isSwipeActive = useSharedValue(false);

  const holdingValue = holding.units * holding.currentPrice;
  const profitLoss =
    ((holding.currentPrice - holding.purchasePrice) / holding.purchasePrice) *
    100;
  const isProfit = profitLoss >= 0;

  // Reset position when card becomes inactive
  useEffect(() => {
    if (!isActive && translateX.value !== 0) {
      translateX.value = withTiming(0, { duration: ANIMATION_DURATION });
      isSwipeActive.value = false;
    }
  }, [isActive]);

  const handleSwipeStart = () => {
    onSwipeStart(holding.id);
  };

  const handleSwipeEnd = () => {
    onSwipeEnd();
  };

  const handleSell = () => {
    onSell?.(holding);
    // Reset position after action
    setTimeout(() => {
      translateX.value = withTiming(0, { duration: ANIMATION_DURATION });
      isSwipeActive.value = false;
      runOnJS(handleSwipeEnd)();
    }, 800);
  };

  const handleBuy = () => {
    onBuy?.(holding);
    // Reset position after action
    setTimeout(() => {
      translateX.value = withTiming(0, { duration: ANIMATION_DURATION });
      isSwipeActive.value = false;
      runOnJS(handleSwipeEnd)();
    }, 800);
  };

  // Long press gesture to activate swipe
  const longPressGesture = Gesture.LongPress()
    .minDuration(300)
    .onStart(() => {
      runOnJS(handleSwipeStart)();
      isSwipeActive.value = true;
    });

  // Pan gesture for swiping (only active after long press)
  const panGesture = Gesture.Pan()
    .enabled(isSwipeActive.value)
    .onUpdate((event) => {
      if (!isActive) return;

      // Clamp the translation to prevent over-swiping
      const clampedDx = Math.max(
        -SWIPE_THRESHOLD,
        Math.min(SWIPE_THRESHOLD, event.translationX)
      );
      translateX.value = clampedDx;
    })
    .onEnd((event) => {
      if (!isActive) {
        translateX.value = withTiming(0, { duration: ANIMATION_DURATION });
        isSwipeActive.value = false;
        runOnJS(handleSwipeEnd)();
        return;
      }

      const { translationX, velocityX } = event;

      // Determine swipe action based on distance and velocity
      if (
        translationX > SWIPE_THRESHOLD ||
        (translationX > 50 && velocityX > 300)
      ) {
        // Swipe right - BUY
        translateX.value = withTiming(SWIPE_THRESHOLD, {
          duration: ANIMATION_DURATION,
        });
        runOnJS(handleBuy)();
      } else if (
        translationX < -SWIPE_THRESHOLD ||
        (translationX < -50 && velocityX < -300)
      ) {
        // Swipe left - SELL
        translateX.value = withTiming(-SWIPE_THRESHOLD, {
          duration: ANIMATION_DURATION,
        });
        runOnJS(handleSell)();
      } else {
        // Return to center
        translateX.value = withTiming(0, { duration: ANIMATION_DURATION });
        isSwipeActive.value = false;
        runOnJS(handleSwipeEnd)();
      }
    })
    .onFinalize(() => {
      if (translateX.value === 0) {
        isSwipeActive.value = false;
        runOnJS(handleSwipeEnd)();
      }
    });

  // Combine gestures
  const combinedGesture = Gesture.Simultaneous(longPressGesture, panGesture);

  // Animated styles
const cardAnimatedStyle = useAnimatedStyle(() => {
  return {
    transform: [{ translateX: translateX.value }],
    backgroundColor: isSwipeActive.value ? "#3a3b3d" : "#28292B",
  };
});


  const sellButtonAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, -10, 0],
      [1, 0.5, 0],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  const buyButtonAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, 10, SWIPE_THRESHOLD],
      [0, 0.5, 1],
      Extrapolate.CLAMP
    );
    return { opacity };
  });


  console.log(isSwipeActive)
  return (
    <GestureHandlerRootView style={styles.swipeContainer}>
      {/* SELL Button */}
      <Animated.View
        style={[
          styles.actionButton,
          {
            backgroundColor: "#ff4d4d",
            right: 0,
          },
          sellButtonAnimatedStyle,
        ]}
      >
        <Pressable
          onPress={() => handleSell()}
          style={styles.actionButtonPressable}
        >
          <Text style={styles.actionLabel}>SELL</Text>
        </Pressable>
      </Animated.View>

      {/* BUY Button */}
      <Animated.View
        style={[
          styles.actionButton,
          {
            backgroundColor: "#4da6ff",
            left: 0,
          },
          buyButtonAnimatedStyle,
        ]}
      >
        <Pressable
          onPress={() => handleBuy()}
          style={styles.actionButtonPressable}
        >
          <Text style={styles.actionLabel}>BUY</Text>
        </Pressable>
      </Animated.View>

      {/* Card */}
      <GestureDetector gesture={combinedGesture}>
        <Animated.View style={[styles.card, cardAnimatedStyle]}>
          <View
   
          >
            <View style={styles.rowBetween}>
              <View style={styles.row}>
                <View style={styles.tickerCircle}>
                  <Text style={styles.tickerText}>{holding.ticker}</Text>
                </View>
                <View>
                  <Text style={styles.name}>{holding.name}</Text>
                  <Text style={styles.units}>{holding.units} units</Text>
                  {showHeatmap && holding.heatdata && (
                    <HeatmapRow data={holding.heatdata} />
                  )}
                </View>
              </View>
              {/* <SmallLineChart chartData={SinglechartDataExample} /> */}
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
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  swipeContainer: {
    position: "relative",
    // marginVertical: 4,
  },
  cardContainer: {
    backgroundColor: "transparent",
    width: "100%",
  },
  card: {
    // backgroundColor: "#28292B",
    borderRadius: 12,
    padding: 5,
    marginHorizontal: 0,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  tickerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  tickerText: {
    color: "#ffffff",
    fontSize: 8,
    fontWeight: "bold",
  },
  name: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "600",
  },
  units: {
    color: "#9ca3af",
    fontSize: 8,
    marginTop: 2,
  },
  value: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "600",
  },
  profitLoss: {
    fontSize: 8,
    fontWeight: "500",
    marginTop: 2,
  },
  green: {
    color: "#10b981",
  },
  red: {
    color: "#ef4444",
  },
  actionButton: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    zIndex: 1,
  },
  actionButtonPressable: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  actionLabel: {
    color: "#ffffff",
    fontSize: 8,
    fontWeight: "bold",
  },
});

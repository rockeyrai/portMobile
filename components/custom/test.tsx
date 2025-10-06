import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { ChevronDown, Container } from "lucide-react-native";
import { useThemeColors } from "@/context/ThemeContext";
import HeatmapRow from "./HeatMap";

const SWIPE_THRESHOLD = 90;
const ANIMATION_DURATION = 200;

export interface Stock {
  id: string;
  symbol: string;
  value: string;
  units: number;
  change: string;
  logo: any;
  heatmap?: number[];
}

interface StockListProps {
  stockList: Stock[];
}

type RowRef = {
  close: () => void;
};

// 👇 Swipeable row
const SwipeableRow = ({
  isOpen,
  onOpen,
  refCallback,
  stockListData,
}: {
  isOpen: boolean;
  onOpen: (id: string) => void;
  refCallback: (id: string, ref: RowRef) => void;
  stockListData: Stock;
}) => {
  const translateX = useSharedValue(0);
  const mobileTheme = useThemeColors();

  const close = () => {
    translateX.value = withTiming(0, { duration: ANIMATION_DURATION });
  };

  // Register row ref
  React.useEffect(() => {
    refCallback(stockListData.id, { close });
  }, []);

  React.useEffect(() => {
    if (!isOpen) {
      close();
    }
  }, [isOpen]);

  // Pan gesture
  const panGesture = Gesture.Pan()
    .activeOffsetX([-2, 2]) // start only after horizontal movement
    .failOffsetY([-60, 60]) // vertical movement cancels horizontal swipe
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd((e) => {
      if (e.translationX > SWIPE_THRESHOLD) {
        translateX.value = withTiming(SWIPE_THRESHOLD, {
          duration: ANIMATION_DURATION,
        });
        runOnJS(onOpen)(stockListData.id);
      } else if (e.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-SWIPE_THRESHOLD, {
          duration: ANIMATION_DURATION,
        });
        runOnJS(onOpen)(stockListData.id);
      } else {
        translateX.value = withTiming(0, { duration: ANIMATION_DURATION });
      }
    });

  // Tap gesture to close row
  const tapGesture = Gesture.Tap().onEnd(() => {
    translateX.value = withTiming(0, { duration: ANIMATION_DURATION });
  });

  const combinedGesture = Gesture.Race(panGesture, tapGesture);

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    backgroundColor: translateX.value !== 0 ? "#3a3b3d" : "#28292B",
  }));

  const leftBtnStyle = useAnimatedStyle(() => ({
    opacity: translateX.value > SWIPE_THRESHOLD / 2 ? 1 : 0,
  }));
  const rightBtnStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < -SWIPE_THRESHOLD / 2 ? 1 : 0,
  }));

  return (
    <View style={styles.rowContainer}>
      {/* Left action button */}
      <Animated.View
        style={[
          styles.actionBtn,
          styles.leftBtn,
          leftBtnStyle,
          { backgroundColor: mobileTheme.accent },
        ]}
      >
        <Pressable
          onPress={() => console.log("Left pressed", stockListData.symbol)}
        >
          <Text style={[styles.text, { color: mobileTheme.text }]}>LEFT</Text>
        </Pressable>
      </Animated.View>

      {/* Right action button */}
      <Animated.View
        style={[
          styles.actionBtn,
          styles.rightBtn,
          rightBtnStyle,
          { backgroundColor: mobileTheme.negative },
        ]}
      >
        <Pressable
          onPress={() => console.log("Right pressed", stockListData.symbol)}
        >
          <Text style={[styles.text, { color: mobileTheme.text }]}>RIGHT</Text>
        </Pressable>
      </Animated.View>

      {/* Swipeable row */}
      <GestureDetector gesture={combinedGesture}>
        <Animated.View
          style={[
            styles.listItem,
            rowStyle,
            { backgroundColor: mobileTheme.cardBackground },
          ]}
        >
          <View style={styles.itemContainer}>
            {/* Left section: logo + symbol/value */}
            <View style={styles.leftSection}>
              <Image
                source={stockListData.logo}
                style={styles.logo}
                resizeMode="contain"
              />
              <View style={styles.symbolValue}>
                <Text style={[styles.symbol, { color: mobileTheme.text }]}>
                  {stockListData.symbol}
                </Text>
                <Text
                  style={[styles.value, { color: mobileTheme.secondaryText }]}
                >
                  {stockListData.value}
                </Text>
                <HeatmapRow data={stockListData?.heatmap}/>
              </View>
            </View>

            {/* Center section: graph placeholder */}
            <Text style={[styles.graph, { color: mobileTheme.muted }]}>
              Graph
            </Text>

            {/* Right section: units + change */}
            <View style={styles.rightSection}>
              <Text
                style={[styles.units, { color: mobileTheme.secondaryText }]}
              >
                {stockListData.units} units
              </Text>
              <View style={styles.changeContainer}>
                <ChevronDown size={16} color={mobileTheme.negative} />
                <Text
                  style={[styles.changeText, { color: mobileTheme.negative }]}
                >
                  {stockListData.change}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

// 👇 Parent
const TestSwip: React.FC<StockListProps> = ({ stockList }) => {
  const [openRowId, setOpenRowId] = useState<string | null>(null);
  const rowRefs = useRef<Record<string, RowRef>>({});

  const handleOpen = (id: string) => {
    if (openRowId && openRowId !== id) {
      rowRefs.current[openRowId]?.close();
    }
    setOpenRowId(id);
  };

  const registerRowRef = (id: string, ref: RowRef) => {
    rowRefs.current[id] = ref;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={stockList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SwipeableRow
            isOpen={openRowId === item.id}
            onOpen={handleOpen}
            refCallback={registerRowRef}
            stockListData={item} // ✅ pass single row item
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    width: "100%",
    marginBottom: 10,
    justifyContent: "center",
  },
  listItem: {
    height: 70,
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  actionBtn: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  leftBtn: { left: 0 },
  rightBtn: { right: 0 },
  text: { fontWeight: "bold" },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  leftSection: { flexDirection: "row", alignItems: "center", gap: 12 },
  logo: { width: 40, height: 40 },
  symbolValue: { flexDirection: "column" },
  symbol: { fontWeight: "bold", fontSize: 16 },
  value: { fontSize: 14 },
  graph: { fontSize: 14 },
  rightSection: { flexDirection: "column", alignItems: "center" },
  units: { fontSize: 14 },
  changeContainer: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  changeText: { fontSize: 14, marginLeft: 4 },
});

export default TestSwip;

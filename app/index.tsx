import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useCallback, useState } from "react";
import TestSwip from "@/components/custom/test";
import { PortfolioDisplay } from "@/components/custom/portfolioDisplay";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { GraphPage } from "../components/GraphPage";
import { generateRandomGraphData } from "@/data/GraphData";
import { hapticFeedback } from "@/utils/HapticFeedback";
import { useThemeColors } from "@/context/ThemeContext";
import CustomDropdown from "@/components/custom/CustomDropdown";

export default function HomeScreen() {
  const mobileTheme = useThemeColors();

  const stockListData = [
    { id: "1", symbol: "HIT", value: "45 Lakh", units: 4353, change: "9.5%", logo: require("../assets/logo/portfolio.png") },
    { id: "2", symbol: "ABC", value: "23 Lakh", units: 1200, change: "4.2%", logo: require("../assets/logo/portfolio.png") },
  ];

const MutualFund = [
  {
    id: "1",
    symbol: "RHL",
    value: "5 Lakh",
    units: 453,
    change: "9.5%",
    logo: require("../assets/logo/portfolio.png"),
    heatmap: [0.1, 0.4, -0.8, 0.5, 0.2, 0.6, -0.9], // 0–1 range
  },
  {
    id: "2",
    symbol: "JGS",
    value: "3 Lakh",
    units: 10,
    change: "4.2%",
    logo: require("../assets/logo/portfolio.png"),
    heatmap: [0.2, -0.5, 0.7, 0.3, 0.9, -0.4, 0.6], // 0–1 range
  },
];


  const POINT_COUNT = 50;
  const [points, setPoints] = useState(generateRandomGraphData(POINT_COUNT));
  const [selectedOption, setSelectedOption] = useState("Portfolio");
  const [selectedPeriod, setSelectedPeriod] = useState("1d"); // default active button

  const refreshData = useCallback((period: string) => {
    setSelectedPeriod(period);
    setPoints(generateRandomGraphData(POINT_COUNT));
    hapticFeedback("soft");
  }, []);

  const dataList = ["1d", "3d", "1w", "1M"];

  // Determine which data to show in TestSwip based on dropdown selection
  const displayedData = selectedOption === "Mutual Fund" ? MutualFund : stockListData;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: mobileTheme.background }}>
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <PortfolioDisplay
          totalValue={980000}
          totalProfit={-20000}
          todayChange={-5000}
          todayChangePercent={-0.5}
          isLoading={false}
        />

        {/* Buttons for periods */}
        <View style={styles.buttonContainer}>
          {dataList.map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.button,
                { backgroundColor: mobileTheme.tabbutton },
                selectedPeriod === period && { backgroundColor: mobileTheme.tabActive },
              ]}
              onPress={() => refreshData(period)}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: mobileTheme.text },
                  selectedPeriod === period && { color: mobileTheme.text },
                ]}
              >
                {period.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <CustomDropdown
          options={["Portfolio","Micro Finance", "Life Insurance", "Mutual Fund", "Banking SubIndex"]}
          value={selectedOption}
          onChange={setSelectedOption}
          width={150}
        />

        {/* Pass dynamic data to TestSwip */}
        <TestSwip stockList={displayedData} />
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "center",
    gap: 10,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "500",
  },
});

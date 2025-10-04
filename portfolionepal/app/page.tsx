import ProfileHeader from "@/components/mainpage/header";
import { PortfolioDisplay } from "@/components/mainpage/portfolioDisplay";
import { HoldingsList } from "@/components/mainpage/stockList";
import TestSwip from "@/components/ui/test";
import { Text, View } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";


export default function WealthViewContainer() {
  const [selectedRange, setSelectedRange] = useState("1D");
  const fakePortfolioData = {
    totalValue: 25000,
    totalProfit: 3500,
    todayChange: 200,
    todayChangePercent: 0.8,
    isLoading: false,
  };

  const fakeSimulatedData = [
    {
      stockName: "Apple",
      simulatedPriceChange: 2,
      simulatedPriceChangePercentage: 1.2,
    },
    {
      stockName: "Tesla",
      simulatedPriceChange: -3,
      simulatedPriceChangePercentage: -0.9,
    },
  ];

  const isLoading = false;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#1c1c21" }}
      edges={["top", "bottom"]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ProfileHeader />

        <PortfolioDisplay
          totalValue={fakePortfolioData.totalValue}
          totalProfit={fakePortfolioData.totalProfit}
          todayChange={fakePortfolioData.todayChange}
          todayChangePercent={fakePortfolioData.todayChangePercent}
          isLoading={fakePortfolioData.isLoading}
        />
        <View>
          {/* Time range buttons */}
          <View style={styles.buttonRow}>
            {["1D", "1W","1M","6M","1Y","Full"].map((range) => (
              <Pressable
                key={range}
                style={[
                  styles.rangeButton,
                  selectedRange === range && styles.activeButton,
                ]}
                onPress={() => setSelectedRange(range)}
              >
              <Text
                  style={[
                    styles.rangeButtonText,
                    selectedRange === range && styles.activeButtonText,
                  ]}
                >
                  {range}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Chart */}
          {/* <MainLineChart chartData={chartDataSets[selectedRange]} /> */}
        </View>
        <TestSwip/>

        {/* Holdings list */}
        <HoldingsList simulatedData={fakeSimulatedData} isLoading={isLoading} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 90,
    gap: 30,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginVertical: 8,
  },
  rangeButton: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 50,
    backgroundColor: "#333",
  },
  activeButton: {
    backgroundColor: "#8884d8",
  },
  rangeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
  },
  activeButtonText: {
    color: "#1c1c21",
  },
});

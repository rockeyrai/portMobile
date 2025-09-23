import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { PortfolioDisplay } from "@/components/mainpage/portfolioDisplay";
import { HoldingsList } from "@/components/mainpage/stockList";
import BottomNav from "@/components/mainpage/buttomNav";
import ProfileHeader from "@/components/mainpage/header";
import { chartDataExample } from "@/components/mainpage/data";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainLineChart } from "@/components/mainpage/portfolioChart";

export default function WealthViewContainer() {
  // Fake data example
  const fakePortfolioData = {
    totalValue: 25000,
    totalProfit: 3500,
    todayChange: 200,
    todayChangePercent: 0.8,
    isLoading: false,
  };

  const fakeHoldings = [
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
  ];

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
        <View className="flex-1 items-center justify-center bg-[#1c1c21]">
          <Text className="text-3xl font-bold text-white">Test</Text>
        </View>
        <PortfolioDisplay
          totalValue={fakePortfolioData.totalValue}
          totalProfit={fakePortfolioData.totalProfit}
          todayChange={fakePortfolioData.todayChange}
          todayChangePercent={fakePortfolioData.todayChangePercent}
          isLoading={fakePortfolioData.isLoading}
        />
        <MainLineChart chartData={chartDataExample} />
        <HoldingsList
          holdings={fakeHoldings}
          simulatedData={fakeSimulatedData}
          isLoading={isLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c21",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 90,
    gap: 24,
  },
});

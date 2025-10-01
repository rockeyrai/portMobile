// import React, { useState } from "react";
// import { View, ScrollView, StyleSheet, Text, Pressable } from "react-native";
// import { PortfolioDisplay } from "@/components/mainpage/portfolioDisplay";
// import { HoldingsList } from "@/components/mainpage/stockList";
// import ProfileHeader from "@/components/mainpage/header";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { MainLineChart } from "@/components/mainpage/portfolioChart";
// import TestSwip from "@/components/ui/test";

import { fakeChartData, fakeNepseAdvanceData, fakeNepseIndex } from "@/components/mainpage/fakedata";
import NepseGraph from "@/components/mainpage/newChart";

// // Utility to generate random chart data
// const generateRandomData = (points: number, base: number, variance: number) => {
//   return Array.from({ length: points }, () =>
//     Math.round(base + (Math.random() - 0.5) * variance)
//   );
// };

// // Example datasets for different time ranges
// const chartDataSets: Record<string, { labels: string[]; datasets: any[] }> = {
//   "1D": {
//     labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
//     datasets: [
//       { name: "PV", data: generateRandomData(24, 4000, 800), color: "#8884d8" },
//       { name: "UV", data: generateRandomData(24, 3000, 600), color: "#82ca9d" },
//     ],
//   },
//   "1M": {
//     labels: Array.from({ length: 3 }, (_, i) => `Day ${i + 1}`),
//     datasets: [
//       { name: "PV", data: generateRandomData(3, 4000, 800), color: "#8884d8" },
//       { name: "UV", data: generateRandomData(3, 3000, 600), color: "#82ca9d" },
//     ],
//   },
//   "1W": {
//     labels: Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`),
//     datasets: [
//       { name: "PV", data: generateRandomData(7, 4000, 800), color: "#8884d8" },
//       { name: "UV", data: generateRandomData(7, 3000, 600), color: "#82ca9d" },
//     ],
//   },
//   "6M": {
//     labels: Array.from({ length: 21 }, (_, i) => `Day ${i + 1}`),
//     datasets: [
//       { name: "PV", data: generateRandomData(21, 4000, 800), color: "#8884d8" },
//       { name: "UV", data: generateRandomData(21, 3000, 600), color: "#82ca9d" },
//     ],
//   },
// };

// export default function WealthViewContainer() {
//   const [selectedRange, setSelectedRange] = useState("1D");
//   const fakePortfolioData = {
//     totalValue: 25000,
//     totalProfit: 3500,
//     todayChange: 200,
//     todayChangePercent: 0.8,
//     isLoading: false,
//   };

//   const fakeSimulatedData = [
//     {
//       stockName: "Apple",
//       simulatedPriceChange: 2,
//       simulatedPriceChangePercentage: 1.2,
//     },
//     {
//       stockName: "Tesla",
//       simulatedPriceChange: -3,
//       simulatedPriceChangePercentage: -0.9,
//     },
//   ];

//   const isLoading = false;

//   return (
//     <SafeAreaView
//       style={{ flex: 1, backgroundColor: "#1c1c21" }}
//       edges={["top", "bottom"]}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <ProfileHeader />

//         <PortfolioDisplay
//           totalValue={fakePortfolioData.totalValue}
//           totalProfit={fakePortfolioData.totalProfit}
//           todayChange={fakePortfolioData.todayChange}
//           todayChangePercent={fakePortfolioData.todayChangePercent}
//           isLoading={fakePortfolioData.isLoading}
//         />
//         <View>
//           {/* Time range buttons */}
//           <View style={styles.buttonRow}>
//             {["1D", "1W","1M","6M","1Y","Full"].map((range) => (
//               <Pressable
//                 key={range}
//                 style={[
//                   styles.rangeButton,
//                   selectedRange === range && styles.activeButton,
//                 ]}
//                 onPress={() => setSelectedRange(range)}
//               >
//                 <Text
//                   style={[
//                     styles.rangeButtonText,
//                     selectedRange === range && styles.activeButtonText,
//                   ]}
//                 >
//                   {range}
//                 </Text>
//               </Pressable>
//             ))}
//           </View>

//           {/* Chart */}
//           <MainLineChart chartData={chartDataSets[selectedRange]} />
//         </View>
//         <TestSwip/>

//         {/* Holdings list */}
//         <HoldingsList simulatedData={fakeSimulatedData} isLoading={isLoading} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   scrollContent: {
//     padding: 16,
//     paddingBottom: 90,
//     gap: 30,
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "center",
//     gap: 8,
//     marginVertical: 8,
//   },
//   rangeButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 8,
//     borderRadius: 50,
//     backgroundColor: "#333",
//   },
//   activeButton: {
//     backgroundColor: "#8884d8",
//   },
//   rangeButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 10,
//   },
//   activeButtonText: {
//     color: "#1c1c21",
//   },
// });




const FakeGraphScreen = () => {
  const fakeApi = {
    get: async (url: string) => {
      return {
        data: { data: fakeChartData },
      };
    },
  };

  const fakeGetUnixTimeInterval = (interval: string) => {
    // just return a fake timestamp range
    return `${Math.floor(Date.now() / 1000) - 86400}`;
  };

  return (
    <NepseGraph
      nepseIndex={fakeNepseIndex}
      nepseAdvanceData={fakeNepseAdvanceData}
      api={fakeApi}
      getUnixTimeInterval={fakeGetUnixTimeInterval}
    />
  );
};

export default FakeGraphScreen;

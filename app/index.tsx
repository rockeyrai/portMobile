import { StyleSheet, Text, View } from "react-native";
import CustomDropdown from "@/components/custom/CustomDropdown";
import { useState } from "react";
import TestSwip from "@/components/custom/test";
import StockList from "@/components/StockList";
import { PortfolioDisplay } from "@/components/custom/portfolioDisplay";

export default function HomeScreen() {
  const [selected, setSelected] = useState<string | undefined>();

  const dropdownOptions = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
  ];

  const stockListData = [
    {
      id: "1",
      symbol: "HIT",
      value: "45 Lakh",
      units: 4353,
      change: "9.5%",
      logo: require("../assets/logo/portfolio.png"),
    },
    {
      id: "2",
      symbol: "ABC",
      value: "23 Lakh",
      units: 1200,
      change: "4.2%",
      logo: require("../assets/logo/portfolio.png"),
    },
  ];
  return (
    <View>
      {/* <CustomDropdown
        options={dropdownOptions}
        value={selected}
        onChange={setSelected}
        width={100}
      />{" "} */}
      <PortfolioDisplay
        totalValue={980000}
        totalProfit={-20000}
        todayChange={-5000}
        todayChangePercent={-0.5}
        isLoading={false}
      />      {/* <Text className="text-2xl text-white">tailwind test</Text> */}
      <StockList stockList={stockListData} />
      <TestSwip />
    </View>
  );
}

const styles = StyleSheet.create({

});

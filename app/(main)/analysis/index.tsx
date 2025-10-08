import DonutChart from "@/components/custom/DonutChart";
import FilterTab from "@/components/Filtertab";
import ToolSection from "@/components/ToolSection";
import { useThemeColors } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";

const Analysis = () => {
    const theme = useThemeColors(); 
  
  return (
    <View style={[{backgroundColor: theme.background,}]}>
      {/* <DonutChart
        data={[
          { value: 40, color: "#ff7675" },
          { value: 30, color: "#74b9ff" },
          { value: 30, color: "#55efc4" },
        ]}
        size={200}
        thickness={28}
        spacing={2}
        onPressSegment={(i) => console.log("pressed", i)}
      />{" "} */}
      <ToolSection />
      <FilterTab />
    </View>
  );
};

export default Analysis;

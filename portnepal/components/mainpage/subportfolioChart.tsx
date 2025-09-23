import React from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface Dataset {
  name: string;
  data: number[];
  color?: string;
}

interface ChartData {
  labels?: string[];
  datasets: Dataset[];
}

// ------------------- Small Chart -------------------
interface SmallLineChartProps {
  chartData: ChartData;
}

export const SmallLineChart: React.FC<SmallLineChartProps> = ({ chartData }) => {
  const width = 100;
  const height = 60;

  const formattedData = {
    labels: chartData.labels || chartData.datasets[0].data.map(() => ""),
    datasets: chartData.datasets.map((dataset) => ({
      data: dataset.data,
      color: () => dataset.color || "#000", // line color
      strokeWidth: 2,
      withDots: false,
    })),
  };

  return (
    <LineChart
      data={formattedData}
      width={width}
      height={height}
      withDots={false}
      withInnerLines={false}
      withOuterLines={false}
      withVerticalLabels={false}
      withHorizontalLabels={false}
      bezier
      withShadow={true} // enables area fill
      chartConfig={{
        backgroundColor: "transparent",
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        fillShadowGradient: "#22c55e", // green near line
        fillShadowGradientOpacity: 0.5, // opacity at top of the gradient
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(0,0,0,${opacity})`, // line color
        strokeWidth: 2,
      }}
      style={{
        paddingRight: 0,
        paddingLeft: 0,
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: "transparent",
      }}
    />
  );
};


// ------------------- Styles -------------------
const styles = StyleSheet.create({
  separatorLine: {
    height: 1,
    backgroundColor: "#6b7280",
    marginHorizontal: 1,
    borderRadius: 1,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
    flexWrap: "wrap",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 6,
    marginVertical: 2,
  },
  legendColorBox: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    fontWeight: "500",
  },
});

import React from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

// Define types for the datasets and chart data
interface Dataset {
  name: string;
  data: number[];
  color?: string;
}

interface ChartData {
  labels?: string[];
  datasets: Dataset[];
}

interface DynamicLineChartProps {
  chartData: ChartData;
  height?: number;
}

export default function DynamicLineChart({ chartData, height = 200 }: DynamicLineChartProps) {
  const screenWidth = Dimensions.get("window").width;

  const formattedData = {
    labels: chartData.labels || chartData.datasets[0].data.map(() => ""),
    datasets: chartData.datasets.map((dataset) => ({
      data: dataset.data,
      color: () => dataset.color || "#000", // fallback to black
      strokeWidth: 3,
      withDots: false,
    })),
    legend: chartData.datasets.map((dataset) => dataset.name),
  };

  return (
    <LineChart
      data={formattedData}
      width={screenWidth - 22}
      height={height}
      withDots={false}
      withShadow={false}
      withInnerLines={false}
      withOuterLines={false}
      withVerticalLabels={false}
      withHorizontalLabels={false}
      bezier
      chartConfig={{
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
        strokeWidth: 4,
      }}
      style={{
        paddingRight: 20,
        paddingLeft: 0,
        marginLeft: 0,
        marginRight: 20,
      }}
    />
  );
}

// import React, { useState, useRef, useCallback, useMemo } from "react";
// import { Dimensions, View, Text, StyleSheet, PanResponder, Animated } from "react-native";
// import { LineChart } from "react-native-chart-kit";

// interface Dataset {
//   name: string;
//   data: number[];
//   color?: string;
// }

// interface ChartData {
//   labels?: string[];
//   datasets: Dataset[];
// }

// interface MainLineChartProps {
//   chartData: ChartData;
// }

// interface DataPoint {
//   x: number;
//   y: number;
//   value: number;
//   label: string;
//   datasetIndex: number;
//   index: number;
// }

// interface MultiDataPoint {
//   x: number;
//   datasets: Array<{
//     y: number;
//     value: number;
//     color: string;
//     name: string;
//   }>;
//   label: string;
//   index: number;
// }

// export const MainLineChart: React.FC<MainLineChartProps> = ({ chartData }) => {
//   const screenWidth = Dimensions.get("window").width;
//   const width = screenWidth - 22;
//   const height = 180;
//   const chartPadding = 16;

//   // Use refs to avoid re-renders during drag - simplified
//   const dotOpacity = useRef(new Animated.Value(0)).current;
//   const lineOpacity = useRef(new Animated.Value(0)).current;

//   // State for tooltip content (minimal re-renders)
//   const [tooltipData, setTooltipData] = useState<MultiDataPoint | null>(null);
//   const [isInteracting, setIsInteracting] = useState(false);

//   // Memoize formatted data
//   const formattedData = useMemo(() => ({
//     labels: chartData.labels || chartData.datasets[0].data.map((_, i) => `${i}`),
//     datasets: chartData.datasets.map((dataset) => ({
//       data: dataset.data,
//       color: () => dataset.color || "#000",
//       strokeWidth: 3,
//     })),
//   }), [chartData]);

//   // Memoize calculation variables
//   const chartCalculations = useMemo(() => {
//     const allValues = chartData.datasets.flatMap(d => d.data);
//     const minValue = Math.min(...allValues);
//     const maxValue = Math.max(...allValues);
//     const valueRange = maxValue - minValue || 1;
//     const chartWidth = width - (chartPadding * 2);
//     const dataPoints = chartData.datasets[0].data.length;
//     const stepWidth = chartWidth / Math.max(dataPoints - 1, 1);
    
//     return { minValue, maxValue, valueRange, chartWidth, dataPoints, stepWidth };
//   }, [chartData, width]);

//   // Get data for all datasets at a specific touch point
//   const getMultiDataPointFromTouch = useCallback((touchX: number): MultiDataPoint => {
//     const { stepWidth, minValue, valueRange, dataPoints } = chartCalculations;
    
//     const index = Math.round((touchX - chartPadding) / stepWidth);
//     const clampedIndex = Math.max(0, Math.min(index, dataPoints - 1));
    
//     const dotXPos = chartPadding + (clampedIndex * stepWidth);
//     const label = formattedData.labels[clampedIndex];
    
//     const datasets = chartData.datasets.map((dataset, datasetIndex) => {
//       const value = dataset.data[clampedIndex];
//       const normalizedValue = (value - minValue) / valueRange;
//       const dotYPos = height - (normalizedValue * (height - 60)) - 30;
      
//       return {
//         y: dotYPos,
//         value,
//         color: dataset.color || "#000",
//         name: dataset.name
//       };
//     });
    
//     return {
//       x: dotXPos,
//       datasets,
//       label,
//       index: clampedIndex
//     };
//   }, [chartCalculations, chartData, formattedData, height]);

//   // Optimized animation updates - simplified approach
//   const updatePositions = useCallback((multiDataPoint: MultiDataPoint) => {
//     // Only update tooltip data if it actually changed
//     setTooltipData(prev => {
//       if (!prev || prev.index !== multiDataPoint.index) {
//         return multiDataPoint;
//       }
//       return prev;
//     });
//   }, []);

//   // Show animations
//   const showIndicators = useCallback(() => {
//     if (isInteracting) return; // Prevent multiple simultaneous animations
    
//     setIsInteracting(true);
    
//     Animated.parallel([
//       Animated.timing(dotOpacity, {
//         toValue: 1,
//         duration: 100, // Faster animation
//         useNativeDriver: true,
//       }),
//       Animated.timing(lineOpacity, {
//         toValue: 1,
//         duration: 100,
//         useNativeDriver: true,
//       })
//     ]).start();
//   }, [dotOpacity, lineOpacity, isInteracting]);

//   // Hide animations
//   const hideIndicators = useCallback(() => {
//     setIsInteracting(false);
    
//     Animated.parallel([
//       Animated.timing(dotOpacity, {
//         toValue: 0,
//         duration: 150,
//         useNativeDriver: true,
//       }),
//       Animated.timing(lineOpacity, {
//         toValue: 0,
//         duration: 150,
//         useNativeDriver: true,
//       })
//     ]).start();
//   }, [dotOpacity, lineOpacity]);

//   // Fixed PanResponder with proper coordinate handling
//   const panResponder = useMemo(() => PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onMoveShouldSetPanResponder: () => true,
    
//     onPanResponderGrant: (event) => {
//       // Use pageX and subtract the chart's left offset to get accurate position
//       const { pageX } = event.nativeEvent;
//       const chartLeftOffset = 11; // Half of screenWidth - 22 margin
//       const touchX = pageX - chartLeftOffset;
//       const multiDataPoint = getMultiDataPointFromTouch(touchX);
//       updatePositions(multiDataPoint);
//       showIndicators();
//     },
    
//     onPanResponderMove: (event) => {
//       // Use pageX for consistent positioning
//       const { pageX } = event.nativeEvent;
//       const chartLeftOffset = 11; // Half of screenWidth - 22 margin  
//       const touchX = pageX - chartLeftOffset;
//       const multiDataPoint = getMultiDataPointFromTouch(touchX);
//       updatePositions(multiDataPoint);
//     },
    
//     onPanResponderRelease: hideIndicators,
//     onPanResponderTerminate: hideIndicators,
//   }), [getMultiDataPointFromTouch, updatePositions, showIndicators, hideIndicators]);

//   return (
//     <View>
//       <View style={{ position: 'relative' }}>
//         <LineChart
//           data={formattedData}
//           width={width}
//           height={height}
//           withDots={false}
//           withInnerLines={false}
//           withOuterLines={false}
//           withShadow={false}
//           withVerticalLabels={false}
//           withHorizontalLabels={false}
//           bezier
//           chartConfig={{
//             backgroundColor: "transparent",
//             backgroundGradientFrom: "#ffffff",
//             backgroundGradientTo: "#ffffff",
//             fillShadowGradient: "transparent",
//             fillShadowGradientOpacity: 0,
//             backgroundGradientFromOpacity: 0,
//             backgroundGradientToOpacity: 0,
//             color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
//             strokeWidth: 2,
//           }}
//           style={{
//             paddingRight: 0,
//             paddingLeft: 0,
//             marginLeft: 0,
//             marginRight: 0,
//             backgroundColor: "transparent",
//           }}
//         />

//         {/* Touch overlay */}
//         <View
//           {...panResponder.panHandlers}
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: width,
//             height: height,
//             backgroundColor: 'transparent',
//           }}
//         />

//         {/* Vertical line indicator */}
//         <Animated.View
//           style={{
//             position: 'absolute',
//             left: tooltipData ? tooltipData.x - 0.5 : 0,
//             top: 0,
//             width: 1,
//             height: height,
//             backgroundColor: 'rgba(0,0,0,0.3)',
//             opacity: lineOpacity,
//           }}
//         />
        
//         {/* Animated dots for multiple datasets */}
//         {tooltipData?.datasets.map((datasetPoint, index) => (
//           <Animated.View
//             key={`dot-${index}`}
//             style={{
//               position: 'absolute',
//               left: tooltipData.x - 6,
//               top: datasetPoint.y - 6,
//               width: 12,
//               height: 12,
//               borderRadius: 6,
//               backgroundColor: datasetPoint.color,
//               borderWidth: 3,
//               borderColor: '#fff',
//               shadowColor: "#000",
//               shadowOffset: { width: 0, height: 2 },
//               shadowOpacity: 0.25,
//               shadowRadius: 4,
//               elevation: 5,
//               opacity: dotOpacity,
//             }}
//           />
//         ))}
        
//         {/* Animated tooltip */}
//         <Animated.View
//           style={{
//             position: 'absolute',
//             left: tooltipData ? Math.max(10, Math.min(tooltipData.x - 60, width - 130)) : 0,
//             top: tooltipData ? Math.max(10, tooltipData.datasets.reduce((sum, d) => sum + d.y, 0) / tooltipData.datasets.length - 80) : 0,
//             backgroundColor: 'rgba(0,0,0,0.9)',
//             paddingHorizontal: 12,
//             paddingVertical: 8,
//             borderRadius: 8,
//             shadowColor: "#000",
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.25,
//             shadowRadius: 4,
//             elevation: 5,
//             minWidth: 120,
//             maxWidth: 200,
//             opacity: dotOpacity,
//           }}
//           pointerEvents="none"
//         >
//           {tooltipData?.label && (
//             <Text style={styles.tooltipLabel}>
//               {tooltipData.label}
//             </Text>
//           )}
          
//           {tooltipData?.datasets.map((datasetPoint, index) => (
//             <View key={`tooltip-${index}`} style={styles.tooltipRow}>
//               <View
//                 style={[
//                   styles.tooltipColorDot,
//                   { backgroundColor: datasetPoint.color }
//                 ]}
//               />
//               <Text style={styles.tooltipDatasetName}>
//                 {datasetPoint.name}:
//               </Text>
//               <Text style={styles.tooltipValue}>
//                 {datasetPoint.value.toFixed(2)}
//               </Text>
//             </View>
//           ))}
          
//           {/* Tooltip arrow */}
//           <View style={styles.tooltipArrow} />
//         </Animated.View>
//       </View>

//       {/* separator line */}
//       <View style={styles.separatorLine} />

//       {/* Custom Legend */}
//       <View style={styles.legendContainer}>
//         {chartData.datasets.map((dataset, index) => (
//           <View key={`${dataset.name}-${index}`} style={styles.legendItem}>
//             <View
//               style={[
//                 styles.legendColorBox,
//                 { backgroundColor: dataset.color || "#000" },
//               ]}
//             />
//             <Text
//               style={[styles.legendText, { color: dataset.color || "#000" }]}
//             >
//               {dataset.name}
//             </Text>
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// };

// // ------------------- Styles -------------------
// const styles = StyleSheet.create({
//   separatorLine: {
//     height: 1,
//     backgroundColor: "#6b7280",
//     marginHorizontal: 1,
//     borderRadius: 1,
//   },
//   legendContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 8,
//     flexWrap: "wrap",
//   },
//   legendItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginHorizontal: 6,
//     marginVertical: 2,
//   },
//   legendColorBox: {
//     width: 12,
//     height: 12,
//     borderRadius: 2,
//     marginRight: 4,
//   },
//   legendText: {
//     fontSize: 12,
//     fontWeight: "500",
//   },
//   tooltipLabel: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 4,
//   },
//   tooltipRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 1,
//   },
//   tooltipColorDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     marginRight: 1,
//   },
//   tooltipDatasetName: {
//     color: '#fff',
//     fontSize: 11,
//     opacity: 0.9,
//     marginRight: 0,
//     minWidth: 10,
//   },
//   tooltipValue: {
//     color: '#fff',
//     fontSize: 11,
//     fontWeight: 'bold',
//     flex: 1,
//     textAlign: 'right',
//   },
//   tooltipArrow: {
//     position: 'absolute',
//     bottom: -6,
//     left: '50%',
//     marginLeft: -6,
//     width: 0,
//     height: 0,
//     borderLeftWidth: 6,
//     borderRightWidth: 6,
//     borderTopWidth: 6,
//     borderLeftColor: 'transparent',
//     borderRightColor: 'transparent',
//     borderTopColor: 'rgba(0,0,0,0.9)',
//   },
// });
import React, { useState, useRef, useMemo, useCallback } from "react";
import { View, Text, StyleSheet, Dimensions, Animated, PanResponder } from "react-native";
import { LineChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Circle, G, Line } from "react-native-svg";

// Types
interface Dataset {
  name: string;
  data: number[];
  color?: string;
}
interface ChartData {
  labels?: string[];
  datasets: Dataset[];
}
interface MultiDataPoint {
  x: number;
  datasets: Array<{ y: number; value: number; color: string; name: string }>;
  label: string;
  index: number;
}

export const MainLineChart: React.FC<{ chartData: ChartData }> = ({ chartData }) => {
  const screenWidth = Dimensions.get("window").width;
  const width = screenWidth - 22;
  const height = 200;

  const [tooltipData, setTooltipData] = useState<MultiDataPoint | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  // Animated values for indicator visibility
  const dotOpacity = useRef(new Animated.Value(0)).current;
  const lineOpacity = useRef(new Animated.Value(0)).current;

  // Animated value for line drawing
  const strokeDashoffset = useRef(new Animated.Value(1000)).current;

  React.useEffect(() => {
    // animate line draw on mount
    Animated.timing(strokeDashoffset, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // Calculate chart scale
  const allValues = chartData.datasets.flatMap((d) => d.data);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const valueRange = maxValue - minValue || 1;

  const stepWidth = (width - 32) / (chartData.datasets[0].data.length - 1);

  const getMultiDataPointFromTouch = useCallback(
    (touchX: number): MultiDataPoint => {
      const index = Math.round((touchX - 16) / stepWidth);
      const clampedIndex = Math.max(0, Math.min(index, chartData.datasets[0].data.length - 1));
      const dotXPos = 16 + clampedIndex * stepWidth;

      const datasets = chartData.datasets.map((dataset) => {
        const value = dataset.data[clampedIndex];
        const normalized = (value - minValue) / valueRange;
        const y = height - normalized * (height - 40) - 20;
        return { y, value, color: dataset.color || "#000", name: dataset.name };
      });

      return { x: dotXPos, datasets, label: chartData.labels?.[clampedIndex] ?? `${clampedIndex}`, index: clampedIndex };
    },
    [chartData, stepWidth, height, minValue, valueRange]
  );

  const updatePositions = useCallback((multiDataPoint: MultiDataPoint) => {
    setTooltipData((prev) => {
      if (!prev || prev.index !== multiDataPoint.index) return multiDataPoint;
      return prev;
    });
  }, []);

  const showIndicators = useCallback(() => {
    if (isInteracting) return;
    setIsInteracting(true);
    Animated.parallel([
      Animated.timing(dotOpacity, { toValue: 1, duration: 120, useNativeDriver: true }),
      Animated.timing(lineOpacity, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
  }, [isInteracting]);

  const hideIndicators = useCallback(() => {
    setIsInteracting(false);
    Animated.parallel([
      Animated.timing(dotOpacity, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(lineOpacity, { toValue: 0, duration: 150, useNativeDriver: true }),
    ]).start();
  }, []);

  // Pan responder overlay
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt) => {
          const { pageX } = evt.nativeEvent;
          const touchX = pageX - 11;
          updatePositions(getMultiDataPointFromTouch(touchX));
          showIndicators();
        },
        onPanResponderMove: (evt) => {
          const { pageX } = evt.nativeEvent;
          const touchX = pageX - 11;
          updatePositions(getMultiDataPointFromTouch(touchX));
        },
        onPanResponderRelease: hideIndicators,
        onPanResponderTerminate: hideIndicators,
      }),
    [getMultiDataPointFromTouch, updatePositions, showIndicators, hideIndicators]
  );

  return (
    <View>
      <View style={{ position: "relative" }}>
        <LineChart
          style={{ height, width }}
          data={chartData.datasets.map((d) => d.data)}
          svg={{ stroke: "transparent" }} // hide default
          contentInset={{ top: 20, bottom: 20 }}
          curve={shape.curveMonotoneX}
        >
          {/* Draw animated lines for each dataset */}
          {chartData.datasets.map((dataset, idx) => (
            <LineChart
              key={idx}
              style={StyleSheet.absoluteFill}
              data={dataset.data}
              svg={{
                stroke: dataset.color || "#000",
                strokeWidth: 2,
                strokeDasharray: [1000],
                strokeDashoffset: strokeDashoffset,
              }}
              contentInset={{ top: 20, bottom: 20 }}
              curve={shape.curveMonotoneX}
            />
          ))}
          <Grid />
        </LineChart>

        {/* Touch overlay */}
        <View
          {...panResponder.panHandlers}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width,
            height,
            backgroundColor: "transparent",
          }}
        />

        {/* Vertical line */}
        <Animated.View
          style={{
            position: "absolute",
            left: tooltipData ? tooltipData.x : 0,
            top: 0,
            width: 1,
            height,
            backgroundColor: "rgba(0,0,0,0.3)",
            opacity: lineOpacity,
          }}
        />

        {/* Dots */}
        {tooltipData?.datasets.map((d, i) => (
          <Animated.View
            key={i}
            style={{
              position: "absolute",
              left: tooltipData.x - 6,
              top: d.y - 6,
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: d.color,
              borderWidth: 2,
              borderColor: "#fff",
              opacity: dotOpacity,
            }}
          />
        ))}

        {/* Tooltip */}
        {tooltipData && (
          <Animated.View
            style={{
              position: "absolute",
              left: Math.max(10, Math.min(tooltipData.x - 60, width - 130)),
              top: Math.max(10, tooltipData.datasets.reduce((s, d) => s + d.y, 0) / tooltipData.datasets.length - 80),
              backgroundColor: "rgba(0,0,0,0.9)",
              padding: 8,
              borderRadius: 6,
              minWidth: 120,
              opacity: dotOpacity,
            }}
          >
            <Text style={styles.tooltipLabel}>{tooltipData.label}</Text>
            {tooltipData.datasets.map((d, i) => (
              <View key={i} style={styles.tooltipRow}>
                <View style={[styles.tooltipDot, { backgroundColor: d.color }]} />
                <Text style={styles.tooltipName}>{d.name}:</Text>
                <Text style={styles.tooltipValue}>{d.value.toFixed(2)}</Text>
              </View>
            ))}
          </Animated.View>
        )}
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        {chartData.datasets.map((d, i) => (
          <View key={i} style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: d.color || "#000" }]} />
            <Text style={[styles.legendText, { color: d.color || "#000" }]}>{d.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// ---------------- Styles ----------------
const styles = StyleSheet.create({
  tooltipLabel: { color: "#fff", fontSize: 12, fontWeight: "bold", marginBottom: 4 },
  tooltipRow: { flexDirection: "row", alignItems: "center", marginVertical: 1 },
  tooltipDot: { width: 8, height: 8, borderRadius: 4, marginRight: 4 },
  tooltipName: { color: "#fff", fontSize: 11, marginRight: 4 },
  tooltipValue: { color: "#fff", fontSize: 11, fontWeight: "bold", flex: 1, textAlign: "right" },
  legend: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", marginTop: 8 },
  legendItem: { flexDirection: "row", alignItems: "center", marginHorizontal: 6 },
  legendBox: { width: 12, height: 12, marginRight: 4 },
  legendText: { fontSize: 12, fontWeight: "500" },
});

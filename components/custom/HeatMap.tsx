import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

// Props type
interface HeatmapRowProps {
  data?: number[];
}

const getColor = (value: number) => {
  if (value >= 0) {
    // Positive → Green scale
    const green = Math.round(255 * Math.min(1, value));
    return `rgb(0, ${green}, 0)`;
  } else {
    // Negative → Red scale
    const red = Math.round(255 * Math.min(1, Math.abs(value)));
    return `rgb(${red}, 0, 0)`;
  }
};

const HeatmapRow: React.FC<HeatmapRowProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={[styles.cell, { backgroundColor: getColor(item) }]} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexDirection: "row",
  },
  cell: {
    width: 10,
    height: 10,
    // margin: 1,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 0,
  },
});

export default HeatmapRow;

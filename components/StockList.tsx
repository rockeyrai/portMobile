import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { ChevronDown } from "lucide-react-native";

export interface Stock {
  id: string;
  symbol: string;
  value: string;
  units: number;
  change: string;
  logo: any; // require() or URI
}

interface StockListProps {
  stockList: Stock[];
}

const StockList: React.FC<StockListProps> = ({ stockList }) => {
  const renderItem = ({ item }: { item: Stock }) => (
    <View style={styles.itemContainer}>
      {/* Left section: logo + symbol/value */}
      <View style={styles.leftSection}>
        <Image source={item.logo} style={styles.logo} resizeMode="contain" />
        <View style={styles.symbolValue}>
          <Text style={styles.symbol}>{item.symbol}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      </View>

      {/* Center section: graph placeholder */}
      <Text style={styles.graph}>Graph</Text>

      {/* Right section: units + change */}
      <View style={styles.rightSection}>
        <Text style={styles.units}>{item.units} units</Text>
        <View style={styles.changeContainer}>
          <ChevronDown size={16} color="red" />
          <Text style={styles.changeText}>{item.change}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={stockList}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    width: 40,
    height: 40,
  },
  symbolValue: {
    flexDirection: "column",
  },
  symbol: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  value: {
    fontSize: 14,
    color: "#555",
  },
  graph: {
    fontSize: 14,
    color: "#888",
  },
  rightSection: {
    flexDirection: "column",
    alignItems: "center",
  },
  units: {
    fontSize: 14,
    color: "#555",
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  changeText: {
    fontSize: 14,
    color: "red",
    marginLeft: 4,
  },
});

export default StockList;

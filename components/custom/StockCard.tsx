import React from "react";
import { View, Text, Image, StyleSheet, FlatList, ListRenderItem } from "react-native";
import { useThemeColors } from "@/context/ThemeContext";

type StockDataType = {
  id: number;
  symbol: string;
  ltp: number;
  volume: number;
  previousClose: number;
  percentagechange: number;
  logo: any;
  category?: string;
};

type StockCardProps = {
  stockListData: StockDataType[];
};

const StockCard: React.FC<StockCardProps> = ({ stockListData }) => {
  const theme = useThemeColors();

  const renderItem: ListRenderItem<StockDataType> = ({ item }) => {
    const isPositive = item.percentagechange >= 0;
    const changeColor = isPositive ? theme.positive : theme.negative;

    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            shadowColor: theme.shadow,
          },
        ]}
      >
        {/* Left Section */}
        <View style={styles.leftSection}>
          <Image source={item.logo} style={styles.logo} />
          <View>
            <Text style={[styles.symbol, { color: theme.text }]}>{item.symbol}</Text>
            <Text style={[styles.label, { color: theme.secondaryText }]}>Vol: {item.volume}</Text>
          </View>
        </View>

        {/* Right Section */}
        <View style={styles.rightSection}>
          <Text style={[styles.ltp, { color: theme.text }]}>Rs {item.ltp.toLocaleString()}</Text>
          <Text style={[styles.change, { color: changeColor }]}>
            {isPositive ? "+" : ""}
            {item.percentagechange.toFixed(2)}%
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={stockListData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={[styles.listContainer, { backgroundColor: theme.background }]}
    />
  );
};

export default StockCard;

const styles = StyleSheet.create({
  listContainer: {
    // paddingHorizontal: 12,
    // paddingTop: 10,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 14,
    padding: 12,
    marginBottom: 5,
    elevation: 2,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 8,
    marginRight: 10,
  },
  symbol: {
    fontSize: 16,
    fontWeight: "700",
  },
  label: {
    fontSize: 13,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  ltp: {
    fontSize: 15,
    fontWeight: "600",
  },
  change: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 2,
  },
});

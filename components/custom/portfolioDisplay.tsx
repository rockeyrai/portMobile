import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react-native";
import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

type PortfolioDisplayProps = {
  totalValue: number;
  totalProfit: number;
  todayChange: number;
  todayChangePercent: number;
  isLoading: boolean;
};

const formatCurrency = (value: number) =>
  `Rs. ${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

export const PortfolioDisplay: React.FC<PortfolioDisplayProps> = ({
  totalValue,
  totalProfit,
  todayChange,
  todayChangePercent,
  isLoading,
}) => {
  const isPositiveChange = todayChange >= 0;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.center}>
        <Text style={styles.label}>Portfolio Value</Text>
        <Text style={styles.value}>{formatCurrency(totalValue)}</Text>
      </View>

      {/* Today's Fluctuation */}
      {/* <View style={styles.separator} /> */}

      {isLoading ? (
        <ActivityIndicator
          size="small"
          color="#9ca3af"
          style={{ marginTop: 8 }}
        />
      ) : (
        <View style={[styles.center, styles.row, { marginTop: 8 }]}>
          <View style={[styles.row, { marginRight: 6 }]}>
            {isPositiveChange ? (
              <Text style={[styles.label]}>Profit :</Text>
            ) : (
              <Text style={[styles.label]}>Loss :</Text>
            )}
            {isPositiveChange ? (
              <TrendingUp size={14} color="#22c55e" style={{ marginLeft: 4 }} />
            ) : (
              <TrendingUp size={14} color="#ef4444" style={{ marginLeft: 4 }} />
            )}
          </View>
          <Text
            style={[styles.label, isPositiveChange ? styles.green : styles.red]}
          >
            {formatCurrency(Math.abs(todayChange))}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    // backgroundColor: "#fff",
    // padding: 16,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    // elevation: 3,
    // marginBottom: 16,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    color: "#6b7280",
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 0,
    color: "#fff",
  },
  green: { color: "#22c55e" },
  red: { color: "#ef4444" },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginVertical: 8,
  },
});

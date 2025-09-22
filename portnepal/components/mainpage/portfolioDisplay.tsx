import { ArrowUp, ArrowDown } from "lucide-react-native";
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
  `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

export const PortfolioDisplay: React.FC<PortfolioDisplayProps> = ({
  totalValue,
  totalProfit,
  todayChange,
  todayChangePercent,
  isLoading,
}) => {
  const isPositiveChange = todayChange >= 0;
  const isPositiveProfit = totalProfit >= 0;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.colBetween}>
        <View>
          <Text style={styles.label}>Portfolio Value</Text>
          <Text style={styles.value}>{formatCurrency(totalValue)}</Text>
        </View>
      </View>

      {/* Today's Fluctuation */}
      <View style={styles.separator} />
      {/* <Text style={styles.label}>Today's Fluctuation</Text> */}

      {isLoading ? (
        <ActivityIndicator
          size="small"
          color="#9ca3af"
          style={{ marginTop: 8 }}
        />
      ) : (
        <View style={styles.row}>
          <View style={styles.row}>
            {isPositiveChange ? (
              <ArrowUp size={20} color="#22c55e" />
            ) : (
              <ArrowDown size={20} color="#ef4444" />
            )}
            <Text
              style={[
                styles.value,
                isPositiveChange ? styles.green : styles.red,
              ]}
            >
              {formatCurrency(Math.abs(todayChange))}
            </Text>
          </View>
          <View
            style={[
              styles.badge,
              isPositiveChange ? styles.greenBadge : styles.redBadge,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                isPositiveChange ? styles.green : styles.red,
              ]}
            >
              {isPositiveChange ? "+" : ""}
              {todayChangePercent.toFixed(2)}%
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: "#fff",
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  colBetween: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  label: {
    fontSize: 12,
    color: "#6b7280", // muted text
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
  },
  green: { color: "#22c55e" },
  red: { color: "#ef4444" },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginVertical: 8,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 12,
  },
  greenBadge: { backgroundColor: "rgba(34,197,94,0.2)" },
  redBadge: { backgroundColor: "rgba(239,68,68,0.2)" },
  badgeText: { fontSize: 12, fontWeight: "600" },
});
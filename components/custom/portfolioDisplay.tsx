import { useThemeColors } from "@/context/ThemeContext";
import { TrendingDown, TrendingUp } from "lucide-react-native";
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
  const colors = useThemeColors();

  return (
    <View
      style={[
        styles.card,
        // { backgroundColor: colors.cardBackground, borderColor: colors.border },
      ]}
    >
      {/* Header */}
      <View style={styles.center}>
        <Text style={[styles.label, { color: colors.secondaryText }]}>
          Portfolio Value
        </Text>
        <Text style={[styles.value, { color: colors.text }]}>
          {formatCurrency(totalValue)}
        </Text>
      </View>

      {/* Today's Fluctuation */}
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={colors.secondaryText}
          style={{ marginTop: 8 }}
        />
      ) : (
        <View style={[styles.center, styles.row, { marginTop: 8 }]}>
          <View style={[styles.row, { marginRight: 6 }]}>
            <Text style={[styles.label, { color: colors.secondaryText }]}>
              {isPositiveChange ? "Profit :" : "Loss :"}
            </Text>
            {isPositiveChange ? (
              <TrendingUp
                size={14}
                color={isPositiveChange ? colors.positive : colors.negative}
                style={{ marginLeft: 4 }}
              />
            ) : (
              <TrendingDown
                size={14}
                color={isPositiveChange ? colors.positive : colors.negative}
                style={{ marginLeft: 4 }}
              />
            )}
          </View>
          <Text
            style={[
              styles.label,
              { color: isPositiveChange ? colors.positive : colors.negative },
            ]}
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
    padding: 12,
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
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 0,
  },
});

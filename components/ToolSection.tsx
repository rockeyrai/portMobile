import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  GestureResponderEvent,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import {
  Calculator,
  ChartCandlestickIcon,
  CircleChevronRightIcon,
  CopyMinus,
  Tv2,
  TrendingUp,
  Filter,
  Rocket,
  PiggyBank,
  Wallet,
  BellRing,
  Newspaper,
  Grid3x3,
  DollarSign,
  FileSpreadsheet,
  House,
  SendToBack,
  ChartNoAxesCombinedIcon,
} from "lucide-react-native";
import { useThemeColors } from "@/context/ThemeContext";

const tools = [
  { id: 13, icon: Tv2, label: "Live Data", route: "livedata" },
  { id: 2, icon: ChartCandlestickIcon, label: "Technical Chart", route: "TechnicalChart" },
  { id: 3, icon: Calculator, label: "Dividend Calculator", route: "DividendCalculator" },
  { id: 4, icon: SendToBack, label: "Comparison", route: "Comparison" },
  { id: 6, icon: Filter, label: "Stock Screener", route: "StockScreener" },
  { id: 12, icon: ChartNoAxesCombinedIcon, label: "Portfolio", route: "portfolio" },
  { id: 14, icon: FileSpreadsheet, label: "Tax Calculator", route: "TaxCalculator" },
  { id: 15, icon: CircleChevronRightIcon, label: "See More", route: "SeeMore" },
];


const ToolSection = () => {
  const navigation = useNavigation();
  const [tooltip, setTooltip] = useState<{ visible: boolean; text: string; x: number; y: number }>({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });
  const theme = useThemeColors(); 

  const handlePress = (route: string) => {
    navigation.navigate(route as never);
  };

  const handleLongPress = (label: string, event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    setTooltip({ visible: true, text: label, x: pageX, y: pageY - 40 });
    setTimeout(() => setTooltip({ visible: false, text: "", x: 0, y: 0 }), 1500);
  };

  
  return (
    <View style={[styles.container,{backgroundColor: theme.background,}]}>
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <Pressable
            key={tool.id}
            style={({ pressed }) => [
              styles.toolCard,
              {
                opacity: pressed ? 0.7 : 1,
                backgroundColor: theme.cardBackground, // 🎨 Theme-based background
                shadowColor: theme.shadow,
              },
            ]}
            android_ripple={{
              color: theme.tabbutton, // 🎨 Ripple color from theme
              borderless: false,
            }}
            onPress={() => handlePress(tool.route)}
            onLongPress={(e: GestureResponderEvent) =>
              handleLongPress(tool.label, e)
            }
          >
            <View style={styles.iconWrapper}>
              <Icon size={20} color={theme.icon} /> {/* 🎨 Icon color */}
            </View>
            <Text
              style={[styles.label, { color: theme.text }]} // 🎨 Text color
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {tool.label}
            </Text>
          </Pressable>
        );
      })}

      {/* Tooltip Modal */}
      {tooltip.visible && (
        <Modal transparent visible={tooltip.visible} animationType="fade">
          <View
            style={[
              styles.tooltipContainer,
              {
                top: tooltip.y,
                left: tooltip.x - 60,
                backgroundColor: theme.dropdownBackground, // 🎨 Tooltip bg
              },
            ]}
          >
            <Text style={[styles.tooltipText, { color: theme.text }]}>
              {tooltip.text}
            </Text>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default ToolSection;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  toolCard: {
    width: "23%",
    aspectRatio: 1.1,
    borderRadius: 16,
    marginVertical: 4,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  iconWrapper: {
    marginBottom: 6,
  },
  label: {
    fontSize: 10,
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: 2,
  },
  tooltipContainer: {
    position: "absolute",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  tooltipText: {
    fontSize: 12,
  },
});
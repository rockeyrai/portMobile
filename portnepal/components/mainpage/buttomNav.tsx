import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Home, BarChart2, Compass, Bot, User } from "lucide-react-native"; // use lucide-react-native for RN

const navItems = [
  { name: "Home", icon: Home },
  { name: "Analysis", icon: BarChart2 },
  { name: "Browser", icon: Compass },
  { name: "Copilot", icon: Bot },
  { name: "Profile", icon: User },
];

export default function BottomNav() {
  const [active, setActive] = useState("Home");

  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const isActive = active === item.name;
        return (
          <TouchableOpacity
            key={item.name}
            style={styles.navButton}
            onPress={() => setActive(item.name)}
          >
            <item.icon
              size={24}
              color={isActive ? "#0ea5a4" : "#6b7280"} // teal for active, gray for inactive
            />
            <Text
              style={[styles.label, isActive && styles.activeLabel]}
              numberOfLines={1}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 64,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "rgba(255,255,255,0.9)", // light glass effect
  },
  navButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
  },
  label: {
    marginTop: 2,
    fontSize: 12,
    color: "#6b7280", // gray-500
  },
  activeLabel: {
    color: "#0ea5a4", // accent color (teal)
    fontWeight: "600",
  },
});

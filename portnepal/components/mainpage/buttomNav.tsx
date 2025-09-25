import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

import {
  MessagesSquare,
  CircleUser,
  SquareLibrary,
  ChartPie,
} from "lucide-react-native";
import { GradientIcon, GradientText } from "../ui/GradientText";

const navItems1 = [
  { name: "Analysis", icon: ChartPie },
  { name: "Service", icon: SquareLibrary },
];

const navItems2 = [
  { name: "Copilot", icon: MessagesSquare },
  { name: "Profile", icon: CircleUser },
];

export default function BottomNav() {
  const [active, setActive] = useState("Portfolio");

  return (
    <View style={styles.container}>
      {/* First group */}
      {navItems1.map((item) => {
        const isActive = active === item.name;
        return (
          <TouchableOpacity
            key={item.name}
            style={styles.navButton}
            onPress={() => setActive(item.name)}
          >
            {isActive ? (
              <GradientIcon Icon={item.icon} />
            ) : (
              <item.icon size={24} color="#6b7280" />
            )}
            {isActive ? (
              <GradientText style={styles.label}>{item.name}</GradientText>
            ) : (
              <Text style={styles.label}>{item.name}</Text>
            )}
          </TouchableOpacity>
        );
      })}

      {/* Center Image */}
      <TouchableOpacity
        style={[styles.navButton, styles.centerButton]}
        onPress={() => setActive("Portfolio")}
      >
        <Image
          source={require("../../assets/images/portfolio.png")}
          style={styles.centerImage}
          resizeMode="contain"
        />
        {active === "Portfolio" ? (
          <GradientText  style={styles.label}>Portfolio</GradientText>
        ) : (
          <Text style={styles.label}>Portfolio</Text>
        )}
      </TouchableOpacity>

      {/* Second group */}
      {navItems2.map((item) => {
        const isActive = active === item.name;
        return (
          <TouchableOpacity
            key={item.name}
            style={styles.navButton}
            onPress={() => setActive(item.name)}
          >
            {isActive ? (
              <GradientIcon Icon={item.icon} />
            ) : (
              <item.icon size={24} color="#6b7280" />
            )}
            {isActive ? (
              <GradientText style={styles.label}>{item.name}</GradientText>
            ) : (
              <Text style={styles.label}>{item.name}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 50,
    left: "5%",
    right: "5%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
    borderTopWidth: 1,
    borderColor: "#111113",
    backgroundColor: "#111113",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  navButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
  },
  centerButton: {
    marginBottom: 5,
  },
  centerImage: {
    width: 40,
    height: 40,
    backgroundColor: "transparent",
  },
  label: {
    marginTop: 0,
    fontSize: 8,
    color: "#6b7280",
  },
});

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import { useRouter, useSegments } from "expo-router";
import {
  MessagesSquare,
  CircleUser,
  SquareLibrary,
  ChartPie,
} from "lucide-react-native";
import { GradientIcon, GradientText } from "./GradientText";
import { useThemeColors } from "@/context/ThemeContext";

type RoutePath = "/" | "/analysis" | "/service" | "/copilot" | "/profile";

const navItems1: { name: string; icon: any; route: RoutePath }[] = [
  { name: "Analysis", icon: ChartPie, route: "/analysis" },
  { name: "Service", icon: SquareLibrary, route: "/service" },
];

const navItems2: { name: string; icon: any; route: RoutePath }[] = [
  { name: "Copilot", icon: MessagesSquare, route: "/copilot" },
  { name: "Profile", icon: CircleUser, route: "/profile" },
];


export default function BottomNav() {
  const router = useRouter();
  const segments = useSegments(); // gives the current path segments
  const mobileTheme = useThemeColors(); 


  const activeRoute = "/" + (segments[0] || "index"); // default to home

  const renderNavItem = (item: typeof navItems1[0]) => {
    const isActive = activeRoute === item.route;

    return (
      <TouchableOpacity
        key={item.name}
        style={styles.navButton}
        onPress={() => router.push(item.route)}
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
  };

  return (
    <View
      style={[styles.container, { backgroundColor: mobileTheme.navBackground }]}
    >
      {navItems1.map(renderNavItem)}

      {/* Center Home button */}
      <TouchableOpacity
        style={[styles.navButton, styles.centerButton]}
        onPress={() => router.push("/")}
      >
        <Image
          source={require("../../assets/logo/portfolio.png")}
          style={styles.centerImage}
          resizeMode="contain"
        />
        {activeRoute === "/" ? (
          <GradientText style={styles.label}>Home</GradientText>
        ) : (
          <Text style={styles.label}>Home</Text>
        )}
      </TouchableOpacity>

      {navItems2.map(renderNavItem)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: "5%",
    right: "5%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
    borderTopWidth: 1,
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

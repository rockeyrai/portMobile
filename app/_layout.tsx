// app/_layout.tsx
import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/use-color-scheme";
import BottomNav from "@/components/custom/buttomNav";
import "../global.css";
import { CustomColors } from "@/constant/color";
import ProfileHeader from "@/components/custom/header";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const themeKey: "light" | "dark" = colorScheme === "dark" ? "dark" : "light";
  const mobileTheme = CustomColors[themeKey];

  const isMobile = Platform.OS === "ios" || Platform.OS === "android";

  return (
    <ThemeProvider>
      <View style={[styles.root, { backgroundColor: mobileTheme.background }]}>
        <View style={[styles.container, !isMobile && styles.webContainer]}>
          <ProfileHeader />
          {/* Screens */}
          <Stack screenOptions={{ headerShown: false }} />
          {/* BottomNav always visible */}
          <BottomNav />
        </View>
      </View>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center", // center content on web
  },
  container: {
    flex: 1,
    position: "relative",
    padding: 16,
    width: "100%",
  },
  webContainer: {
    maxWidth: 400, // constrain width on web/desktop
  },
});

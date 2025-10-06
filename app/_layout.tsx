// app/_layout.tsx
import BottomNav from "@/components/custom/buttomNav";
import ProfileHeader from "@/components/custom/header";
import { CustomColors } from "@/constants/color";
import { ThemeProvider } from "@/context/ThemeContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import "../global.css";

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
    paddingHorizontal: 16,
    paddingVertical:30,
    width: "100%",
  },
  webContainer: {
    maxWidth: 400, // constrain width on web/desktop
  },
});

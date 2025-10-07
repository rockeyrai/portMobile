// app/(main)/_layout.tsx
import React from "react";
import { View, StyleSheet, SafeAreaView, Platform } from "react-native";
import { Stack } from "expo-router";
import ProfileHeader from "@/components/custom/header";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { CustomColors } from "@/constants/color";
import { ThemeProvider } from "@/context/ThemeContext";
import { StatusBar } from "expo-status-bar";

export default function MainLayout() {
  const colorScheme = useColorScheme();
  const themeKey: "light" | "dark" = colorScheme === "dark" ? "dark" : "light";
  const mobileTheme = CustomColors[themeKey];
  const isMobile = Platform.OS === "ios" || Platform.OS === "android";

  return (
    <ThemeProvider>
      <SafeAreaView style={[styles.root, { backgroundColor: mobileTheme.background }]}>
        <View style={[styles.container, !isMobile && styles.webContainer]}>
          {/* Header only visible in this layout */}
          <ProfileHeader />

          {/* Screens inside (main) group */}
          <Stack screenOptions={{ headerShown: false }} />
        </View>

        <StatusBar style={themeKey === "dark" ? "light" : "dark"} />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    position: "relative",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  webContainer: {
    maxWidth: 420,
  },
});

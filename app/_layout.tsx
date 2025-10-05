// app/_layout.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/use-color-scheme";
import BottomNav from "@/components/custom/buttomNav";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        {/* Stack handles your screens */}
        <Stack screenOptions={{ headerShown: false }} />

        {/* BottomNav always visible */}
        <BottomNav />
      </View>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // make sure it fills the screen
    position: "relative",
  },
});

import { CustomColors } from "@/constants/color";
import React, { createContext, useContext } from "react";
import { useColorScheme } from "react-native";

const ThemeContext = createContext(CustomColors.light);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();
  const themeKey: "light" | "dark" = colorScheme === "dark" ? "dark" : "light";
  const theme = CustomColors[themeKey];

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useThemeColors = () => useContext(ThemeContext);

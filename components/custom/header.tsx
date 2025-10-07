import React, { useState } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import BellButton from "./BellButton";
import { useThemeColors } from "@/context/ThemeContext";
import SearchInput from "./CustomeInput";

export default function ProfileHeader() {
  const colors = useThemeColors();
  const [searchText, setSearchText] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  return (
    <View style={[styles.container,{backgroundColor:colors.background}]}>
      <View className="flex flex-row justify-center items-center gap-2">
        <View style={styles.profileImageWrapper}>
          <Image
            source={require("../../assets/images/favicon.png")}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.profileContainer}>
          <Text
            style={[
              { color: colors.text, fontWeight: "600", lineHeight: 10,fontSize:12 }, // reduced lineHeight
            ]}
          >
            Good Morning
          </Text>
          <Text
            style={[
              {
                color: colors.text,
                fontWeight: "bold",
                fontSize: 16,
                lineHeight: 20,
              }, // reduced lineHeight
            ]}
          >
            ROCKEY
          </Text>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <SearchInput
          value={searchText}
          onChangeText={setSearchText}
          maxWidth={220}
          onFocusChange={setInputFocused}
          options={[
            { id: 1, name: "Apple", symbol: "AAPL" },
            { id: 2, name: "Tesla", symbol: "TSLA" },
            { id: 3, name: "Microsoft", symbol: "MSFT" },
          ]}
        />
        <BellButton count={6} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  profileContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 0,
  },
  profileImageWrapper: {
    width: 45,
    height: 45,
    borderWidth: 4,
    borderColor: "#cdf14bff",
    borderRadius: 40,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: { width: "100%", height: "100%", resizeMode: "cover" },
  actionContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
});

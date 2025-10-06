import React, { useState } from "react";
import { View, Image, StyleSheet, Alert } from "react-native";
import SearchInput from "./CustomeInput";
import BellButton from "./BellButton";

export default function ProfileHeader() {
  const [searchText, setSearchText] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageWrapper}>
          <Image
            source={require("../../assets/images/favicon.png")}
            style={styles.profileImage}
          />
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
        <BellButton count={6} onPress={() => Alert.alert("Bell clicked!")} />
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
  profileContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
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

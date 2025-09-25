import React, { useState, useRef, useEffect } from "react";
import { View, Image, StyleSheet, Alert, Animated } from "react-native";
import CustomDropdown from "../ui/CustomDropdown";
import BellButton from "../ui/BellButton";
import SearchInput from "../ui/CustomeInput";

export default function ProfileHeader() {
  const [selectedOption, setSelectedOption] = useState("1D");
  const [searchText, setSearchText] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(true); // controls rendering

  const animeScale = useRef(new Animated.Value(1)).current;

  const options = ["1M", "3W", "1M"];

  useEffect(() => {
    if (inputFocused) {
      // Animate shrink
      Animated.timing(animeScale, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowDropdown(false)); // remove after animation
    } else {
      // Show first, then animate expand
      setShowDropdown(true);
      Animated.timing(animeScale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [inputFocused]);

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
          maxWidth={200}
          onIconPress={() => Alert.alert("Search icon clicked!")}
          onFocusChange={setInputFocused}
        />
        <BellButton count={5} onPress={() => Alert.alert("Bell clicked!")} />

        {/* Animated Dropdown */}
        {/* {showDropdown && (
          <Animated.View
            style={{
              transform: [{ scale: animeScale }],
              opacity: animeScale,
            }}
          >
            <View style={styles.dropdownWrapper}>
              <CustomDropdown
                options={options}
                value={selectedOption}
                onChange={setSelectedOption}
                width={50}
              />
            </View>
          </Animated.View>
        )} */}
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
  dropdownWrapper: {},
});

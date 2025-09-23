import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import CustomDropdown from "../ui/CustomDropdown";

export default function ProfileHeader() {
  const [selectedOption, setSelectedOption] = useState("Today");
  const options = ["All", "Option 1", "Option 2"];

  return (
    <View style={styles.container}>
      {/* Profile section */}
      <View style={styles.profileContainer}>
        <View style={styles.profileImageWrapper}>
          <Image
            source={require("../../assets/images/favicon.png")}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.greeting}>Namaskar</Text>
          <Text style={styles.profileName}>Rockey</Text>
        </View>
      </View>

      {/* Dropdown section */}
      <View style={styles.dropdownContainer}>
        <CustomDropdown
          options={options}
          value={selectedOption}
          onChange={(val) => setSelectedOption(val)}
        />
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
    // paddingTop: 20,
    // marginVertical: 10,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // spacing between image and texts
  },
  profileImageWrapper: {
    width: 50,
    height: 50,
    borderWidth: 4,
    borderColor: "#cdf14bff",
    borderRadius: 40,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textWrapper: {
    flexDirection: "column",
    gap: 0, // tight spacing between Namaskar & Rockey
  },
  greeting: {
    fontSize: 9,
    color: "#9ca3af", // gray-400
  },
  profileName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  dropdownContainer: {
    // height:20,
    // backgroundColor:"#ffffff"
  },
});

import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function ProfileHeader() {
  const [selectedOption, setSelectedOption] = useState("today");

  return (
    <View style={styles.container}>
      {/* Profile section */}
      <View style={styles.profileContainer}>
        <View style={styles.profileImageWrapper}>
          <Image
            source={require("./profile.png")} // make sure the path is correct
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.profileName}>Rockey</Text>
      </View>

      {/* Dropdown section */}
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedOption}
          onValueChange={(itemValue) => setSelectedOption(itemValue)}
          style={styles.picker}
          dropdownIconColor="#000"
        >
          <Picker.Item label="Today" value="today" />
          <Picker.Item label="Gain" value="gain" />
          <Picker.Item label="Loss" value="loss" />
          <Picker.Item label="Profit" value="profit" />
        </Picker>
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
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // similar to Tailwind gap-2
  },
  profileImageWrapper: {
    width: 80,
    height: 80,
    borderWidth: 5,
    borderColor: "#fff",
    borderRadius: 40, // circular
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  profileName: {
    fontSize: 16,
    fontWeight: "500",
  },
  dropdownContainer: {
    width: 120,
  },
  picker: {
    height: 40,
    width: "100%",
  },
});

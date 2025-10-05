import { StyleSheet, View } from "react-native";
import CustomDropdown from "@/components/custom/CustomDropdown";
import { useState } from "react";
import TestSwip from "@/components/custom/test";

export default function HomeScreen() {
  const [selected, setSelected] = useState<string | undefined>();

  const dropdownOptions = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
  ];
  return (
    <View>
      <CustomDropdown
        options={dropdownOptions}
        value={selected}
        onChange={setSelected}
        width={100} 
      />{" "}

<TestSwip/>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

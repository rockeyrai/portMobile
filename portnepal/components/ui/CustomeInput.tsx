import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  maxWidth?: number;
  onIconPress?: () => void;
  onFocusChange?: (focused: boolean) => void; // new prop
};


const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = "Type to search...",
  maxWidth = 200,
  onIconPress,
  onFocusChange,
}) => {
  const [focused, setFocused] = useState(false);
  const widthAnim = useRef(new Animated.Value(40)).current;
  const inputRef = useRef<TextInput>(null);

const handleFocus = () => {
  setFocused(true);
  onFocusChange?.(true); // notify parent
  Animated.timing(widthAnim, {
    toValue: maxWidth,
    duration: 300,
    useNativeDriver: false,
    easing: Easing.out(Easing.ease),
  }).start();
};

const handleBlur = () => {
  setFocused(false);
  onFocusChange?.(false); // notify parent
  if (value === "") {
    Animated.timing(widthAnim, {
      toValue: 40,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.out(Easing.ease),
    }).start();
  }
};


  const handleIconPress = () => {
    inputRef.current?.focus();
    // if (onIconPress) onIconPress();
  };

  return (
    <Animated.View style={[styles.container, { width: widthAnim }]}>
      {/* Search icon on the left */}
      <TouchableOpacity
        style={styles.icon}
        onPress={handleIconPress}
        activeOpacity={0.7}
      >
        <Ionicons name="search" size={24} color="#fff" />
      </TouchableOpacity>

      {/* TextInput next to the icon */}
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#888"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2C",
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 8,
    overflow: "hidden",
  },
  icon: {
    marginRight: 1, // space between icon and input
  },
  input: {
    flex: 1, // fill remaining space
    color: "#fff",
    fontSize: 12,
    height: "100%",
    alignItems:"center"
  },
});

export default SearchInput;

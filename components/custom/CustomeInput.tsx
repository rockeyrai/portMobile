import React, { useRef, useState, useMemo } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  FlatList,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Option = {
  id: string | number;
  name: string;
  symbol: string;
};

type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  maxWidth?: number;
  onIconPress?: () => void;
  onFocusChange?: (focused: boolean) => void;
  options?: Option[]; // ✅ new prop
};

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = "Type to search...",
  maxWidth = 200,
  onIconPress,
  onFocusChange,
  options = [],
}) => {
  const [focused, setFocused] = useState(false);
  const widthAnim = useRef(new Animated.Value(40)).current;
  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    setFocused(true);
    onFocusChange?.(true);
    Animated.timing(widthAnim, {
      toValue: maxWidth,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  const handleBlur = () => {
    setFocused(false);
    onFocusChange?.(false);
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
    if (onIconPress) onIconPress();
  };

  // ✅ Filtered options
  const filteredOptions = useMemo(() => {
    if (!value.trim()) return [];
    return options.filter(
      (opt) =>
        opt.name.toLowerCase().includes(value.toLowerCase()) ||
        opt.symbol.toLowerCase().includes(value.toLowerCase())
    );
  }, [value, options]);

  return (
    <View style={{ position: "relative" }}>
      <Animated.View style={[styles.container, { width: widthAnim }]}>
        {/* Search icon */}
        <TouchableOpacity
          style={styles.icon}
          onPress={handleIconPress}
          activeOpacity={0.7}
        >
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>

        {/* Input */}
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

      {/* ✅ Dropdown list */}
      {focused && filteredOptions.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={filteredOptions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  onChangeText(item.name);
                  setFocused(false);
                  inputRef.current?.blur();
                }}
              >
                <Text style={styles.optionText}>
                  {item.name} ({item.symbol})
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
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
    marginRight: 4,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
    height: "100%",
  },
  dropdown: {
    position: "absolute",
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: "#2C2C2C",
    borderRadius: 8,
    paddingVertical: 4,
    zIndex: 1000,
    maxHeight: 150,
  },
  option: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  optionText: {
    color: "#fff",
    fontSize: 13,
  },
});

export default SearchInput;

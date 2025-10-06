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
  Pressable,
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
  options?: Option[];
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
  const isSelectingOption = useRef(false);

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
    // Don't close if we're selecting an option
    if (isSelectingOption.current) {
      return;
    }
    
    setFocused(false);
    onFocusChange?.(false);
    Animated.timing(widthAnim, {
      toValue: 40,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  const handleIconPress = () => {
    if (focused) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
    onIconPress?.();
  };

  const filteredOptions = useMemo(() => {
    if (!value.trim()) return [];
    return options.filter(
      (opt) =>
        opt.name.toLowerCase().includes(value.toLowerCase()) ||
        opt.symbol.toLowerCase().includes(value.toLowerCase())
    );
  }, [value, options]);

  const handleOptionSelect = (item: Option) => {
    isSelectingOption.current = true;
    onChangeText(item.name);
    
    // Close the dropdown after a short delay
    setTimeout(() => {
      isSelectingOption.current = false;
      setFocused(false);
      onFocusChange?.(false);
      Animated.timing(widthAnim, {
        toValue: 40,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }).start();
    }, 100);
  };

  const closeInput = () => {
    if (focused && !isSelectingOption.current) {
      setFocused(false);
      onFocusChange?.(false);
      inputRef.current?.blur();
      Animated.timing(widthAnim, {
        toValue: 40,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }).start();
    }
  };

  return (
    <>
      {/* Overlay to detect outside clicks */}
      {focused && (
        <Pressable
          style={styles.overlay}
          onPress={closeInput}
        />
      )}
      
      <View style={styles.wrapper}>
        <Animated.View style={[styles.container, { width: widthAnim }]}>
          <TouchableOpacity
            style={styles.icon}
            onPress={handleIconPress}
            activeOpacity={0.7}
          >
            <Ionicons name="search" size={20} color="#fff" />
          </TouchableOpacity>

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

        {/* Dropdown */}
        {focused && filteredOptions.length > 0 && (
          <View style={styles.dropdown}>
            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleOptionSelect(item)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.optionText}>
                    {item.name} ({item.symbol})
                  </Text>
                </TouchableOpacity>
              )}
              nestedScrollEnabled
            />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  wrapper: {
    position: "relative",
    zIndex: 1000,
  },
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
    marginLeft: 2,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
    height: "100%",
    paddingLeft: 8,
  },
  dropdown: {
    position: "absolute",
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: "#2C2C2C",
    borderRadius: 8,
    paddingVertical: 4,
    maxHeight: 150,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  optionText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default SearchInput;
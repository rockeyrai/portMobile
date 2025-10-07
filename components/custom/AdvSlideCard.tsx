import { useThemeColors } from "@/context/ThemeContext";
import { ChevronDown, LogOut, Plus } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  Pressable,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  LayoutChangeEvent,
} from "react-native";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AdvSlideCard = () => {
  const mobileTheme = useThemeColors();
  const otheraccount = [1, 2];
  const [isOpen, setIsOpen] = useState(false);
  const [rotateAnim] = useState(new Animated.Value(0));

  const toggleExpand = () => {
    // Configure animation
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        300,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      )
    );

    // Rotate chevron animation
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsOpen(!isOpen);
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const [height, setHeight] = useState(0);

  // measure the component height dynamically
  const onLayout = (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h !== height) setHeight(h);
  };
  return (
    <View style={{ padding: 16 }}>
      {/* Main Toggle Button */}
      <Pressable
        onLayout={onLayout}
        onPress={toggleExpand}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: mobileTheme.secondBackground,
          paddingVertical: 16,
          paddingHorizontal: 20,
          borderTopLeftRadius: height / 2,
          borderTopRightRadius: height / 2,
          borderBottomLeftRadius: isOpen ? 10 : height / 2,
          borderBottomRightRadius: isOpen ? 10 : height / 2,
        }}
      >
        <View>
          <Text
            style={{
              color: mobileTheme.text,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Show More Accounts
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          {!isOpen && (
            <Image
              source={require("../../assets/logo/portfolio.png")}
              style={{
                height: 10,
                width: 10,
                borderRadius: 9999,
              }}
            />
          )}
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <ChevronDown size={20} color={mobileTheme.text} />
          </Animated.View>
        </View>
      </Pressable>

      {/* Expanded Content */}
      {isOpen && otheraccount?.[0] && (
        <View className="space-y-1">
          {/* Account List */}
          {otheraccount.map((_, index) => (
            <Pressable
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                paddingVertical: 16,
                paddingHorizontal: 20,
                borderTopWidth: 1,
                borderRadius:10,
                borderTopColor: mobileTheme.border || "rgba(0,0,0,0.1)",
              }}
            >
              <Image
                source={require("../../assets/logo/portfolio.png")}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 9999,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: mobileTheme.text,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Rockey rai
                </Text>
                <Text
                  style={{
                    color: mobileTheme.text || mobileTheme.text,
                    fontSize: 14,
                    opacity: 0.7,
                  }}
                >
                  rockeyraio234@gmail.com
                </Text>
              </View>
            </Pressable>
          ))}

          {/* Add Another Account */}
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              paddingVertical: 16,
              paddingHorizontal: 20,
              borderTopWidth: 1,
              borderTopColor: mobileTheme.border || "rgba(0,0,0,0.1)",
            }}
          >
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 9999,
                backgroundColor: mobileTheme.secondaryText || "#007AFF",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Plus size={20} color="#FFFFFF" />
            </View>
            <Text
              style={{
                color: mobileTheme.text,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Add another account
            </Text>
          </Pressable>

          {/* Sign Out */}
          {/* Sign Out */}
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              paddingVertical: 16,
              paddingHorizontal: 20,
              borderTopWidth: 1,
              borderTopColor: mobileTheme.border || "rgba(0,0,0,0.1)",
              borderTopLeftRadius:10,
              borderTopRightRadius:10,
              borderBottomLeftRadius: height / 2,
              borderBottomRightRadius: height / 2,
              backgroundColor: mobileTheme.secondBackground,
            }}
          >
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 9999,
                backgroundColor: "#FF3B30",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LogOut size={20} color="#FFFFFF" />
            </View>
            <Text
              style={{
                color: "#FF3B30",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Sign out
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default AdvSlideCard;

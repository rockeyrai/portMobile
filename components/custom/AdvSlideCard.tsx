import { useThemeColors } from "@/context/ThemeContext";
import { ChevronDown, LogOut, Plus } from "lucide-react-native";
import React, { useRef, useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  Pressable,
  Animated,
  Platform,
  UIManager,
  LayoutChangeEvent,
  Easing,
} from "react-native";

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
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;

  const [contentHeight, setContentHeight] = useState(0);
  const [buttonHeight, setButtonHeight] = useState(0);

  const toggleExpand = () => {
    setIsOpen(!isOpen);

    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue: isOpen ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(heightAnim, {
        toValue: isOpen ? 0 : contentHeight,
        duration: 400,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(borderAnim, {
        toValue: isOpen ? 0 : 1,
        duration: 400,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }),
    ]).start();
  };

  const onButtonLayout = (e: LayoutChangeEvent) => {
    setButtonHeight(e.nativeEvent.layout.height);
  };

  const onContentLayout = (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h !== contentHeight) {
      setContentHeight(h);
    }
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const borderRadiusInterpolate = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [buttonHeight / 2 || 25, 25],
  });

  return (
    <View style={{ padding: 16 }}>
      <Animated.View className="space-y-2"
        style={{
          borderRadius: borderRadiusInterpolate,
          overflow: "hidden",
          
        }}
      >
        {/* Header */}
        <Pressable
          onLayout={onButtonLayout}
          onPress={toggleExpand}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 16,
            paddingHorizontal: 20,
            borderBottomLeftRadius:10,
            borderBottomRightRadius:10,
            backgroundColor: mobileTheme.secondBackground,
    
          }}
        >
          <Text
            style={{
              color: mobileTheme.text,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {isOpen ? "Hide more accounts" : "show more accounts"}
          </Text>

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
            <Animated.View
              style={{ transform: [{ rotate: rotateInterpolate }] }}
            >
              <ChevronDown size={20} color={mobileTheme.text} />
            </Animated.View>
          </View>
        </Pressable>

        {/* Expandable Content */}
        <Animated.View
          style={{
            height: heightAnim,
            overflow: "hidden",
            
          }}
        >
          <View onLayout={onContentLayout} style={{ gap: 5,marginTop:5 }}>
            {otheraccount.map((_, index) => (
              <Pressable
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  paddingVertical: 14,
                  paddingHorizontal: 20,
                borderRadius:10,

                  // borderTopWidth: 1,
                  backgroundColor: mobileTheme.secondBackground,

                  borderTopColor: mobileTheme.border || "rgba(0,0,0,0.1)",
                }}
              >
                <Image
                  source={require("../../assets/logo/portfolio.png")}
                  style={{
                    height: 25,
                    width: 25,
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
                    Rockey Rai
                  </Text>
                  <Text
                    style={{
                      color: mobileTheme.text,
                      fontSize: 14,
                      opacity: 0.7,
                    }}
                  >
                    rockeyraio234@gmail.com
                  </Text>
                </View>
              </Pressable>
            ))}

            {/* Add Account */}
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                paddingVertical: 14,
                paddingHorizontal: 20,
                borderRadius:10,
                // borderTopWidth: 1,
                backgroundColor: mobileTheme.secondBackground,

                borderTopColor: mobileTheme.border || "rgba(0,0,0,0.1)",
              }}
            >
              <View
                style={{
                  height: 25,
                  width: 25,
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
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                paddingVertical: 14,
                paddingHorizontal: 20,
                // borderTopWidth: 1,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                backgroundColor: mobileTheme.secondBackground,

                borderTopColor: mobileTheme.border || "rgba(0,0,0,0.1)",
                // backgroundColor:"#ffffff"
              }}
            >
              <View
                style={{
                  height: 25,
                  width: 25,
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
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default AdvSlideCard;

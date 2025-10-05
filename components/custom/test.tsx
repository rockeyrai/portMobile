import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from "react-native-reanimated";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";

const SWIPE_THRESHOLD = 90;
const ANIMATION_DURATION = 200;

const data = Array.from({ length: 15 }, (_, i) => ({
  id: `${i}`,
  label: `Item ${i + 1}`,
}));

type RowRef = {
  close: () => void;
};

// 👇 Swipeable row
const SwipeableRow = ({
  item,
  isOpen,
  onOpen,
  refCallback,
}: {
  item: { id: string; label: string };
  isOpen: boolean;
  onOpen: (id: string) => void;
  refCallback: (id: string, ref: RowRef) => void;
}) => {
  const translateX = useSharedValue(0);

  const close = () => {
    translateX.value = withTiming(0, { duration: ANIMATION_DURATION });
  };

  // Register row ref
  React.useEffect(() => {
    refCallback(item.id, { close });
  }, []);

  React.useEffect(() => {
    if (!isOpen) {
      close();
    }
  }, [isOpen]);

  // Pan gesture
  const panGesture = Gesture.Pan()
    .activeOffsetX([-2,2])   // start only after horizontal movement
    .failOffsetY([-60, 60])       // vertical movement cancels horizontal swipe
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd((e) => {
      if (e.translationX > SWIPE_THRESHOLD) {
        translateX.value = withTiming(SWIPE_THRESHOLD, { duration: ANIMATION_DURATION });
        runOnJS(onOpen)(item.id);
      } else if (e.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-SWIPE_THRESHOLD, { duration: ANIMATION_DURATION });
        runOnJS(onOpen)(item.id);
      } else {
        translateX.value = withTiming(0, { duration: ANIMATION_DURATION });
      }
    });

  // Tap gesture to close row
  const tapGesture = Gesture.Tap().onEnd(() => {
    translateX.value = withTiming(0, { duration: ANIMATION_DURATION });
  });

  const combinedGesture = Gesture.Race(panGesture, tapGesture);

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    backgroundColor: translateX.value !== 0 ? "#3a3b3d" : "#28292B",
  }));

  const leftBtnStyle = useAnimatedStyle(() => ({
    opacity: translateX.value > SWIPE_THRESHOLD / 2 ? 1 : 0,
  }));
  const rightBtnStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < -SWIPE_THRESHOLD / 2 ? 1 : 0,
  }));

  return (
    <View style={styles.rowContainer}>
      <Animated.View style={[styles.actionBtn, styles.leftBtn, leftBtnStyle]}>
        <Pressable onPress={() => console.log("Left pressed", item.label)}>
          <Text style={styles.text}>LEFT</Text>
        </Pressable>
      </Animated.View>

      <Animated.View style={[styles.actionBtn, styles.rightBtn, rightBtnStyle]}>
        <Pressable onPress={() => console.log("Right pressed", item.label)}>
          <Text style={styles.text}>RIGHT</Text>
        </Pressable>
      </Animated.View>

      <GestureDetector gesture={combinedGesture}>
        <Animated.View style={[styles.listItem, rowStyle]}>
          <Text style={styles.text}>{item.label}</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

// 👇 Parent
const TestSwip = () => {
  const [openRowId, setOpenRowId] = useState<string | null>(null);
  const rowRefs = useRef<Record<string, RowRef>>({});

  const handleOpen = (id: string) => {
    if (openRowId && openRowId !== id) {
      rowRefs.current[openRowId]?.close();
    }
    setOpenRowId(id);
  };

  const registerRowRef = (id: string, ref: RowRef) => {
    rowRefs.current[id] = ref;
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SwipeableRow
              item={item}
              isOpen={openRowId === item.id}
              onOpen={handleOpen}
              refCallback={registerRowRef}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingTop: 50,
  },
  rowContainer: {
    width: "100%",
    height: 70,
    marginBottom: 10,
    justifyContent: "center",
  },
  listItem: {
    height: 70,
    borderRadius: 12,
    backgroundColor: "#28292B",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  actionBtn: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  leftBtn: {
    left: 0,
    backgroundColor: "#4da6ff",
  },
  rightBtn: {
    right: 0,
    backgroundColor: "#ff4d4d",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TestSwip;

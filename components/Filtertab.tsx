import React, { useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  LayoutChangeEvent,
  Dimensions,
} from "react-native";
import StockCard from "./custom/StockCard";
import { useThemeColors } from "@/context/ThemeContext";
import { StockFilterTabs, StockListData } from "../constants/fatedata";

const screenWidth = Dimensions.get("window").width;

const FilterTab = () => {
  const [activeTab, setActiveTab] = useState("Top Gainer");
  const [tabLayouts, setTabLayouts] = useState<{
    [key: string]: { x: number; width: number };
  }>({});
  const theme = useThemeColors();
  const flatListRef = useRef<FlatList>(null);

  const displayedData = useMemo(() => {
    return StockListData?.filter((item) => item.category === activeTab);
  }, [activeTab]);

  const onTabLayout = (tab: string, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    setTabLayouts((prev) => ({ ...prev, [tab]: { x, width } }));
  };

  const handleTabPress = (tab: string, index: number) => {
    setActiveTab(tab);

    // Improved scroll logic
    if (flatListRef.current && StockFilterTabs.length > 0) {
      const totalTabs = StockFilterTabs.length;

      // For first tab, scroll to start
      if (index === 0) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      }
      // For last tab, scroll to end
      else if (index === totalTabs - 1) {
        // flatListRef.current.scrollToEnd({ animated: true });
        flatListRef.current.scrollToIndex({
          index: index,
          animated: true,
          viewPosition: 0.5, // Center the tab
        });
      }
      // For middle tabs, center them
      else {
        flatListRef.current.scrollToIndex({
          index: index,
          animated: true,
          viewPosition: 0.5, // Center the tab
        });
      }
    }
  };

  const onScrollToIndexFailed = (info: {
    index: number;
    averageItemLength: number;
  }) => {
    // Wait for layout to complete, then try again
    setTimeout(() => {
      if (flatListRef.current) {
        const totalTabs = StockFilterTabs.length;

        if (info.index === totalTabs - 1) {
          flatListRef.current.scrollToEnd({ animated: true });
        } else {
          flatListRef.current.scrollToIndex({
            index: info.index,
            animated: true,
            viewPosition: 0.5,
          });
        }
      }
    }, 100);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        ref={flatListRef}
        data={StockFilterTabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        onScrollToIndexFailed={onScrollToIndexFailed}
        getItemLayout={(data, index) => {
          // Approximate item layout for better scrollToIndex performance
          const ITEM_WIDTH = 100; // Approximate width
          return {
            length: ITEM_WIDTH,
            offset: ITEM_WIDTH * index,
            index,
          };
        }}
        ItemSeparatorComponent={() => <View style={{ width: 4 }} />} // <-- Space between tabs
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => handleTabPress(item, index)}
            onLayout={(e) => onTabLayout(item, e)}
            style={[
              styles.tab,
              { backgroundColor: theme.tabbutton },
              activeTab === item && { backgroundColor: theme.tabActive },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                { color: theme.text },
                activeTab === item && { color: "#fff" },
              ]}
            >
              {item}
            </Text>
          </Pressable>
        )}
      />
      <View style={styles.listWrapper}>
        <StockCard stockListData={displayedData} />
      </View>
      <Pressable
        onPress={() => console.log(`See more from ${activeTab}`)}
        style={[
          styles.seeMoreBtn,
          // { backgroundColor: theme.accent, shadowColor: theme.shadow },
        ]}
      >
        <Text style={[styles.seeMoreText, { color: "#fff" }]}>See More</Text>
      </Pressable>
    </View>
  );
};

export default FilterTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    // marginRight: 8,
    alignItems: "center",
  },
  tabText: {
    fontSize: 13,
    fontWeight: "500",
  },
  listWrapper: {
    marginTop: 10,
    // paddingHorizontal: 10,
  },
  seeMoreBtn: {
    alignSelf: "flex-end",
    // marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 3,
  },
  seeMoreText: {
    fontWeight: "600",
    fontSize: 14,
  },
});

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  Platform,
  UIManager,
  findNodeHandle,
  Dimensions,
} from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { DimensionValue } from "react-native";
import { useThemeColors } from "@/context/ThemeContext";

interface CustomDropdownProps {
  options: string[];
  value?: string;
  onChange?: (selected: string) => void;
  width?: DimensionValue;
}

const screenHeight = Dimensions.get("window").height;

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  width = 140, // default width if parent doesn't provide
}) => {
  const [selected, setSelected] = useState(value);
  const [open, setOpen] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const optionHeight = 4 * 2 + 14; // paddingVertical * 2 + fontSize (approximate)
  const dropdownHeight = Math.min(options.length * optionHeight, 200); // maxHeight = 200

  const dropdownRef = useRef<any>(null);
  const colors = useThemeColors();

  const openDropdown = () => {
    if (!dropdownRef.current) return;

    if (Platform.OS === "web") {
      const rect = dropdownRef.current.getBoundingClientRect();
      const windowScrollY = window.scrollY || window.pageYOffset;
      const windowScrollX = window.scrollX || window.pageXOffset;
      const pos = {
        x: rect.left + windowScrollX,
        y: rect.top + windowScrollY,
        width: rect.width,
        height: rect.height,
      };
      setDropdownPos(pos);
      setOpenUpwards(pos.y + rect.height > screenHeight / 2);
      setOpen(true);
    } else {
      const nodeHandle = findNodeHandle(dropdownRef.current);
      if (nodeHandle) {
        UIManager.measureInWindow(nodeHandle, (x, y, measuredWidth, height) => {
          const pos = { x, y, width: measuredWidth, height };
          setDropdownPos(pos);
          setOpenUpwards(y + height > screenHeight / 2);
          setOpen(true);
        });
      }
    }
  };

  const handleSelect = (option: string) => {
    setSelected(option);
    setOpen(false);
    onChange?.(option);
  };
 return (
    <View>
      <TouchableOpacity
        ref={dropdownRef}
        style={[
          styles.selected,
          {
            width,
            backgroundColor: colors.cardBackground,
            shadowColor: colors.shadow,
          },
        ]}
        onPress={openDropdown}
        activeOpacity={0.8}
      >
        <Text style={[styles.selectedText, { color: colors.text }]}>
          {selected}
        </Text>
        {open ? (
          <ChevronUp color={colors.icon} width={18} height={18} strokeWidth={2} />
        ) : (
          <ChevronDown color={colors.icon} width={18} height={18} strokeWidth={2} />
        )}
      </TouchableOpacity>

      {open && (
        <Modal
          visible={open}
          transparent
          animationType="fade"
          onRequestClose={() => setOpen(false)}
        >
          <TouchableOpacity
            style={[styles.overlay, { backgroundColor: colors.backdrop }]}
            activeOpacity={1}
            onPress={() => setOpen(false)}
          >
            <View
              style={[
                styles.options,
                {
                  left: dropdownPos.x,
                  width: dropdownPos.width,
                  top: openUpwards
                    ? dropdownPos.y - dropdownHeight - 2 - 40
                    : dropdownPos.y + dropdownPos.height + 2,
                  backgroundColor: colors.dropdownBackground,
                  shadowColor: colors.shadow,
                },
              ]}
            >
              <FlatList
                data={options}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleSelect(item)}
                    activeOpacity={0.6}
                  >
                    <Text style={[styles.optionText, { color: colors.text }]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selected: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  selectedText: {
    fontSize: 14,
  },
  overlay: {
    flex: 1,
  },
  options: {
    position: "absolute",
    borderRadius: 6,
    overflow: "hidden",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
    maxHeight: 200,
  },
  option: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  optionText: {
    fontSize: 14,
  },
});

export default CustomDropdown;
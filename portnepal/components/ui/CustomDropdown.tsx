import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Platform,
  UIManager,
  findNodeHandle,
} from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";

interface CustomDropdownProps {
  options: string[];
  value?: string;
  onChange?: (selected: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value = "All",
  onChange,
}) => {
  const [selected, setSelected] = useState(value);
  const [open, setOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0, width: 0 });
const dropdownRef = useRef<React.ElementRef<typeof TouchableOpacity>>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    setOpen(false);
    onChange?.(option);
  };

  const openDropdown = () => {
    if (!dropdownRef.current) return;

    if (Platform.OS === "web") {
      const rect = (dropdownRef.current as any).getBoundingClientRect();
      setDropdownPos({ x: rect.left, y: rect.bottom, width: rect.width });
      setOpen(true);
    } else {
      const nodeHandle = findNodeHandle(dropdownRef.current);
      if (nodeHandle) {
        UIManager.measure(
          nodeHandle,
          (x, y, width, height, pageX, pageY) => {
            setDropdownPos({ x: pageX, y: pageY + height, width });
            setOpen(true);
          }
        );
      }
    }
  };

  return (
    <View>
      <TouchableOpacity
        ref={dropdownRef}
        style={styles.selected}
        onPress={openDropdown}
        activeOpacity={0.8}
      >
        <Text style={styles.selectedText}>{selected}</Text>
        {open ? (
          <ChevronUp color="white" width={16} height={16}  strokeWidth={3}/>
        ) : (
          <ChevronDown color="white" width={16} height={16} strokeWidth={3}/>
        )}
      </TouchableOpacity>

      {open && (
        <Modal
          visible={open}
          transparent
          animationType="none"
          onRequestClose={() => setOpen(false)}
        >
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setOpen(false)}
          >
            <View
              style={[
                styles.options,
                {
                  top: dropdownPos.y,
                  left: dropdownPos.x,
                  width: dropdownPos.width,
                },
              ]}
            >
              <FlatList
                data={options}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={styles.optionText}>{item}</Text>
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
    backgroundColor: "#2a2f3b",
    display:"flex",
    paddingHorizontal: 10,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 100,
    height:35,
  },
  selectedText: {
    color: "white",
    fontSize: 12,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  options: {
    position: "absolute",
    backgroundColor: "#2a2f3b",
    borderRadius: 5,
    overflow: "hidden",
    zIndex: 9999,
    marginTop: -15,
  },
  option: {
    padding: 10,
    borderBottomColor: "#323741",
    borderBottomWidth: 1,
  },
  optionText: {
    color: "white",
    fontSize: 15,
  },
});

export default CustomDropdown;

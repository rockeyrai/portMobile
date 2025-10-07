import { useThemeColors } from "@/context/ThemeContext";
import { ChevronDown, LogOut, Plus } from "lucide-react-native";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";

const AdvSlideCard = () => {
  const mobileTheme = useThemeColors();
  const otheraccount = [1, 2];
  const [isOpen, setIsOpen] = useState();
  return (
    <View>
      <View className={`${isOpen?"rounded-b-full": "rounded-full"}`} >
        <Text> Show More Accounts</Text>
        <View>
          {otheraccount?.[0] || !isOpen && (
            <Image src={"../../assets/logo/portfolio.png"} />
          )}
          <ChevronDown size={20} color={mobileTheme.muted} />
        </View>
      </View>
      {otheraccount?.[0] && (
        <View className="rounded-full">
          <View className="flex flex-col items-center justify-center">
            <Image src={"../../assets/logo/portfolio.png"} />
            <View>
              <Text> Rockey rai</Text>
              <Text>rockeyraio234@gamil.com</Text>
            </View>
          </View>
        </View>
      )}
      <View className="rounded-full">
        <Plus size={20} color={mobileTheme.muted} />
        <Text>Add another account</Text>
      </View>
      <View className="rounded-b-full">
        <LogOut size={20} color={mobileTheme.muted} />
        <Text>Sing out </Text>
      </View>
    </View>
  );
};

export default AdvSlideCard;

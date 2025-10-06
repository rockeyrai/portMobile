import * as Haptics from "expo-haptics";

const styleMap: Record<"light" | "medium" | "heavy" | "rigid" | "soft", Haptics.ImpactFeedbackStyle> = {
  light: Haptics.ImpactFeedbackStyle.Light,
  medium: Haptics.ImpactFeedbackStyle.Medium,
  heavy: Haptics.ImpactFeedbackStyle.Heavy,
  rigid: Haptics.ImpactFeedbackStyle.Rigid,
  soft: Haptics.ImpactFeedbackStyle.Soft,
};

export function hapticFeedback(style: keyof typeof styleMap) {
  return Haptics.impactAsync(styleMap[style]);
}

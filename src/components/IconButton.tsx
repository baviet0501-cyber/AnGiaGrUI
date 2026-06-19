import { PropsWithChildren } from "react";
import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { colors, radius } from "@/theme";

type IconButtonProps = Omit<PressableProps, "style"> & PropsWithChildren<{
  size?: "sm" | "md";
  style?: StyleProp<ViewStyle>;
}>;

export function IconButton({ children, size = "md", style, ...props }: IconButtonProps) {
  return (
    <Pressable style={({ pressed }) => [styles.button, size === "sm" && styles.buttonSm, pressed && styles.pressed, style]} {...props}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { alignItems: "center", backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.pill, borderWidth: 1, height: 44, justifyContent: "center", width: 44 },
  buttonSm: { height: 34, width: 34 },
  pressed: { opacity: 0.75 }
});

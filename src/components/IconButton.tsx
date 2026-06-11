import { PropsWithChildren } from "react";
import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { colors, radius } from "@/theme";

type IconButtonProps = Omit<PressableProps, "style"> & PropsWithChildren<{ style?: StyleProp<ViewStyle> }>;

export function IconButton({ children, style, ...props }: IconButtonProps) {
  return (
    <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed, style]} {...props}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { alignItems: "center", backgroundColor: colors.surface, borderRadius: radius.pill, height: 44, justifyContent: "center", width: 44 },
  pressed: { opacity: 0.75 }
});

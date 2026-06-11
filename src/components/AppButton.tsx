import { PropsWithChildren } from "react";
import { Pressable, PressableProps, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";
import { colors, radius, spacing, typography } from "@/theme";

type AppButtonProps = Omit<PressableProps, "style"> & PropsWithChildren<{ variant?: "primary" | "secondary" | "ghost"; style?: StyleProp<ViewStyle> }>; 

export function AppButton({ children, variant = "primary", style, ...props }: AppButtonProps) {
  return (
    <Pressable style={({ pressed }) => [styles.base, styles[variant], pressed && styles.pressed, style]} {...props}>
      <Text style={[styles.label, variant === "ghost" && styles.ghostLabel]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: "center", borderRadius: radius.pill, minHeight: 52, justifyContent: "center", paddingHorizontal: spacing.xl },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.secondary },
  ghost: { backgroundColor: "transparent" },
  pressed: { opacity: 0.8 },
  label: { ...typography.label, color: colors.white },
  ghostLabel: { color: colors.primary }
});


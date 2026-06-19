import { PropsWithChildren } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, PressableProps, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";
import { colors, radius, spacing, typography } from "@/theme";

type AppButtonProps = Omit<PressableProps, "style"> & PropsWithChildren<{
  variant?: "primary" | "secondary" | "ghost";
  style?: StyleProp<ViewStyle>;
}>;

export function AppButton({ children, variant = "primary", style, ...props }: AppButtonProps) {
  const label = <Text style={[styles.label, variant === "secondary" && styles.secondaryLabel, variant === "ghost" && styles.ghostLabel]}>{children}</Text>;

  if (variant === "ghost") {
    return (
      <Pressable style={({ pressed }) => [styles.base, styles.ghost, pressed && styles.pressed, style]} {...props}>
        {label}
      </Pressable>
    );
  }

  return (
    <Pressable style={({ pressed }) => [styles.base, pressed && styles.pressed, style]} {...props}>
      <LinearGradient
        colors={variant === "secondary" ? [colors.accent, colors.secondary] : [colors.primaryDark, colors.primary]}
        end={{ x: 1, y: 1 }}
        start={{ x: 0, y: 0 }}
        style={styles.gradientFill}
      >
        {label}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: "stretch", borderRadius: radius.pill, minHeight: 52, justifyContent: "center", overflow: "hidden" },
  gradientFill: { alignItems: "center", flex: 1, justifyContent: "center", minHeight: 52, paddingHorizontal: spacing.xl },
  ghost: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    paddingHorizontal: spacing.xl
  },
  pressed: { opacity: 0.8 },
  label: { ...typography.label, color: colors.white },
  secondaryLabel: { color: colors.primaryDark },
  ghostLabel: { color: colors.primary }
});

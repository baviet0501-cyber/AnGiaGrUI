import { TextInput, TextInputProps, StyleSheet, View, Text } from "react-native";
import { colors, radius, spacing, typography } from "@/theme";

type AppTextInputProps = TextInputProps & { label: string };

export function AppTextInput({ label, style, ...props }: AppTextInputProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput placeholderTextColor={colors.textMuted} style={[styles.input, style]} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.sm },
  label: { ...typography.label, color: colors.text },
  input: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, color: colors.text, minHeight: 52, paddingHorizontal: spacing.lg, ...typography.body }
});

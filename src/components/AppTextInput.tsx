import { TextInput, TextInputProps, StyleSheet, View, Text } from "react-native";
import { colors, radius, spacing, typography } from "@/theme";

type AppTextInputProps = TextInputProps & {
  error?: string;
  label: string;
};

export function AppTextInput({ error, label, style, ...props }: AppTextInputProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.textMuted}
        style={[styles.input, error && styles.inputError, style]}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.sm },
  label: { ...typography.label, color: colors.text },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.text,
    minHeight: 52,
    paddingHorizontal: spacing.lg,
    ...typography.body
  },
  inputError: { borderColor: colors.danger },
  error: { ...typography.caption, color: colors.danger }
});

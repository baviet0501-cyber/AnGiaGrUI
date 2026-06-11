import { Image, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { appAssets } from "@/assets";
import { colors, spacing, typography } from "@/theme";
import { IconButton } from "./IconButton";

type HeaderProps = { title: string; subtitle?: string; showBack?: boolean };

export function Header({ title, subtitle, showBack }: HeaderProps) {
  return (
    <View style={styles.header}>
      {showBack ? (
        <IconButton onPress={() => router.back()}>
          <ArrowLeft color={colors.text} size={22} strokeWidth={2.5} />
        </IconButton>
      ) : (
        <Image source={appAssets.logo} style={styles.logo} />
      )}
      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: "center", flexDirection: "row", gap: spacing.md, marginBottom: spacing.xl },
  logo: { height: 44, width: 44 },
  textBlock: { flex: 1 },
  title: { ...typography.h3, color: colors.text },
  subtitle: { ...typography.caption, color: colors.textMuted }
});

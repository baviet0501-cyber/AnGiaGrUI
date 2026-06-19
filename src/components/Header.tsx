import { Image, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { ArrowLeft, Bell } from "lucide-react-native";
import { appAssets } from "@/assets";
import { colors, spacing, typography } from "@/theme";
import { IconButton } from "./IconButton";

type HeaderProps = {
  compact?: boolean;
  showBack?: boolean;
  showNotification?: boolean;
  subtitle?: string;
  title: string;
};

function goBack() {
  if (router.canGoBack()) {
    router.back();
    return;
  }

  router.replace("/(tabs)/home");
}

export function Header({ title, subtitle, showBack, showNotification = false, compact = false }: HeaderProps) {
  return (
    <View style={[styles.header, compact && styles.compactHeader]}>
      {showBack ? (
        <IconButton size="sm" onPress={goBack}>
          <ArrowLeft color={colors.text} size={18} strokeWidth={2.5} />
        </IconButton>
      ) : compact ? (
        <View style={styles.headerSpacer} />
      ) : (
        <Image source={appAssets.logo} style={styles.logo} />
      )}
      <View style={[styles.textBlock, compact && styles.compactTextBlock]}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && !compact ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {showNotification ? (
        <IconButton
          accessibilityLabel="Mở thông báo"
          size="sm"
          style={styles.notificationButton}
          onPress={() => router.push("/notifications")}
        >
          <Bell color={colors.primaryDark} size={18} strokeWidth={2.4} />
        </IconButton>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: "center", flexDirection: "row", gap: spacing.md, minHeight: 52, marginBottom: spacing.xl },
  compactHeader: { height: 44, marginBottom: spacing.lg, minHeight: 44 },
  compactTextBlock: { alignItems: "center" },
  headerSpacer: { height: 34, width: 34 },
  logo: { height: 52, resizeMode: "contain", width: 124 },
  notificationButton: { backgroundColor: colors.accentSoft },
  textBlock: { flex: 1 },
  title: { ...typography.h3, color: colors.text },
  subtitle: { ...typography.caption, color: colors.textMuted }
});

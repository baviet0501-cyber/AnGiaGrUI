import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { appAssets } from "@/assets";
import { Screen } from "@/components";
import { colors, spacing, typography } from "@/theme";

export default function SplashScreen() {
  useEffect(() => {
    const timeout = setTimeout(() => router.replace("/(auth)/welcome"), 900);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Screen padded={false}>
      <View style={styles.center}>
        <Image source={appAssets.splash} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>An Gia Green</Text>
        <Text style={styles.subtitle}>Chăm sóc khách hàng thông minh</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: "center", flex: 1, justifyContent: "center", padding: spacing.xl },
  logo: { height: 112, marginBottom: spacing.xl, width: 112 },
  title: { ...typography.h1, color: colors.primary },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: spacing.sm }
});


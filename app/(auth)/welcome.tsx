import { Image, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { appAssets } from "@/assets";
import { AppButton, Screen } from "@/components";
import { spacing } from "@/theme";

export default function WelcomeScreen() {
  return (
    <Screen>
      <View style={styles.content}>
        <Image source={appAssets.logo} style={styles.logo} />
      </View>
      <View style={styles.actions}>
        <AppButton onPress={() => router.push("/(auth)/login")}>Bắt đầu</AppButton>
        <AppButton variant="ghost" onPress={() => router.push("/(auth)/login")}>Đã có tài khoản? Đăng nhập</AppButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { alignItems: "center", flex: 1, justifyContent: "center" },
  logo: { height: 112, resizeMode: "contain", width: 190 },
  actions: { gap: spacing.md }
});

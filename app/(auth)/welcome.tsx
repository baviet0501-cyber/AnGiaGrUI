import { Image, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { appAssets } from "@/assets";
import { AppButton, Screen } from "@/components";
import { colors, spacing, typography } from "@/theme";

export default function WelcomeScreen() {
  return (
    <Screen>
      <View style={styles.hero}>
        <Image source={appAssets.logo} style={styles.logo} />
        <Text style={styles.title}>Kết nối chăm sóc khách hàng từ sản phẩm đến tư vấn</Text>
        <Text style={styles.body}>Theo dõi nguồn gốc, đặt câu hỏi cho chuyên gia và lưu lịch sử hỗ trợ trong một ứng dụng.</Text>
      </View>
      <AppButton onPress={() => router.push("/(auth)/login")}>Bắt đầu</AppButton>
      <AppButton variant="ghost" onPress={() => router.push("/(auth)/login")}>Đã có tài khoản? Đăng nhập</AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: "center", flex: 1, justifyContent: "center", gap: spacing.lg },
  logo: { height: 104, width: 104 },
  title: { ...typography.h1, color: colors.text, textAlign: "center" },
  body: { ...typography.body, color: colors.textMuted, textAlign: "center" }
});

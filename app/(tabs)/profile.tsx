import { StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { AppButton, Card, Header, Screen } from "@/components";
import { colors, spacing, typography } from "@/theme";

export default function ProfileScreen() {
  return (
    <Screen scroll>
      <Header title="Hồ sơ" subtitle="Thông tin khách hàng và hạng hội viên" />
      <Card style={styles.profileCard}>
        <Text style={styles.name}>Nguyễn Khách Hàng</Text>
        <Text style={styles.body}>An Gia Green Member · 1.250 điểm</Text>
      </Card>
      <AppButton onPress={() => router.push("/membership")}>An Gia Green Membership</AppButton>
      <AppButton variant="ghost" onPress={() => router.replace("/(auth)/login")}>Đăng xuất</AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  profileCard: { marginBottom: spacing.xl },
  name: { ...typography.h2, color: colors.text },
  body: { ...typography.body, color: colors.textMuted, marginTop: spacing.sm }
});


import { Alert, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Gift, HeartHandshake, ShieldCheck } from "lucide-react-native";
import { AppButton, FeatureTile, Header, MetricStrip, Screen, ShowcaseHero } from "@/components";
import { activeMembershipTier, membershipStats } from "@/data/mock";
import { useAuth } from "@/features/auth";
import { colors, spacing, typography } from "@/theme";

export default function ProfileScreen() {
  const { customer, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch {
      Alert.alert("Đăng xuất cục bộ", "App đã xóa phiên demo hiện tại trên thiết bị.");
    } finally {
      router.replace("/(auth)/login");
    }
  }

  return (
    <Screen scroll style={styles.screenContent}>
      <Header title="Hồ sơ" showNotification compact />
      <ShowcaseHero
        eyebrow={customer?.username ?? "Green Care"}
        palette={activeMembershipTier.palette}
        title={customer?.fullName || activeMembershipTier.label}
        body={customer?.email ? customer.email : "Hồ sơ hội viên và quyền lợi cá nhân."}
      >
        <MetricStrip
          palette={activeMembershipTier.palette}
          items={[
            { label: "điểm", value: membershipStats.points },
            { label: "hạng", value: activeMembershipTier.label },
            { label: "lịch sử", value: membershipStats.historyCount }
          ]}
        />
      </ShowcaseHero>
      {customer ? (
        <View style={styles.accountInfo}>
          <Text style={styles.accountTitle}>Tài khoản demo</Text>
          <Text style={styles.accountText}>{customer.username}</Text>
        </View>
      ) : null}
      <View style={styles.benefits}>
        <FeatureTile body="Ưu tiên phản hồi." icon={<HeartHandshake color={colors.primaryDark} size={18} strokeWidth={2.5} />} title="Chăm sóc" />
        <FeatureTile body="Ưu đãi cá nhân hóa." icon={<Gift color={colors.primaryDark} size={18} strokeWidth={2.5} />} title="Quyền lợi" />
        <FeatureTile body="Lô sản phẩm đã xác thực." icon={<ShieldCheck color={colors.primaryDark} size={18} strokeWidth={2.5} />} title="An tâm" />
      </View>
      <AppButton onPress={() => router.push("/membership")}>An Gia Green Membership</AppButton>
      <AppButton variant="ghost" onPress={handleLogout}>Đăng xuất</AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: { paddingTop: 0 },
  accountInfo: { gap: spacing.xs, marginBottom: spacing.lg, marginTop: -spacing.md },
  accountTitle: { ...typography.caption, color: colors.textMuted },
  accountText: { ...typography.label, color: colors.text },
  benefits: { gap: spacing.md, marginBottom: spacing.xl }
});
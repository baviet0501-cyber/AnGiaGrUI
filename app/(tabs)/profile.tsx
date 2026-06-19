import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Gift, HeartHandshake, ShieldCheck } from "lucide-react-native";
import { AppButton, FeatureTile, Header, MetricStrip, Screen, ShowcaseHero } from "@/components";
import { activeMembershipTier, membershipStats } from "@/data/mock";
import { colors, spacing } from "@/theme";

export default function ProfileScreen() {
  return (
    <Screen scroll style={styles.screenContent}>
      <Header title="Hồ sơ" showNotification compact />
      <ShowcaseHero
        eyebrow="Green Care"
        palette={activeMembershipTier.palette}
        title={activeMembershipTier.label}
        body="Hồ sơ hội viên và quyền lợi cá nhân."
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
      <View style={styles.benefits}>
        <FeatureTile body="Ưu tiên phản hồi." icon={<HeartHandshake color={colors.primaryDark} size={18} strokeWidth={2.5} />} title="Chăm sóc" />
        <FeatureTile body="Ưu đãi cá nhân hóa." icon={<Gift color={colors.primaryDark} size={18} strokeWidth={2.5} />} title="Quyền lợi" />
        <FeatureTile body="Lô sản phẩm đã xác thực." icon={<ShieldCheck color={colors.primaryDark} size={18} strokeWidth={2.5} />} title="An tâm" />
      </View>
      <AppButton onPress={() => router.push("/membership")}>An Gia Green Membership</AppButton>
      <AppButton variant="ghost" onPress={() => router.replace("/(auth)/login")}>Đăng xuất</AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: { paddingTop: 0 },
  benefits: { gap: spacing.md, marginBottom: spacing.xl }
});


import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Gift, HeartHandshake, ShieldCheck } from "lucide-react-native";
import { AppButton, FeatureTile, Header, MetricStrip, Screen, ShowcaseHero } from "@/components";
import { colors, spacing } from "@/theme";

export default function ProfileScreen() {
  return (
    <Screen scroll style={styles.screenContent}>
      <Header title="Hồ sơ" showNotification compact />
      <ShowcaseHero
        eyebrow="Green Care"
        title="Nguyễn Khách Hàng"
        body="Hồ sơ hội viên dùng để cá nhân hóa tư vấn, ưu đãi và lịch sử chăm sóc."
      >
        <MetricStrip
          items={[
            { label: "điểm", value: "1.250" },
            { label: "hạng", value: "Green" },
            { label: "lịch sử", value: "12" }
          ]}
        />
      </ShowcaseHero>
      <View style={styles.benefits}>
        <FeatureTile
          body="Ưu tiên phản hồi và lưu ngữ cảnh tư vấn."
          icon={<HeartHandshake color={colors.primaryDark} size={18} strokeWidth={2.5} />}
          title="Chăm sóc"
        />
        <FeatureTile
          body="Ưu đãi cá nhân hóa theo hành vi mua hàng."
          icon={<Gift color={colors.primaryDark} size={18} strokeWidth={2.5} />}
          title="Quyền lợi"
        />
        <FeatureTile
          body="Thông tin sản phẩm và lô đã xác thực."
          icon={<ShieldCheck color={colors.primaryDark} size={18} strokeWidth={2.5} />}
          title="An tâm"
        />
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

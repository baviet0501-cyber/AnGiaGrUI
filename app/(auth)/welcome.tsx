import { Image, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { MessageCircle, ShieldCheck, Sprout } from "lucide-react-native";
import { appAssets } from "@/assets";
import { AppButton, FeatureTile, MetricStrip, Screen, ShowcaseHero } from "@/components";
import { colors, spacing } from "@/theme";

export default function WelcomeScreen() {
  return (
    <Screen scroll>
      <View style={styles.hero}>
        <Image source={appAssets.logo} style={styles.logo} />
        <ShowcaseHero
          eyebrow="Customer care hub"
          style={styles.heroCard}
          title="Kết nối sản phẩm sạch với tư vấn cá nhân"
          body="Một app cho khách hàng kiểm tra nguồn gốc, nhận hỗ trợ và theo dõi quyền lợi hội viên An Gia Green."
        >
          <MetricStrip
            items={[
              { label: "hồ sơ", value: "CRM" },
              { label: "truy xuất", value: "QR" },
              { label: "hỗ trợ", value: "Chat" }
            ]}
          />
        </ShowcaseHero>
        <View style={styles.featureRow}>
          <FeatureTile
            body="Quét mã lô và xem thông tin chứng nhận."
            icon={<ShieldCheck color={colors.primaryDark} size={18} strokeWidth={2.5} />}
            style={styles.featureTile}
            title="Minh bạch"
          />
          <FeatureTile
            body="Nhận tư vấn và lưu lịch sử chăm sóc."
            icon={<MessageCircle color={colors.primaryDark} size={18} strokeWidth={2.5} />}
            style={styles.featureTile}
            title="CSKH"
          />
          <FeatureTile
            body="Theo dõi điểm xanh và ưu đãi hội viên."
            icon={<Sprout color={colors.primaryDark} size={18} strokeWidth={2.5} />}
            style={styles.featureTile}
            title="Hội viên"
          />
        </View>
      </View>
      <AppButton onPress={() => router.push("/(auth)/login")}>Bắt đầu</AppButton>
      <AppButton variant="ghost" onPress={() => router.push("/(auth)/login")}>Đã có tài khoản? Đăng nhập</AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: "center", flex: 1, gap: spacing.lg, justifyContent: "center", paddingVertical: spacing.lg },
  logo: { height: 92, resizeMode: "contain", width: 160 },
  heroCard: { width: "100%" },
  featureRow: { gap: spacing.md, width: "100%" },
  featureTile: { minHeight: 116 }
});

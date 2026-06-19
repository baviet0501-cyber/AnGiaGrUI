import { Image, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Bell, MessageCircle, Newspaper, Package, ScanQrCode } from "lucide-react-native";
import { FeatureTile, IconButton, MetricStrip, Screen, ShowcaseHero } from "@/components";
import { appAssets } from "@/assets";
import { activeMembershipTier, membershipStats } from "@/data/mock";
import { colors, spacing, typography } from "@/theme";

const shortcuts = [
  { body: "Danh mục sản phẩm sạch.", icon: Package, label: "Sản phẩm", meta: "Shop", route: "/(tabs)/products" },
  { body: "Kiểm tra lô và chứng nhận.", icon: ScanQrCode, label: "Truy xuất", meta: "QR", route: "/(tabs)/trace" },
  { body: "Hỏi đáp và lưu tư vấn.", icon: MessageCircle, label: "Chat CSKH", meta: "24/7", route: "/(tabs)/chat" },
  { body: "Tin mới từ website.", icon: Newspaper, label: "Tin tức", meta: "News", route: "/news/traceability" }
] as const;

function navigateShortcut(route: (typeof shortcuts)[number]["route"]) {
  if (route.startsWith("/(tabs)")) {
    router.replace(route);
    return;
  }

  router.push(route);
}

export default function HomeScreen() {
  return (
    <Screen scroll style={styles.screenContent}>
      <View style={styles.header}>
        <Image source={appAssets.logo} style={styles.logo} />
        <IconButton accessibilityLabel="Mở thông báo" size="sm" style={styles.notificationButton} onPress={() => router.push("/notifications")}>
          <Bell color={colors.primaryDark} size={18} strokeWidth={2.4} />
        </IconButton>
      </View>

      <ShowcaseHero
        eyebrow={activeMembershipTier.label}
        palette={activeMembershipTier.palette}
        title="Chăm sóc khách hàng từ nguồn gốc đến tư vấn"
        body="Xem tin tức, sản phẩm và hỗ trợ CSKH."
      >
        <MetricStrip
          palette={activeMembershipTier.palette}
          items={[
            { label: "điểm xanh", value: membershipStats.points },
            { label: "lô xác thực", value: membershipStats.verifiedBatches },
            { label: "phản hồi", value: membershipStats.responseTime }
          ]}
        />
      </ShowcaseHero>
      <Text style={styles.sectionTitle}>Truy cập nhanh</Text>
      <View style={styles.grid}>
        {shortcuts.map(item => {
          const Icon = item.icon;
          return <FeatureTile key={item.label} body={item.body} icon={<Icon color={colors.primaryDark} size={18} strokeWidth={2.5} />} meta={item.meta} style={styles.shortcut} title={item.label} onPress={() => navigateShortcut(item.route)} />;
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: { paddingTop: 0 },
  header: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.sm, minHeight: 44 },
  logo: { height: 36, resizeMode: "contain", width: 86 },
  notificationButton: { backgroundColor: colors.accentSoft },
  sectionTitle: { ...typography.h2, color: colors.text, fontSize: 20 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md, marginBottom: spacing.xl, marginTop: spacing.md },
  shortcut: { width: "47%" }
});



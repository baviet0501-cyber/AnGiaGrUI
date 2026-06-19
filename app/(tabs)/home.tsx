import { Image, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Bell, MessageCircle, Newspaper, Package, ScanQrCode } from "lucide-react-native";
import { AppButton, FeatureTile, IconButton, MetricStrip, Screen, ShowcaseHero } from "@/components";
import { appAssets } from "@/assets";
import { colors, spacing, typography } from "@/theme";

const shortcuts = [
  { body: "Dược liệu, trà và sản phẩm sạch đã phân nhóm.", icon: Package, label: "Sản phẩm", meta: "Shop", route: "/(tabs)/products" },
  { body: "Quét batch QR để xem lô, chứng nhận và lịch sử.", icon: ScanQrCode, label: "Truy xuất", meta: "QR", route: "/(tabs)/trace" },
  { body: "Gửi câu hỏi chăm sóc sức khỏe và lưu hồ sơ tư vấn.", icon: MessageCircle, label: "Chat CSKH", meta: "24/7", route: "/(tabs)/chat" },
  { body: "Cập nhật minh bạch nguồn gốc và quyền lợi hội viên.", icon: Newspaper, label: "Tin tức", meta: "News", route: "/news/traceability" }
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
        <IconButton
          accessibilityLabel="Mở thông báo"
          size="sm"
          style={styles.notificationButton}
          onPress={() => router.push("/notifications")}
        >
          <Bell color={colors.primaryDark} size={18} strokeWidth={2.4} />
        </IconButton>
      </View>

      <ShowcaseHero
        eyebrow="An Gia Green CSKH"
        title="Chăm sóc khách hàng từ nguồn gốc đến tư vấn"
        body="Theo dõi sản phẩm, nhận phản hồi và đồng bộ hồ sơ khách hàng trong một trải nghiệm gọn, rõ, sẵn sàng kết nối backend."
      >
        <MetricStrip
          items={[
            { label: "điểm xanh", value: "1.250" },
            { label: "lô xác thực", value: "08" },
            { label: "phản hồi", value: "2h" }
          ]}
        />
      </ShowcaseHero>
      <Text style={styles.sectionTitle}>Truy cập nhanh</Text>
      <View style={styles.grid}>
        {shortcuts.map(item => {
          const Icon = item.icon;
          return (
            <FeatureTile
              key={item.label}
              body={item.body}
              icon={<Icon color={colors.primaryDark} size={18} strokeWidth={2.5} />}
              meta={item.meta}
              style={styles.shortcut}
              title={item.label}
              onPress={() => navigateShortcut(item.route)}
            />
          );
        })}
      </View>
      <AppButton onPress={() => router.push("/notifications")}>Xem thông báo</AppButton>
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

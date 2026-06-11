import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppButton, Card, Header, Screen } from "@/components";
import { colors, spacing, typography } from "@/theme";

const shortcuts = [
  { label: "Sản phẩm", route: "/(tabs)/products" },
  { label: "Truy xuất", route: "/(tabs)/trace" },
  { label: "Chat CSKH", route: "/(tabs)/chat" },
  { label: "Tin tức", route: "/news/traceability" }
] as const;

export default function HomeScreen() {
  return (
    <Screen scroll>
      <Header title="Xin chào" subtitle="Hôm nay bạn cần hỗ trợ gì?" />
      <Card style={styles.heroCard}>
        <Text style={styles.heroTitle}>CRM-ready customer care hub</Text>
        <Text style={styles.heroBody}>Khuôn app đã tách sẵn luồng CSKH, chatbot và dữ liệu khách hàng để tích hợp backend sau.</Text>
      </Card>
      <View style={styles.grid}>
        {shortcuts.map(item => (
          <Card key={item.label} style={styles.shortcut}>
            <Text style={styles.shortcutText} onPress={() => router.push(item.route)}>{item.label}</Text>
          </Card>
        ))}
      </View>
      <AppButton onPress={() => router.push("/notifications")}>Xem thông báo</AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroCard: { backgroundColor: colors.primary },
  heroTitle: { ...typography.h2, color: colors.white },
  heroBody: { ...typography.body, color: colors.white, marginTop: spacing.sm },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md, marginVertical: spacing.xl },
  shortcut: { minHeight: 92, width: "47%" },
  shortcutText: { ...typography.label, color: colors.text }
});


import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Bell, ChevronLeft, Leaf } from "lucide-react-native";
import { products } from "@/data/mock";
import { colors, radius, shadows, spacing, typography } from "@/theme";

export default function ProductsScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.header}>
        <Pressable style={styles.circleButton} onPress={() => router.back()}>
          <ChevronLeft color={colors.text} size={18} strokeWidth={2.5} />
        </Pressable>
        <Text style={styles.headerTitle}>Sản phẩm sạch</Text>
        <Pressable style={[styles.circleButton, styles.alertButton]} onPress={() => router.push("/notifications")}>
          <Bell color="#C88A00" size={16} strokeWidth={2.4} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.memberCard}>
          <Text style={styles.memberBadge}>Herbal Care</Text>
          <Text style={styles.points}>2.840 điểm an tâm</Text>
          <Text style={styles.memberBody}>Tích điểm khi mua trà, dược liệu và thực phẩm sạch</Text>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Dược liệu & trà</Text>
          <Text style={styles.sectionCount}>3 sản phẩm</Text>
        </View>

        {products.map(product => (
          <Pressable key={product.id} style={styles.productCard} onPress={() => router.push(`/product/${product.id}`)}>
            <View style={styles.productThumb}>
              <View style={styles.productIconCircle}>
                <Leaf color="#4DBA50" size={24} strokeWidth={2.5} />
              </View>
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productTag}>{product.tag}</Text>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productDescription}>{product.description}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#EEF7F6" },
  header: { alignItems: "center", flexDirection: "row", height: 44, justifyContent: "space-between", paddingHorizontal: spacing.xl },
  circleButton: { alignItems: "center", backgroundColor: colors.white, borderRadius: radius.pill, height: 36, justifyContent: "center", width: 36 },
  alertButton: { backgroundColor: "#FFF1C9" },
  headerTitle: { ...typography.h3, color: colors.text },
  content: { paddingBottom: spacing.xxl, paddingHorizontal: spacing.xl, paddingTop: spacing.sm },
  memberCard: { backgroundColor: colors.primary, borderRadius: radius.lg, padding: spacing.lg, ...shadows.card },
  memberBadge: { ...typography.caption, alignSelf: "flex-start", backgroundColor: "rgba(255,255,255,0.18)", borderRadius: radius.pill, color: colors.white, overflow: "hidden", paddingHorizontal: spacing.sm, paddingVertical: 5 },
  points: { ...typography.h2, color: colors.white, marginTop: spacing.md },
  memberBody: { ...typography.body, color: "rgba(255,255,255,0.9)", marginTop: spacing.xs },
  progressTrack: { backgroundColor: "rgba(255,255,255,0.25)", borderRadius: radius.pill, height: 6, marginTop: spacing.md, overflow: "hidden" },
  progressFill: { backgroundColor: colors.secondary, borderRadius: radius.pill, height: 6, width: "76%" },
  sectionHeader: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.lg, marginTop: spacing.lg },
  sectionTitle: { ...typography.h2, color: colors.text, fontSize: 20 },
  sectionCount: { ...typography.caption, color: colors.primary, fontWeight: "800" },
  productCard: { alignItems: "center", backgroundColor: colors.white, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, flexDirection: "row", gap: spacing.lg, marginBottom: spacing.md, padding: spacing.md },
  productThumb: { alignItems: "center", backgroundColor: "#EAF7E8", borderRadius: radius.md, height: 82, justifyContent: "center", width: 74 },
  productIconCircle: { alignItems: "center", backgroundColor: colors.white, borderRadius: radius.pill, height: 42, justifyContent: "center", width: 42 },
  productInfo: { flex: 1 },
  productTag: { ...typography.caption, alignSelf: "flex-start", backgroundColor: "#DDF6D7", borderRadius: radius.pill, color: "#2A9C31", overflow: "hidden", paddingHorizontal: spacing.sm, paddingVertical: 4 },
  productName: { ...typography.h3, color: colors.text, marginTop: spacing.sm },
  productDescription: { ...typography.caption, color: colors.textMuted, marginTop: spacing.xs }
});

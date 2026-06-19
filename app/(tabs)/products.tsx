import { DimensionValue, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Leaf } from "lucide-react-native";
import { Header } from "@/components";
import { activeMembershipTier, membershipStats, products } from "@/data/mock";
import { colors, radius, shadows, spacing, typography } from "@/theme";

export default function ProductsScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.headerWrap}>
        <Header title="Sản phẩm sạch" showNotification compact />
      </View>

      <View style={styles.content}>
        <LinearGradient
          colors={activeMembershipTier.palette.gradient}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.52, 1]}
          start={{ x: 0, y: 0 }}
          style={[styles.memberCard, { borderColor: activeMembershipTier.palette.border }]}
        >
          <View style={[styles.memberGlow, { backgroundColor: activeMembershipTier.palette.glow }]} />
          <LinearGradient colors={["transparent", activeMembershipTier.palette.shine, "transparent"]} end={{ x: 1, y: 0 }} start={{ x: 0, y: 0 }} style={styles.memberSheen} />
          <Text style={[styles.memberBadge, { backgroundColor: activeMembershipTier.palette.badgeBackground }]}>{activeMembershipTier.label}</Text>
          <Text style={styles.points}>{membershipStats.points} điểm an tâm</Text>
          <Text style={styles.memberBody}>Đồng bộ điểm với CRM</Text>
          <View style={styles.progressTrack}>
            <LinearGradient colors={activeMembershipTier.palette.gradient} end={{ x: 1, y: 0 }} start={{ x: 0, y: 0 }} style={[styles.progressFill, { width: activeMembershipTier.progress as DimensionValue }]} />
          </View>
        </LinearGradient>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Dược liệu & trà</Text>
          <Text style={styles.sectionCount}>{products.length} sản phẩm</Text>
        </View>

        {products.map(product => (
          <Pressable key={product.id} style={styles.productCard} onPress={() => router.push("/product/" + product.id)}>
            <View style={styles.productThumb}>
              <View style={styles.productIconCircle}>
                <Leaf color={colors.secondaryDark} size={24} strokeWidth={2.5} />
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
  screen: { flex: 1, backgroundColor: colors.background },
  headerWrap: { paddingHorizontal: spacing.xl },
  content: { paddingBottom: spacing.xxl, paddingHorizontal: spacing.xl, paddingTop: spacing.sm },
  memberCard: { borderRadius: radius.lg, borderWidth: 1, overflow: "hidden", padding: spacing.lg, ...shadows.card },
  memberGlow: { borderRadius: radius.pill, height: 124, position: "absolute", right: -38, top: -52, width: 124 },
  memberSheen: { height: 176, left: -58, opacity: 0.82, position: "absolute", top: -28, transform: [{ rotate: "-18deg" }], width: 94 },
  memberBadge: { ...typography.caption, alignSelf: "flex-start", borderRadius: radius.pill, color: colors.white, overflow: "hidden", paddingHorizontal: spacing.sm, paddingVertical: 5 },
  points: { ...typography.h2, color: colors.white, marginTop: spacing.md },
  memberBody: { ...typography.body, color: "rgba(255,255,255,0.9)", marginTop: spacing.xs },
  progressTrack: { backgroundColor: "rgba(255,255,255,0.25)", borderRadius: radius.pill, height: 6, marginTop: spacing.md, overflow: "hidden" },
  progressFill: { borderRadius: radius.pill, height: 6 },
  sectionHeader: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.lg, marginTop: spacing.lg },
  sectionTitle: { ...typography.h2, color: colors.text, fontSize: 20 },
  sectionCount: { ...typography.caption, color: colors.primary, fontWeight: "800" },
  productCard: { alignItems: "center", backgroundColor: colors.white, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, flexDirection: "row", gap: spacing.lg, marginBottom: spacing.md, padding: spacing.md },
  productThumb: { alignItems: "center", backgroundColor: colors.secondarySoft, borderRadius: radius.md, height: 82, justifyContent: "center", width: 74 },
  productIconCircle: { alignItems: "center", backgroundColor: colors.white, borderRadius: radius.pill, height: 42, justifyContent: "center", width: 42 },
  productInfo: { flex: 1 },
  productTag: { ...typography.caption, alignSelf: "flex-start", backgroundColor: colors.secondarySoft, borderRadius: radius.pill, color: colors.secondaryDark, overflow: "hidden", paddingHorizontal: spacing.sm, paddingVertical: 4 },
  productName: { ...typography.h3, color: colors.text, marginTop: spacing.sm },
  productDescription: { ...typography.caption, color: colors.textMuted, marginTop: spacing.xs }
});


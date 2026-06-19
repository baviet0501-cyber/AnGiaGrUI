import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, DimensionValue, Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Leaf } from "lucide-react-native";
import { Header } from "@/components";
import { activeMembershipTier, membershipStats } from "@/data/mock";
import { fetchProducts, RemoteProduct } from "@/features/content";
import { colors, radius, shadows, spacing, typography } from "@/theme";

export default function ProductsScreen() {
  const [products, setProducts] = useState<RemoteProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadProducts = useCallback(async (showRefresh = false) => {
    if (showRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const items = await fetchProducts();
      setProducts(items);
      setError("");
    } catch {
      setProducts([]);
      setError("Chưa tải được sản phẩm từ website.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.headerWrap}>
        <Header title="Sản phẩm sạch" showNotification compact />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl colors={[colors.primary]} refreshing={isRefreshing} tintColor={colors.primary} onRefresh={() => loadProducts(true)} />}
        showsVerticalScrollIndicator={false}
      >
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

        {isLoading ? (
          <View style={styles.statusBox}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.statusText}>Đang tải sản phẩm từ website...</Text>
          </View>
        ) : null}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {!isLoading && !products.length ? <Text style={styles.statusText}>Chưa có sản phẩm để hiển thị.</Text> : null}

        {products.map(product => (
          <Pressable key={product.id} style={styles.productCard} onPress={() => router.push("/product/" + product.slug)}>
            <View style={styles.productThumb}>
              {product.imageUrl ? (
                <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
              ) : (
                <View style={styles.productIconCircle}>
                  <Leaf color={colors.secondaryDark} size={24} strokeWidth={2.5} />
                </View>
              )}
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productTag}>{product.tag}</Text>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productDescription} numberOfLines={2}>{product.shortDescription}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
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
  statusBox: { alignItems: "center", backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, gap: spacing.sm, marginBottom: spacing.md, padding: spacing.lg },
  statusText: { ...typography.body, color: colors.textMuted, textAlign: "center" },
  errorText: { ...typography.caption, color: colors.danger, marginBottom: spacing.md },
  productCard: { alignItems: "center", backgroundColor: colors.white, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, flexDirection: "row", gap: spacing.lg, marginBottom: spacing.md, padding: spacing.md },
  productThumb: { alignItems: "center", backgroundColor: colors.secondarySoft, borderRadius: radius.md, height: 86, justifyContent: "center", overflow: "hidden", width: 82 },
  productImage: { height: "100%", resizeMode: "cover", width: "100%" },
  productIconCircle: { alignItems: "center", backgroundColor: colors.white, borderRadius: radius.pill, height: 42, justifyContent: "center", width: 42 },
  productInfo: { flex: 1 },
  productTag: { ...typography.caption, alignSelf: "flex-start", backgroundColor: colors.secondarySoft, borderRadius: radius.pill, color: colors.secondaryDark, overflow: "hidden", paddingHorizontal: spacing.sm, paddingVertical: 4 },
  productName: { ...typography.h3, color: colors.text, marginTop: spacing.sm },
  productDescription: { ...typography.caption, color: colors.textMuted, marginTop: spacing.xs },
  productPrice: { ...typography.label, color: colors.primary, marginTop: spacing.sm }
});
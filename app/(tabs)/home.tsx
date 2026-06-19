import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Bell, Newspaper } from "lucide-react-native";
import { IconButton, MetricStrip, ShowcaseHero } from "@/components";
import { activeMembershipTier, membershipStats } from "@/data/mock";
import { fetchNews, RemoteNewsItem } from "@/features/content";
import { colors, radius, spacing, typography } from "@/theme";

export default function HomeScreen() {
  const [newsItems, setNewsItems] = useState<RemoteNewsItem[]>([]);
  const [isNewsLoading, setIsNewsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadNews = useCallback(async (showRefresh = false) => {
    if (showRefresh) {
      setIsRefreshing(true);
    } else {
      setIsNewsLoading(true);
    }

    try {
      const items = await fetchNews();
      setNewsItems(items);
      setError("");
    } catch {
      setNewsItems([]);
      setError("Chưa tải được tin tức từ website.");
    } finally {
      setIsNewsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.screenContent}
        refreshControl={<RefreshControl colors={[colors.primary]} refreshing={isRefreshing} tintColor={colors.primary} onRefresh={() => loadNews(true)} />}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerSide} />
          <Text style={styles.headerTitle}>Trang chủ</Text>
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

        <View style={styles.newsHeader}>
          <Text style={styles.sectionTitle}>Tin mới</Text>
          {isNewsLoading ? <ActivityIndicator color={colors.primary} size="small" /> : null}
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {!isNewsLoading && !newsItems.length ? <Text style={styles.statusText}>Chưa có tin tức để hiển thị.</Text> : null}
        {newsItems.map(item => (
          <Pressable key={item.id} style={styles.newsCard} onPress={() => router.push(`/news/${item.slug}`)}>
            {item.imageUrl ? <Image source={{ uri: item.imageUrl }} style={styles.newsImage} /> : <View style={styles.newsImageFallback}><Newspaper color={colors.primary} size={22} strokeWidth={2.4} /></View>}
            <View style={styles.newsContent}>
              <Text style={styles.newsDate}>{item.date} • {item.author}</Text>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsSummary} numberOfLines={3}>{item.summary}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  screenContent: { flexGrow: 1, padding: spacing.xl, paddingTop: 0, paddingBottom: spacing.xxl },
  header: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.sm, minHeight: 44 },
  headerSide: { width: 34 },
  headerTitle: { ...typography.h3, color: colors.text, flex: 1, textAlign: "center" },
  notificationButton: { backgroundColor: colors.accentSoft },
  sectionTitle: { ...typography.h2, color: colors.text, fontSize: 20 },
  newsHeader: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginTop: spacing.xl },
  newsCard: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, marginTop: spacing.md, overflow: "hidden" },
  newsImage: { backgroundColor: colors.secondarySoft, height: 176, resizeMode: "cover", width: "100%" },
  newsImageFallback: { alignItems: "center", backgroundColor: colors.primarySoft, height: 176, justifyContent: "center", width: "100%" },
  newsContent: { padding: spacing.md },
  newsDate: { ...typography.caption, color: colors.primary },
  newsTitle: { ...typography.h3, color: colors.text, marginTop: spacing.xs },
  newsSummary: { ...typography.body, color: colors.textMuted, marginTop: spacing.xs },
  statusText: { ...typography.body, color: colors.textMuted, marginTop: spacing.md, textAlign: "center" },
  errorText: { ...typography.caption, color: colors.danger, marginTop: spacing.md }
});
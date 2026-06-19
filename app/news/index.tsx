import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Card, Header, Screen } from "@/components";
import { fallbackNewsItems, fetchNews, RemoteNewsItem } from "@/features/content";
import { colors, radius, spacing, typography } from "@/theme";

export default function NewsListScreen() {
  const [items, setItems] = useState<RemoteNewsItem[]>(fallbackNewsItems());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    fetchNews()
      .then(newsItems => {
        if (!isMounted) {
          return;
        }

        setItems(newsItems.length ? newsItems : fallbackNewsItems());
        setError("");
      })
      .catch(() => {
        if (isMounted) {
          setItems(fallbackNewsItems());
          setError("Chưa tải được tin mới, đang hiển thị dữ liệu mẫu.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Screen scroll>
      <Header title="Tin tức" subtitle="Bài viết và cập nhật chăm sóc khách hàng" showBack showNotification />
      {isLoading ? (
        <View style={styles.statusBox}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.statusText}>Đang tải tin tức từ website...</Text>
        </View>
      ) : null}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {!isLoading && !items.length ? <Text style={styles.statusText}>Chưa có tin tức để hiển thị.</Text> : null}
      {items.map(item => (
        <Pressable key={item.id} onPress={() => router.push(`/news/${item.slug}`)}>
          <Card style={styles.card}>
            {item.imageUrl ? <Image source={{ uri: item.imageUrl }} style={styles.image} /> : null}
            <Text style={styles.date}>{item.date} • {item.author}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body} numberOfLines={3}>{item.summary}</Text>
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.md, overflow: "hidden" },
  image: { backgroundColor: colors.secondarySoft, borderRadius: radius.md, height: 156, marginBottom: spacing.md, resizeMode: "cover", width: "100%" },
  date: { ...typography.caption, color: colors.primary },
  title: { ...typography.h3, color: colors.text, marginTop: spacing.sm },
  body: { ...typography.body, color: colors.textMuted, marginTop: spacing.sm },
  statusBox: { alignItems: "center", backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, gap: spacing.sm, marginBottom: spacing.md, padding: spacing.lg },
  statusText: { ...typography.body, color: colors.textMuted, textAlign: "center" },
  errorText: { ...typography.caption, color: colors.danger, marginBottom: spacing.md }
});
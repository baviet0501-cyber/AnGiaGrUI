import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Linking, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { AppButton, Card, Header, Screen } from "@/components";
import { fetchNewsBySlug, RemoteNewsItem } from "@/features/content";
import { colors, radius, spacing, typography } from "@/theme";

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const slug = Array.isArray(id) ? id[0] : id;
  const [item, setItem] = useState<RemoteNewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      setError("Không tìm thấy mã bài viết.");
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setError("");

    fetchNewsBySlug(slug)
      .then(newsItem => {
        if (isMounted) {
          setItem(newsItem);
        }
      })
      .catch(() => {
        if (isMounted) {
          setItem(null);
          setError("Chưa tải được chi tiết tin tức từ website.");
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
  }, [slug]);

  return (
    <Screen scroll>
      <Header title="Tin tức" subtitle={item?.date} showBack showNotification />
      {isLoading ? (
        <View style={styles.statusBox}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.statusText}>Đang tải bài viết...</Text>
        </View>
      ) : null}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {!item && !isLoading ? <Text style={styles.statusText}>Không có dữ liệu tin tức để hiển thị.</Text> : null}
      {item ? (
        <>
          <Card style={styles.card}>
            {item.imageUrl ? <Image source={{ uri: item.imageUrl }} style={styles.image} /> : null}
            <Text style={styles.meta}>{item.category} • {item.author}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.summary}</Text>
            {item.tags.length ? <Text style={styles.tags}>{item.tags.map(tag => `#${tag}`).join("  ")}</Text> : null}
          </Card>
          <AppButton onPress={() => Linking.openURL(item.url)}>Mở bài viết trên website</AppButton>
        </>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.md },
  image: { backgroundColor: colors.secondarySoft, borderRadius: radius.md, height: 210, marginBottom: spacing.lg, resizeMode: "cover", width: "100%" },
  meta: { ...typography.caption, color: colors.primary },
  title: { ...typography.h2, color: colors.text, marginTop: spacing.sm },
  body: { ...typography.body, color: colors.textMuted, marginTop: spacing.md },
  tags: { ...typography.caption, color: colors.secondaryDark, marginTop: spacing.lg },
  statusBox: { alignItems: "center", backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, gap: spacing.sm, marginBottom: spacing.md, padding: spacing.lg },
  statusText: { ...typography.body, color: colors.textMuted, textAlign: "center" },
  errorText: { ...typography.caption, color: colors.danger, marginBottom: spacing.md }
});
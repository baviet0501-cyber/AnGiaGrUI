import { StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { Card, Header, Screen } from "@/components";
import { news } from "@/data/mock";
import { colors, spacing, typography } from "@/theme";

export default function NewsListScreen() {
  return (
    <Screen scroll>
      <Header title="Tin tức" subtitle="Bài viết và cập nhật chăm sóc khách hàng" showBack showNotification />
      {news.map(item => (
        <Card key={item.id} style={styles.card}>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.title} onPress={() => router.push(`/news/${item.id}`)}>{item.title}</Text>
          <Text style={styles.body}>{item.summary}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.md },
  date: { ...typography.caption, color: colors.primary },
  title: { ...typography.h3, color: colors.text, marginTop: spacing.sm },
  body: { ...typography.body, color: colors.textMuted, marginTop: spacing.sm }
});

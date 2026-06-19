import { StyleSheet, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Card, Header, Screen } from "@/components";
import { news } from "@/data/mock";
import { colors, spacing, typography } from "@/theme";

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = news.find(entry => entry.id === id) ?? news[0];

  return (
    <Screen scroll>
      <Header title="Tin tức" subtitle={item.date} showBack showNotification />
      <Card style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.summary}</Text>
        <Text style={styles.body}>Nội dung dài sẽ được thay bằng dữ liệu CMS/CRM khi tích hợp backend.</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.md },
  title: { ...typography.h2, color: colors.text },
  body: { ...typography.body, color: colors.textMuted, marginTop: spacing.md }
});

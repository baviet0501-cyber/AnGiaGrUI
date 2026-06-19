import { StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { Card, Header, Screen } from "@/components";
import { notifications } from "@/data/mock";
import { colors, spacing, typography } from "@/theme";

export default function NotificationsScreen() {
  return (
    <Screen scroll>
      <Header title="Thông báo" subtitle="Cập nhật từ sản phẩm, tư vấn và CRM" showBack />
      {notifications.map(item => (
        <Card key={item.id} style={styles.card}>
          <Text
            style={styles.title}
            onPress={() => (item.route.startsWith("/(tabs)") ? router.replace(item.route) : router.push(item.route))}
          >
            {item.title}
          </Text>
          <Text style={styles.body}>{item.body}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.md },
  title: { ...typography.h3, color: colors.text },
  body: { ...typography.body, color: colors.textMuted, marginTop: spacing.sm }
});

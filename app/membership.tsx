import { StyleSheet, Text } from "react-native";
import { Header, Screen, Card } from "@/components";
import { colors, spacing, typography } from "@/theme";

export default function MembershipScreen() {
  return (
    <Screen scroll>
      <Header title="An Gia Green Membership" subtitle="Quyền lợi hội viên và tích điểm" showBack />
      <Card style={styles.card}>
        <Text style={styles.title}>Hạng Green Care</Text>
        <Text style={styles.body}>Ưu đãi cá nhân hóa, tư vấn định kỳ và ưu tiên phản hồi từ CSKH.</Text>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.title}>CRM hooks</Text>
        <Text style={styles.body}>Màn hình đã sẵn vị trí để đồng bộ điểm, phân khúc và lịch sử chăm sóc từ CRM.</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.md },
  title: { ...typography.h3, color: colors.text },
  body: { ...typography.body, color: colors.textMuted, marginTop: spacing.sm }
});


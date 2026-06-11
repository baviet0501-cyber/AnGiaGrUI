import { StyleSheet, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { AppButton, Card, Header, Screen } from "@/components";
import { consultations } from "@/data/mock";
import { colors, spacing, typography } from "@/theme";

export default function ConsultationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const consultation = consultations.find(item => item.id === id) ?? consultations[0];

  return (
    <Screen scroll>
      <Header title={consultation.title} subtitle="Chi tiết tư vấn" showBack />
      <Card style={styles.card}>
        <Text style={styles.status}>{consultation.status}</Text>
        <Text style={styles.body}>Lịch sử tương tác, ghi chú tư vấn viên và ticket CRM sẽ hiển thị tại đây.</Text>
      </Card>
      <AppButton onPress={() => router.push("/(tabs)/chat")}>Tiếp tục chat CSKH</AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.xl },
  status: { ...typography.h3, color: colors.primary },
  body: { ...typography.body, color: colors.textMuted, marginTop: spacing.md }
});

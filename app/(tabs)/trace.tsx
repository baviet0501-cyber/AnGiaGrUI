import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { ScanQrCode } from "lucide-react-native";
import { AppButton, Card, Header, Screen } from "@/components";
import { consultations } from "@/data/mock";
import { colors, radius, spacing, typography } from "@/theme";

export default function TraceScreen() {
  return (
    <Screen scroll>
      <Header title="Truy xuất nguồn gốc" subtitle="Quét mã hoặc xem lô hàng đã lưu" />
      <Pressable style={styles.scanCard} onPress={() => router.push("/scanner")}>
        <View style={styles.scanIconWrap}>
          <ScanQrCode color={colors.primary} size={28} strokeWidth={2.5} />
        </View>
        <View style={styles.scanContent}>
          <Text style={styles.scanTitle}>Batch QR / LOT-2026-AGG</Text>
          <Text style={styles.body}>Bấm để mở camera quét QR và truy xuất chứng nhận lô sản phẩm.</Text>
          <Text style={styles.scanCta}>Mở camera quét QR</Text>
        </View>
      </Pressable>
      {consultations.map(item => (
        <Card key={item.id} style={styles.card}>
          <Text style={styles.title} onPress={() => router.push(`/consultation/${item.id}`)}>{item.title}</Text>
          <Text style={styles.body}>{item.status} · {item.updatedAt}</Text>
        </Card>
      ))}
      <AppButton onPress={() => router.push("/(tabs)/chat")}>Hỏi chuyên gia</AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scanCard: { alignItems: "center", backgroundColor: colors.primarySoft, borderRadius: radius.lg, flexDirection: "row", gap: spacing.md, marginBottom: spacing.lg, padding: spacing.lg },
  scanIconWrap: { alignItems: "center", backgroundColor: colors.white, borderRadius: radius.pill, height: 56, justifyContent: "center", width: 56 },
  scanContent: { flex: 1 },
  scanTitle: { ...typography.h3, color: colors.primaryDark },
  scanCta: { ...typography.label, color: colors.primary, marginTop: spacing.md },
  card: { marginBottom: spacing.md },
  title: { ...typography.h3, color: colors.text },
  body: { ...typography.body, color: colors.textMuted, marginTop: spacing.sm }
});

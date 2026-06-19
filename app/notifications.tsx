import { useCallback, useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { Trash2 } from "lucide-react-native";
import { AppButton, Card, Header, IconButton, Screen } from "@/components";
import { clearStoredNotifications, deleteStoredNotification, loadStoredNotifications, markStoredNotificationRead, StoredNotification } from "@/features/notifications";
import { colors, radius, spacing, typography } from "@/theme";

function formatNotificationTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Không rõ thời gian";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
}

function openNotificationRoute(route: string | undefined) {
  if (!route) {
    return;
  }

  if (route.startsWith("/(tabs)")) {
    router.replace(route);
    return;
  }

  router.push(route);
}

export default function NotificationsScreen() {
  const [items, setItems] = useState<StoredNotification[]>([]);

  const reload = useCallback(async () => {
    setItems(await loadStoredNotifications());
  }, []);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  useEffect(() => {
    reload();
  }, [reload]);

  async function handleOpen(item: StoredNotification) {
    const updated = await markStoredNotificationRead(item.id);
    setItems(updated);
    openNotificationRoute(item.route);
  }

  async function handleDelete(id: string) {
    setItems(await deleteStoredNotification(id));
  }

  function handleClearAll() {
    Alert.alert("Xóa tất cả thông báo?", "Các thông báo đang lưu trong cache sẽ bị xóa khỏi thiết bị này.", [
      { style: "cancel", text: "Hủy" },
      {
        style: "destructive",
        text: "Xóa",
        onPress: async () => {
          await clearStoredNotifications();
          setItems([]);
        }
      }
    ]);
  }

  return (
    <Screen scroll>
      <Header title="Thông báo" subtitle="Các nhắc nhở đã lưu trên thiết bị" showBack />
      <View style={styles.summaryRow}>
        <Text style={styles.summaryText}>{items.length} thông báo</Text>
        {items.length ? <AppButton variant="ghost" style={styles.clearButton} onPress={handleClearAll}>Xóa tất cả</AppButton> : null}
      </View>
      {!items.length ? <Text style={styles.emptyText}>Chưa có thông báo nào. Khi bạn bấm nhắc sản phẩm, thông báo sẽ xuất hiện tại đây.</Text> : null}
      {items.map(item => {
        const isUnread = !item.readAt;
        return (
          <Card key={item.id} style={[styles.card, isUnread && styles.unreadCard]}>
            <View style={styles.cardHeader}>
              <Pressable style={styles.content} onPress={() => handleOpen(item)}>
                <Text style={[styles.status, isUnread ? styles.unreadStatus : styles.readStatus]}>{isUnread ? "Chưa xem" : "Đã xem"}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.body}>{item.body}</Text>
                <Text style={styles.time}>{formatNotificationTime(item.createdAt)}</Text>
              </Pressable>
              <IconButton accessibilityLabel="Xóa thông báo" size="sm" style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                <Trash2 color={colors.danger} size={17} strokeWidth={2.4} />
              </IconButton>
            </View>
          </Card>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  summaryRow: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.md },
  summaryText: { ...typography.caption, color: colors.textMuted },
  clearButton: { minHeight: 38, paddingHorizontal: spacing.md },
  emptyText: { ...typography.body, color: colors.textMuted, marginTop: spacing.lg, textAlign: "center" },
  card: { marginBottom: spacing.md },
  unreadCard: { borderColor: colors.primary },
  cardHeader: { alignItems: "flex-start", flexDirection: "row", gap: spacing.md },
  content: { flex: 1 },
  status: { ...typography.caption, alignSelf: "flex-start", borderRadius: radius.pill, overflow: "hidden", paddingHorizontal: spacing.sm, paddingVertical: 4 },
  unreadStatus: { backgroundColor: colors.accentSoft, color: colors.primaryDark },
  readStatus: { backgroundColor: colors.surfaceMuted, color: colors.textMuted },
  title: { ...typography.h3, color: colors.text, marginTop: spacing.sm },
  body: { ...typography.body, color: colors.textMuted, marginTop: spacing.sm },
  time: { ...typography.caption, color: colors.primary, marginTop: spacing.md },
  deleteButton: { backgroundColor: colors.surfaceMuted }
});
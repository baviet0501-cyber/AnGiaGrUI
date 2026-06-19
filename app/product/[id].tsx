import { Alert, Linking, StyleSheet, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { AppButton, Card, Header, Screen } from "@/components";
import { products } from "@/data/mock";
import { pushRecentProductReminder } from "@/features/notifications/localNotifications";
import { colors, spacing, typography } from "@/theme";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find(item => item.id === id) ?? products[0];

  async function handlePurchase() {
    if (product.purchaseUrl.includes(".example")) {
      Alert.alert("Chưa cấu hình website", "Thay purchaseUrl bằng domain thật của website khi phần web thanh toán hoàn thành.");
      return;
    }

    const canOpen = await Linking.canOpenURL(product.purchaseUrl);
    if (!canOpen) {
      Alert.alert("Chưa mở được website", "Vui lòng kiểm tra lại đường dẫn mua hàng sau khi backend/web hoàn thành.");
      return;
    }

    await Linking.openURL(product.purchaseUrl);
  }

  async function handleReminder() {
    const result = await pushRecentProductReminder(product.id, product.name);
    if (!result.ok) {
      Alert.alert("Chưa bật thông báo", "Bạn cần cho phép thông báo để nhận lời nhắc về sản phẩm đã xem.");
      return;
    }

    Alert.alert("Đã tạo lời nhắc", "App sẽ gửi thông báo mẫu cho sản phẩm bạn vừa xem.");
  }

  return (
    <Screen scroll>
      <Header title={product.name} subtitle="Chi tiết sản phẩm" showBack showNotification />
      <Card style={styles.card}>
        <Text style={styles.price}>{product.price}</Text>
        <Text style={styles.body}>{product.description}</Text>
        <Text style={styles.body}>Thiết kế sẵn chỗ hiển thị chứng nhận, ảnh sản phẩm và dữ liệu truy xuất từ Figma/API.</Text>
      </Card>
      <AppButton onPress={handlePurchase}>Mua trên website</AppButton>
      <AppButton variant="secondary" onPress={handleReminder}>Nhắc tôi về sản phẩm này</AppButton>
      <AppButton variant="ghost" onPress={() => router.replace("/(tabs)/chat")}>Hỏi chuyên gia</AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.xl },
  price: { ...typography.h2, color: colors.primary },
  body: { ...typography.body, color: colors.textMuted, marginTop: spacing.md }
});

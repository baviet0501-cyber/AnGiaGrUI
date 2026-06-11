import { StyleSheet, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { AppButton, Card, Header, Screen } from "@/components";
import { products } from "@/data/mock";
import { colors, spacing, typography } from "@/theme";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find(item => item.id === id) ?? products[0];

  return (
    <Screen scroll>
      <Header title={product.name} subtitle="Chi tiết sản phẩm" showBack />
      <Card style={styles.card}>
        <Text style={styles.price}>{product.price}</Text>
        <Text style={styles.body}>{product.description}</Text>
        <Text style={styles.body}>Thiết kế sẵn chỗ hiển thị chứng nhận, ảnh sản phẩm và dữ liệu truy xuất từ Figma/API.</Text>
      </Card>
      <AppButton onPress={() => router.push("/notifications")}>Đặt mua / nhận tư vấn</AppButton>
      <AppButton variant="ghost" onPress={() => router.push("/(tabs)/chat")}>Hỏi chuyên gia</AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.xl },
  price: { ...typography.h2, color: colors.primary },
  body: { ...typography.body, color: colors.textMuted, marginTop: spacing.md }
});

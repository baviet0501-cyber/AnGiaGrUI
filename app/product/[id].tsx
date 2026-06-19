import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Linking, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { AppButton, Card, Header, Screen } from "@/components";
import { fetchProductBySlug, RemoteProduct } from "@/features/content";
import { pushRecentProductReminder } from "@/features/notifications/localNotifications";
import { colors, radius, spacing, typography } from "@/theme";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const slug = Array.isArray(id) ? id[0] : id;
  const [product, setProduct] = useState<RemoteProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      setError("Không tìm thấy mã sản phẩm.");
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setError("");

    fetchProductBySlug(slug)
      .then(item => {
        if (isMounted) {
          setProduct(item);
        }
      })
      .catch(() => {
        if (isMounted) {
          setProduct(null);
          setError("Chưa tải được chi tiết sản phẩm từ website.");
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

  async function handlePurchase() {
    if (!product) {
      return;
    }

    const canOpen = await Linking.canOpenURL(product.purchaseUrl);
    if (!canOpen) {
      Alert.alert("Chưa mở được website", "Vui lòng kiểm tra lại đường dẫn mua hàng.");
      return;
    }

    await Linking.openURL(product.purchaseUrl);
  }

  async function handleReminder() {
    if (!product) {
      return;
    }

    const result = await pushRecentProductReminder(product.id, product.name);
    const message = result.nativeScheduled
      ? "Thông báo đã được lưu và sẽ xuất hiện trong mục chuông ở góc phải."
      : "Thông báo đã được lưu trong mục chuông ở góc phải. Bạn có thể bật quyền thông báo hệ thống sau nếu muốn nhận banner.";

    Alert.alert("Đã tạo lời nhắc", message, [
      { text: "Để sau" },
      { text: "Mở thông báo", onPress: () => router.push("/notifications") }
    ]);
  }

  return (
    <Screen scroll>
      <Header title={product?.name ?? "Chi tiết sản phẩm"} subtitle="Chi tiết sản phẩm" showBack showNotification />
      {isLoading ? (
        <View style={styles.statusBox}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.statusText}>Đang tải dữ liệu sản phẩm...</Text>
        </View>
      ) : null}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {!product && !isLoading ? <Text style={styles.statusText}>Không có dữ liệu sản phẩm để hiển thị.</Text> : null}
      {product ? (
        <>
          <Card style={styles.card}>
            {product.imageUrl ? <Image source={{ uri: product.imageUrl }} style={styles.image} /> : null}
            <Text style={styles.tag}>{product.tag}</Text>
            <Text style={styles.price}>{product.price}</Text>
            {product.originalPrice ? <Text style={styles.originalPrice}>{product.originalPrice}</Text> : null}
            <Text style={styles.body}>{product.description}</Text>
            {product.benefits.length ? <Text style={styles.meta}>Lợi ích: {product.benefits.join(" • ")}</Text> : null}
            {product.usage ? <Text style={styles.meta}>Cách dùng: {product.usage}</Text> : null}
            <Text style={styles.meta}>Xuất xứ: {product.origin}</Text>
            <Text style={styles.meta}>Truy xuất: {product.traceability}</Text>
          </Card>
          <AppButton onPress={handlePurchase}>Mua trên website</AppButton>
          <AppButton variant="secondary" onPress={handleReminder}>Nhắc tôi về sản phẩm này</AppButton>
        </>
      ) : null}
      <AppButton variant="ghost" onPress={() => router.replace("/(tabs)/chat")}>Hỏi chuyên gia</AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.xl },
  image: { backgroundColor: colors.secondarySoft, borderRadius: radius.md, height: 220, marginBottom: spacing.lg, resizeMode: "cover", width: "100%" },
  tag: { ...typography.caption, alignSelf: "flex-start", backgroundColor: colors.secondarySoft, borderRadius: radius.pill, color: colors.secondaryDark, overflow: "hidden", paddingHorizontal: spacing.sm, paddingVertical: 4 },
  price: { ...typography.h2, color: colors.primary, marginTop: spacing.md },
  originalPrice: { ...typography.caption, color: colors.textMuted, marginTop: spacing.xs, textDecorationLine: "line-through" },
  body: { ...typography.body, color: colors.textMuted, marginTop: spacing.md },
  meta: { ...typography.caption, color: colors.text, marginTop: spacing.md },
  statusBox: { alignItems: "center", backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, gap: spacing.sm, marginBottom: spacing.md, padding: spacing.lg },
  statusText: { ...typography.body, color: colors.textMuted, textAlign: "center" },
  errorText: { ...typography.caption, color: colors.danger, marginBottom: spacing.md }
});
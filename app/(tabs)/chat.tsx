import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { AppButton, Card, Header, Screen } from "@/components";
import { pushChatbotPreviewNotification } from "@/features/notifications/localNotifications";
import { colors, spacing, typography } from "@/theme";

export default function ChatScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const [isSending, setIsSending] = useState(false);

  async function handlePreviewNotification() {
    if (isSending) {
      return;
    }

    setIsSending(true);
    try {
      const result = await pushChatbotPreviewNotification();
      if (!result.ok) {
        Alert.alert("Chưa bật thông báo", "Bạn cần cho phép thông báo để nhận phản hồi từ chatbot CSKH trên điện thoại.");
      }
    } catch {
      Alert.alert("Không gửi được thông báo", "Vui lòng thử lại sau hoặc kiểm tra quyền thông báo của ứng dụng.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <Screen bottomInset={tabBarHeight} style={styles.screenContent}>
      <Header title="Chat CSKH" showNotification compact />
      <View style={styles.thread}>
        <Card style={styles.botBubble}><Text style={styles.botText}>Xin chào! Tôi có thể hỗ trợ truy xuất sản phẩm hoặc tạo yêu cầu CRM.</Text></Card>
        <Card style={styles.userBubble}><Text style={styles.userText}>Tôi muốn kiểm tra lô sản phẩm.</Text></Card>
      </View>
      <AppButton disabled={isSending} onPress={handlePreviewNotification}>
        {isSending ? "Đang gửi thông báo..." : "Gắn chatbot service sau"}
      </AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: { paddingTop: 0 },
  thread: { flex: 1, gap: spacing.md },
  botBubble: { alignSelf: "flex-start", maxWidth: "86%" },
  userBubble: { alignSelf: "flex-end", backgroundColor: colors.primary, maxWidth: "86%" },
  botText: { ...typography.body, color: colors.text },
  userText: { ...typography.body, color: colors.white }
});

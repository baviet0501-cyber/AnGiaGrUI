import { StyleSheet, Text, View } from "react-native";
import { AppButton, Card, Header, Screen } from "@/components";
import { colors, spacing, typography } from "@/theme";

export default function ChatScreen() {
  return (
    <Screen>
      <Header title="Chat CSKH" subtitle="Sẵn sàng tích hợp chatbot và live agent" />
      <View style={styles.thread}>
        <Card style={styles.botBubble}><Text style={styles.botText}>Xin chào! Tôi có thể hỗ trợ truy xuất sản phẩm hoặc tạo yêu cầu CRM.</Text></Card>
        <Card style={styles.userBubble}><Text style={styles.userText}>Tôi muốn kiểm tra lô sản phẩm.</Text></Card>
      </View>
      <AppButton>Gắn chatbot service sau</AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  thread: { flex: 1, gap: spacing.md },
  botBubble: { alignSelf: "flex-start", maxWidth: "86%" },
  userBubble: { alignSelf: "flex-end", backgroundColor: colors.primary, maxWidth: "86%" },
  botText: { ...typography.body, color: colors.text },
  userText: { ...typography.body, color: colors.white }
});

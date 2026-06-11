import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppButton, AppTextInput, Header, Screen } from "@/components";
import { colors, spacing, typography } from "@/theme";

export default function LoginScreen() {
  return (
    <Screen>
      <Header title="Đăng nhập" subtitle="Tiếp tục hành trình chăm sóc khách hàng" />
      <View style={styles.form}>
        <AppTextInput label="Số điện thoại" keyboardType="phone-pad" placeholder="Nhập số điện thoại" />
        <AppTextInput label="Mật khẩu" secureTextEntry placeholder="Nhập mật khẩu" />
        <AppButton onPress={() => router.replace("/(tabs)/home")}>Đăng nhập</AppButton>
        <AppButton variant="ghost" onPress={() => router.push("/(auth)/forgot")}>Quên mật khẩu?</AppButton>
      </View>
      <Text style={styles.link} onPress={() => router.push("/(auth)/register")}>Chưa có tài khoản? Đăng ký</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.lg },
  link: { ...typography.label, color: colors.primary, marginTop: "auto", textAlign: "center" }
});

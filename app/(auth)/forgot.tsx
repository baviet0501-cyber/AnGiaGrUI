import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { AppButton, AppTextInput, Header, Screen } from "@/components";
import { spacing } from "@/theme";

export default function ForgotPasswordScreen() {
  return (
    <Screen>
      <Header title="Khôi phục mật khẩu" subtitle="Nhập số điện thoại để nhận hướng dẫn" showBack />
      <View style={styles.form}>
        <AppTextInput label="Số điện thoại" keyboardType="phone-pad" placeholder="Nhập số điện thoại" />
        <AppButton onPress={() => router.replace("/(auth)/login")}>Gửi hướng dẫn</AppButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({ form: { gap: spacing.lg } });

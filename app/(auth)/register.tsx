import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { AppButton, AppTextInput, Header, Screen } from "@/components";
import { spacing } from "@/theme";

export default function RegisterScreen() {
  return (
    <Screen scroll>
      <Header title="Đăng ký" subtitle="Tạo hồ sơ khách hàng để được tư vấn tốt hơn" showBack />
      <View style={styles.form}>
        <AppTextInput label="Họ và tên" placeholder="Nguyễn Văn A" />
        <AppTextInput label="Số điện thoại" keyboardType="phone-pad" placeholder="090..." />
        <AppTextInput label="Email" keyboardType="email-address" placeholder="email@example.com" />
        <AppTextInput label="Mật khẩu" secureTextEntry placeholder="Tạo mật khẩu" />
        <AppButton onPress={() => router.replace("/(tabs)/home")}>Đăng ký</AppButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({ form: { gap: spacing.lg } });

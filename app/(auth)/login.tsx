import { useMemo, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppButton, AppTextInput, Header, Screen } from "@/components";
import { useAuth } from "@/features/auth";
import { colors, spacing, typography } from "@/theme";

type LoginErrors = Partial<Record<"password" | "phone", string>>;

function normalizePhone(value: string) {
  return value.replace(/[^0-9+]/g, "").trim();
}

function validateLogin(phoneInput: string, password: string) {
  const errors: LoginErrors = {};
  const phone = normalizePhone(phoneInput);

  if (!/^0\d{9}$/.test(phone) && !/^\+84\d{9}$/.test(phone)) {
    errors.phone = "Số điện thoại cần đúng định dạng Việt Nam.";
  }

  if (password.length < 6) {
    errors.password = "Mật khẩu tối thiểu 6 ký tự.";
  }

  return { errors, username: phone };
}

export default function LoginScreen() {
  const { login } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => Boolean(phone.trim() && password && !isSubmitting), [isSubmitting, password, phone]);

  async function handleLogin() {
    if (isSubmitting) {
      return;
    }

    const result = validateLogin(phone, password);
    if (Object.keys(result.errors).length > 0) {
      setErrors(result.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await login({ password, username: result.username });
      router.replace("/(tabs)/home");
    } catch (error) {
      Alert.alert("Đăng nhập chưa thành công", error instanceof Error ? error.message : "Vui lòng kiểm tra lại thông tin đăng nhập.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Screen>
      <Header title="Đăng nhập" subtitle="Tiếp tục hành trình chăm sóc khách hàng" />
      <View style={styles.form}>
        <AppTextInput
          autoComplete="tel"
          error={errors.phone}
          keyboardType="phone-pad"
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          value={phone}
          onChangeText={value => {
            setPhone(value);
            setErrors(current => ({ ...current, phone: undefined }));
          }}
        />
        <AppTextInput
          autoCapitalize="none"
          autoComplete="password"
          error={errors.password}
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={value => {
            setPassword(value);
            setErrors(current => ({ ...current, password: undefined }));
          }}
        />
        <AppButton disabled={!canSubmit} onPress={handleLogin}>{isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}</AppButton>
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
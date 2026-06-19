import { useMemo, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppButton, AppTextInput, Header, Screen } from "@/components";
import { useAuth } from "@/features/auth";
import { colors, spacing, typography } from "@/theme";

type RegisterForm = {
  confirmPassword: string;
  email: string;
  fullName: string;
  password: string;
  phone: string;
};

type RegisterErrors = Partial<Record<keyof RegisterForm, string>>;

const initialForm: RegisterForm = {
  confirmPassword: "",
  email: "",
  fullName: "",
  password: "",
  phone: ""
};

function normalizePhone(value: string) {
  return value.replace(/[^0-9+]/g, "").trim();
}

function validateRegisterForm(form: RegisterForm) {
  const errors: RegisterErrors = {};
  const fullName = form.fullName.trim();
  const phone = normalizePhone(form.phone);
  const email = form.email.trim().toLowerCase();

  if (fullName.length < 2) {
    errors.fullName = "Vui lòng nhập họ tên hợp lệ.";
  }

  if (!/^0\d{9}$/.test(phone) && !/^\+84\d{9}$/.test(phone)) {
    errors.phone = "Số điện thoại cần đúng định dạng Việt Nam.";
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Email chưa đúng định dạng.";
  }

  if (form.password.length < 6) {
    errors.password = "Mật khẩu tối thiểu 6 ký tự.";
  }

  if (form.confirmPassword !== form.password) {
    errors.confirmPassword = "Mật khẩu nhập lại chưa khớp.";
  }

  return { errors, normalized: { email, fullName, phone } };
}

export default function RegisterScreen() {
  const { register } = useAuth();
  const [form, setForm] = useState<RegisterForm>(initialForm);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(
    () => Boolean(form.fullName.trim() && form.phone.trim() && form.password && form.confirmPassword && !isSubmitting),
    [form, isSubmitting]
  );

  function updateField(field: keyof RegisterForm, value: string) {
    setForm(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: undefined }));
  }

  async function handleRegister() {
    if (isSubmitting) {
      return;
    }

    const result = validateRegisterForm(form);
    if (Object.keys(result.errors).length > 0) {
      setErrors(result.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        email: result.normalized.email || undefined,
        fullName: result.normalized.fullName,
        password: form.password,
        username: result.normalized.phone
      });
      router.replace("/(tabs)/home");
    } catch (error) {
      Alert.alert("Chưa tạo được tài khoản", error instanceof Error ? error.message : "Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Screen scroll>
      <Header title="Đăng ký" subtitle="Tạo hồ sơ khách hàng để được tư vấn tốt hơn" showBack />
      <View style={styles.form}>
        <AppTextInput autoCapitalize="words" autoComplete="name" error={errors.fullName} label="Họ và tên" placeholder="Nhập họ và tên" returnKeyType="next" value={form.fullName} onChangeText={value => updateField("fullName", value)} />
        <AppTextInput autoComplete="tel" error={errors.phone} keyboardType="phone-pad" label="Số điện thoại" placeholder="Nhập số điện thoại" value={form.phone} onChangeText={value => updateField("phone", value)} />
        <AppTextInput autoCapitalize="none" autoComplete="email" error={errors.email} keyboardType="email-address" label="Email" placeholder="Nhập email (nếu có)" value={form.email} onChangeText={value => updateField("email", value)} />
        <AppTextInput autoCapitalize="none" autoComplete="new-password" error={errors.password} label="Mật khẩu" placeholder="Tối thiểu 6 ký tự" secureTextEntry value={form.password} onChangeText={value => updateField("password", value)} />
        <AppTextInput autoCapitalize="none" autoComplete="new-password" error={errors.confirmPassword} label="Nhập lại mật khẩu" placeholder="Nhập lại mật khẩu" secureTextEntry value={form.confirmPassword} onChangeText={value => updateField("confirmPassword", value)} />
        <Text style={styles.note}>Thông tin này chỉ dùng để tạo phiên demo trên thiết bị.</Text>
        <AppButton disabled={!canSubmit} onPress={handleRegister}>{isSubmitting ? "Đang xử lý..." : "Tạo tài khoản"}</AppButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.lg },
  note: { ...typography.caption, color: colors.textMuted, marginTop: -spacing.sm }
});
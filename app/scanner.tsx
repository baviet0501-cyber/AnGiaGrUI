import { useState } from "react";
import { Alert, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { ArrowLeft, ScanQrCode } from "lucide-react-native";
import { AppButton } from "@/components";
import { colors, radius, spacing, typography } from "@/theme";

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [lastCode, setLastCode] = useState<string | null>(null);

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    setLastCode(data);
    Alert.alert("Đã quét Batch QR", data, [
      { text: "Quét lại", onPress: () => setScanned(false) },
      { text: "Xong", onPress: () => router.back() }
    ]);
  };

  if (!permission) {
    return <View style={styles.center}><Text style={styles.body}>Đang kiểm tra quyền camera...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionScreen}>
        <ScanQrCode color={colors.primary} size={56} strokeWidth={2.2} />
        <Text style={styles.permissionTitle}>Cần quyền camera</Text>
        <Text style={styles.permissionBody}>Cho phép camera để quét Batch QR và truy xuất thông tin lô sản phẩm.</Text>
        <AppButton onPress={requestPermission}>Cho phép camera</AppButton>
        {!permission.canAskAgain ? <AppButton variant="ghost" onPress={() => Linking.openSettings()}>Mở cài đặt</AppButton> : null}
        <AppButton variant="ghost" onPress={() => router.back()}>Quay lại</AppButton>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />
      <View style={styles.overlay}>
        <View style={styles.topBar}>
          <Pressable style={styles.iconButton} onPress={() => router.back()}>
            <ArrowLeft color={colors.white} size={22} strokeWidth={2.5} />
          </Pressable>
          <Text style={styles.title}>Quét Batch QR</Text>
          <View style={styles.iconButtonPlaceholder} />
        </View>

        <View style={styles.scanBox}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
          <View style={styles.scanLine} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.hint}>Đưa mã QR vào trong khung để quét tự động.</Text>
          {lastCode ? <Text style={styles.result}>Mã gần nhất: {lastCode}</Text> : null}
          {scanned ? <AppButton onPress={() => setScanned(false)}>Quét lại</AppButton> : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.text },
  center: { alignItems: "center", backgroundColor: colors.background, flex: 1, justifyContent: "center", padding: spacing.xl },
  permissionScreen: { alignItems: "center", backgroundColor: colors.background, flex: 1, gap: spacing.lg, justifyContent: "center", padding: spacing.xl },
  permissionTitle: { ...typography.h2, color: colors.text, textAlign: "center" },
  permissionBody: { ...typography.body, color: colors.textMuted, textAlign: "center" },
  body: { ...typography.body, color: colors.textMuted },
  overlay: { flex: 1, justifyContent: "space-between", padding: spacing.xl, paddingTop: spacing.xxl },
  topBar: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  iconButton: { alignItems: "center", backgroundColor: "rgba(0,0,0,0.35)", borderRadius: radius.pill, height: 44, justifyContent: "center", width: 44 },
  iconButtonPlaceholder: { height: 44, width: 44 },
  title: { ...typography.h3, color: colors.white },
  scanBox: { alignSelf: "center", height: 260, justifyContent: "center", marginTop: spacing.xxxl, width: 260 },
  corner: { borderColor: colors.secondary, height: 54, position: "absolute", width: 54 },
  topLeft: { borderLeftWidth: 5, borderTopWidth: 5, left: 0, top: 0 },
  topRight: { borderRightWidth: 5, borderTopWidth: 5, right: 0, top: 0 },
  bottomLeft: { borderBottomWidth: 5, borderLeftWidth: 5, bottom: 0, left: 0 },
  bottomRight: { borderBottomWidth: 5, borderRightWidth: 5, bottom: 0, right: 0 },
  scanLine: { alignSelf: "center", backgroundColor: colors.secondary, borderRadius: radius.pill, height: 4, opacity: 0.95, width: 210 },
  footer: { gap: spacing.md },
  hint: { ...typography.body, color: colors.white, textAlign: "center" },
  result: { ...typography.caption, color: colors.white, textAlign: "center" }
});

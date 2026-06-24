import { PropsWithChildren } from "react";
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing } from "@/theme";

type ScreenProps = PropsWithChildren<{
  scroll?: boolean;
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
  /**
   * Extra bottom padding to clear an overlay such as the bottom tab bar.
   * Only tab screens should pass this via `useBottomTabBarHeight()`,
   * because that hook throws when used outside a Bottom Tab Navigator.
   */
  bottomInset?: number;
}>;

export function Screen({ children, scroll = false, padded = true, style, bottomInset = 0 }: ScreenProps) {
  const contentStyle = [styles.content, padded && styles.padded, bottomInset > 0 && { paddingBottom: spacing.xl + bottomInset }, style];

  return (
    <SafeAreaView style={styles.safeArea}>
      {scroll ? <ScrollView contentContainerStyle={contentStyle}>{children}</ScrollView> : <View style={contentStyle}>{children}</View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1 },
  padded: { paddingHorizontal: spacing.lg, paddingVertical: spacing.xl }
});

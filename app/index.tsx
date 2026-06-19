import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAuth } from "@/features/auth";
import { colors } from "@/theme";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return <Redirect href={isAuthenticated ? "/(tabs)/home" : "/(auth)/welcome"} />;
}

const styles = StyleSheet.create({
  loadingScreen: { alignItems: "center", backgroundColor: colors.background, flex: 1, justifyContent: "center" }
});

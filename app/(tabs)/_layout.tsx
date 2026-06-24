import { Redirect, Tabs } from "expo-router";
import { Home, MessageCircle, Package, ScanQrCode, UserRound } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { ActivityIndicator, Animated, Easing, StyleSheet, View } from "react-native";
import { useAuth } from "@/features/auth";
import { colors } from "@/theme";

const labels: Record<string, string> = {
  home: "Trang chủ",
  products: "Sản phẩm",
  trace: "Truy xuất",
  chat: "Chat",
  profile: "Tôi"
};

const tabIcons = {
  home: Home,
  products: Package,
  trace: ScanQrCode,
  chat: MessageCircle,
  profile: UserRound
};

function AnimatedTabIcon({
  color,
  focused,
  routeName
}: {
  color: string;
  focused: boolean;
  routeName: keyof typeof tabIcons;
}) {
  const Icon = tabIcons[routeName];
  const progress = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      duration: 360,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      toValue: focused ? 1 : 0,
      useNativeDriver: false
    }).start();
  }, [focused, progress]);

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -1.5]
  });

  const backgroundColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.surfaceMuted, colors.primarySoft]
  });

  return (
    <Animated.View
      style={[
        styles.tabIconBubble,
        {
          backgroundColor,
          transform: [{ translateY }]
        }
      ]}
    >
      <Icon color={color} size={16} strokeWidth={focused ? 2.5 : 2.1} />
    </Animated.View>
  );
}

function AnimatedTabLabel({
  color,
  focused,
  label
}: {
  color: string;
  focused: boolean;
  label: string;
}) {
  const progress = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      duration: 320,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      toValue: focused ? 1 : 0,
      useNativeDriver: true
    }).start();
  }, [focused, progress]);

  const opacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.82, 1]
  });

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -1]
  });

  return (
    <Animated.Text
      numberOfLines={1}
      style={[
        styles.tabLabel,
        {
          color,
          fontWeight: focused ? "800" : "500",
          opacity,
          transform: [{ translateY }]
        }
      ]}
    >
      {label}
    </Animated.Text>
  );
}

export default function TabsLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        freezeOnBlur: true,
        lazy: true,
        popToTopOnBlur: true,
        unmountOnBlur: true,
        tabBarActiveTintColor: colors.primaryDark,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 0,
          bottom: 0,
          elevation: 12,
          height: 82,
          left: 0,
          paddingBottom: 10,
          paddingHorizontal: 10,
          paddingTop: 8,
          position: "absolute",
          right: 0,
          shadowColor: colors.primaryDark,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.12,
          shadowRadius: 24
        },
        tabBarItemStyle: {
          borderRadius: 999,
          height: 62,
          justifyContent: "center",
          marginHorizontal: 0,
          paddingHorizontal: 2,
          paddingTop: 4
        },
        tabBarIconStyle: {
          height: 34,
          marginBottom: 0,
          marginTop: 0
        },
        tabBarIcon: ({ color, focused }) => (
          <AnimatedTabIcon color={color} focused={focused} routeName={route.name as keyof typeof tabIcons} />
        ),
        tabBarLabel: ({ color, focused }) => (
          <AnimatedTabLabel color={color} focused={focused} label={labels[route.name]} />
        )
      })}
    >
      <Tabs.Screen name="home" options={{ title: labels.home }} />
      <Tabs.Screen name="products" options={{ title: labels.products }} />
      <Tabs.Screen name="trace" options={{ title: labels.trace }} />
      <Tabs.Screen name="chat" options={{ title: labels.chat }} />
      <Tabs.Screen name="profile" options={{ title: labels.profile }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center"
  },
  tabIconBubble: {
    alignItems: "center",
    borderRadius: 17,
    height: 34,
    justifyContent: "center",
    width: 34
  },
  tabLabel: {
    fontSize: 9,
    lineHeight: 12,
    marginTop: 2,
    paddingHorizontal: 1,
    textAlign: "center"
  }
});

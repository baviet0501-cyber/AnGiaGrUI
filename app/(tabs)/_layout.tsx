import { Tabs } from "expo-router";
import { Home, MessageCircle, Package, ScanQrCode, UserRound } from "lucide-react-native";
import { Text, View } from "react-native";
import { colors } from "@/theme";

const labels: Record<string, string> = {
  home: "Nhà",
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

export default function TabsLayout() {
  return (
    <Tabs screenOptions={({ route }) => ({
      headerShown: false,
      freezeOnBlur: true,
      lazy: true,
      popToTopOnBlur: true,
      unmountOnBlur: true,
      tabBarActiveTintColor: colors.primaryDark,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarStyle: {
        backgroundColor: colors.white,
        borderTopColor: "transparent",
        elevation: 8,
        height: 76,
        paddingBottom: 11,
        paddingHorizontal: 18,
        paddingTop: 11,
        shadowColor: colors.primaryDark,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 16
      },
      tabBarItemStyle: {
        height: 54,
        justifyContent: "center"
      },
      tabBarIconStyle: {
        height: 26,
        marginBottom: 0,
        marginTop: 0
      },
      tabBarIcon: ({ color, focused }) => {
        const Icon = tabIcons[route.name as keyof typeof tabIcons];
        return (
          <View
            style={{
              alignItems: "center",
              backgroundColor: focused ? colors.primarySoft : colors.surfaceMuted,
              borderRadius: 13,
              height: 26,
              justifyContent: "center",
              width: 26
            }}
          >
            <Icon color={color} size={15} strokeWidth={focused ? 2.8 : 2.2} />
          </View>
        );
      },
      tabBarLabel: ({ color, focused }) => (
        <Text
          style={{
            color,
            fontSize: 10,
            fontWeight: focused ? "800" : "500",
            lineHeight: 15,
            marginTop: 4,
            textAlign: "center"
          }}
        >
          {labels[route.name]}
        </Text>
      )
    })}>
      <Tabs.Screen name="home" options={{ title: labels.home }} />
      <Tabs.Screen name="products" options={{ title: labels.products }} />
      <Tabs.Screen name="trace" options={{ title: labels.trace }} />
      <Tabs.Screen name="chat" options={{ title: labels.chat }} />
      <Tabs.Screen name="profile" options={{ title: labels.profile }} />
    </Tabs>
  );
}

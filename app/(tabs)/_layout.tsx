import { Tabs } from "expo-router";
import { Home, MessageCircle, Package, ScanQrCode, UserRound } from "lucide-react-native";
import { Text } from "react-native";
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
      tabBarActiveTintColor: "#0096A0",
      tabBarInactiveTintColor: "#7E8F94",
      tabBarStyle: {
        backgroundColor: colors.white,
        borderTopColor: "transparent",
        elevation: 8,
        height: 72,
        paddingBottom: 8,
        paddingTop: 8,
        shadowColor: "#8AA0A3",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 16
      },
      tabBarItemStyle: {
        height: 56,
        justifyContent: "center"
      },
      tabBarIconStyle: {
        height: 30,
        marginBottom: 0,
        marginTop: 0
      },
      tabBarIcon: ({ color, focused }) => {
        const Icon = tabIcons[route.name as keyof typeof tabIcons];
        return <Icon color={color} size={26} strokeWidth={focused ? 2.8 : 2.2} />;
      },
      tabBarLabel: ({ color, focused }) => (
        <Text
          style={{
            color,
            fontSize: 12,
            fontWeight: focused ? "800" : "600",
            lineHeight: 16,
            marginTop: 0,
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

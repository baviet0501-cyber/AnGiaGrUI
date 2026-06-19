import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true
  })
});

async function ensureNotificationPermission() {
  if (Platform.OS === "web") {
    return false;
  }

  const current = await Notifications.getPermissionsAsync();
  if (current.granted || current.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
    return true;
  }

  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted || requested.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
}

async function ensureAndroidChannel(channelId: string, name: string) {
  if (Platform.OS !== "android") {
    return;
  }

  await Notifications.setNotificationChannelAsync(channelId, {
    importance: Notifications.AndroidImportance.HIGH,
    lightColor: "#00B1D5",
    name,
    vibrationPattern: [0, 220, 120, 220]
  });
}

export async function pushChatbotPreviewNotification() {
  const hasPermission = await ensureNotificationPermission();
  if (!hasPermission) {
    return { ok: false, reason: "permission-denied" as const };
  }

  await ensureAndroidChannel("chatbot-preview", "Chatbot CSKH");
  await Notifications.scheduleNotificationAsync({
    content: {
      body: "Chatbot đã ghi nhận yêu cầu kiểm tra lô sản phẩm. Tư vấn viên sẽ phản hồi trong hồ sơ CSKH.",
      data: { route: "/(tabs)/chat", source: "chatbot-preview" },
      sound: "default",
      title: "An Gia Green CSKH"
    },
    trigger: null
  });

  return { ok: true as const };
}

export async function pushRecentProductReminder(productId: string, productName: string) {
  const hasPermission = await ensureNotificationPermission();
  if (!hasPermission) {
    return { ok: false, reason: "permission-denied" as const };
  }

  await ensureAndroidChannel("product-reminders", "Nhắc xem sản phẩm");
  await Notifications.scheduleNotificationAsync({
    content: {
      body: "Bạn vừa xem " + productName + ". Mở lại để xem giá, chứng nhận và đặt mua trên website.",
      data: { productId, route: "/product/" + productId, source: "recent-product" },
      sound: "default",
      title: "Sản phẩm bạn quan tâm"
    },
    trigger: { seconds: 5, type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL }
  });

  return { ok: true as const };
}


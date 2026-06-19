import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const NOTIFICATIONS_KEY = "angia.app.notifications";
const MAX_NOTIFICATIONS = 50;

export type StoredNotification = {
  body: string;
  createdAt: string;
  id: string;
  readAt?: string;
  route?: string;
  title: string;
  type: "product-reminder" | "chatbot" | "system";
};

async function getRawValue() {
  if (Platform.OS === "web") {
    return globalThis.localStorage?.getItem(NOTIFICATIONS_KEY) ?? null;
  }

  return SecureStore.getItemAsync(NOTIFICATIONS_KEY);
}

async function setRawValue(value: string) {
  if (Platform.OS === "web") {
    globalThis.localStorage?.setItem(NOTIFICATIONS_KEY, value);
    return;
  }

  await SecureStore.setItemAsync(NOTIFICATIONS_KEY, value);
}

async function deleteRawValue() {
  if (Platform.OS === "web") {
    globalThis.localStorage?.removeItem(NOTIFICATIONS_KEY);
    return;
  }

  await SecureStore.deleteItemAsync(NOTIFICATIONS_KEY);
}

function sortNotifications(items: StoredNotification[]) {
  return [...items].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function loadStoredNotifications() {
  const raw = await getRawValue();
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as StoredNotification[];
    return sortNotifications(Array.isArray(parsed) ? parsed : []);
  } catch {
    await deleteRawValue();
    return [];
  }
}

async function saveStoredNotifications(items: StoredNotification[]) {
  await setRawValue(JSON.stringify(sortNotifications(items).slice(0, MAX_NOTIFICATIONS)));
}

export async function addStoredNotification(input: Omit<StoredNotification, "createdAt" | "id">) {
  const notification: StoredNotification = {
    ...input,
    createdAt: new Date().toISOString(),
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  };
  const current = await loadStoredNotifications();
  await saveStoredNotifications([notification, ...current]);
  return notification;
}

export async function markStoredNotificationRead(id: string) {
  const current = await loadStoredNotifications();
  const updated = current.map(item => (item.id === id && !item.readAt ? { ...item, readAt: new Date().toISOString() } : item));
  await saveStoredNotifications(updated);
  return updated;
}

export async function deleteStoredNotification(id: string) {
  const current = await loadStoredNotifications();
  const updated = current.filter(item => item.id !== id);
  await saveStoredNotifications(updated);
  return updated;
}

export async function clearStoredNotifications() {
  await deleteRawValue();
}
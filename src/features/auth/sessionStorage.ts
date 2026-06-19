import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import type { AuthResponse } from "./api";

const SESSION_KEY = "angia.customer.session";

export async function loadStoredSession() {
  if (Platform.OS === "web") {
    return undefined;
  }

  const rawSession = await SecureStore.getItemAsync(SESSION_KEY);
  if (!rawSession) {
    return undefined;
  }

  try {
    return JSON.parse(rawSession) as AuthResponse;
  } catch {
    await SecureStore.deleteItemAsync(SESSION_KEY);
    return undefined;
  }
}

export async function saveStoredSession(session: AuthResponse) {
  if (Platform.OS === "web") {
    return;
  }

  await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session));
}

export async function clearStoredSession() {
  if (Platform.OS === "web") {
    return;
  }

  await SecureStore.deleteItemAsync(SESSION_KEY);
}

import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import type { AuthResponse, Customer, LoginPayload, RegisterPayload } from "./api";
import { clearStoredSession, loadStoredSession, saveStoredSession } from "./sessionStorage";

type AuthSession = AuthResponse;

type AuthContextValue = {
  accessToken?: string;
  customer?: Customer;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<AuthSession>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<Customer | undefined>;
  register: (payload: RegisterPayload) => Promise<Customer>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function createDemoCustomer(payload: { email?: string; fullName?: string; username: string }): Customer {
  return {
    active: true,
    createdAt: new Date().toISOString(),
    email: payload.email,
    fullName: payload.fullName || "Khách hàng demo",
    id: Math.abs(payload.username.split("").reduce((total, char) => total + char.charCodeAt(0), 0)),
    provider: "demo",
    username: payload.username
  };
}

function createDemoSession(customer: Customer): AuthSession {
  return {
    accessToken: `demo-access-${customer.username}-${Date.now()}`,
    customer,
    expiresIn: 60 * 60 * 24 * 30,
    refreshToken: `demo-refresh-${customer.username}-${Date.now()}`,
    tokenType: "Demo"
  };
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<AuthSession | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    loadStoredSession()
      .then(storedSession => {
        if (isMounted) {
          setSession(storedSession);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  async function login(payload: LoginPayload) {
    const customer = session?.customer?.username === payload.username
      ? session.customer
      : createDemoCustomer({ username: payload.username });
    const nextSession = createDemoSession(customer);
    setSession(nextSession);
    await saveStoredSession(nextSession);
    return nextSession;
  }

  async function register(payload: RegisterPayload) {
    const customer = createDemoCustomer(payload);
    const nextSession = createDemoSession(customer);
    setSession(nextSession);
    await saveStoredSession(nextSession);
    return customer;
  }

  async function logout() {
    setSession(undefined);
    await clearStoredSession();
  }

  async function refreshProfile() {
    return session?.customer;
  }

  const value = useMemo<AuthContextValue>(() => ({
    accessToken: session?.accessToken,
    customer: session?.customer,
    isAuthenticated: Boolean(session?.accessToken),
    isLoading,
    login,
    logout,
    refreshProfile,
    register
  }), [isLoading, session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return value;
}
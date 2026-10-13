"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export interface AuthUser {
  name: string;
  email: string;
  /** Two-letter initials for the header avatar. */
  initials: string;
}

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "?";
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * The seam for a real provider later (NextAuth, Clerk, a session cookie, ...).
 * Nothing outside this file knows the session lives in localStorage.
 */
export interface AuthAdapter {
  /** Resolve the current session, or null when signed out. */
  getSession: () => Promise<AuthUser | null>;
  signIn: () => Promise<AuthUser>;
  signOut: () => Promise<void>;
}

const STORAGE_KEY = "qm-auth";

/** Clearly-marked placeholder account - not a real person. */
export const MOCK_USER: AuthUser = {
  name: "Sample Analyst",
  email: "analyst@example.com",
  initials: initialsFromName("Sample Analyst"),
};

/** Mock adapter: persists a fake session in localStorage. */
export const mockAuthAdapter: AuthAdapter = {
  async getSession() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      // Storage unavailable (private mode): treat as signed out.
      return null;
    }
  },
  async signIn() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_USER));
    } catch {
      // Storage unavailable: the session still applies for this page view.
    }
    return MOCK_USER;
  },
  async signOut() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to clear.
    }
  },
};

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface AuthContextValue {
  user: AuthUser | null;
  status: AuthStatus;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export interface AuthProviderProps {
  children: ReactNode;
  /** Inject a different adapter to swap out the mock. */
  adapter?: AuthAdapter;
}

export function AuthProvider({ children, adapter = mockAuthAdapter }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    let cancelled = false;

    void adapter.getSession().then((session) => {
      if (cancelled) {
        return;
      }
      setUser(session);
      setStatus(session ? "authenticated" : "unauthenticated");
    });

    return () => {
      cancelled = true;
    };
  }, [adapter]);

  const login = useCallback(async () => {
    const next = await adapter.signIn();
    setUser(next);
    setStatus("authenticated");
  }, [adapter]);

  const logout = useCallback(async () => {
    await adapter.signOut();
    setUser(null);
    setStatus("unauthenticated");
  }, [adapter]);

  const value = useMemo<AuthContextValue>(
    () => ({ user, status, login, logout }),
    [user, status, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return context;
}
"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/hook";
import { refreshSession } from "../../../utils/axiosConfig";
import { parseTokenExpiry } from "../../../utils/session";

const MAX_TIMER_DELAY = 2_147_483_647;

const SessionWatcher = () => {
  const { isAuthenticated, token, tokenExpiry } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const expiry = parseTokenExpiry(tokenExpiry);
    if (expiry == null) return;

    const remaining = expiry - Date.now();
    const delay = Math.min(Math.max(remaining, 0), MAX_TIMER_DELAY);
    const timer = window.setTimeout(() => {
      refreshSession().catch(() => undefined);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isAuthenticated, token, tokenExpiry]);

  return null;
};

export default SessionWatcher;

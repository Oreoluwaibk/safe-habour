import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { store } from "@/store";
import { selectedToken, selectedTokenExpiry, setToken, logoutUser } from "@/redux/reducer/auth/auth";
import { cleanToken, expiryToStore, parseTokenExpiry, rememberLastRoute } from "./session";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
export const pictureUrl = process.env.NEXT_PUBLIC_PROFILE_URL;

const axiosInstance = axios.create({
  baseURL,
});

const refreshClient = axios.create({
  baseURL,
});

type QueueItem = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;
let redirecting = false;
let refreshQueue: QueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  refreshQueue.forEach((item) => {
    if (error || !token) item.reject(error);
    else item.resolve(token);
  });
  refreshQueue = [];
};

const waitForRefresh = () =>
  new Promise<string>((resolve, reject) => {
    refreshQueue.push({ resolve, reject });
  });

const forceLogin = () => {
  const hadSession = Boolean(cleanToken(selectedToken(store.getState()))) || store.getState().auth.isAuthenticated;
  const onDashboard = typeof window !== "undefined" && window.location.pathname.startsWith("/dashboard");
  store.dispatch(logoutUser());
  if (!hadSession && !onDashboard) return;

  rememberLastRoute();
  if (typeof window === "undefined") return;
  if (window.location.pathname.startsWith("/auth")) return;
  if (redirecting) return;
  redirecting = true;
  window.location.assign("/auth/login");
};

const readRefreshPayload = (body: unknown) => {
  if (!body || typeof body !== "object") return { token: undefined, tokenExpiry: undefined };
  const record = body as { token?: string; tokenExpiry?: unknown; data?: { token?: string; tokenExpiry?: unknown } };
  const payload = record.data?.token ? record.data : record;
  return { token: payload.token, tokenExpiry: payload.tokenExpiry };
};

/**
 * Refreshes with a bare client so this request cannot queue behind itself.
 */
const handleTokenRefresh = async (oldToken: string) => {
  try {
    const response = await refreshClient.post("/Authentication/refresh", { token: oldToken });
    const { token: newToken, tokenExpiry } = readRefreshPayload(response.data);
    if (!newToken) throw new Error("Refresh did not return a token");

    const newExpiry = expiryToStore(tokenExpiry) || String(Date.now() + 3600 * 1000);
    const expiryMs = parseTokenExpiry(newExpiry);
    if (expiryMs != null && expiryMs <= Date.now()) {
      throw new Error("Refresh returned an expired token");
    }
    store.dispatch(setToken({ token: newToken, tokenExpiry: newExpiry }));
    processQueue(null, newToken);
    return newToken;
  } catch (err) {
    processQueue(err, null);
    forceLogin();
    throw err;
  } finally {
    isRefreshing = false;
  }
};

export async function refreshSession() {
  const token = cleanToken(selectedToken(store.getState()));
  if (!token) {
    forceLogin();
    throw new Error("Missing session");
  }
  if (isRefreshing) return waitForRefresh();
  isRefreshing = true;
  return handleTokenRefresh(token);
}

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const state = store.getState();
    const token = cleanToken(selectedToken(state));
    const expiry = parseTokenExpiry(selectedTokenExpiry(state));
    const expired = expiry != null && expiry <= Date.now();

    if (token && expired) {
      const newToken = await refreshSession();
      config.headers.Authorization = `Bearer ${newToken}`;
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

    if (error.response?.status !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    const token = cleanToken(selectedToken(store.getState()));

    if (!token) {
      forceLogin();
      return Promise.reject(error);
    }

    try {
      const newToken = await refreshSession();
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return axiosInstance(originalRequest);
    } catch (err) {
      return Promise.reject(err);
    }
  }
);

export default axiosInstance;

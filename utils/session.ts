export const LAST_ROUTE_KEY = "safehabour_last_route";

/** Accepts an ISO date, a millisecond timestamp, or a second timestamp. */
export function parseTokenExpiry(value: unknown): number | null {
  if (value == null || value === "") return null;

  if (typeof value === "number") {
    if (!Number.isFinite(value)) return null;
    return value < 1e12 ? value * 1000 : value;
  }

  let raw = String(value).trim();
  if (
    (raw.startsWith('"') && raw.endsWith('"')) ||
    (raw.startsWith("'") && raw.endsWith("'"))
  ) {
    raw = raw.slice(1, -1);
  }
  if (!raw) return null;

  if (/^\d+$/.test(raw)) {
    const numeric = Number(raw);
    return numeric < 1e12 ? numeric * 1000 : numeric;
  }

  const parsed = Date.parse(raw);
  return Number.isNaN(parsed) ? null : parsed;
}

export function expiryToStore(value: unknown): string {
  const parsed = parseTokenExpiry(value);
  if (parsed != null) return String(parsed);
  return value == null ? "" : String(value);
}

export function cleanToken(token: string | null | undefined): string | null {
  if (!token) return null;
  const trimmed = token.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try {
      const parsed = JSON.parse(trimmed);
      return typeof parsed === "string" ? parsed : trimmed;
    } catch {
      return trimmed.slice(1, -1);
    }
  }
  return trimmed;
}

export function rememberLastRoute(url?: string) {
  if (typeof window === "undefined") return;
  const path = url ?? `${window.location.pathname}${window.location.search}`;
  if (!path || path.startsWith("/auth")) return;
  sessionStorage.setItem(LAST_ROUTE_KEY, path);
}

export function readLastRoute(): string | null {
  if (typeof window === "undefined") return null;
  const route = sessionStorage.getItem(LAST_ROUTE_KEY);
  if (!route || route.startsWith("/auth")) return null;
  return route;
}

export function clearLastRoute() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(LAST_ROUTE_KEY);
}

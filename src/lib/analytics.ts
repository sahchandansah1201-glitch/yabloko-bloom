type GtagFn = (command: "event", name: string, params?: Record<string, unknown>) => void;

/** Безопасная отправка события: вызывает window.gtag только если он подключён. */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof gtag !== "function") return;
  try {
    gtag("event", name, params);
  } catch {
    /* аналитика не должна ломать страницу */
  }
}

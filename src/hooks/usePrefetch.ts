import { useCallback } from "react";

// Map routes to their lazy import functions for prefetching
const routeImports: Record<string, () => Promise<unknown>> = {
  "/services": () => import("@/pages/ServicesHub"),
  "/specialists": () => import("@/pages/Specialists"),
  "/advice": () => import("@/pages/AdviceHub"),
  "/contacts": () => import("@/pages/Contacts"),
  "/about": () => import("@/pages/About"),
  "/price": () => import("@/pages/PricePage"),
  "/patients": () => import("@/pages/PatientsInfo"),
  "/privacy": () => import("@/pages/Privacy"),
};

const prefetched = new Set<string>();

export function usePrefetch() {
  const prefetch = useCallback((path: string) => {
    // Match exact or prefix (e.g. /services -> /services)
    const key = Object.keys(routeImports).find(
      (k) => path === k || path.startsWith(k + "/")
    );
    if (key && !prefetched.has(key)) {
      prefetched.add(key);
      routeImports[key]();
    }
  }, []);

  return prefetch;
}

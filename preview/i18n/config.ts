import type { Locale, Namespace } from "./types";

export const locales = ["en", "zh-Hans"] as const;
export const namespaces = ["common", "dashboard"] as const;
export const defaultLocale: Locale = "en";
export const dictPageMap = {
	common: "/",
	dashboard: "/dashboard",
} as const satisfies Record<Namespace, string>;

import { Locale, ParsedLocale } from "./types";
import { defaultLocale, rawLocales } from "./config";

export const locales: ParsedLocale[] = rawLocales.map((locale) => {
	const parsed = parseLocale(locale);
	if (!parsed) throw Error(`I18n presets has invalid locale: ${locale}`);
	return { locale, parsed };
});

export function pickLocale(source: {
	path?: string;
	cookie?: string;
	acceptLanguage?: string;
	navigator?: string;
}): Locale {
	return matchLocale(source.cookie) ?? matchLocale(source.navigator) ?? defaultLocale;
}

export function matchLocale(literal?: string): Locale {
	const unexpectedLocale =
		literal == undefined || (!literal.startsWith("zh") && !literal.startsWith("en"));
	if (unexpectedLocale) return defaultLocale;
	return literal as Locale;
}

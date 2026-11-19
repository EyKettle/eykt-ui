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

export function matchLocale(input?: string): Locale {
	const requested = parseLocale(input);
	if (!requested) {
		console.warn("Encountered an invalid language code:", input);
		return defaultLocale;
	}

	const matches = locales.filter((l) => l.parsed.language === requested.language);

	if (matches.length === 1) return matches[0].locale;

	const match = matches.find((l) => l.parsed.script === requested.script);
	if (match) return match.locale;

	return matches[0]?.locale ?? defaultLocale;
}

export function parseLocale(input?: string): Intl.Locale | undefined {
	try {
		const [canonical] = Intl.getCanonicalLocales(input);
		if (!canonical) return undefined;

		return new Intl.Locale(canonical as Intl.UnicodeBCP47LocaleIdentifier).maximize();
	} catch {
		return undefined;
	}
}

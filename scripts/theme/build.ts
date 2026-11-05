import {
	argbFromHex,
	DynamicScheme,
	Hct,
	hexFromArgb,
	MaterialDynamicColors,
	Variant,
} from "@material/material-color-utilities";
import { ThemeInput } from "../../src/theme/types.ts";
import { sourceColor } from "../../src/theme/config.ts";
import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const input = {
	specVersion: "2025",
	sourceColorHct: Hct.fromInt(argbFromHex(sourceColor)),
	variant: Variant.NEUTRAL,
	contrastLevel: 0,
} satisfies ThemeInput;

const lightScheme = new DynamicScheme({
	isDark: false,
	...input,
});
const darkScheme = new DynamicScheme({
	isDark: true,
	...input,
});

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "../..");
const outputPath = resolve(projectRoot, "src/styles/tokens.css");

await writeFile(outputPath, generateCss(lightScheme, darkScheme) + "\n", "utf8");

function generateCss(lightScheme: DynamicScheme, darkScheme: DynamicScheme): string {
	const colors = new MaterialDynamicColors();
	const declarations = colors.allColors.map((color) => {
		const name = `--eykt-color-${color.name.replaceAll("_", "-")}`;
		const lightValue = hexFromArgb(color.getArgb(lightScheme));
		const darkValue = hexFromArgb(color.getArgb(darkScheme));
		return `  ${name}: light-dark(${lightValue}, ${darkValue});`;
	});
	return [
		"/* auto-generated, DO NOT EDIT. */",
		":root {",
		"  color-scheme: light dark;",
		...declarations,
		"}",
		"",
		':root[data-theme="light"] {',
		"  color-scheme: light;",
		"}",
		"",
		':root[data-theme="dark"] {',
		"  color-scheme: dark;",
		"}",
	].join("\n");
}

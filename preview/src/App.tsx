import type { Component } from "solid-js";
import "./App.css";
import { setLocale, t } from "#i18n";
import { Box, Button } from "eykt-ui";

// Demos are discovered from the filesystem, so the component list never has to
// be maintained a second time. Every demo default-exports a component.
const modules = import.meta.glob<{ default: Component }>("../demos/**/*.tsx", {
	eager: true,
});

const demos = Object.entries(modules)
	.map(([path, module]) => ({
		name: path.replace("../demos/", "").replace(/\.tsx$/, ""),
		Demo: module.default,
	}))
	.sort((a, b) => a.name.localeCompare(b.name));

export default function App() {
	const handleLanguageSwitch = () => {
		setLocale((old) => (old === "en-US" ? "zh-CN" : "en-US"));
	};

	return (
		<main class="preview page content">
			<h1>eykt-ui preview</h1>
			<Button onClick={handleLanguageSwitch}>{t("lang.switch")}</Button>
			{demos.length === 0 ? (
				<Box class="page wide">{t("demo.empty")}</Box>
			) : (
				demos.map((demo) => (
					<section class="demo">
						<h2>{demo.name}</h2>
						<demo.Demo />
					</section>
				))
			)}
		</main>
	);
}

import "./App.css";
import { setLocale, t } from "#i18n";
import { Button } from "eykt-ui";
import { Router } from "./router";

export default function App() {
	const handleLanguageSwitch = () => {
		setLocale((old) => (old === "en-US" ? "zh-CN" : "en-US"));
	};

	return (
		<Router>
			{(props) => (
				<main class="preview page content">
					<h1>{t("title.home")}</h1>
					<Button onCall={handleLanguageSwitch}>{t("lang.switch")}</Button>
					{props.children}
				</main>
			)}
		</Router>
	);
}

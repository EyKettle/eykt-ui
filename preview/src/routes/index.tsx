import { Title } from "@solidjs/meta";
import { Box, Button } from "eykt-ui";
import { t } from "#i18n";
import { useNavigate } from "@solidjs/router";
import { paths } from "../router";

export default function () {
	const navigate = useNavigate();

	return (
		<Box class="page wide">
			<Title>{t("title.home")}</Title>
			<div class="container column">
				<Button onCall={() => navigate(paths.about)}>{t("nav.about")}</Button>
				<label>{t("demo.empty")}</label>
			</div>
		</Box>
	);
}

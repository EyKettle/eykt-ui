import { Box, Button } from "eykt-ui";
import { t } from "#i18n";
import { Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";

export default function () {
	const navigate = useNavigate();

	return (
		<Box class="page wide">
			<Title>{t("title.about")}</Title>
			<Button onCall={() => navigate(-1)}>{t("nav.back")}</Button>
			<div class="container column">
				<label>{t("demo.empty")}</label>
			</div>
		</Box>
	);
}

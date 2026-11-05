import { Hct, Variant } from "@material/material-color-utilities";

export type ThemeInput = {
	specVersion: "2021" | "2025";
	sourceColorHct: Hct;
	variant: Variant;
	contrastLevel: number;
};

import { Component, createMemo, omit } from "solid-js";
import { BaseProps } from "../composable/baseFrame";

interface Props extends BaseProps<HTMLSpanElement> {
	variant?: "outlined" | "rounded" | "sharp";
	id: string;
}
const Icon: Component<Props> = (props) => {
	const restProps = omit(props, "class", "variant", "id");
	const style = createMemo(() => `material-symbols-${props.variant ?? "outlined"}`);
	return <span {...restProps} class={[props.class, style(), "icon"]} data-icon={props.id} />;
};

export default Icon;

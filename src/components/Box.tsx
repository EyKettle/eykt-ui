import type { JSX } from "@solidjs/web";
import { Component, omit, ParentProps } from "solid-js";
import style from "./Box.module.scss";

interface Props extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>> {}
const Box: Component<Props> = (props) => {
	const restProps = omit(props, "children", "class");

	return (
		<div {...restProps} class={`${style.composition} ${style.surface} ${props.class ?? ""}`.trim()}>
			{props.children}
		</div>
	);
};

export default Box;

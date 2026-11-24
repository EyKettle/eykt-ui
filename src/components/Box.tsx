import type { JSX } from "@solidjs/web";
import { Component, omit } from "solid-js";

interface Props extends JSX.HTMLAttributes<HTMLDivElement> {}
const Box: Component<Props> = (props) => {
	const restProps = omit(props, "children", "class");

	return (
		<div {...restProps} class={["box", props.class]}>
			{props.children}
		</div>
	);
};

export default Box;

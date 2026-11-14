import type { JSX } from "@solidjs/web";
import { Component, omit } from "solid-js";

interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {}
const Button: Component<Props> = (props) => {
	const restProps = omit(props, "children");
	return <button {...restProps}>{props.children}</button>;
};

export default Button;

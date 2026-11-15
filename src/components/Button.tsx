import { Component, omit } from "solid-js";
import { createInteractionState } from "../composable/interaction";
import { BaseProps } from "../composable/baseFrame";

interface Props extends BaseProps<HTMLButtonElement> {}
const Button: Component<Props> = (props) => {
	const restProps = omit(props, "children", "class");
	const i = createInteractionState<Props, HTMLButtonElement>({}, props);
	return (
		<button {...i.handlers} {...restProps} class={[props.class, { ...i.classList() }]}>
			{props.children}
		</button>
	);
};

export default Button;

import { Component, omit } from "solid-js";
import { createInteractionState } from "../composable/interaction";
import { BaseProps } from "../composable/baseFrame";

interface Props extends BaseProps<HTMLButtonElement> {}
const Button: Component<Props> = (props) => {
	const restProps = omit(props, "children");
	const i = createInteractionState<Props, HTMLButtonElement>({}, props);
	return (
		<button {...restProps} {...i.handlers}>
			{props.children}
		</button>
	);
};

export default Button;

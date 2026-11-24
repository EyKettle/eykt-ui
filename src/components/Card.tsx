import { Component, omit } from "solid-js";
import { BaseProps } from "../composable/baseFrame";
import { createInteractionState } from "../composable/interaction";

interface Props extends BaseProps<HTMLDivElement> {}
const Card: Component<Props> = (props) => {
	const restProps = omit(props, "children", "class");
	const i = createInteractionState<Props, HTMLDivElement>({}, props);
	return (
		<div {...i.handlers} {...restProps} class={["box", props.class, { ...i.classList() }]}>
			{props.children}
		</div>
	);
};

export default Card;

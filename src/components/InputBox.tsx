import { Component, omit } from "solid-js";
import { createInteractionState } from "../composable/interaction";
import { BaseProps } from "../composable/baseFrame";

interface Props extends BaseProps<HTMLInputElement> {}
const InputBox: Component<Props> = (props) => {
	const restProps = omit(props, "children", "class");
	const i = createInteractionState<Props, HTMLInputElement>({}, props);
	return (
		<input {...i.handlers} {...restProps} class={[props.class, { ...i.classList() }]}>
			{props.children}
		</input>
	);
};

export default InputBox;

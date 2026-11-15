import type { BaseProps } from "./baseFrame";
import { createStore } from "solid-js";
import { onCleanup } from "solid-js";
import { isServer, type JSX } from "@solidjs/web";

/**
 * `onClick` in config only trigger within element
 */
export function createInteractionState<P extends BaseProps<T>, T extends HTMLElement>(
	options?: { draggable?: boolean },
	props?: P,
) {
	const [state, setState] = createStore({
		hovered: false,
		pressed: false,
	});
	const handlers = {
		tabindex: 0,
		onPointerEnter: (e) => {
			setState((s) => void (s.hovered = true));
			props?.onHover?.(e.currentTarget);
		},
		onPointerLeave: (e) => {
			setState((s) => void (s.hovered = false));
			props?.onLeave?.(e.currentTarget);
		},
		onPointerDown: (e) => {
			if (e.button !== 0) return;
			e.currentTarget.setPointerCapture(e.pointerId);
			setState((s) => void (s.pressed = true));
			props?.onPress?.(e.currentTarget);
		},
		onPointerUp: (e) => {
			if (e.button !== 0) return;
			e.currentTarget.releasePointerCapture(e.pointerId);
			setState((s) => void (s.pressed = false));
			props?.onRelease?.(e.currentTarget);
		},
		onTouchStart: () =>
			setState((state) => {
				state.hovered = true;
				state.pressed = true;
			}),
		onTouchEnd: () =>
			setState((state) => {
				state.hovered = false;
				state.pressed = false;
			}),
		onPointerMove: (e) => {
			if (!options?.draggable) e.preventDefault();
		},
		onClick: (e) => {
			const pointedElement = document.elementFromPoint(e.x, e.y);
			const focusThis = e.currentTarget.contains(pointedElement);
			if (props?.onCall && focusThis) {
				props.onCall(e.currentTarget);
			}
		},
		onKeyDown: (e) => {
			const focusThis = document.activeElement === e.target;
			if (e.key === "Enter" && focusThis) {
				setState((state) => {
					state.hovered = true;
					state.pressed = true;
				});
			}
		},
		onKeyUp: (e) => {
			const focusThis = document.activeElement === e.target;
			if (e.key === "Enter" && focusThis) {
				handleWindowBlur();
				if (props?.onCall) props.onCall(e.currentTarget);
			}
		},
	} satisfies JSX.HTMLAttributes<T>;
	const classList = (): {
		[k: string]: boolean | undefined;
	} => ({
		hover: state.hovered || state.pressed,
		press: state.hovered && state.pressed,
	});

	const handleWindowBlur = () => {
		setState((state) => {
			state.hovered = false;
			state.pressed = false;
		});
	};

	if (!isServer) {
		window.addEventListener("blur", handleWindowBlur);
		onCleanup(() => {
			window.removeEventListener("blur", handleWindowBlur);
		});
	}

	return {
		get hovered() {
			return state.hovered;
		},
		get pressed() {
			return state.pressed;
		},
		handlers,
		classList,
		enter: () => setState((s) => void (s.hovered = true)),
		leave: () => setState((s) => void (s.hovered = false)),
		press: () => setState((s) => void (s.pressed = true)),
		release: () => setState((s) => void (s.pressed = false)),
	};
}

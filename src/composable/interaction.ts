import type { SolidClickEvent, SolidPointerEvent } from "../solid";
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
		onPointerEnter: (e: SolidPointerEvent<T>) => {
			setState((s) => void (s.hovered = true));
			props?.onHover?.(e.currentTarget);
		},
		onPointerLeave: (e: SolidPointerEvent<T>) => {
			setState((s) => void (s.hovered = false));
			props?.onLeave?.(e.currentTarget);
		},
		onPointerDown: (e: SolidPointerEvent<T>) => {
			if (e.button !== 0) return;
			e.currentTarget.setPointerCapture(e.pointerId);
			setState((s) => void (s.pressed = true));
			props?.onPress?.(e.currentTarget);
		},
		onPointerUp: (e: SolidPointerEvent<T>) => {
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
		onPointerMove: (e: SolidPointerEvent<T>) => {
			if (!options?.draggable) e.preventDefault();
		},
		onClick: (e: SolidClickEvent<T>) => {
			if (props?.onClick && e.currentTarget.contains(document.elementFromPoint(e.x, e.y))) {
				props.onClick(e);
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

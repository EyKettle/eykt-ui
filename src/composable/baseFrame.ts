import type { Component as SolidComponent } from "solid-js";
import type { JSX } from "@solidjs/web";

type HTMLAttr<T> = Omit<JSX.HTMLAttributes<T>, keyof typeof BaseEvents>;
export interface BaseProps<T extends HTMLElement> extends HTMLAttr<T> {
	onHover?: (el: T) => void;
	onLeave?: (el: T) => void;
	onPress?: (el: T) => void;
	onRelease?: (el: T) => void;
	onClick?: (el: SolidClickEvent<T>) => void;
}
export const BaseEvents = ["onHover", "onLeave", "onPress", "onRelease", "onClick"] as const;

export type Component<T extends HTMLElement, U extends object> = SolidComponent<BaseProps<T> & U>;

import type { JSX } from "@solidjs/web";

export type SolidPointerEvent<T extends HTMLElement> = Parameters<
	JSX.EventHandler<T, PointerEvent>
>[0];

export type SolidClickEvent<T extends HTMLElement> = Parameters<JSX.EventHandler<T, MouseEvent>>[0];

export type SolidFocusEvent<T extends HTMLElement> = Parameters<JSX.EventHandler<T, FocusEvent>>[0];

export type SolidInputEvent<T extends HTMLElement> = Parameters<JSX.EventHandler<T, InputEvent>>[0];

export type SolidCompositionEvent<T extends HTMLElement> = Parameters<
	JSX.EventHandler<T, CompositionEvent>
>[0];

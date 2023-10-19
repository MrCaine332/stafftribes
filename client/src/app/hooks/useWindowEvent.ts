import {useEffect} from "react";
import {useEvent} from "@app/hooks/useEvent";

type GetWindowEvent<Type extends (keyof WindowEventMap | string)> = Type extends keyof WindowEventMap
	? WindowEventMap[Type]
	: Event

export function useWindowEvent<Type extends keyof WindowEventMap | string>(
	type: Type,
	callback: (event: GetWindowEvent<Type>) => void,
	options?: boolean | AddEventListenerOptions
): void
export function useWindowEvent(
	type: string,
	cb: (event: Event) => void,
	options?: boolean | AddEventListenerOptions
) {
	const eventCb = useEvent(cb)

	useEffect(() => {
		window.addEventListener(type, eventCb, options)

		return () => window.removeEventListener(type, eventCb, options)
	}, [])
}


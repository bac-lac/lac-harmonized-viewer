import { EventEmitter } from "events";
export var events: EventEmitter = new EventEmitter();

export function bindNativeListener(element: HTMLElement, nativeEventName: string, eventName: string): void {
    if(!element || !nativeEventName) {
        return undefined;
    }
    element.addEventListener(nativeEventName, (eventArgs: any) => events.emit(eventName || nativeEventName, eventArgs));
}
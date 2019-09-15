import { ComponentBase } from "./base.component";
import { eventSource, TEvent, IEvent } from "../events/event";

export abstract class Component extends ComponentBase implements IComponent {

    on(event: string, listener: (event: any) => void): void {
        eventSource.on(event, (event: any) => listener(event));
    }

    publish(event: string | TEvent, eventArgs?: any): boolean {
        if (!event) {
            return false;
        }
        if (typeof event == 'string') {
            return eventSource.emit(event, eventArgs);
        }
        else {
            return eventSource.emit((event as TEvent).name, event);
        }
    }

    addListener(event: string, selector: string, resolver: (target: HTMLElement) => IEvent): void {
        if (!event) {
            return;
        }
        this.element.addEventListener(event, (eventNative) => {
            if (selector) {
                const eventTarget = this.getEventTarget(eventNative.target as HTMLElement, selector);
                if (eventTarget) {
                    const forwardTo = resolver(eventTarget);
                    this.publish(forwardTo.name, forwardTo);
                }
            }
            // else {
            //     this.publish(event);
            // }
        });
    }

    private getEventTarget(child: HTMLElement, selector: string): HTMLElement {
        if (!selector) {
            return undefined;
        }
        return Array
            .from(this.element.querySelectorAll(selector))
            .map(elem => elem as HTMLElement)
            .find(elem => elem.isSameNode(child) || elem.contains(child));
    }

    bind(eventNativeName: string, eventName: string, map: (eventTarget: HTMLElement) => any = undefined, selector: string = undefined): void {
        if (!eventName) {
            return undefined;
        }

        this.element.addEventListener(eventNativeName, (event) => {

            const target = event.target as HTMLElement;

            const eventMapping = (map ? map(target) : event);

            if (selector) {

                // When a selector is provided, resolve the event target by filtering selected elements
                // Emit the event only when the event target can be resolved

                const selectorTarget = Array.from(this.element.querySelectorAll(selector))
                    .map(elem => elem as HTMLElement)
                    .find(elem => elem.isSameNode(target) || elem.contains(target));

                if (selectorTarget) {
                    this.publish(eventName, eventMapping);
                }

            }
            else {

                // Selector not provided, no filtering required
                this.publish(eventName, eventMapping);

            }
        });
    }

}

export interface IComponent {
    on(event: string, listener: (event: any) => void): void;
    publish(event: string | TEvent, eventArgs?: any): boolean;
}
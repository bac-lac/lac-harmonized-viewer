import { ComponentBase } from "./base.component";
import { events } from "../event";

export abstract class Component extends ComponentBase implements IComponent {

    on(eventName: string, listener: (event: any) => void): void {
        if (!eventName) {
            return undefined;
        }
        events.on(eventName, (event: any) => listener(event));
    }

    publish(eventName: string, event: any = undefined): boolean {
        if (!eventName) {
            return undefined;
        }
        return events.emit(eventName, event);
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
    on(eventName: string, listener: (event: Event) => void): void;
    publish(eventName: string, event: Event): boolean;
}
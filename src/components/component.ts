import { ComponentBase } from "./base.component";
import { eventSource, IEvent, EventType } from "../events/event";
import { Options } from "../options";

export abstract class Component extends ComponentBase implements IComponent {

    children: Component[];

    constructor(options: Options) {
        super(options);
        this.children = [];
    }

    add(component: Component): Component {
        if(component) {
            this.children.push(component);
        }
        return component;
    }

    // create(elementName: string, className?: string): HTMLElement {
    //     if(!this.element) {
    //         return undefined;
    //     }
    //     const elem = document.createElement(elementName);
    //     elem.className = className;
    //     this.element.append(elem);
    // }

    // listen<TEvent>(callback: (event: TEvent) => void) {
    //     const nameof = <T>(name: keyof T) => name;
    //     const eventName = nameof<TEvent>(name) as string;

    //     console.log(eventName);

    //     eventSource.on(eventName, (ev) => callback(ev));
    // }

    on(event: string, listener: (event: any) => void) {
        eventSource.on(event, (event: any) => listener(event));
    }

    publish(event: string | EventType, eventArgs?: any): boolean {
        if (!event) {
            return false;
        }
        if (typeof event == 'string') {
            return eventSource.emit(event, eventArgs);
        }
        else {
            return eventSource.emit((event as EventType).name, event);
        }
    }

    addListener(event: IEvent, selector: string): void {

        // if (!event || !selector) {
        //     return undefined;
        // }

        // this.element.addEventListener(event.name, (native) => {
        //     const eventTarget = this.findChild(native.target as HTMLElement, selector);
        //     if (eventTarget) {
        //         const destination = resolver(eventTarget);
        //         if (destination) {
        //             this.publish(destination);
        //         }
        //     }
        // });
    }

    private findChild(target: HTMLElement, selector: string): HTMLElement {
        if (!target || !selector) {
            return undefined;
        }
        return Array
            .from(this.element.querySelectorAll(selector))
            .map(elem => elem as HTMLElement)
            .find(elem => elem.isSameNode(target) || elem.contains(target));
    }

    bind2(eventNativeName: string, eventName: string, map: (eventTarget: HTMLElement) => any = undefined, selector: string = undefined): void {

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
    on(event: string, listener: (event: any) => void);
    publish(event: string | EventType, eventArgs?: any): boolean;
}
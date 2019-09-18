import { eventSource, IEvent, EventType } from "../events/event";

export abstract class Component implements IComponent {

    options: any;

    children: IComponent[] = [];
    element: HTMLElement;

    constructor(options: any, element?: HTMLElement) {
        this.options = options;
        this.element = element;
    }

    append(component: IComponent) {
        if (!component) {
            return undefined;
        }
        ;
        this.element.append(component.create());
        this.children.push(component);
    }

    init() {
    }

    create(): HTMLElement {
        return undefined;
    }

    bind() {
    }

    async load() {
    }

    destroy() {
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

    protected id(): string {
        const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        while (true) {

            let id = "hv-";
            for (var i = 0; i < 4; i++) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }

            const element = document.getElementById(id);
            if (!element) {
                return id;
            }
        }
    }

}

export interface IComponent {

    options: any;

    children: IComponent[];
    element: HTMLElement;

    append(component: IComponent): void;

    init(): void;
    //init2(): void;
    create(): HTMLElement;
    bind(): void;
    load(): Promise<void>;
    destroy(): void;

    on(event: string, listener: (event: any) => void): void;
    publish(event: string | EventType, eventArgs?: any): boolean;


}
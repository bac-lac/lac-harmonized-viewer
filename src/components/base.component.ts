import { HarmonizedViewer } from "..";
import { IEvent } from "../common/events";

export class BaseComponent implements Component {

    instance: HarmonizedViewer;

    protected element: HTMLElement;

    constructor(instance: HarmonizedViewer) {

        this.instance = instance;
        this.instance.components.register(this);
    }

    create(): HTMLElement {
        return document.createElement('div');
    }

    getElement() {
        if (!this.element) {
            this.element = this.create();
        }
        return this.element;
    }

    on(event: string, listener: (event: IEvent) => void) {
        return this.instance.events.on(event, (event: any) => listener(event));
    }

    publish(event: string, eventArgs?: IEvent): boolean {
        if (!event) {
            return false;
        }
        return this.instance.events.emit(event, eventArgs);
    }

    addListener(event: string, selector?: string, listener?: (eventTarget: HTMLElement) => any): void {

        if (!event) {
            return undefined;
        }

        this.element.addEventListener(event, (event) => {

            const target = event.target as HTMLElement;

            if (selector) {

                // When a selector is provided, resolve the event target by filtering selected elements
                // Emit the event only when the event target can be resolved

                const selectorTarget = Array.from(this.element.querySelectorAll(selector))
                    .map(elem => elem as HTMLElement)
                    .find(elem => elem.isSameNode(target) || elem.contains(target));

                if (selectorTarget) {
                    return listener(selectorTarget);
                }

            }
            else {

                // Selector not provided, no filtering required
                return listener(target);

            }
        });
    }

    protected uniqueid(): string {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        while (true) {

            let id = 'hv-';
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

export interface Component {
    instance: HarmonizedViewer;

    create(): HTMLElement;
    getElement(): HTMLElement;

    init?: () => Promise<void>;
    bind?: () => Promise<void>;
    load?: () => Promise<void>;
}
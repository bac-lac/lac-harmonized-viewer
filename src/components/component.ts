import { HarmonizedViewer } from "..";
import { IEvent } from "~/common/events";

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
        if(!this.element) {
            this.element = this.create();
        }
        return this.element;
    }

    bind() {
    }

    on(event: string, listener: (event: IEvent) => void) {
        return this.instance.events.on(event, (event: any) => listener(event));
    }

    publish(event: string, ...eventArgs: any[]): boolean {
        if (!event) {
            return false;
        }
        return this.instance.events.emit(event, eventArgs);
    }

    protected uniqueid(): string {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        while (true) {

            let id = 'hvid-';
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
    bind();
}
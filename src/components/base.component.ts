import { EventEmitter } from "events";
import { MDCRipple } from "@material/ripple";

export abstract class Component implements IComponent {

    element: HTMLElement;
    events: EventEmitter;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element['hv-instance'] = this;
        this.events = new EventEmitter();
    }

    init() {
    }

    on(event: string | symbol, callback: (...args: any[]) => void) {
        this.events.on(event, callback);
    }

    emit(event: string | symbol, ...args: any[]): boolean {
        return this.events.emit(event, args);
    }

    render() {
        Array.from(document.querySelectorAll(".mdc-button")).forEach(elem => {
            MDCRipple.attachTo(elem);
        });
    }

    // enableRipple() {
    //     if (this.rippleState) {
    //         this.rippleState.activate();
    //     }
    //     else {
    //         Array.from(document.querySelectorAll(".mdc-button")).forEach(elem => {
    //             console.log(elem);
    //             const ripple = new MDCRipple(elem);
    //             ripple.activate();
    //         });
    //     }
    // }

    // disableRipple() {
    //     if (this.rippleState) {
    //         this.rippleState.deactivate();
    //     }
    //     else {
    //         this.rippleState = new MDCRipple(this.element);
    //         this.rippleState.deactivate();
    //     }
    // }

    protected generateId(): string {
        let id = null;
        let characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        while (true) {

            let id = "hv-";
            for (var i = 0; i < 4; i++) {
                id += characters.charAt(Math.floor(Math.random() * characters.length));
            }

            let isUnique = (document.getElementById(id) == null);
            if (isUnique) {
                this.element.id = id;
                break;
            }
        }
        return id;
    }
}

export interface IComponent {
    element: HTMLElement;
    init();
    on(event: string | symbol, callback: (...args: any[]) => void);
    emit(event: string | symbol, ...args: any[]): boolean;
    render();
}
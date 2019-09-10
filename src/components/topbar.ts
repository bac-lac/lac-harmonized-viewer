import { Component } from "./base";
import { RootComponent } from "./base/root-component";
import { EventEmitter } from "events";

export class Topbar extends Component {

    events: EventEmitter;
    root: RootComponent;

    constructor(element: Element) {
        super(element);
        this.events = new EventEmitter();

        this.listen("click", this.click);
        this.bind();
    }

    bind() {
        console.log('bind');
        this.element.addEventListener("click", (args: any) => {
            this.trigger("click", args);
        });
    }

    click(args?: []): void {
        console.log('workeroni', args);
    }

    listen(event: string, callback: (...args: any[]) => void) {
        this.events.addListener(event, callback);
        return this;
    }

    trigger(event: string, args?: any[]): boolean {
        this.events.emit(event, args);
        return false;
    }

}
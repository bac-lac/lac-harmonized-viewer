import { EventEmitter } from "events";
import { Component } from "./components/base";
import { IRootComponent, RootComponent } from "./components/base/root-component";

import("./components/topbar");

export class HarmonizedViewer extends RootComponent implements IRootComponent {

    events: EventEmitter;

    constructor(id: string) {
        let element = document.getElementById(id);
        super(element);
        element["hv-instance"] = this;
        this.events = new EventEmitter();
    }

    // async load(): Promise<string> {
    //     return await Manifesto.Utils.loadResource(this.manifestUrl);
    // }

    //configure() {
        //document.addEventListener("click", args => this.events.emit("click", args));
    //}

    // protected createComponent(selector: string, callback: (elem: Element) => IComponent) {
    //     const instances = this.element.querySelectorAll(selector);
    //     return Array.from(instances).map(elem => callback(elem));
    // }
}

export function harmonizedViewer(id: string): HarmonizedViewer {
    //var element = document.getElementById(id);
    return new HarmonizedViewer(id);
}
//(window as any).HarmonizedViewer = HarmonizedViewer;
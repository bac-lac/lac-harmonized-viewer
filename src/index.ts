import { EventEmitter } from "events";
import { Component } from "./components/base";
import { Topbar } from "./components/topbar";
import { MDCRipple } from "@material/ripple";

export class HarmonizedViewer {

    element: Element;
    components: Component[];

    constructor(id: string) {
        this.components = [];
        this.element = document.getElementById(id);

        this.initTopbars();
        this.initRipple();
    }

    initTopbars() {

        let elements = this.element.querySelectorAll(".hv-topbar");
        
        Array
            .from(elements)
            .forEach(i => {
                this.components.push(new Topbar(i));
            });
    }

    initRipple() {
        document
            .querySelectorAll("button")
            .forEach(button => new MDCRipple(button));
    }
}

export function harmonizedViewer(id: string): HarmonizedViewer {
    return new HarmonizedViewer(id);
}
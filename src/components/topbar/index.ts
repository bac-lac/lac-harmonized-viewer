import { MDCRipple } from "@material/ripple";
import { Component } from "../base";

export class Topbar extends Component {

    constructor(parent: Component) {
        super(parent);
    }

    init() {
        console.log('configure topbar');
    }

    configure() {
        console.log('configure topbar');
        console.log(this.element.querySelectorAll(".hv-button"));
        this.element.querySelectorAll(".hv-button").forEach(button => new MDCRipple(button));
    }

}
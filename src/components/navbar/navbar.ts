import { Component } from "../../base/component";

export class Navbar extends Component {

    constructor() {
        super();
        this.element = document.createElement("nav");
        this.element.className = "hv-topbar navbar is-primary";
    }

}
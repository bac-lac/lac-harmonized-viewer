import { Component } from "./base.component";
import { DrawerComponent } from "./drawer.component";

export class TopbarComponent extends Component {

    text: string;

    constructor(element: HTMLElement) {
        super(element);
        this.text = "OK";
    }

    init() {
        this.element.querySelector('.mdc-top-app-bar__navigation-icon').addEventListener('click', () => {
            let drawer = document.querySelector('.mdc-drawer')['hv-instance'] as Component;
            drawer.events.emit('toggle');
        });
    }

    render() {
        this.element.querySelector(".mdc-top-app-bar__title").textContent = this.text;
    }

}
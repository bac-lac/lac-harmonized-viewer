import { Component } from "./base.component";
import { events, ClickEventArgs } from "../events/list.event";

export class TopbarComponent extends Component {

    text: string;

    constructor(element: HTMLElement) {
        super(element);
        this.text = "OK";
    }

    bindEvents() {
        this.element.querySelector('.mdc-top-app-bar__navigation-icon').addEventListener('click', () => {
            events.onClick.emit(new ClickEventArgs());
        });
    }

    click() {
        console.log('workeroni');
    }

    render() {
        this.element.querySelector(".mdc-top-app-bar__title").textContent = this.text;
    }

}
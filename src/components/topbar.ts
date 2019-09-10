import { Component } from "./base";

export class Topbar extends Component {

    constructor(element: Element) {
        super(element);
    }

    // click() {
    //     console.log('override');
    // }

    static load() {
        document.onreadystatechange = () => {
            if (document.readyState == "complete") {
                Array
                    .from(document.querySelectorAll(".hv-topbar"))
                    .filter(element => !element["hv-instance"])
                    .forEach(element => {
                        console.log('loading', element);
                        new Topbar(element)
                            .listen("init", () => {
                                console.log('inited');
                            }).init();
                    });
            }
        }
    }

}

Topbar.load();
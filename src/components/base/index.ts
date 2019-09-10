export class Component {

    element: Element;

    constructor(element: Element) {

        this.element = element;
        //this.element["hv-instance"] = this;


        // document.onreadystatechange = (e: ProgressEvent) => {
        //     if (document.readyState == "complete") {
        //         let root = this.getRoot(this);
        //         if (root != null) {
        //             root.events.emit("ready");
        //         }
        //         //this.execute();
        //     }
        // };
    }

    // bindEvents(): Component {

    //     let instance = this.element["hv-instance"];

    //     let isComponent = instance ? true : false;
    //     let isController = (instance == null) ? false : instance instanceof RootComponent;

    //     if (isComponent && !isController) {
    //         console.log('regis', this.element);
    //         this.element.addEventListener("click", (event: any) => {
    //             let contains = this.element.contains(event.target);
    //             console.log(contains);
    //             if (contains) {
    //                 this.trigger("click", event);
    //             }
    //         });
    //     }

    //     return this;
    // }

    click() {
        console.log("clicked");
    }

    

    // controller(): RootComponent {
    //     if (!this._controller) {
    //         this._controller = this.controllerRecursive(this.element);
    //     }
    //     return this._controller;
    // }

    // controllerRecursive(element: Element): RootComponent {
    //     let instance = element["hv-instance"];

    //     if (element && instance && instance instanceof RootComponent) {
    //         return <RootComponent>instance;
    //     }
    //     else if (element && element.parentElement) {
    //         return this.controllerRecursive(element.parentElement);
    //     }
    //     else {
    //         return null;
    //     }
    // }

    // eventSource(): EventEmitter {
    //     let controller = this.controller();
    //     if (controller) {
    //         return controller.events;
    //     }
    //     else {
    //         return null;
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
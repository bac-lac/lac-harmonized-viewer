import { EventEmitter } from "events";
import { Component, IComponent } from "./components/base";

export class Controller extends Component {

    element: Element;
    events: EventEmitter;

    constructor(element: Element) {
        super(null);
        this.element = element;
        this.events = new EventEmitter();
    }

    // async load(): Promise<string> {
    //     return await Manifesto.Utils.loadResource(this.manifestUrl);
    // }

    configure() {
        document.addEventListener("click", eventArgs => this.events.emit("click", eventArgs));
    }

    execute() {
        //this.children = [];
        let items = Array.from(this.element.children).filter(i => i.matches(".hv-topbar"));
        items.forEach(item => {
            //let instance = new Store["topbar"]();
            //console.log(instance);
            //let test = new Topbar();
            //console.log(component);
            //this.children.push(component);
        });
        //console.log(.map(i => new Topbar(this)));
        // if (this.element != null && this.element.children != null) {
        //     this.children = Array.from(this.element.children)
        //         .filter(i => i.matches(".hv-topbar"))
        //         .map(i => { console.log(this); return new Topbar(this).bind(i); });
        // }
        
        this.init();
        this.configure();
        this.render();
        return this;
    }

    protected createComponent(selector: string, callback: (elem: Element) => IComponent) {
        const instances = this.element.querySelectorAll(selector);
        return Array.from(instances).map(elem => callback(elem));
    }
}

function HarmonizedViewer(id: string, manifest: string): Controller {

    var element = document.getElementById(id);
    return new Controller(element).execute();
}
(window as any).HarmonizedViewer = HarmonizedViewer;
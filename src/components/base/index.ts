export abstract class Component implements IComponent {

    children: Component[];
    element: Element;
    parent: Component;

    constructor(parent: Component) {
        this.parent = parent;
    }

    init() {
        this.discover();
        if (this.children != null) {
            this.children.forEach(i => i.init());
        }
    }

    configure() {
    }

    render() {
    }

    bind(element: Element): Component {
        this.element = element;
        return this;
    }

    private discover() {
        console.log('test');
        console.log(Store);

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
    }

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

export interface IComponent {
    children: Component[];
    element: Element;
    parent: Component;
}
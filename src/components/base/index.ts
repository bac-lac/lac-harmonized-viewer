export abstract class Component implements IComponent {

    children: Component[];
    element: Element;
    parent: Component;

    constructor(parent: Component) {
        this.parent = parent;
    }

    init() {
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
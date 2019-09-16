import { Options } from "../options";

export abstract class ComponentBase implements IComponentBase {

    element: HTMLElement;
    options: Options;

    constructor(element: HTMLElement, options: Options) {
        this.element = element;
        this.options = options;
    }

    async init() {
    }

    async render() {
        
    }

    async destroy() {
    }

    // root(elem: HTMLElement = this.element): RootComponent {
    //     if (this.rootComponent) {
    //         return this.rootComponent;
    //     }
    //     if (!elem) {
    //         return undefined;
    //     }

    //     if (Number.isInteger(elem['hv-instance-index'])) {
    //         let index = parseInt(elem['hv-instance-index']);
    //         return RootComponent.instances[index];
    //     }
    //     else if (elem.parentElement) {
    //         return this.root(elem.parentElement);
    //     }
    //     else {
    //         return undefined;
    //     }
    // }

    // enableRipple() {
    //     if (this.rippleState) {
    //         this.rippleState.activate();
    //     }
    //     else {
    //         Array.from(document.querySelectorAll(".mdc-button")).forEach(elem => {
    //             console.log(elem);
    //             const ripple = new MDCRipple(elem);
    //             ripple.activate();
    //         });
    //     }
    // }

    // disableRipple() {
    //     if (this.rippleState) {
    //         this.rippleState.deactivate();
    //     }
    //     else {
    //         this.rippleState = new MDCRipple(this.element);
    //         this.rippleState.deactivate();
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

export interface IComponentBase {
    element: HTMLElement;
    options: any;
    
    init();
    render();
    destroy();

    //root(elem: HTMLElement): RootComponent;
}
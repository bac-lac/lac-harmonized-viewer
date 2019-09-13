import { ComponentFactory } from "../services/component.factory";
import tippy from 'tippy.js';

export class RootComponent implements IRootComponent {

    element: HTMLElement;
    factory: ComponentFactory;

    constructor(id: string) {
        this.element = document.getElementById(id);
        this.factory = new ComponentFactory();
    }

    build(element: HTMLElement, options: any) {

        if (this.factory.isComponent(element)) {
            this.factory.create(element, options);
        }

        Array.from(element.children)
            .forEach(child => this.build(child as HTMLElement, options));
    }

    async execute() {

        await Promise.all(this.factory.components.map(i => i.init()));
        await Promise.all(this.factory.components.map(i => i.render()));
        
        this.tooltips();
    }

    private tooltips() {
        tippy('[data-tippy-content]', {
            animation: 'shift-away',
            appendTo: 'parent',
            boundary: this.element,
            delay: [500, 100],
            duration: 200,
            placement: 'bottom',
            theme: 'hv'
        });
    }

}

export interface IRootComponent {
    factory: ComponentFactory;
}
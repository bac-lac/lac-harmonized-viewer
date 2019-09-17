import tippy from 'tippy.js';
import { Options } from "../options";
import { TopbarComponent } from "./topbar.component";
import { NavigationComponent } from "./navigation.component";
import { Component } from './component';

export class RootComponent implements IRootComponent {

    element: HTMLElement;

    constructor(id: string) {
        this.element = document.getElementById(id);
    }

    build(options: Options) {

        const topbar = new TopbarComponent(options);
        this.element.append(topbar.create());

        const navigation = new NavigationComponent(options);
        this.element.append(navigation.create());

        const components = Array.from([
            topbar,
            navigation
        ]);

        components.forEach(component => component.init2());
        components.forEach(x => this.bind(x));

        //this.element.append(this.builder.build());

        //this.factory.build(element, options);

        // Array.from(element.children)
        //     .forEach(child => this.build(child as HTMLElement, options));
    }

    bind(component: Component) {
        if (!component) {
            return undefined;
        }
        component.bind();
        component.children.forEach(x => this.bind(x));
    }

    // components(element: HTMLElement): Component[] {

    //     if (!element) {
    //         return undefined;
    //     }

    //     return Array.from(element.children)
    //         .filter(child => child.hasAttribute('data-viewer-component'))
    //         .map(child => {

    //         });
    // }

    async execute() {

        //await Promise.all(this.builder.components.map(i => i.init()));
        //await Promise.all(this.builder.components.map(i => i.render()));

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

}
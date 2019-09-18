import tippy from 'tippy.js';
import { Options } from "../options";
import { TopbarComponent } from "./topbar/topbar.component";
import { NavigationComponent } from "./navigation.component";
import { IComponent } from './component';
import { ViewportComponent } from './viewport.component';

export class RootComponent implements IRootComponent {

    components: IComponent[] = [];
    element: HTMLElement;

    constructor(id: string) {
        this.element = document.getElementById(id);
    }

    execute(options: any) {

        const topbar = new TopbarComponent(options);
        this.element.append(topbar.create());

        const navigation = new NavigationComponent(options);
        this.element.append(navigation.create());

        const viewport = new ViewportComponent(options);
        this.element.append(viewport.create());

        this.components.forEach(x => this.executeInit(x));
        this.components.forEach(x => this.executeBind(x));
        this.components.forEach(x => this.executeLoad(x));
    }

    private append(component: IComponent) {

        if (!component) {
            return undefined;
        }

        component.element = component.create();

        this.element.append(component.element);
        this.components.push(component);
    }

    private executeInit(component: IComponent) {
        if (!component) {
            return undefined;
        }
        component.init();
        component.children.forEach(x => this.executeInit(x));
    }

    private executeBind(component: IComponent) {
        if (!component) {
            return undefined;
        }
        component.bind();
        component.children.forEach(x => this.executeBind(x));
    }

    private executeLoad(component: IComponent) {
        if (!component) {
            return undefined;
        }
        component.load();
        component.children.forEach(x => this.executeLoad(x));
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
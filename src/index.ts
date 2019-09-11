import { RootComponent } from "./components/root.component";
import tippy from 'tippy.js'

export class HarmonizedViewer extends RootComponent {

    //static instances: HarmonizedViewer[];

    element: HTMLElement;
    options: any;

    constructor(id: string, options: any) {
        super();

        this.element = document.getElementById(id);
        this.options = options || {};

        // if (!HarmonizedViewer.instances) {
        //     HarmonizedViewer.instances = [];
        // }
        // HarmonizedViewer.instances.push(this);
        // this.element['hv-instance-index'] = HarmonizedViewer.instances.length - 1;
    }

    async init() {
        this.build(this.element, this.options);
        this.execute();

        this.initializeTooltips();
    }

    initializeTooltips() {
        tippy('[data-tippy-content]', {
            animation: 'shift-away',
            boundary: this.element,
            delay: [500, 100],
            duration: 200,
            placement: 'bottom',
        });
    }
}

export function harmonizedViewer(id: string, options: any) {
    return new HarmonizedViewer(id, options).init();
}
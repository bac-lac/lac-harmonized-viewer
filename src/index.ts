import { EventEmitter } from "events";
import { ComponentService } from "./services/component.service";
import { RootComponent } from "./components/root.component";
import { HarmonizedViewerOptions, DisplayMode } from "./options/options";

import tippy from 'tippy.js';

const deepmerge = require('deepmerge');
const overlayscrollbars = require('overlayscrollbars');

export class HarmonizedViewer {

    element: HTMLElement;

    options: HarmonizedViewerOptions;

    components: ComponentService;
    events: EventEmitter;

    private defaults: HarmonizedViewerOptions = {
        manifest: undefined,
        displayMode: DisplayMode.OnePage,
        navigation: {
            enable: true,
            open: false
        },
        annotations: {
            enable: true,
            open: false
        },
        viewport: {
            openseadragon: {
                path: undefined
            }
        }
    };

    constructor(id: string, options: HarmonizedViewerOptions) {

        this.element = document.getElementById(id);
        this.options = deepmerge(this.defaults, options);

        this.components = new ComponentService();
        this.events = new EventEmitter();
    }

    init() {
        const root = new RootComponent(this);
        this.element.append(root.getElement());

        const promise = new Promise((resolve, reject) => {
            this.components.execute();
            this.tooltips();
            resolve();
        }).catch((reason) => {
            console.error('error', reason);
        });
    }

    private tooltips() {
        return tippy('[data-tippy-content]', {
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

export function harmonizedViewer(id: string, options: HarmonizedViewerOptions) {
    return new HarmonizedViewer(id, options).init();
}
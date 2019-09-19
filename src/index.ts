import { EventEmitter } from "events";
import { ComponentService } from "./services/component.service";
import { RootComponent } from "./components/root.component";
import { HarmonizedViewerOptions } from "./options/options";

const deepmerge = require('deepmerge');

export class HarmonizedViewer {

    element: HTMLElement;

    options: HarmonizedViewerOptions;

    components: ComponentService;
    events: EventEmitter;

    private defaults: HarmonizedViewerOptions = {
        manifest: undefined,
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
        this.components.execute();
    }
}

export function harmonizedViewer(id: string, options: HarmonizedViewerOptions) {
    return new HarmonizedViewer(id, options).init();
}
import { EventEmitter } from "events";
import { ComponentService } from "./services/component.service";
import { RootComponent } from "./components/root.component";
import { HarmonizedViewerOptions, DisplayMode } from "./options/options";

import tippy, { Instance } from 'tippy.js';
import { MDCRipple } from "@material/ripple";
import { LocaleService } from "./services/locale.service";
import { IEvent } from "./common/events";

const deepmerge = require('deepmerge');

export class HarmonizedViewer {

    element: HTMLElement;
    options: HarmonizedViewerOptions;

    components: ComponentService;
    locale: LocaleService;
    events: EventEmitter;

    root: RootComponent;

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

        this.events = new EventEmitter();

        this.components = new ComponentService();
        this.locale = new LocaleService(this);
    }

    init() {

        this.root = new RootComponent(this);
        this.element.append(this.root.getElement());

        this.locale.configure();

        new Promise((resolve, reject) => {

            this.components.execute();

            this.ripple();
            this.tooltips();
            resolve();
        }).catch((reason) => {
            console.error('error', reason);
        });
    }

    on(event: string, listener: (event: IEvent) => void) {
        return this.events.on(event, (event: any) => listener(event));
    }

    publish(event: string, eventArgs?: IEvent): boolean {
        if (!event) {
            return false;
        }
        return this.events.emit(event, eventArgs);
    }

    private ripple() {
        Array.from(this.element.querySelectorAll('.mdc-button')).forEach(x => MDCRipple.attachTo(x));
    }

    tooltips() {
        const selector = '[data-tippy-content]';

        const instances = tippy(selector) as Instance[];
        instances.forEach(x => x.destroy());

        return tippy(selector, {
            animation: 'shift-away',
            appendTo: 'parent',
            boundary: this.element,
            delay: [0, 100],
            duration: 200,
            placement: 'bottom',
            theme: 'hv'
        });
    }
}

export function harmonizedViewer(id: string, options: HarmonizedViewerOptions) {
    return new HarmonizedViewer(id, options).init();
}
import { Navbar } from "./components/navbar/navbar";
import { Component } from "./base/component";

import { MDCRipple } from '@material/ripple/index';

import * as Openseadragon from 'openseadragon';

export class Viewer extends Component {

    element: HTMLElement;

    openseadragon: any;

    manifestUrl: string;
    //manifest: Manifesto.Manifest;

    constructor(selector: string, manifestUrl: string) {

        super();
        this.element = document.querySelector(selector);

        this.manifestUrl = manifestUrl;

        let topbar = new Navbar();
        this.append(topbar.GetElement());

        this.append(new Openseadragon({
            id: "osd",
            prefixUrl: "/openseadragon/images/",
            tileSources: "/path/to/my/image.dzi"
        }));

        const ripple = new MDCRipple(document.querySelector('.hv-button'));
    }

    // async load(): Promise<string> {
    //     return await Manifesto.Utils.loadResource(this.manifestUrl);
    // }

}

function HarmonizedViewer(selector: string, manifest: string): Viewer {
    return new Viewer(selector, manifest);
}
(window as any).HarmonizedViewer = HarmonizedViewer;
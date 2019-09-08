import { Navbar } from "./components/navbar/navbar";
import { Component } from "./base/component";

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
    }

    // async load(): Promise<string> {
    //     return await Manifesto.Utils.loadResource(this.manifestUrl);
    // }

}

function HarmonizedViewer(selector: string, manifest: string): Viewer {
    return new Viewer(selector, manifest);
}
(window as any).HarmonizedViewer = HarmonizedViewer;
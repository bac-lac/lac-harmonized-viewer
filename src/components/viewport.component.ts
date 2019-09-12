import "manifesto.js";
import { Component } from "./component";
import { ManifestLoad } from "../events/manifest-load.event";
import { CanvasLoad } from "../events/canvas-load.event";

const openseadragon = require('openseadragon');

export class ViewportComponent extends Component {

    private openseadragon: any;
    private manifest: Manifesto.Manifest;

    async init() {

        this.on('canvas-load', (event: CanvasLoad) => {
            console.log('load', event);
        });

        this.manifest = manifesto.create(
            await manifesto.loadManifest(this.options.manifestUrl)) as Manifesto.Manifest;

        this.publish('manifest-load', new ManifestLoad(this.manifest));
    }

    async render() {

        let sequence = this.manifest.getSequences()[0];

        let sources = sequence.getCanvases().map(function (canvas) {
            var images = canvas.getImages();
            return images[0].getResource().getServices()[0].id + "/info.json";
        });

        this.openseadragon = openseadragon({
            id: "osd",
            prefixUrl: "/vendors/openseadragon/images/",
            sequenceMode: true,
            tileSources: sources
        });
    }
}

export interface IViewportOptions {
    element: HTMLElement;
    manifest: Manifesto.Manifest;
}